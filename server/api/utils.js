const data = require("./data");

// this function takes a shopping cart string and returns an object
// in the form of {A: 0, B: 0, C; 0, D: 0}
const splitAndHashCart = contents => {
  let bill = contents.split("").reduce((ac, cur) => {
    if (!ac[cur]) {
      ac[cur] = 0;
    }
    ac[cur]++;
    return ac;
  }, {});
  return bill;
};
//This function takes a bill, applies the discounts to the item if possible,
// and returns a final sum.
const calculateCartTotal = bill => {
  let total = data.reduce((ac, cur) => {
    let cost = ac;
    if (!bill[cur.id]) return cost;
    let discountedTotal = cur.volume_discounts[0]
      ? Math.floor(bill[cur.id] / cur.volume_discounts[0].number) *
        cur.volume_discounts[0].price
      : 0;
    let regularPrice = cur.volume_discounts[0]
      ? bill[cur.id] % cur.volume_discounts[0].number
      : bill[cur.id];

    cost += discountedTotal;
    cost += regularPrice * cur.unit_price;
    return cost;
  }, 0);
  return total;
};
module.exports = { splitAndHashCart, calculateCartTotal };
