import express from "express";
import dotenv from "dotenv";

import { MongoConnection } from "./classes/mongo-connection";

import authUser from "./routes/users/auth";
import userCreate from "./routes/users/create";
import userDelete from "./routes/users/delete";
import userGetAll from "./routes/users/get-all";
import userGet from "./routes/users/get-user";
import userUpdate from "./routes/users/put";
import reportGeneration from "./routes/report-generation/get";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const mongoConnection = new MongoConnection();

async function startServer() {
  try {
    await mongoConnection.connect();
    console.log("Conexão com o MongoDB estabelecida com sucesso.");

    app.use(reportGeneration);
    app.use(userCreate);
    app.use(userDelete);
    app.use(userGetAll);
    app.use(userUpdate);
    app.use(authUser);
    app.use(userGet);

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Falha ao conectar com o MongoDB:", error);
    process.exit(1);
  }
}

startServer();
