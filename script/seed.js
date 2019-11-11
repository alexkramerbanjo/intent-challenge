"use strict";

const db = require("../server/db");
const { Cart } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const carts = await Promise.all([
    Cart.create({ contents: "AABCAD", sessionId: "asjhsdf98" }),
    Cart.create({ contents: "ACCDDDD", sessionId: "123" }),
    Cart.create({ contents: "ABCDABAA", sessionId: "123" }),
    Cart.create({ contents: "CCCCCCC", sessionId: "123" }),
    Cart.create({ contents: "ABCD", sessionId: "123" })
  ]);
  console.log(`seeded ${carts.length} carts`);
}
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
//export for testing purposes
module.exports = seed;
