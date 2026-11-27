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
    name: "Nasi Lemak with Curry Chicken",
    description: "Malaysia's number 1 dish.Nasi lemak served with chicken curry and Acar. Prepare fresh cucumber and boiled eggs to have a full nasi lemak experience at home",
    reheat: "Steam or Microwave",
    price: 19.50, 
    image: "images/nasi.png"
  },

  {
    id: "dakgalbi-bento",
    name: "Dakgalbi Bento",
    description: "Korean-style chicken with stir fry kimchi and fishcake.",
    reheat: "Steam or Microwave",
    price: 20,
    image: "images/dakglbi.png"
  },

  {
    id: "japanese-curry",
    name: "Japanese Curry Bento",
    description: "Japanese inspired easy to eat dish. Japanese curry chicken with potato and carrot. Served with tamagoyaki and mayo tunacorn",
    reheat: "Steam or Microwave",
    price: 18.80,
    image: "images/japanese.png"
  },

  {
    id: "paprika-chicken",
    name: "Paprikash Pasta with Chicken",
    description: "Hungarian inspired Paprikash cream penne pasta served with steamed chicken for protein.",
    reheat: "Steam or Microwave",
    price: 22,
    image: "images/paprika.png"
  },

  {
    id: "rosemary-pasta",
    name: "Rosemary Mushroom Chicken Pasta",
    description: "Chef's favourite: Spaghetti in rosemary mushroom chicken cream sauce.",
    reheat: "Steam recommended. Microwave for convenience.",
    price: 20,
    image: "images/Steamed.jpg"
  },

  {
    id: "Soy-chicken",
    name: "Soy Chicken Bento",
    description: "Savory chicken with cooked kimchi and vegetables.",
    reheat: "Steam recommended. Microwave for convenience",
    price: 20,
    image: "images/soy.png"
  },

  {
    id: "variety-box",
    name: "Variety Party Bento",
    description: "Feeling bored? Then try our variety party box. A platter of tomato rice, chicken potato salad, mee goreng basah, roast chicken with mushroom sauce.",
    reheat: "Microwave and air fry/oven recommended",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "Mee-Goreng",
    name: "Mee Goreng Basah",
    description: "Classic Malaysian party food. Malay style stir fry noodles. Cooked with shrimp, veges and chicken",
    reheat: "Microwave recommended for best texture and taste. Steam is also an option but will lose some texture. Yuo can also stir fry to reheat. ",
    price: 20,
    image: "images/spicy.jpg"
  },

  {
    id: "taco-beef",
    name: "Taco Beef Tomato Rice",
    description: "Mexican inspired beef served with Indian style tomato rice. Only order if you love tomatoes",
    reheat: "Microwave Box A and airfry Box B contents",
    price: 20,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "Teriyaki-chicken",
    name: "Teriyaki Chicken bento",
    description: "International favourite: Savory teriyaki chicken with stir fry vegetables.",
    reheat: "Steam recommended. Microwave for convenience",
    price: 18.8,
    image: "images/teriyaki.png"
  },

  {
    id: "herb-chicken",
    name: "Mediteranean Roasted Herb Chicken",
    description: "Savory chicken with mediteranean herbs and spices.",
    reheat: "This meal requires both Microwave and air fryer reheat",
    price: 21,
    image: "images/kimchi-chicken.png"
  },

  {
    id: "Dessert",
    name: "Apple pie dessert",
    description: "Available for purchase with any bundle orders.Home baked apple pie served with vanila ice cream.",
    reheat: "Airfryer or Oven to reheat",
    price: 5.8,
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
    name: "International Spicy",
    description: "A selection of international inspired spciy meals with plenty of flavour.",
    meals: [
      "dakgalbi-bento",
      "japanese-curry",
      "paprika-chicken"
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
            loading="lazy"
            decoding="async"
          >

          <div class="menu-info">

            <h3>
              ${product.name}
            </h3>

            <p>
              ${product.description}
            </p>

            <p class="reheat">
              <b>Reheat:</b> ${product.reheat}
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
   DELIVERY DATE SETUP
   ========================================================= */

function setupDeliveryDate() {

  const dateInput =
    document.getElementById(
      "delivery-date"
    );


  if (!dateInput) {
    return;
  }


  /*
     Get today's date from the customer's
     own device.

     Earliest delivery date:
     today's date + 3 days.
  */

  const today =
    new Date();


  const earliestDate =
    new Date(today);


  earliestDate.setDate(
    earliestDate.getDate() + 3
  );


  /*
     Convert to YYYY-MM-DD.
     This is the format required by
     an HTML date input.
  */

  const year =
    earliestDate.getFullYear();


  const month =
    String(
      earliestDate.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      earliestDate.getDate()
    ).padStart(2, "0");


  const minimumDate =
    `${year}-${month}-${day}`;


  /*
     Prevent customers from selecting
     a date earlier than 3 days from today.
  */

  dateInput.min =
    minimumDate;


  /*
     Automatically select the earliest
     available delivery date.
  */

  if (!dateInput.value) {

    dateInput.value =
      minimumDate;

  }

}



/* =========================================================
   FORMAT DELIVERY DATE
   ========================================================= */

function formatDeliveryDate(dateString) {

  if (!dateString) {
    return "";
  }


  /*
     Adding T00:00:00 makes the date
     local rather than UTC, avoiding
     timezone-related date changes.
  */

  const date =
    new Date(
      `${dateString}T00:00:00`
    );


  if (isNaN(date.getTime())) {
    return dateString;
  }


  return date.toLocaleDateString(
    "en-MY",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

}




/* =========================================================
   GOOGLE SHEETS ORDER REGISTER
   ========================================================= */

/*
 * IMPORTANT:
 * Replace this with your deployed Google Apps Script URL.
 */
const ORDER_REGISTER_URL =
  "https://script.google.com/macros/s/AKfycbwj-xPquDYoWF7rkui7A-CULl_vxub3V6Ymj_ia4jA6w0-FvEDOaSHZF-gsLl08sJSc/exec";


/*
 * Holds the current checkout's registration.
 * Both checkout buttons reuse the same number when
 * the customer's order details have not changed.
 */
let pendingOrderRegistration = null;


/* =========================================================
   COLLECT ORDER INFORMATION
   ========================================================= */

function collectOrderData() {

  const cart = getCart();
  const ids = Object.keys(cart);

  let subtotal = 0;
  const lines = [];

  ids.forEach(id => {

    const item = getCartItem(id);

    if (!item) {
      return;
    }

    const quantity = Number(cart[id]) || 0;
    const lineTotal = item.price * quantity;

    subtotal += lineTotal;

    if (item.type === "bundle") {

      lines.push(
        `- ${item.name} Bundle x ${quantity} = ${money(lineTotal)}`
      );

      const meals = item.bundle.meals
        .map(mealId =>
          PRODUCTS.find(product => product.id === mealId)
        )
        .filter(Boolean);

      meals.forEach(meal => {
        lines.push(`  • ${meal.name}`);
      });

    } else {

      lines.push(
        `- ${item.name} x ${quantity} = ${money(lineTotal)}`
      );

    }

  });


  function value(id) {

    const element = document.getElementById(id);

    return element ? element.value.trim() : "";

  }


  const deliveryDateRaw = value("delivery-date");

  return {

    orderDate: new Date().toLocaleDateString(
      "en-MY",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    ),

    customerName: value("customer-name"),
    phone: value("customer-phone"),
    address: value("customer-address"),

    items: lines.join("\n"),
    foodSubtotal: subtotal,

    deliveryDate: formatDeliveryDate(deliveryDateRaw),
    deliveryTime: value("delivery-time"),

    notes: value("customer-notes")

  };

}


/* =========================================================
   GENERATE REQUEST ID
   ========================================================= */

function generateRequestId() {

  if (
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return "FB-" +
    Date.now() + "-" +
    Math.random().toString(36).substring(2, 12);

}


/* =========================================================
   CONTACT GOOGLE SHEETS
   ========================================================= */

/*
 * JSONP is used here because the website is hosted on
 * GitHub Pages and the Apps Script endpoint is on Google.
 *
 * This avoids relying on a cross-origin fetch response.
 */

function callOrderRegister(payload, requestId) {

  return new Promise((resolve, reject) => {

    const callbackName =
      "fbOrderCallback_" +
      Date.now() + "_" +
      Math.floor(Math.random() * 1000000);

    const script = document.createElement("script");

    let finished = false;

    function cleanup() {

      clearTimeout(timeout);

      script.remove();

      delete window[callbackName];

    }


    function finish(error, result) {

      if (finished) {
        return;
      }

      finished = true;

      cleanup();

      if (error) {
        reject(error);
      } else {
        resolve(result);
      }

    }


    window[callbackName] = function(response) {

      if (
        !response ||
        !response.ok ||
        !response.orderNumber
      ) {

        finish(
          new Error(
            response && response.error
              ? response.error
              : "Google Sheets could not register the order."
          )
        );

        return;

      }

      finish(null, response);

    };


    const requestData = {
      ...payload,
      requestId: requestId
    };


    const url =
      ORDER_REGISTER_URL +
      "?callback=" + encodeURIComponent(callbackName) +
      "&data=" + encodeURIComponent(
        JSON.stringify(requestData)
      );


    script.src = url;
    script.async = true;


    script.onerror = function() {

      finish(
        new Error(
          "Unable to connect to the order register."
        )
      );

    };


    const timeout = setTimeout(() => {

      finish(
        new Error(
          "The order register took too long to respond. Please try again."
        )
      );

    }, 20000);


    document.head.appendChild(script);

  });

}


/* =========================================================
   GET OR CREATE ORDER NUMBER
   ========================================================= */

async function getRegisteredOrderNumber(data) {

  const fingerprint = JSON.stringify(data);

  /*
   * If the same checkout details are submitted again,
   * reuse the same request ID and registered number.
   *
   * If the customer changes the cart or form details,
   * a new order registration is created.
   */
  if (
    !pendingOrderRegistration ||
    pendingOrderRegistration.fingerprint !== fingerprint
  ) {

    pendingOrderRegistration = {

      fingerprint: fingerprint,

      requestId: generateRequestId(),

      orderNumber: null,

      promise: null

    };

  }


  const registration = pendingOrderRegistration;


  if (registration.orderNumber) {
    return registration.orderNumber;
  }


  /*
   * Prevent the two checkout buttons from creating
   * simultaneous registrations for the same order.
   */
  if (!registration.promise) {

    registration.promise = callOrderRegister(
      data,
      registration.requestId
    )
    .then(response => {

      registration.orderNumber = response.orderNumber;

      return response.orderNumber;

    })
    .catch(error => {

      /*
       * Keep the same request ID if the customer retries.
       * The server checks that ID before creating another row.
       */
      registration.promise = null;

      throw error;

    });

  }


  return registration.promise;

}


/* =========================================================
   CREATE WHATSAPP ORDER MESSAGE
   ========================================================= */

function message(orderNumber, data) {

  return [

    "FRIDGE BISTRO ORDER",

    `Order number: ${orderNumber}`,

    "",

    data.items,

    "",

    `FOOD SUBTOTAL: ${money(data.foodSubtotal)}`,

    "DELIVERY: TO BE CONFIRMED",

    `TOTAL: ${money(data.foodSubtotal)} + delivery`,

    "",

    `Order date: ${data.orderDate}`,

    `Preferred delivery date: ${data.deliveryDate || "-"}`,

    `Preferred delivery time: ${data.deliveryTime || "-"}`,

    "",

    `Name: ${data.customerName}`,

    `Phone: ${data.phone}`,

    `Delivery address: ${data.address}`,

    `Notes: ${data.notes || "-"}`,

    "",

    "Please confirm the delivery fee and final total before payment."

  ].join("\n");

}


/* =========================================================
   VALIDATE ORDER
   ========================================================= */

function valid() {

  const form = document.getElementById("order-form");

  if (form && !form.reportValidity()) {
    return false;
  }


  const cart = getCart();

  if (!Object.keys(cart).length) {

    status("Your cart is empty.");

    return false;

  }

  return true;

}


/* =========================================================
   CHECKOUT STATUS
   ========================================================= */

function status(messageText) {

  const element = document.getElementById("checkout-status");

  if (element) {
    element.textContent = messageText;
  }

}


/* =========================================================
   COPY TEXT TO CLIPBOARD
   ========================================================= */

async function copyTextToClipboard(text) {

  if (navigator.clipboard && navigator.clipboard.writeText) {

    try {

      await navigator.clipboard.writeText(text);

      return true;

    } catch (error) {

      // Try the fallback below.

    }

  }


  const textarea = document.createElement("textarea");

  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);

  textarea.select();

  let copied = false;

  try {

    copied = document.execCommand("copy");

  } catch (error) {

    copied = false;

  }

  textarea.remove();

  return copied;

}


/* =========================================================
   CREATE WHATSAPP ORDER
   ========================================================= */

async function createOrder() {

  if (!valid()) {
    return;
  }


  if (
    !ORDER_REGISTER_URL ||
    ORDER_REGISTER_URL.includes("PASTE_YOUR_")
  ) {

    status(
      "The Google Sheets order register has not been connected yet."
    );

    return;

  }


  /*
   * Open a blank tab immediately, before waiting for Google.
   * This helps avoid browser popup blocking.
   */
  const whatsappWindow = window.open("about:blank", "_blank");


  try {

    status("Registering your order...");

    const data = collectOrderData();

    const orderNumber =
      await getRegisteredOrderNumber(data);

    const orderMessage =
      message(orderNumber, data);


    if (WHATSAPP_NUMBER) {

      if (whatsappWindow) {

        whatsappWindow.location.href =
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

        status(
          `Order ${orderNumber} registered. Opening WhatsApp.`
        );

      } else {

        const copied =
          await copyTextToClipboard(orderMessage);

        if (copied) {

          status(
            `Order ${orderNumber} registered and copied. Your browser blocked the WhatsApp window. Paste the message into WhatsApp.`
          );

        } else {

          status(
            `Order ${orderNumber} registered. Your browser blocked the WhatsApp window. Please use Copy order details.`
          );

        }

      }

    } else {

      if (whatsappWindow) {
        whatsappWindow.close();
      }

      status(orderMessage);

    }

  }

  catch (error) {

    if (whatsappWindow) {
      whatsappWindow.close();
    }

    console.error("Order registration error:", error);

    status(
      "Your order could not be registered. Please try again. " +
      (error.message || "")
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


  if (
    !ORDER_REGISTER_URL ||
    ORDER_REGISTER_URL.includes("PASTE_YOUR_")
  ) {

    status(
      "The Google Sheets order register has not been connected yet."
    );

    return;

  }


  try {

    status("Registering your order...");

    const data = collectOrderData();

    const orderNumber =
      await getRegisteredOrderNumber(data);

    const orderMessage =
      message(orderNumber, data);


    const copied =
      await copyTextToClipboard(orderMessage);


    if (copied) {

      status(
        `Order ${orderNumber} registered. Order details copied. Paste them into email and send to mr.allan.dou@gmail.com for confirmation.`
      );

    } else {

      status(
        `Order ${orderNumber} registered, but copying failed. Please try again.`
      );

    }

  }

  catch (error) {

    console.error("Order registration error:", error);

    status(
      "Your order could not be registered. Please try again. " +
      (error.message || "")
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

    setupDeliveryDate();


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
