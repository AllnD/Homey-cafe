/* =========================================================
   HOMEY CAFE
   Main JavaScript
   ========================================================= */


const WHATSAPP_NUMBER = "60129313052";



/* =========================================================
   PRODUCTS
   ========================================================= */

const PRODUCTS = [

  {
    id: "nasi-lemak",
    name: "Nasi Lemak with Malaysian Curry",
    description: "Malaysian chicken curry, omelette egg, stir fry vegetables.",
    price: 30,
    image: "images/spicy.jpg"
  },

  {
    id: "dakgalbi-bento",
    name: "Dakgalbi Bento",
    description: "Korean-style chicken with stir-fried vegetables.",
    price: 20,
    image: "images/dakglbi.png"
  },

  {
    id: "japanese-curry",
    name: "Japanese Curry Bento",
    description: "Main:Japanese curry chicken with potato and carrot. Side: Brocolli, tamagoyaki,mayo tunacorn",
    price: 25,
    image: "images/japanese.png"
  },

  {
    id: "paprika-chicken",
    name: "Hungarian Paprika Chicken",
    description: "Roasted chicken with paprika vegetable spaghetti.",
    price: 22,
    image: "images/paprika.png"
  },

  {
    id: "tuna-corn",
    name: "Tuna Corn Bento",
    description: "Tuna, sweet corn, egg roll and broccoli.",
    price: 21,
    image: "images/tuna.jpeg"
  },

  {
    id: "kimchi-chicken",
    name: "Kimchi Chicken Bento",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "kimchi-chicken-2",
    name: "Kimchi Chicken Bento 2",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "kimchi-chicken-3",
    name: "Kimchi Chicken Bento 3",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "kimchi-chicken-4",
    name: "Kimchi Chicken Bento 4",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "kimchi-chicken-5",
    name: "Kimchi Chicken Bento 5",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "kimchi-chicken-6",
    name: "Kimchi Chicken Bento 6",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "kimchi-chicken-7",
    name: "Kimchi Chicken Bento 7",
    description: "Savory chicken with cooked kimchi and vegetables.",
    price: 20,
    image: "images/kimchi-chicken.png"
  }

];



/* =========================================================
   BUNDLES

   CHANGE BUNDLE PRICES HERE ONLY.
   ========================================================= */

const BUNDLES = [

  {
    id: "bundle-1",
    number: "01",
    name: "Uncle's Choice",
    description: "Three comforting favourites chosen for a satisfying home-style meal.",
    meals: [
      "nasi-lemak",
      "dakgalbi-bento",
      "japanese-curry"
    ],
    price: 40
  },

  {
    id: "bundle-2",
    number: "02",
    name: "Korean Favourites",
    description: "A selection of Korean-inspired meals with plenty of flavour.",
    meals: [
      "dakgalbi-bento",
      "kimchi-chicken",
      "nasi-lemak"
    ],
    price: 60
  },

  {
    id: "bundle-3",
    number: "03",
    name: "Comfort Food",
    description: "Classic comfort meals for those days when you want something hearty.",
    meals: [
      "japanese-curry",
      "paprika-chicken",
      "nasi-lemak"
    ],
    price: 60
  },

  {
    id: "bundle-4",
    number: "04",
    name: "Chicken Lovers",
    description: "Three chicken-based favourites packed into one convenient bundle.",
    meals: [
      "nasi-lemak",
      "paprika-chicken",
      "kimchi-chicken"
    ],
    price: 60
  },

  {
    id: "bundle-5",
    number: "05",
    name: "Mixed Favourites",
    description: "A little bit of everything for those who like variety.",
    meals: [
      "tuna-corn",
      "japanese-curry",
      "dakgalbi-bento"
    ],
    price: 60
  },

  {
    id: "bundle-6",
    number: "06",
    name: "Homey Selection",
    description: "A selection of Homey Cafe favourites for your freezer.",
    meals: [
      "tuna-corn",
      "kimchi-chicken",
      "paprika-chicken"
    ],
    price: 60
  }

];



/* =========================================================
   CART STORAGE
   ========================================================= */

function getCart() {

  try {

    const saved =
      localStorage.getItem("homeyCart");

    if (!saved) {
      return {};
    }

    const cart =
      JSON.parse(saved);

    if (
      !cart ||
      typeof cart !== "object" ||
      Array.isArray(cart)
    ) {

      return {};

    }

    return cart;

  }

  catch (error) {

    console.error(
      "Could not read cart:",
      error
    );

    return {};

  }

}



function saveCart(cart) {

  localStorage.setItem(
    "homeyCart",
    JSON.stringify(cart)
  );

  updateCount();

}



function money(number) {

  return `RM${Number(number).toFixed(2)}`;

}



/* =========================================================
   CART COUNT
   ========================================================= */

function updateCount() {

  const element =
    document.getElementById(
      "cart-count"
    );


  if (!element) {
    return;
  }


  const cart =
    getCart();


  const count =
    Object.values(cart).reduce(
      (total, quantity) => {

        return total +
          (Number(quantity) || 0);

      },
      0
    );


  element.textContent =
    count;

}



/* =========================================================
   ADD INDIVIDUAL PRODUCT
   ========================================================= */

function addToCart(id) {

  const product =
    PRODUCTS.find(
      product =>
        product.id === id
    );


  if (!product) {

    console.error(
      "Product not found:",
      id
    );

    return;

  }


  const cart =
    getCart();


  cart[id] =
    (Number(cart[id]) || 0) + 1;


  saveCart(cart);


  alert(
    `${product.name} added to cart.`
  );

}



/* =========================================================
   ADD BUNDLE TO CART
   ========================================================= */

function addBundleToCart(id) {

  const bundle =
    BUNDLES.find(
      bundle =>
        bundle.id === id
    );


  if (!bundle) {

    console.error(
      "Bundle not found:",
      id
    );

    return;

  }


  const cart =
    getCart();


  const cartId =
    `bundle:${bundle.id}`;


  cart[cartId] =
    (Number(cart[cartId]) || 0) + 1;


  saveCart(cart);


  alert(
    `${bundle.name} bundle added to cart.`
  );

}



/* =========================================================
   IDENTIFY CART ITEM
   ========================================================= */

function getCartItem(id) {


  /* -------------------------------------------------------
     BUNDLE
     ------------------------------------------------------- */

  if (
    id.startsWith("bundle:")
  ) {

    const bundleId =
      id.substring(
        "bundle:".length
      );


    const bundle =
      BUNDLES.find(
        bundle =>
          bundle.id === bundleId
      );


    if (!bundle) {

      return null;

    }


    return {

      type: "bundle",

      id: id,

      name: bundle.name,

      price: Number(bundle.price),

      bundle: bundle

    };

  }



  /* -------------------------------------------------------
     INDIVIDUAL PRODUCT
     ------------------------------------------------------- */

  const product =
    PRODUCTS.find(
      product =>
        product.id === id
    );


  if (!product) {

    return null;

  }


  return {

    type: "product",

    id: id,

    name: product.name,

    price: Number(product.price),

    product: product

  };

}



/* =========================================================
   CALCULATE FOOD SUBTOTAL
   ========================================================= */

function calculateSubtotal() {

  const cart =
    getCart();


  let subtotal = 0;


  Object.keys(cart).forEach(
    id => {

      const item =
        getCartItem(id);


      if (!item) {
        return;
      }


      const quantity =
        Number(cart[id]) || 0;


      subtotal +=
        item.price * quantity;

    }
  );


  return subtotal;

}



/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQty(
  id,
  difference
) {

  const cart =
    getCart();


  const current =
    Number(cart[id]) || 0;


  const newQuantity =
    current + difference;


  if (
    newQuantity <= 0
  ) {

    delete cart[id];

  }

  else {

    cart[id] =
      newQuantity;

  }


  saveCart(cart);


  renderCheckout();

}



/* =========================================================
   REMOVE ITEM
   ========================================================= */

function removeItem(id) {

  const cart =
    getCart();


  delete cart[id];


  saveCart(cart);


  renderCheckout();

}



/* =========================================================
   RENDER MENU
   ========================================================= */

function renderMenu() {

  const grid =
    document.getElementById(
      "menu-grid"
    );


  if (!grid) {
    return;
  }


  grid.innerHTML =
    PRODUCTS.map(
      product => `

        <article class="menu-card">

          <img
            src="${product.image}"
            alt="${product.name}"
            class="menu-image"
          >

          <div class="menu-info">

            <h3>
              ${product.name}
            </h3>

            <p>
              ${product.description}
            </p>

            <div class="price">
              ${money(product.price)}
            </div>

            <button
              class="add-btn"
              onclick="addToCart('${product.id}')"
            >
              ADD TO CART
            </button>

          </div>

        </article>

      `
    ).join("");

}



/* =========================================================
   RENDER DYNAMIC BUNDLES
   ========================================================= */

function renderBundles() {

  const grid =
    document.getElementById(
      "bundle-grid"
    );


  if (!grid) {
    return;
  }


  grid.innerHTML =
    BUNDLES.map(
      bundle => {


        const meals =
          bundle.meals
            .map(
              id =>
                PRODUCTS.find(
                  product =>
                    product.id === id
                )
            )
            .filter(Boolean);


        return `

          <article class="bundle-card">

            <div class="bundle-header">

              <div>

                <p class="bundle-number">
                  BUNDLE ${bundle.number}
                </p>

                <h2>
                  ${bundle.name}
                </h2>

              </div>


              <div class="bundle-price">
                ${money(bundle.price)}
              </div>

            </div>


            <p class="bundle-description">
              ${bundle.description}
            </p>


            <div class="bundle-meals">

              ${meals.map(
                meal => `

                  <div class="bundle-meal">

                    <div
                      class="bundle-image"
                      style="
                        background-image:
                        url('${meal.image}');
                      "
                      aria-label="${meal.name}"
                    >
                    </div>

                    <h3>
                      ${meal.name}
                    </h3>

                  </div>

                `
              ).join("")}

            </div>


            <div class="bundle-footer">

              <span>
                3 meal sets · ${money(bundle.price)}
              </span>


              <button
                class="add-btn"
                onclick="addBundleToCart('${bundle.id}')"
              >
                ADD BUNDLE
              </button>

            </div>

          </article>

        `;

      }
    ).join("");

}



/* =========================================================
   RENDER CHECKOUT
   ========================================================= */

function renderCheckout() {

  const wrapper =
    document.getElementById(
      "checkout-items"
    );


  const subtotalElement =
    document.getElementById(
      "checkout-subtotal"
    );


  const totalElement =
    document.getElementById(
      "checkout-total"
    );


  /*
     If this is not the checkout page,
     there is nothing to render.
  */

  if (
    !wrapper ||
    !subtotalElement ||
    !totalElement
  ) {

    return;

  }


  const cart =
    getCart();


  const ids =
    Object.keys(cart);



  /* =======================================================
     EMPTY CART
     ======================================================= */

  if (!ids.length) {

    wrapper.innerHTML = `

      <div class="empty">

        <p>
          Your cart is empty.
        </p>

        <a
          class="primary-btn"
          href="index.html"
        >
          Browse the menu
        </a>

      </div>

    `;


    subtotalElement.textContent =
      money(0);


    totalElement.textContent =
      "RM0.00 + delivery";


    return;

  }



  let subtotal = 0;


  const html =
    ids.map(
      id => {


        const item =
          getCartItem(id);


        if (!item) {

          return "";

        }


        const quantity =
          Number(cart[id]) || 0;


        const lineTotal =
          item.price * quantity;


        subtotal +=
          lineTotal;



        /* =================================================
           BUNDLE ITEM
           ================================================= */

        if (
          item.type === "bundle"
        ) {


          const meals =
            item.bundle.meals
              .map(
                mealId =>
                  PRODUCTS.find(
                    product =>
                      product.id === mealId
                  )
              )
              .filter(Boolean);


          return `

            <div class="order-row">

              <div>

                <div class="order-name">
                  ${item.name} Bundle
                </div>

                <small>
                  ${money(item.price)} each
                </small>


                <div
                  style="
                    margin-top:8px;
                    font-size:13px;
                    opacity:0.7;
                    line-height:1.5;
                  "
                >

                  ${meals.map(
                    meal => `

                      <div>
                        • ${meal.name}
                      </div>

                    `
                  ).join("")}

                </div>

              </div>


              <div class="qty">

                <button
                  type="button"
                  onclick="changeQty('${id}', -1)"
                >
                  −
                </button>


                <b>
                  ${quantity}
                </b>


                <button
                  type="button"
                  onclick="changeQty('${id}', 1)"
                >
                  +
                </button>

              </div>


              <div>

                <div class="order-price">
                  ${money(lineTotal)}
                </div>


                <button
                  type="button"
                  class="remove"
                  onclick="removeItem('${id}')"
                >
                  remove
                </button>

              </div>

            </div>

          `;

        }



        /* =================================================
           INDIVIDUAL PRODUCT
           ================================================= */

        return `

          <div class="order-row">

            <div>

              <div class="order-name">
                ${item.name}
              </div>

              <small>
                ${money(item.price)} each
              </small>

            </div>


            <div class="qty">

              <button
                type="button"
                onclick="changeQty('${id}', -1)"
              >
                −
              </button>


              <b>
                ${quantity}
              </b>


              <button
                type="button"
                onclick="changeQty('${id}', 1)"
              >
                +
              </button>

            </div>


            <div>

              <div class="order-price">
                ${money(lineTotal)}
              </div>


              <button
                type="button"
                class="remove"
                onclick="removeItem('${id}')"
              >
                remove
              </button>

            </div>

          </div>

        `;

      }
    ).join("");


  wrapper.innerHTML =
    html;



  /* =======================================================
     UPDATE ORDER TOTAL
     ======================================================= */

  subtotalElement.textContent =
    money(subtotal);


  totalElement.textContent =
    `${money(subtotal)} + delivery`;

}



/* =========================================================
   CREATE WHATSAPP ORDER MESSAGE
   ========================================================= */

function message() {

  const cart =
    getCart();


  const ids =
    Object.keys(cart);


  if (!ids.length) {

    return "";

  }


  let subtotal = 0;


  const lines = [];


  ids.forEach(
    id => {


      const item =
        getCartItem(id);


      if (!item) {
        return;
      }


      const quantity =
        Number(cart[id]) || 0;


      const lineTotal =
        item.price * quantity;


      subtotal +=
        lineTotal;



      /* =================================================
         BUNDLE
         ================================================= */

      if (
        item.type === "bundle"
      ) {


        lines.push(
          `- ${item.name} Bundle x ${quantity} = ${money(lineTotal)}`
        );


        const meals =
          item.bundle.meals
            .map(
              mealId =>
                PRODUCTS.find(
                  product =>
                    product.id === mealId
                )
            )
            .filter(Boolean);


        meals.forEach(
          meal => {

            lines.push(
              `  • ${meal.name}`
            );

          }
        );

      }



      /* =================================================
         INDIVIDUAL PRODUCT
         ================================================= */

      else {

        lines.push(
          `- ${item.name} x ${quantity} = ${money(lineTotal)}`
        );

      }

    }
  );



  /* =======================================================
     CUSTOMER DETAILS
     ======================================================= */

  const value =
    id => {

      const element =
        document.getElementById(id);


      if (!element) {
        return "";
      }


      return element.value.trim();

    };



  /* =======================================================
     FINAL WHATSAPP MESSAGE
     ======================================================= */

  return [

    "HOMEY CAFE ORDER",

    "",

    ...lines,

    "",

    `FOOD SUBTOTAL: ${money(subtotal)}`,

    "DELIVERY: TO BE CONFIRMED",

    `TOTAL: ${money(subtotal)} + delivery`,

    "",

    `Name: ${value("customer-name")}`,

    `Phone: ${value("customer-phone")}`,

    `Delivery address: ${value("customer-address")}`,

    `Notes: ${value("customer-notes") || "-"}`,

    "",

    "Please confirm the delivery fee and final total before payment."

  ].join("\n");

}



/* =========================================================
   VALIDATE ORDER
   ========================================================= */

function valid() {

  const form =
    document.getElementById(
      "order-form"
    );


  if (
    form &&
    !form.reportValidity()
  ) {

    return false;

  }


  const cart =
    getCart();


  if (
    !Object.keys(cart).length
  ) {

    status(
      "Your cart is empty."
    );


    return false;

  }


  return true;

}



/* =========================================================
   CHECKOUT STATUS
   ========================================================= */

function status(messageText) {

  const element =
    document.getElementById(
      "checkout-status"
    );


  if (element) {

    element.textContent =
      messageText;

  }

}



/* =========================================================
   CREATE WHATSAPP ORDER
   ========================================================= */

function createOrder() {

  if (!valid()) {
    return;
  }


  const orderMessage =
    message();


  if (!orderMessage) {

    status(
      "Unable to create the order."
    );

    return;

  }


  if (WHATSAPP_NUMBER) {

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`,
      "_blank"
    );


    status(
      "Opening WhatsApp with your order."
    );

  }

  else {

    status(
      orderMessage
    );

  }

}



/* =========================================================
   COPY ORDER DETAILS
   ========================================================= */

async function copyOrder() {

  if (!valid()) {
    return;
  }


  const orderMessage =
    message();


  try {

    await navigator.clipboard.writeText(
      orderMessage
    );


    status(
      "Order details copied. Paste them into WhatsApp."
    );

  }

  catch {

    status(
      orderMessage
    );

  }

}



/* =========================================================
   PAGE INITIALISATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateCount();

    renderMenu();

    renderBundles();

    renderCheckout();


    document
      .getElementById("send-order")
      ?.addEventListener(
        "click",
        createOrder
      );


    document
      .getElementById("copy-order")
      ?.addEventListener(
        "click",
        copyOrder
      );

  }
);
