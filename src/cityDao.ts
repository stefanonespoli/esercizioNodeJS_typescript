import * as fs from 'fs/promises';
import { type City } from './types';


export async function readCitiesFromFile(): Promise<City[]> {
	
    //percorso del file dalla variabile d'ambiente
    const filePath = process.env.CITIES_FILE_PATH;

    if (!filePath) {
        throw new Error("Errore: la variabile d'ambiente CITIES_FILE_PATH non è configurata");
    }

    try {
		
        const rawData = await fs.readFile(filePath, { encoding: 'utf8' });
        const cities: City[] = JSON.parse(rawData);
        
        return cities;
    } catch (error) {
        
        console.error(`[DAO Error] Impossibile leggere il file: ${filePath}`, error);
        throw error;
		
    }
}