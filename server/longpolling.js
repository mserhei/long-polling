import express from "express";
import cors from "cors";
import events from "events";
const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express();
app.use(express.json());
app.use(cors());


app.get("/get-messages", (req, res) => {
    emitter.once("newMessage", (message) => {
        res.json(message);
    })
})


app.post("/new-messages", (req, res) => {
    const message = req.body;
    emitter.emit("newMessage", message);
    res.status(200).send("Message recieved");
})


app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))
