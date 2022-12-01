const {
    describe,
    expect,
    test,
    afterAll,
    beforeAll,
} = require("@jest/globals");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("The ELECTRICITY", () => {
    describe("GET endpoint", () => {
        test("should return 200 status code", (done) => {
            request(app).get("/api/electricity").expect(200, done);
        });
        test("should return valid json", async () => {
            const response = await request(app)
                .get("/api/electricity")
                .set("Accept", "application/json");
            expect(response.statusCode).toEqual(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 2,
                        used: 55.333,
                        cost: 300.12,
                    }),
                ])
            );
        });
    });
    describe("GET BY ID endpoint", () => {
        test("should return 200 status code", (done) => {
            request(app).get("/api/electricity/2").expect(200, done);
        });
        test("should return valid json", async () => {
            const response = await request(app)
                .get("/api/electricity")
                .set("Accept", "application/json");
            expect(response.statusCode).toEqual(200);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 2,
                        used: 55.333,
                        cost: 300.12,
                    }),
                ])
            );
        });
    });

    describe("PUT endpoint", () => {
        let postId;
        beforeAll(async () => {
            const city = {
                used: 55.555,
                cost: 555.55,
            };
            const postResponse = await request(app)
                .post("/api/electricity")
                .set("Accept", "application/json")
                .send(city);
            postId = postResponse.body.id;
        });

        test("should update the invoice with the id", async () => {
            const city = {
                id: postId,
                used: 55.555,
                cost: 555.55,
                month: "2022-11-30",
                created: Date.now(),
            };
            const response = await request(app)
                .put("/api/electricity")
                .set("Accept", "application/json")
                .send(city);
            expect(response.status).toEqual(201);
            expect(response.body.id).toEqual(postId);
            expect(response.body.used).toEqual(55.555);
            expect(response.body.cost).toEqual(555.55);
        });

        test("should not allow no id", async () => {
            const city = {
                used: 55.555,
                cost: 555.55,
                month: "2022-11-30",
                created: Date.now(),
            };
            const response = await request(app)
                .put("/api/electricity")
                .set("Accept", "application/json")
                .send(city);
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('"id" is required');
        });

        afterAll(async () => {
            await request(app)
                .delete(`/api/electricity/${postId}`)
                .set("Accept", "application/json");
            connection.end();
        });
    });

    describe("POST endpoint", () => {
        test("should add an invoice", async () => {
            const electricity = {
                used: 22.123,
                cost: 123.22,
            };
            const response = await request(app)
                .post("/api/electricity")
                .set("Accept", "application/json")
                .send(electricity);
            expect(response.status).toEqual(201);
            expect(response.headers["content-type"]).toMatch(/json/);
            expect(response.body.id).toBeTruthy();
            expect(response.body.used).toEqual(22.123);
            expect(response.body.cost).toEqual(123.22);
        });
        test("should not allow empty cost", async () => {
            const electricity = {
                used: 123.123,
            };
            const response = await request(app)
                .post("/api/electricity")
                .set("Accept", "application/json")
                .send(electricity);
            expect(response.status).toEqual(400);
            expect(response.text).toContain('"cost" is required');
        });
        test("should not allow empty used", async () => {
            const city = {
                cost: 222.11,
            };
            const response = await request(app)
                .post("/api/electricity")
                .set("Accept", "application/json")
                .send(city);
            expect(response.status).toEqual(400);
            expect(response.text).toContain('"used" is required');
        });
    });

    describe("DELETE endpoint", () => {
        test("should delete the invoice by id", async () => {
            const city = {
                used: 55.555,
                cost: 555.55,
            };
            const postResponse = await request(app)
                .post("/api/electricity")
                .set("Accept", "application/json")
                .send(city);
            const postId = postResponse.body.id;
            const response = await request(app)
                .delete(`/api/electricity/${postId}`)
                .set("Accept", "application/json");
            expect(response.status).toEqual(200);
            expect(response.text).toEqual("Invoice deleted");
        });

        test("should check that invoice with id exists", async () => {
            const response = await request(app)
                .delete("/api/electricity/100001")
                .set("Accept", "application/json");

            expect(response.status).toEqual(404);
            expect(response.text).toEqual("Not Found");
        });
    });

    afterAll(async () => {
        connection.end();
    });
});
