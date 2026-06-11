import { readCitiesFromFile } from './cityDao';
import * as fs from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

describe('City DAO Integration Tests', () => {
    const testFilePath = 'test-cities.json';
    let originalEnvPath: string | undefined;

    // prima di tutti i test, scambiao il file reale con un file di test 
    beforeAll(() => {
        originalEnvPath = process.env.CITIES_FILE_PATH;
        process.env.CITIES_FILE_PATH = testFilePath;
    });

    // alla fine di tutti i test, rimettiamo a posto la variabile d'ambiente 
    afterAll(() => {
        process.env.CITIES_FILE_PATH = originalEnvPath;
    });


    beforeEach(async () => {
        const mockData = [
            { name: "Test Milan", population: 100 },
            { name: "Test Rome", population: 200 }
        ];
        await fs.writeFile(testFilePath, JSON.stringify(mockData), 'utf8');
    });

    // dopo ogni singolo test, faccio pulizia
    afterEach(async () => {
        try {
            await fs.unlink(testFilePath);
        } catch (err) {
           
        }
    });

    it('dovrebbe leggere correttamente tutte le città tramite aiuto del file ENV', async () => {

        const cities = await readCitiesFromFile();
       
        expect(cities).toHaveLength(2);
        expect(cities[0].name).toBe('Test Milan');
        expect(cities[1].population).toBe(200);
    });
});