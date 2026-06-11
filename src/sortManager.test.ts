import { sortCitiesByPopulation, SortDirection } from './sortManager';
import { type City } from './types'; 

describe('Sort Manager Unit Tests', () => {
    // array disordinato di test 
    const mockCities: City[] = [
        { name: "Milan", population: 1000 },
        { name: "Naples", population: 500 },
        { name: "Rome", population: 2000 }
    ];

    it('dovrebbe ordinare le città in modo CRESCENTE basandosi sulla popolazione', () => {
        const result = sortCitiesByPopulation(mockCities, SortDirection.ASC);

        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('Naples'); 
        expect(result[1].name).toBe('Milan');  
        expect(result[2].name).toBe('Rome');   
    });

    it('dovrebbe ordinare le città in modo DECRESCENTE basandosi sulla popolazione', () => {
        const result = sortCitiesByPopulation(mockCities, SortDirection.DESC);

        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('Rome');   
        expect(result[1].name).toBe('Milan');  
        expect(result[2].name).toBe('Naples'); 
    });
});