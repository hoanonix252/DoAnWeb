const cartCost = document.getElementById("cartCost");
const totalCost = document.getElementById("totalCost");

function init() {
  let cost = JSON.parse(localStorage.getItem("cost"));
  cartCost.innerHTML = cost.cart + " VND";
  totalCost.innerHTML = cost.total + " VND";
}

init();
