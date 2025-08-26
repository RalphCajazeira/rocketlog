import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "../app";

describe("SessionsController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it("should authenticate a and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Auth Teste User",
      email: "authtesteuser@example.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post("/sessions").send({
      email: "authtesteuser@example.com",
      password: "password123",
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });

  it("should throw an error if user not found", async () => {
    const response = await request(app).post("/sessions").send({
      email: "user@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should throw an error if user not found", async () => {
    const response = await request(app).post("/sessions").send({
      email: "authtesteuser@example.com",
      password: "passwordError",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should throw an error if user not found", async () => {
    const response = await request(app).post("/sessions").send({
      email: "",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.issues.email._errors).toContain(
      "Invalid email address"
    );
  });

  it("should throw an error if user not found", async () => {
    const response = await request(app).post("/sessions").send({
      email: "authtesteuser@example.com",
      password: "12345",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.issues.password._errors).toContain(
      "Too small: expected string to have >=6 characters"
    );
  });
});
