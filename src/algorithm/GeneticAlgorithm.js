"use strict"
const TimeTable = require('./TimeTable');
const RestrictionComposite = require('./Restrictions/RestrictionComposite');
const Prando = require('prando');

class GeneticAlgorithm{

    constructor(restrictions, classes, populationSize, maxGenerations, deterministic = true){
        
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
        this.populationSize = populationSize;
        this.maxGenerations = maxGenerations;

        if (deterministic){
            this.generationSeed = 85282812828521851841;
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
            
            population.push(new TimeTable(selected));
        }
  
        return population;
    }

    static _greedyGeneration(classes){
    
        let createdTimeTables = [new TimeTable([]), ];
    
        // greedy implementation for testing
        for (const c of classes) {
            
            let picked = false;
    
            for (let i = 0; i < createdTimeTables.length; i++) {
                let timeTable = createdTimeTables[i];
            
                picked = timeTable.append(c);
            }
    
            if (picked == false){
                let timeTable = new TimeTable([c, ]);
                createdTimeTables.push(timeTable);
            }            
        }
    
        return createdTimeTables;
    }

    run(){
        // returns the list of best timetables after
        // algorithm application
        
        this.currentPopulation = this._generateInitialPopulation();

        for (let i = 0; i < this.maxGenerations; i++) {

            let avaliation = this._avaliate();
            let selected = this._select(avaliation);
            this.currentPopulation = this._crossover(selected);
        }
        
        console.log(this.currentPopulation.map((obj) => obj.classes.length));

        return this.currentPopulation;
    }

    _select(avaliation){
        
        let sum = avaliation.reduce((accumulator, current) => {
            return current[1] + accumulator;
        }, 0);

        let average = sum/avaliation.length;

        // apply truncation with the minimal value beeing the average
        let truncated = avaliation.filter((value) => value[1] >= 0.8*average);
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

            // parent1 needs to be the smaller array
            if (parent1.classes.length > parent2.classes.length) {
                [parent1, parent2] = [parent2, parent1];
            }

            let childs = this._generateOffspring(parent1, parent2);
            newGeneration.push(childs[0]);
            newGeneration.push(childs[1]);

        }

        return newGeneration;
    }

    _generateOffspring(parent1, parent2){

        // using "Single Crossover Point"
        // example:
        // parent1 = A B C
        // parent2 = H I J K L
        // with crossover point beeing 1
        // parts[0] = A B
        // parts[1] = C
        // parts[2] = H I
        // parts[3] = J K L
        // and finally:
        // childs[0] = A B J K L
        // cuilds[1] = H I C

        // parent1 and parent2 are TImeTable objects

        let crossoverPoint = this.rng.nextInt(0, parent1.classes.length);
        
        let parts = [
            parent1.classes.splice(0, crossoverPoint),
            parent1.classes,
            parent2.classes.splice(0,crossoverPoint),
            parent2.classes
        ];

        parent1.classes = parts[0].concat(parts[3]);
        parent2.classes = parts[2].concat(parts[1]);

        return [parent1, parent2];
    }
    
    _avaliate(){

        let avaliation = this.currentPopulation.map(timeTable => {
            return [timeTable, this._fitness(timeTable)];
        });

        // avaliation.sort((a, b) => a[1] > b[1] ? 1 : -1);

        return avaliation;
    }

    _fitness(timeTable){

       return this.restrictionsComposite.apply(timeTable);
    }

}

module.exports = GeneticAlgorithm;