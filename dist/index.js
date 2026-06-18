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
const http = __importStar(require("http"));
const dotenv = __importStar(require("dotenv"));
const cityLogic_1 = require("./cityLogic");
const sortManager_1 = require("./sortManager");
dotenv.config();
const PORT = process.env.PORT || 3000;
const requestHandler = async (req, res) => {
    try {
        const host = req.headers.host || `localhost:${PORT}`;
        const parsedUrl = new URL(req.url || '', `http://${host}`);
        if (req.method === 'GET' && parsedUrl.pathname === '/cities') {
            const sortParam = parsedUrl.searchParams.get('sort');
            if (!sortParam) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Il parametro query 'sort' è obbligatorio. Usa ?sort=asc o ?sort=desc" }));
                return;
            }
            const normalizedSort = sortParam.toLowerCase();
            if (normalizedSort !== sortManager_1.SortDirection.ASC && normalizedSort !== sortManager_1.SortDirection.DESC) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Valore '%sort' non valido: '${sortParam}'. Accettati solo 'asc' o 'desc' (case-insensitive).` }));
                return;
            }
            const sortedCities = await (0, cityLogic_1.getProcessedCities)(normalizedSort);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(sortedCities, null, 2));
            return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint non trovato. Usa GET /cities" }));
    }
    catch (error) {
        console.error("[Global Error] Errore imprevisto nel server:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Internal Server Error - Si è verificato un errore nel server backend." }));
    }
};
const server = http.createServer(requestHandler);
server.listen(PORT, () => {
    console.log(`Server backend in ascolto sulla porta ${PORT}`);
    console.log(`Endpoint disponibile: http://localhost:${PORT}/cities?sort=asc`);
});
