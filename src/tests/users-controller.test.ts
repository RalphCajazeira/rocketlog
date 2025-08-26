import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "../app";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Teste User",
      email: "testeuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Teste User");

    user_id = response.body.id;
  });

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Teste User",
      email: "testeuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User with same email already exists");
  });

  it("should throw a validation error if email in invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Teste User",
      email: "invalidEmail",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.issues.email._errors).toContain(
      "Invalid email address"
    );
  });

  it("should return validation error if password is too short", async () => {
    const response = await request(app).post("/users").send({
      name: "ShortPass",
      email: "short@pass.com",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.issues.password._errors).toContain(
      "Too small: expected string to have >=6 characters"
    );
  });

  it("should return validation error if name is empty", async () => {
    const response = await request(app).post("/users").send({
      name: "",
      email: "user@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.issues.name._errors).toContain(
      "Too small: expected string to have >=1 characters"
    );
  });
});
