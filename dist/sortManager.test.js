"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortManager_1 = require("./sortManager");
describe('Sort Manager Unit Tests', () => {
    // array disordinato di test 
    const mockCities = [
        { name: "Milan", population: 1000 },
        { name: "Naples", population: 500 },
        { name: "Rome", population: 2000 }
    ];
    it('dovrebbe ordinare le città in modo CRESCENTE basandosi sulla popolazione', () => {
        const result = (0, sortManager_1.sortCitiesByPopulation)(mockCities, sortManager_1.SortDirection.ASC);
        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('Naples');
        expect(result[1].name).toBe('Milan');
        expect(result[2].name).toBe('Rome');
    });
    it('dovrebbe ordinare le città in modo DECRESCENTE basandosi sulla popolazione', () => {
        const result = (0, sortManager_1.sortCitiesByPopulation)(mockCities, sortManager_1.SortDirection.DESC);
        expect(result).toHaveLength(3);
        expect(result[0].name).toBe('Rome');
        expect(result[1].name).toBe('Milan');
        expect(result[2].name).toBe('Naples');
    });
});
