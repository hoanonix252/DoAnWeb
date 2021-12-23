let carts = document.querySelectorAll(".themvaogio");
// let app = angular.module("angularApp", [])
//         app.controller("ProductController", ($scope, $http) => {
//             $http({
//                 method: "GET",
//                 url: "../data/test.json",
//             }).then(
//                 function success(response) {
//                     $scope.products = response.data;
//                 },
//                 function error(response) {
//                     $scope.error = response.statusText;
//                 });
//         })

let products = [
  {
    Hinh: "SRM_PL1",
    Ten: "Sữa rửa mặt cho da mụn Clear Pore Normalizing Cleanser",
    Gia: 550000,
    inCart: 0,
  },
  {
    Hinh: "MN_LA",
    Ten: "Mặt nạ bùn làm sạch sâu, giảm mụn Effaclar Sebo-Controlling Mask",
    Gia: 595000,
    inCart: 0,
  },
  {
    Hinh: "TDC_LR",
    Ten: "Gel tẩy tế bào chết Ultra Fine Scrub Sensitive Skin 50ml",
    Gia: 359000,
    inCart: 0,
  },
  {
    Hinh: "TDC_PL2",
    Ten: "Tẩy tế bào chết Treatment 10% AHA",
    Gia: 1100000,
    inCart: 0,
  },
  {
    Hinh: "KCN_BI",
    Ten: "Kem chống nắng Bioderma Photoderm SPF 50+",
    Gia: 450000,
    inCart: 0,
  },

  {
    Hinh: "MN_BI",
    HinhFull: "MN_BI+",
    Ten: "Bioderma Sensibio Mask - Mặt Nạ Dưỡng Ẩm Sâu Dành Cho Da Nhạy Cảm",
    Gia: 520000,
    inCart: 0,
  },
  {
    Hinh: "MN_LA",
    HinhFull: "MN_LA+",
    Ten: "Mặt nạ bùn làm sạch sâu, giảm mụn Effaclar Sebo-Controlling Mask",
    Gia: 595000,
    inCart: 0,
  },
  {
    Hinh: "SRM_LR",
    HinhFull: "SRM_LR+",
    Ten: "Gel Rửa Mặt Effaclar Purifying Foaming Gel 400ml",
    Gia: 449000,
    inCart: 0,
  },
  {
    Hinh: "SRM_PL1",
    HinhFull: "SRM_PL1+",
    Ten: "Sữa rửa mặt cho da mụn Clear Pore Normalizing Cleanser",
    Gia: 550000,
    inCart: 0,
  },
  {
    Hinh: "KDA_BI1",
    HinhFull: "KDA_BI1+",
    Ten: "Kem dưỡng giảm mụn chuyên sâu cho da mụn nhẹ đến vừa Bioderma Sébium Global",
    Gia: 390000,
    inCart: 0,
  },
  {
    Hinh: "KDA_BI2",
    HinhFull: "KDA_BI2+",
    Ten: "Kem dưỡng ẩm cho da khô nhạy cảm,da khô và rất khô Bioderma Atoderm Crème",
    Gia: 410000,
    inCart: 0,
  },
  {
    Hinh: "KCN_BI",
    HinhFull: "KCN_BI+",
    Ten: "Kem chống nắng giảm bóng nhờn Bioderma Photoderm MAX Aquafluide SPF 50+",
    Gia: 450000,
    inCart: 0,
  },
  {
    Hinh: "KCN_LA1",
    HinhFull: "KCN_LA1+",
    Ten: "Kem chống nắng cho da dầu, dễ nổi mụn La Roche-Posay Anthelios Anti-Imperfection",
    Gia: 420000,
    inCart: 0,
  },
  {
    Hinh: "TDC_LR",
    HinhFull: "TDC_LR+",
    Ten: "Gel tẩy tế bào chết Ultra Fine Scrub Sensitive Skin 50ml",
    Gia: 359000,
    inCart: 0,
  },
  {
    Hinh: "TDC_PL2",
    HinhFull: "TDC_PL2+",
    Ten: "Tẩy tế bào chết Treatment 10% AHA",
    Gia: 1100000,
    inCart: 0,
  },
  {
    Hinh: "Toner_BI",
    HinhFull: "Toner_BI+",
    Ten: "Dung dịch cân bằng da Bioderma Sebium Lotion",
    Gia: 466000,
    inCart: 0,
  },
  {
    Hinh: "Toner_LR",
    HinhFull: "Toner_LR+",
    Ten: "Nước cân bằng LaRoche Posay Effaclar Astringent",
    Gia: 385000,
    inCart: 0,
  },
];
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

  //   let itemNeedRemoved = cartItems.indexOf(JSON.parse(item));

  //   if(itemNeedRemoved > 0){
  //     cartItems.splice(itemNeedRemoved,1);
  //     localStorage.setItem('productsInCart', JSON.stringify(cartItems));

  //   }

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
        <h2>CỘNG GIỎ HÀNG</h2>
                    <hr>
                    <div class="payment--row">
                        <label for="">TẠM TÍNH</label>
                        <output>${cartCost}</output>
                    </div>
                    <hr>
                    <div class="payment--row">
                        <label for="">GIAO HÀNG</label>
                        <label for="">${
                          cartCost > 600000 ? "Miễn phí" : "Tính phí"
                        }</label>
                    </div>
                    <hr>
                    <div class="payment--row">
                        <label for="">TỔNG</label>
                        <output>${totalCost}</output>
                    </div>
                    <div class="cart--button">
                       
                        <button id="tienhanhthanhtoan" type="button" onclick="location.href='./checkoutdetails.html'">TIẾN HÀNH THANH TOÁN</button>
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
