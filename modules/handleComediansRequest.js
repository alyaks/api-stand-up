import { sendData, sendError } from "./send.js";

export const handleComediansRequest = async (req, res, comedians, id) => {
    if (id){
        const comedian = comedians.find(c => c.id === id);
        if (!comedian) {
            sendError(res, 404, "Stand up comedian was not found")
            return;
        }
        sendData(res, comedian);
        return;
    }
    sendData(res, comedians);
}