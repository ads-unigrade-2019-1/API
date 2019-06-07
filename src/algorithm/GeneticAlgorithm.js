"use strict"
const TimeTable = require('./TimeTable');
const RestrictionComposite = require('./Restrictions/RestrictionComposite');
const Prando = require('prando');

class GeneticAlgorithm{

    constructor(restrictions, classes, populationSize, maxGenerations, deterministic = true, mutation=0.5){
        
        if (classes == null || classes.length < 1){
            throw new RangeError("classes must have at least one element");
        }
        
        if (restrictions == null || restrictions.length < 1){
            throw new ReferenceError("No restrictions provided");
        }
        
        this.restrictions = restrictions;

        this.restrictionsComposite = new RestrictionComposite();
        for (const restriction of restrictions) {

            this.restrictionsComposite.add(restriction);    
        }
        
        this.classes = classes;
        this.mutationChance = mutation;
        this.populationSize = populationSize;
        this.maxGenerations = maxGenerations;

        this._lastAverages = [];

        if (deterministic){
            this.generationSeed = -12234;
            this.rng = new Prando(this.generationSeed);
        }else{
            this.rng = new Prando();
        }
    }


    _generateInitialPopulation(){
        // returns a list of random TimeTables
    
        // initialize with greedy algotithim
        let population = GeneticAlgorithm._greedyGeneration(this.classes);

        for (let i = population.length; i < this.populationSize; i++) {
            
            // Shuffle array
            const shuffled = this.classes.sort(() => 0.5 - this.rng.next());

            // Get sub-array of first n elements after shuffled
            let selected = shuffled.slice(0, this.rng.nextInt(1, shuffled.length));
            
            population.push(new TimeTable(this.classes, selected));
        }
  
        return population;
    }

    static _greedyGeneration(classes){
    
        let createdTimeTables = [new TimeTable(classes, []), ];
    
        // greedy implementation for testing
        for (const c of classes) {
            
            let picked = false;
    
            for (let i = 0; i < createdTimeTables.length; i++) {
                let timeTable = createdTimeTables[i];
            
                picked = timeTable.append(c);
            }
    
            if (picked === false){
                let timeTable = new TimeTable(classes, [c, ]);
                createdTimeTables.push(timeTable);
            }            
        }
    
        return createdTimeTables;
    }
    
    get globalAverage(){

        let averagesToConsider = Math.min(this._lastAverages.length, 5);
            
        let sum = this._lastAverages
            .slice(this._lastAverages.length - averagesToConsider, this._lastAverages.length)
            .reduce((accumulator, current) => {
                return current + accumulator;
            }, 0);

        let avg = sum / averagesToConsider;
        
        return avg;
    }

    _cleanResult(population){
        // order by selectedClasses length
        //population.sort((a, b) => a.selectedClasses.length < b.selectedClasses.length ? 1 : -1);
        
        population.sort((a, b) => this._fitness(a) < this._fitness(b) ? 1 : -1);

        console.log(
            population.map((obj) => obj.selectedClasses.length)
        );
        console.log(
            population.map((obj) => obj.isConsistent())
        );
        
        // remove inconsistent and duplicated results
        population = population.filter((obj) => {return obj.isConsistent()});
        population = this._filterDuplicates(population);

        return population
    }

    run(){
        // returns the list of best timetables after
        // algorithm application
        
        this.currentPopulation = this._generateInitialPopulation();

        for (let i = 0; i < this.maxGenerations; i++) {

            let avaliation = this._avaliate();
            let selected = this._select(avaliation);

           if (this.globalAverage > 0.9) break;

            let newPopulation = this._crossover(selected);
            this.currentPopulation = this._mutate(newPopulation);
        }

        let cleanedPopulation = this._cleanResult(this.currentPopulation);

        // fallback to greedy implementation
        if (cleanedPopulation.length < 1){
            return GeneticAlgorithm._greedyGeneration(this.classes);
        }

        let topElements = cleanedPopulation.slice(0, Math.min(5, cleanedPopulation.length)); 
        console.log("Fitness: " + topElements.map((obj) => this._fitness(obj)).toString());

        // returns top 5 elements
        return topElements;        
    }

    _filterDuplicates(population){

        let dict = new Map();

        population.forEach(timeTable => {
            
            if (dict.has(timeTable.chromosome.toString()) == false){
                dict.set(timeTable.chromosome.toString(), timeTable);
            }

        });


        return Array.from(dict.values());
    }

    _select(avaliation){
        
        let sum = avaliation.reduce((accumulator, current) => {
            return current[1] + accumulator;
        }, 0);

        let average = sum/avaliation.length;

        this._lastAverages.push(average);

        // apply truncation with the minimal value beeing 90% of the average
        let truncated = avaliation.filter((value) => value[1] >= 0.9*average);
        truncated.sort((a, b) => a[1] > b[1] ? 1 : -1);
        truncated = truncated.map((element) => element[0]);
        
        return truncated;
    }

    _crossover(selected){

        let newGeneration = [];

        if(selected.length % 2 != 0){
            newGeneration.push(selected.pop());
        }

        // shuffle array contents
        selected.sort(() => 0.5 - this.rng.next());

        while (selected.length > 0) {            
            let parent1 = selected.pop();
            let parent2 = selected.pop();

            let childs = this._generateOffspring(parent1, parent2);
           
            newGeneration.push(childs[0]);
            newGeneration.push(childs[1]);
        }

        return newGeneration;
    }

    _generateOffspring(parent1, parent2){

        // using "Single Crossover Point"
        // example:
        // parent1 = A B C D E
        // parent2 = H I J K L
        // with crossover point beeing 1
        // parts[0] = A B
        // parts[1] = C D E
        // parts[2] = H I
        // parts[3] = J K L
        // and finally:
        // childs[0] = A B J K L
        // cuilds[1] = H I C D E

        // parent1 and parent2 are TImeTable objects

        let crossoverPoint = this.rng.nextInt(0, parent1.selectedClasses.length);
        
        let parent1Chromosome = parent1.chromosome;
        let parent2Chromosome = parent2.chromosome;

        let parts = [
            parent1Chromosome.splice(0, crossoverPoint),
            parent1Chromosome,
            parent2Chromosome.splice(0,crossoverPoint),
            parent2Chromosome
        ];

        parent1.chromosome = parts[0].concat(parts[3]); 
        parent2.chromosome = parts[2].concat(parts[1]);

        return [parent1, parent2];
    }

    _mutate(population){

        return population.map((timeTable) => {

            let mutate = this.rng.next() < this.mutationChance;

            if (mutate) {
                timeTable.append(this.rng.nextArrayItem(this.classes));
            }

            return timeTable;
        });

    }
    
    _avaliate(){

        let avaliation = this.currentPopulation.map(timeTable => {
            return [timeTable, this._fitness(timeTable)];
        });

        return avaliation;
    }

    _fitness(timeTable){

       return this.restrictionsComposite.apply(timeTable);
    }

}

module.exports = GeneticAlgorithm;