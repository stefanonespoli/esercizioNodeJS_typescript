import * as http from 'http';
import * as dotenv from 'dotenv';
import { getProcessedCities } from './cityLogic';
import { SortDirection } from './sortManager';

dotenv.config();

const PORT = process.env.PORT || 3000;

const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
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

            if (normalizedSort !== SortDirection.ASC && normalizedSort !== SortDirection.DESC) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Valore '%sort' non valido: '${sortParam}'. Accettati solo 'asc' o 'desc' (case-insensitive).` }));
                return;
            }

            const sortedCities = await getProcessedCities(normalizedSort as SortDirection);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(sortedCities, null, 2));
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint non trovato. Usa GET /cities" }));

    } catch (error) {

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