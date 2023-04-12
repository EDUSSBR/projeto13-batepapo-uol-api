import express from "express";
import cors from "cors";
import participantsRouter from './participantRouter.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(participantsRouter);

export default app