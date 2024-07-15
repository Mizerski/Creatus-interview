import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

import userRouter from "@/routes/users/create";
import { MongoConnection } from "@/classes/mongo-connection";

config();

const app = express();
app.use(bodyParser.json());
app.use(userRouter);

const mongoConnection = new MongoConnection();

beforeAll(async () => {
  await mongoConnection.connect();
});

afterAll(async () => {
  await mongoConnection.disconnect();
});

describe("POST /users", () => {
  it("should create a new user and return 201 status", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", userData.email);
  }, 30000);
});
