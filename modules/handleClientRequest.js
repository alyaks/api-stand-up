import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";
import { CLIENTS } from "../index.js";

export const handleClientRequest = async (req, res, ticketNumber) => {
  try {
    const clientData = await fs.readFile(CLIENTS, "utf-8");
    const clients = JSON.parse(clientData);
    const client = clients.find((c) => c.ticketNumber === ticketNumber);

    if (!client) {
      sendError(res, 404, "Not found");
      return;
    }

    sendData(res, client);
  } catch (error) {
    console.log(`error: ${error}`);
    sendError(res, 500, `Server is error: ${error}`);
  }
};
