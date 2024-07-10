import http from "node:http";
import fs from "node:fs/promises";
import { writeFile } from "node:fs";
import { sendData, sendError } from "./modules/send.js";
import { checkFileExist, createFileIfNotExist } from "./modules/checkFileExist.js";
import { handleComediansRequest } from "./modules/handleComediansRequest.js";
import { handleAddClient } from "./modules/handleAddClient.js";
import { handleClientRequest } from "./modules/handleClientRequest.js";
import { handleUpdateClient } from "./modules/handleUpdateClient.js"

const PORT = 8080;
const COMEDIANS = './comedians.json';
export const CLIENTS = './clients.json';

const startServer = async () => {
    if (!(await checkFileExist(COMEDIANS))) {
        return;
    };

    await createFileIfNotExist(CLIENTS)
    const comediansData = await fs.readFile(COMEDIANS, "utf-8");
    const comedians = JSON.parse(comediansData);

    http
    .createServer(async (req, res) => {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*")
            const segments = req.url.split('/').filter(Boolean)

            if (!segments.length) {
                sendError(res, 404, "Not found")
                return
            }

            const [resource, id] = segments

            if (req.method === "GET" && resource === "comedians") {
                handleComediansRequest(req, res, comedians, segments)
                return;
            }
    
            if (req.method === "POST" && resource === "clients") {
                handleAddClient(req, res)
                return
            }
    
            if (req.method === "GET" && resource === "clients" && id) {
                handleClientRequest(req, res, id)
                return
            }
    
            if (req.method === "PATCH" && resource === "clients" && id) {
                handleUpdateClient(req, res, id)
                return
            }
            
            sendError(res, 404, "Not found")
        } catch (error) {
            sendError(res, 500, `Server is error: ${error}`)
        }
    })
    .listen(PORT, () => console.log(`Server is started on http://localhost/${PORT}`))
}

startServer();