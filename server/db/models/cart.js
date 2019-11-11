const Sequelize = require("sequelize");
const db = require("../db");

// Storing the cart as string or text is not how I would ordinarily do it.
// Based on the challenge description, I assumed that's how you wanted it.
// I would have stored Integer columns for apples, bananas, cherries, durians.
//
const Cart = db.define("cart", {
  contents: { type: Sequelize.TEXT, unique: false, allowNull: true },
  sessionId: { type: Sequelize.STRING, unique: false, allowNull: false }
});

module.exports = Cart;
