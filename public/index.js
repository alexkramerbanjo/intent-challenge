//handleSubmit is actually an onclick action, rather than an a true submit
// event, to prevent browser submit behavior and make the post we want
// we already have the values from localStorage in the form if we have a
// previous cart, so we can either post a new cart or
// put the new form values to update the current cart

async function handleSubmit(e) {
  let form = document.getElementById("cart-form");
  const apples = form.apple.value;
  const bananas = form.banana.value;
  const cherries = form.cherry.value;
  const durian = form.durian.value;
  let newCart = "";
  if (!newCart) newCart = "";
  const fruit = [["A", apples], ["B", bananas], ["C", cherries], ["D", durian]];
  fruit.forEach(fruit => {
    let number = parseInt(fruit[1]);
    newCart += fruit[0].repeat(number);
  });
  if (!cart) {
    try {
      const data = await sendData("POST", "/api/carts/", { contents: newCart });
      let resp = JSON.stringify(data); // JSON-string from `response.json()` call
      handleResp(resp);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const id = window.localStorage.getItem("cart-id");
      const data = await sendData("PUT", `/api/carts/${id}/`, {
        contents: newCart
      });
      let resp = JSON.stringify(data);
      handleResp(resp);
    } catch (err) {
      console.error(err);
    }
  }
}

async function sendData(method = "POST", url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  let res = await response.json();
  return res; // parses JSON response into native JavaScript objects
}

function handleResp(resp) {
  let respJSON = JSON.parse(resp);
  let { id, sessionId, contents } = respJSON.sessionCart;
  let total = respJSON.total;
  localStorage.setItem("cart-id", id);
  localStorage.setItem("cart", contents);
  localStorage.setItem("session-id", sessionId);
  localStorage.setItem("total", total);
  manipulateDomWithResp(contents, total);
}

function loadStoredData() {
  let contents = localStorage.getItem("cart");
  let total = localStorage.getItem("total");
  if (total == "undefined") total = 0;
  if (contents) {
    manipulateDomWithResp(contents, total);
  } else {
    manipulateDomWithResp("", 0);
  }
}

function manipulateDomWithResp(contents, total) {
  let fruitCounts = contents.split("").reduce(
    (ac, cur) => {
      switch (cur) {
        case "A":
          ac.apple++;
          break;
        case "B":
          ac.banana++;
          break;
        case "C":
          ac.cherry++;
          break;
        case "D":
          ac.durian++;
          break;
        default:
          break;
      }
      return ac;
    },
    { apple: 0, banana: 0, cherry: 0, durian: 0 }
  );
  let fruitNames = Object.keys(fruitCounts);
  fruitNames.forEach(name => {
    let element = document.getElementById(`form-${name}`);
    element.value = `${fruitCounts[name]}`;
    let letter = name[0].toUpperCase();
    let cartCount = document.getElementById(letter);
    cartCount.innerHTML = `${fruitCounts[name]}`;
  });
  let num = total ? parseFloat(total).toFixed(2) : parseFloat(0).toFixed(2);
  document.getElementById(
    "shopping-cart-header"
  ).innerHTML = `Shopping Cart Total: ${num}`;
}

function emptyCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("session-id");
  localStorage.removeItem("cart-id");
  localStorage.removeItem("total");
  loadStoredData();
}

loadStoredData();
