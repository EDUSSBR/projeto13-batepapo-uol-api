import express from "express";
import cors from "cors";
import participantsRouter from './participantRouter.js';
import messagesRouter from './messageRouter.js';
import status from './statusRouter.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(participantsRouter);
app.use(messagesRouter);
app.use(status);

export default app