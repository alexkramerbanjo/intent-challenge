const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  contents: { type: Sequelize.STRING, unique: false, allowNull: true },
  sessionId: { type: Sequelize.STRING, unique: false, allowNull: false }
});

module.exports = Cart;
