const router = require("express").Router();
const { Cart } = require("../db/models");
const { splitAndHashCart, calculateCartTotal } = require("./utils");
module.exports = router;

// PUT and POST requests contain JSON with a shopping cart string in 'contents' like {contents: 'ABCD' }

router.post("/", async (req, res, next) => {
  try {
    let { contents } = req.body;
    let sessionId = req.sessionID;
    contents = contents
      .toUpperCase()
      .split("")
      .filter(letter => {
        return (
          letter === "A" || letter === "B" || letter === "C" || letter === "D"
        );
      })
      .join("");
    let newCart = Cart.build({
      contents: contents,
      sessionId: sessionId
    });
    sessionCart = await newCart.save();
    let bill = splitAndHashCart(sessionCart.contents);
    let total = calculateCartTotal(bill);
    res.send({ sessionCart, total: total });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const cart = req.body;
    let sessionCart = await Cart.findByPk(req.params.id);
    let updatedCart = await sessionCart.update({
      contents: cart.contents,
      sessionId: cart.sessionId
    });
    let bill = splitAndHashCart(updatedCart.contents);
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
      res.send({ sessionCart, total: total });
    }
  } catch (err) {
    next(err);
  }
});
