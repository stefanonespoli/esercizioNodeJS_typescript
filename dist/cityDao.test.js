"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const cityDao_1 = require("./cityDao");
const fs = __importStar(require("fs/promises"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
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
        }
        catch (err) { }
    });
    it('dovrebbe leggere correttamente tutte le città tramite aiuto del file ENV', async () => {
        const cities = await (0, cityDao_1.readCitiesFromFile)();
        expect(cities).toHaveLength(2);
        expect(cities[0].name).toBe('Test Milan');
        expect(cities[1].population).toBe(200);
    });
    // nuovo
    it('dovrebbe lanciare un errore se il file JSON non esiste sul disco', async () => {
        try {
            await fs.unlink(testFilePath);
        }
        catch (err) { }
        await expect((0, cityDao_1.readCitiesFromFile)()).rejects.toThrow();
    });
});
