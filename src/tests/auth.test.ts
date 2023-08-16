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
        return await request(await main()).post("/auth/profile").set("Authorization", `Bearer ${res.body.jwt}`).expect(200);
    });
});