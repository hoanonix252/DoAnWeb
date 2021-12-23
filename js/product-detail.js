const quantity = document.getElementById("quantity");

function updateItemQuantity(element, valueChange) {
  let currentValue = parseInt(element.innerHTML);
  currentValue += valueChange;

  if (currentValue > 0) {
    element.innerHTML = currentValue;

    let cartItems = [];

    if (localStorage.getItem("productsInCart")!=null) {
      cartItems = Object.values(JSON.parse(localStorage.getItem("productsInCart")));
    }

    cartItems.forEach((item) => {
      if (item.Hinh === element.id) {
        item.inCart = currentValue;
      }
    });
    localStorage.setItem("productsInCart", JSON.stringify([...cartItems]));
  }
}
