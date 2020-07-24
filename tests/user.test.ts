import mongoose from "mongoose";
import app from "../src/server";
import request from "supertest";

beforeAll(async () => {
  const url = `mongodb://localhost:27017/testing-app`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app).post("/user/register").send({
      name: "Zellanski",
      email: "testing@gmail.com",
      password: "zella",
      role: "basic",
    });

    if (res) {
      expect(res.body.data.name).toBeTruthy();
      expect(res.body.data.email).toBeTruthy();
      expect(res.body.data.role).toBeTruthy();
    }

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual(expect.any(Object));
  });

});
