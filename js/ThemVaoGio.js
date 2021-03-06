let carts = document.querySelectorAll(".themvaogio");

fetch('../data/products.json')
	.then(async response=>products= await response.json())

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".csw-btn-button span").textContent = productNumbers;
  }
}
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".csw-btn-button span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".csw-btn-button span").textContent = 1;
  }
  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.Hinh] == undefined) {
      cartItems = {
        ...cartItems,
        [product.Hinh]: product,
      };
    }
    cartItems[product.Hinh].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.Hinh]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.Gia);
  } else {
    localStorage.setItem("totalCost", product.Gia);
  }
}

function removeCartItem(itemHinh) {
  let cartItems = Object.values(
    JSON.parse(localStorage.getItem("productsInCart"))
  );

  cartItems.forEach((value, index) => {
    if (value.Hinh === itemHinh) {
      cartItems.splice(index, 1);
      localStorage.setItem("productsInCart", JSON.stringify([...cartItems]));
      displayCart();
    }
  });
}

function updateItemQuantity(element, valueChange) {
  let currentValue = parseInt(element.innerHTML);
  currentValue += valueChange;

  if (currentValue > 0) {
    element.innerHTML = currentValue;

    let cartItems = Object.values(
      JSON.parse(localStorage.getItem("productsInCart"))
    );

    cartItems.forEach((item) => {
      if (item.Hinh === element.id) {
        item.inCart = currentValue;
      }
    });
    localStorage.setItem("productsInCart", JSON.stringify([...cartItems]));
    displayCart();
  }
}

function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  let productContainer = document.querySelector(".products");
  let cartCost = 0;
  // (condition) ? valueIfTrue : valueElse
  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    let countItems = 0;
    Object.values(cartItems).map((item) => {
      let totalCost = item.Gia * item.inCart;
      countItems += item.inCart;
      cartCost += totalCost;
      productContainer.innerHTML += `
            <div class ="product-title">
                <ion-icon name="close-circle" onclick="removeCartItem('${item.Hinh}')">
                </ion-icon>
                <span> ${item.Ten} </span>
            </div>
            <div class ="price">
                <span> ${item.Gia} </span>
            </div>
            <div class = "quantity">
                <ion-icon name="caret-back-circle-outline" onclick="updateItemQuantity(document.getElementById('${item.Hinh}'), -1)"></ion-icon>
                <span id=${item.Hinh}> ${item.inCart} </span>
                <ion-icon name="caret-forward-circle-outline" onclick="updateItemQuantity(document.getElementById('${item.Hinh}'), 1)"></ion-icon>
            </div>
            <div class ="total">
                ${totalCost}
                </div>
            `;
    });
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
      localStorage.setItem("cartNumbers", countItems);
      document.querySelector(".csw-btn-button span").textContent = countItems;
    }
  }
  let infoPayment = document.querySelector(".info--payment");
  let totalCost = cartCost < 600000 ? cartCost + 30000 : cartCost;
  infoPayment.innerHTML = "";
  infoPayment.innerHTML += `
        <h2>C???NG GI??? H??NG</h2>
                    <hr>
                    <div class="payment--row">
                        <label for="">T???M T??NH</label>
                        <output>${cartCost}</output>
                    </div>
                    <hr>
                    <div class="payment--row">
                        <label for="">GIAO H??NG</label>
                        <label for="">${
                          cartCost > 600000 ? "Mi???n ph??" : "T??nh ph??"
                        }</label>
                    </div>
                    <hr>
                    <div class="payment--row">
                        <label for="">T???NG</label>
                        <output>${totalCost}</output>
                    </div>
                    <div class="cart--button">
                       
                        <button id="tienhanhthanhtoan" type="button" onclick="location.href='./checkoutdetails.html'">TI???N H??NH THANH TO??N</button>
                    </div>
        `;
  localStorage.setItem(
    "cost",
    JSON.stringify({
      cart: cartCost,
      total: totalCost,
    })
  );
}

onLoadCartNumbers();
displayCart();
