/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const db = require("../db");
const app = require("../index");
const Cart = db.model("cart");

describe("Cart routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("/api/carts/", () => {
    const testCarts = [
      { contents: "AABCAD", sessionId: "asjhsdf98" },
      { contents: "ACCDDDD", sessionId: "123" },
      { contents: "ABCDABAA", sessionId: "123" },
      { contents: "CCCCCCC", sessionId: "123" },
      { contents: "ABCD", sessionId: "123" }
    ];

    beforeEach(() => {
      Cart.bulkCreate(testCarts).then(() => Cart.findAll());
    });

    it("GET /api/carts/:id", async () => {
      const res3 = await request(app)
        .get("/api/carts/3")
        .expect(200);

      expect(res3.body).to.be.an("object");
      expect(res3.body.total).to.be.equal(32.4);
      const res4 = await request(app)
        .get("/api/carts/4")
        .expect(200);

      expect(res4.body).to.be.an("object");
      expect(res4.body.total).to.be.equal(7.25);
      const res5 = await request(app)
        .get("/api/carts/5")
        .expect(200);

      expect(res5.body).to.be.an("object");
      expect(res5.body.total).to.be.equal(15.4);
    });
    it("POST /api/carts", async () => {
      const newCart = await request(app)
        .post("/api/carts/")
        .send({ contents: "AAABBB", sessionId: "goofball" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(newCart.body.sessionCart.contents).to.be.equal("AAABBB");
      it("PUT /api/carts/:id", async () => {
        const newCart = await request(app)
          .put("/api/carts/6")
          .send({ contents: "DDDD", sessionId: "newSession" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200);
        expect(newCart.body.sessionCart.contents).to.be.equal("DDDD");
        expect(newCart.body.sessionCart.sessionId).to.be.equal("newSession");
        expect(newCart.body.total).to.be.equal(0.6);
      });
    });
  }); // end describe('/api/carts')
}); // end describe('Cart routes')
