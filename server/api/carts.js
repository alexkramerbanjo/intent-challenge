const router = require("express").Router();
const { Cart } = require("../db/models");
const { splitAndHashCart, calculateCartTotal } = require("./utils");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { cart } = req.body;
    cart = cart
      .toUpperCase()
      .split("")
      .filter(letter => {
        return (
          letter === "A" || letter === "B" || letter === "C" || letter === "D"
        );
      })
      .join("");

    const sessionId = req.sessionID;
    let newCart = Cart.build({
      contents: cart,
      key: sessionId
    });
    let bill = splitAndHashCart(cart);
    let total = calculateCartTotal(bill);
    sessionCart = await newCart.save();
    res.send({ sessionCart, total: total });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { cart } = req.body;
    let sessionCart = await Cart.findByPk(req.params.id);
    sessionCart = await sessionCart.update({ contents: cart });
    let bill = splitAndHashCart(cart);
    let total = calculateCartTotal(bill);
    res.send({ sessionCart, total: total });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let sessionCart = await Cart.findByPk(req.params.id);
    if (sessionCart) {
      let contents = sessionCart.contents;
      let bill = splitAndHashCart(contents);
      let total = calculateCartTotal(bill);
      console.log("sending: ", total);
      res.send({ sessionCart, total: total });
    }
  } catch (err) {
    next(err);
  }
});
