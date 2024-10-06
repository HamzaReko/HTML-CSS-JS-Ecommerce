window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    headerElement.classList.add("scroll-down");
  } else {
    headerElement.classList.remove("scroll-down");
  }
});
// =============================================================================
// vars
// =============================================================================
const addtocardbtn = document.querySelectorAll(".add-to-cart");
const cartContainer = document.querySelector(".cartParent");
const cartbtn = document.querySelectorAll(".cart")[0];
const main = document.querySelector("body");
const cart = document.querySelectorAll(".cart")[1];
const price = document.querySelectorAll(".price");
const totalCont = document.getElementById("total");
// =============================================================================
// functions
// =============================================================================
const changeBuyToDone = (item, index) => {
  item.setAttribute("disabled", "");
  item.classList.add("btnsuccess");
  item.classList.add(`suc${index}`);
  item.innerHTML = "&#10004; Done";
};
const changeDoneToBuy = (item, index) => {
  item.removeAttribute("disabled");
  item.innerHTML = `<i class="fa-solid fa-cart-plus"></i>Add To Cart`;
  item.classList.remove("btnsuccess");
  item.classList.remove(`suc${index}`);
};
const showPopup = () => {
  const body = document.querySelector("body");
  if (document.querySelector(".popup")) {
    document.querySelector(".popup").remove();
  }
  const popup = document.createElement("div");
  popup.innerText = "Congratulation 😍";
  popup.classList.add("popup");
  body.append(popup);
};
const inOutCart = () => {
  let height = cartContainer.scrollHeight;
  if (headerElement.classList.contains("cartbac")) {
    cartContainer.classList.toggle("dunset");
  }
  if (cartContainer.className == "cartParent out dunset") {
    cartContainer.classList.remove("dunset");
  }
  if (document.body.style.overflow == "hidden") {
    document.body.style.overflow = "unset";
  } else {
    document.body.style.overflow = "hidden";
  }
  if (document.body.style.height == height) {
    document.body.style.height = "unset";
  } else {
    document.body.style.height = height;
  }
  cartContainer.classList.toggle("out");
  headerElement.classList.toggle("cartbac");
  headerElement.classList.toggle("opacity1");
  cartContainer.classList.toggle("dunset");
};
const AddToCart = (item, index) => {
  let homeProduct = {
    id: `product${index}`,
    price: item.previousElementSibling.innerText,
    title: item.parentElement.parentElement.querySelector(".title").innerText,
    img: item.parentElement.parentElement.parentElement.querySelector("img")
      .src,
    amount: 1,
  };

  cart.innerHTML += `<article id="${homeProduct.id}" class="product flex">
      <button class="delete">
        <i class="fa-solid fa-trash-can"></i>
      </button>

      <p class="cartPrice">${homeProduct.price}</p>

      <div class="flex" style="margin-right: 1rem">
        <button class="decrease">-</button>
        <div class="quantity flex">${homeProduct.amount}</div>
        <button class="increase">+</button>
      </div>

      <p class="title">${homeProduct.title}</p>

      <img
        style="border-radius: 0.22rem"
        width="70"
        height="70"
        alt=""
        src="${homeProduct.img}"
      />
    </article>`;
};

const displayCart = (cartD, emptyD) => {
  const empty = cartContainer.querySelector("h1");
  const cartSmallParent = document.querySelector(".cartSmallParent");
  cartSmallParent.setAttribute("style", `display: ${cartD};`);
  empty.style.display = `${emptyD}`;
};
const checkCart = () => {
  if (cart.innerHTML == "") {
    displayCart("none", "block");
  } else {
    displayCart("block", "none");
  }
};

// =============================================================================
//        change buy to done and show popup when press
// =============================================================================
addtocardbtn.forEach((item, index) => {
  item.addEventListener("click", () => {
    changeBuyToDone(item, index);
    showPopup();
    AddToCart(item, index);
    totalPriceF();

  });
});

cartContainer.addEventListener("click", (eo) => {
  if (eo.target.classList.contains("increase")) {
    eo.target.previousElementSibling.innerText =
      parseInt(eo.target.previousElementSibling.innerText) + 1;
    let totalss =
      parseInt(
        eo.target.parentElement.previousElementSibling.innerText.replace(
          "$",
          ""
        )
      ) * parseInt(eo.target.previousElementSibling.innerText);
  }
  if (eo.target.classList.contains("decrease")) {
    if (parseInt(eo.target.nextElementSibling.innerText) > 0) {
      eo.target.nextElementSibling.innerText =
        parseInt(eo.target.nextElementSibling.innerText) - 1;
    }
    if (parseInt(eo.target.nextElementSibling.innerText) == 0) {
      let x = Number(
        eo.target.parentElement.parentElement.id.replace("product", "")
      );
  
      let item = document.querySelector(`.suc${x}`);
      changeDoneToBuy(item, x);
      totalPriceF();
      eo.target.parentElement.parentElement.remove();
    }
  }

  if (eo.target.classList.contains("delete")) {
    let x = Number(eo.target.parentElement.id.replace("product", ""));
    let item = document.querySelector(`.suc${x}`);
    changeDoneToBuy(item, x);
    totalPriceF();
    eo.target.parentElement.remove();
  } else if (eo.target.classList.contains("fa-trash-can")) {
    let x = Number(
      eo.target.parentElement.parentElement.id.replace("product", "")
    );

    let item = document.querySelector(`.suc${x}`);
    changeDoneToBuy(item, x);
    totalPriceF();
    eo.target.parentElement.parentElement.remove();
  }
  if (eo.target.classList.contains("clear")) {
    cart.innerHTML = "";
    addtocardbtn.forEach((item) => {
      changeDoneToBuy(item);
    });
  }

  totalPriceF();
  checkCart();
  
});

// =============================================================================
// cart animation when press on cart and Empty
// =============================================================================
cartbtn.addEventListener("click", () => {
  inOutCart();
  checkCart();
  
});
// =============================================================================
//    Total Pice Calculation
// get all products
// let total =0
// for Each item
// const price=Number( item....
// const quantity=Number( item....
// total = total القديم + (price*quantity)
// total = total.toFixed(2)
// document.getElementById("--").innerText=` $ ${ total } `
// =============================================================================
const totalPriceF = () => {
  const allProd = document.querySelectorAll("article.product");
  let total = 0;
  let totalqua = 0;
  if (cart.innerText == "") {
    document.getElementById("amountProd").style.visibility = "hidden";
    total = "$0.00";
    totalCont.innerText = `${total}`;
    document.getElementById("2ndTotal").innerText = `${total}`;
  }
  allProd.forEach((item) => {
    let price = Number(
      item.querySelector(".cartPrice").innerText.replace("$", "")
    );
    let qua = Number(item.querySelector(".quantity").innerText);
    total = total + price * qua;
    total = Number(total.toFixed(2));
    totalqua = totalqua + qua;
    totalCont.innerText = `$${total}`;
    document.getElementById("2ndTotal").innerText = `$${total}`;
    document.getElementById("amountProd").innerText = totalqua;
    document.getElementById("amountProd").style.visibility = "visible";
  });
};
