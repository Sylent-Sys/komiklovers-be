import request from "supertest";
import main from "../server.js";
describe("Test the auth path", () => {
    test("Login", async () => {
        return request(await main()).post("/auth/login").send({
            key: "Renka",
            password: "test",
        }).expect(200);
    });
    test("Profile", async () => {
        const loginJwt = request(await main()).post("/auth/login").send({
            key: "Renka",
            password: "test",
        }).expect(200);
        const res = await loginJwt;
        return await request(await main()).post("/auth/profile").set("Authorization", `Bearer ${res.body.token}`).expect(200);
    });
    test("Register", async () => {
        return request(await main()).post("/auth/register").send({
            email: "supertest",
            password: "supertest",
            name: "supertest",
            address: "supertest",
        }).expect(200);
    });
});