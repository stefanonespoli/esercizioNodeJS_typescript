import { readCitiesFromFile } from './cityDao';
import * as fs from 'fs/promises';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.test') });

describe('City DAO Integration Tests', () => {
    const testFilePath = process.env.CITIES_FILE_PATH || 'test-cities.json';

    beforeEach(async () => {
        const mockData = [
            { name: "Test Milan", population: 100 },
            { name: "Test Rome", population: 200 }
        ];
        await fs.writeFile(testFilePath, JSON.stringify(mockData), 'utf8');
    });

    afterEach(async () => {
        try {
            await fs.unlink(testFilePath);
        } catch (err) {}
    });


    it('dovrebbe leggere correttamente tutte le città tramite aiuto del file ENV', async () => {
        const cities = await readCitiesFromFile();
        
        expect(cities).toHaveLength(2);
        expect(cities[0].name).toBe('Test Milan');
        expect(cities[1].population).toBe(200);
    });

    // nuovo
    it('dovrebbe lanciare un errore se il file JSON non esiste sul disco', async () => {
        try {
            await fs.unlink(testFilePath);
        } catch (err) {}

        await expect(readCitiesFromFile()).rejects.toThrow();
    });
});