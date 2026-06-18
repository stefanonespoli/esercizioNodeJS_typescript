"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessedCities = void 0;
const cityDao_1 = require("./cityDao");
const sortManager_1 = require("./sortManager");
const getProcessedCities = async (direction) => {
    try {
        // chiamiamo il DAO per prendere i dati aggiornati dal file
        const rawCities = await (0, cityDao_1.readCitiesFromFile)();
        // chiamiamo il Sort Manager per applicare l'ordinamento
        const sortedCities = (0, sortManager_1.sortCitiesByPopulation)(rawCities, direction);
        //   restituiamo il risultato all index
        return sortedCities;
    }
    catch (error) {
        // se succeede qualcosa rilanciamo l'errore
        // in modo che index.ts possa intercettarlo nel suo catch 
        throw error;
    }
};
exports.getProcessedCities = getProcessedCities;
