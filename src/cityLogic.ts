import { readCitiesFromFile } from './cityDao';
import { sortCitiesByPopulation, SortDirection } from './sortManager';
import { type City } from './types';


export const getProcessedCities = async (direction: SortDirection): Promise<City[]> => {
    try {
        // chiamiamo il DAO per prendere i dati aggiornati dal file
        const rawCities = await readCitiesFromFile();

        // chiamiamo il Sort Manager per applicare l'ordinamento
        const sortedCities = sortCitiesByPopulation(rawCities, direction);

        //   restituiamo il risultato all index
        return sortedCities;
    } catch (error) {
        // se succeede qualcosa rilanciamo l'errore
        // in modo che index.ts possa intercettarlo nel suo catch 
        throw error;
    }
};