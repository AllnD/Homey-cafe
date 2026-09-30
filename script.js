/* Homey Cafe: edit PRODUCTS and WHATSAPP_NUMBER. Put your QR at assets/tng-qr.png. */
const WHATSAPP_NUMBER = "60129313052";

const PRODUCTS = [
  {
    id: "spicy-bento",
    name: "Uncle's Choice Bento",
    description: "Chicken curry, omelette egg, sambal prawns and vegetables.",
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
    description: "Main:Japanese curry chicken with potato and carrot.Side: Brocolli, tuna corn",
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
const BUNDLES = [

  {
    id: "bundle-1",
    number: "01",
    name: "Uncle's Choice",
    description: "Three comforting favourites chosen for a satisfying home-style meal.",
    meals: [
      "spicy-bento",
      "dakgalbi-bento",
      "japanese-curry"
    ],
    price: 60
  },

  {
    id: "bundle-2",
    number: "02",
    name: "Korean Favourites",
    description: "A selection of Korean-inspired meals with plenty of flavour.",
    meals: [
      "dakgalbi-bento",
      "kimchi-chicken",
      "spicy-bento"
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
      "spicy-bento"
    ],
    price: 60
  },

  {
    id: "bundle-4",
    number: "04",
    name: "Chicken Lovers",
    description: "Three chicken-based favourites packed into one convenient bundle.",
    meals: [
      "spicy-bento",
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
const getCart=()=>{try{return JSON.parse(localStorage.getItem("homeyCart"))||{}}catch{return{}}};
function saveCart(c){localStorage.setItem("homeyCart",JSON.stringify(c));updateCount()}
function money(n){return `RM${n.toFixed(2)}`}
function updateCount(){const e=document.getElementById("cart-count");if(e)e.textContent=Object.values(getCart()).reduce((a,b)=>a+b,0)}
function addToCart(id){const c=getCart();c[id]=(c[id]||0)+1;saveCart(c);alert(`${PRODUCTS.find(p=>p.id===id).name} added to cart.`)}
function changeQty(id,d){const c=getCart();c[id]=(c[id]||0)+d;if(c[id]<=0)delete c[id];saveCart(c);renderCheckout()}
function removeItem(id){const c=getCart();delete c[id];saveCart(c);renderCheckout()}
function renderMenu() {
  const g = document.getElementById("menu-grid");
  if (!g) return;

  g.innerHTML = PRODUCTS.map(p => `
    <article class="menu-card">
      <img src="${p.image}" alt="${p.name}" class="menu-image">
      <div class="menu-info">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">${money(p.price)}</div>
        <button class="add-btn" onclick="addToCart('${p.id}')">
          ADD TO CART
        </button>
      </div>
    </article>
  `).join("");
}
function renderBundles() {

  const g = document.getElementById("bundle-grid");

  if (!g) return;

  g.innerHTML = BUNDLES.map(bundle => {

    const meals = bundle.meals.map(id =>
      PRODUCTS.find(p => p.id === id)
    ).filter(Boolean);

    return `
      <article class="bundle-card">

        <div class="bundle-header">

          <div>
            <p class="bundle-number">BUNDLE ${bundle.number}</p>
            <h2>${bundle.name}</h2>
          </div>

          <div class="bundle-price">
            RM${bundle.price}
          </div>

        </div>


        <p class="bundle-description">
          ${bundle.description}
        </p>


        <div class="bundle-meals">

          ${meals.map(meal => `
            <div class="bundle-meal">

              <div
                class="bundle-image"
                style="background-image: url('${meal.image}');"
                aria-label="${meal.name}">
              </div>

              <h3>${meal.name}</h3>

            </div>
          `).join("")}

        </div>


        <div class="bundle-footer">

          <span>
            3 meal sets · RM${bundle.price}
          </span>

          <button
            class="add-btn"
            onclick="addBundleToCart('${bundle.id}')">
            ADD BUNDLE
          </button>

        </div>

      </article>
    `;

  }).join("");

}
function renderCheckout(){const w=document.getElementById("checkout-items"),t=document.getElementById("checkout-total");if(!w||!t)return;const c=getCart(),ids=Object.keys(c);if(!ids.length){w.innerHTML=`<div class="empty"><p>Your cart is empty.</p><a class="primary-btn" href="index.html">Browse the menu</a></div>`;t.textContent=money(0);return}let total=0;w.innerHTML=ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id),q=c[id],line=p.price*q;total+=line;return `<div class="order-row"><div><div class="order-name">${p.name}</div><small>${money(p.price)} each</small></div><div class="qty"><button onclick="changeQty('${id}',-1)">−</button><b>${q}</b><button onclick="changeQty('${id}',1)">+</button></div><div><div class="order-price">${money(line)}</div><button class="remove" onclick="removeItem('${id}')">remove</button></div></div>`}).join("");t.textContent=money(total)}
function message(){const c=getCart(),ids=Object.keys(c);if(!ids.length)return"";let total=0;const lines=ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id),q=c[id];total+=p.price*q;return `- ${p.name} x ${q} = ${money(p.price*q)}`});const v=id=>document.getElementById(id)?.value.trim()||"";return ["HOMEY CAFE ORDER","",...lines,"",`TOTAL: ${money(total)}`,"",`Name: ${v("customer-name")}`,`Phone: ${v("customer-phone")}`,`Delivery address: ${v("customer-address")}`,`Payment reference: ${v("payment-ref")}`,`Notes: ${v("customer-notes")||"-"}`].join("\n")}
function valid(){const f=document.getElementById("order-form");if(f&&!f.reportValidity())return false;if(!Object.keys(getCart()).length){status("Your cart is empty.");return false}return true}
function status(s){const e=document.getElementById("checkout-status");if(e)e.textContent=s}
function createOrder(){if(!valid())return;const m=message();if(WHATSAPP_NUMBER){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`,"_blank");status("Opening WhatsApp with your order.")}else{status(m)}}
async function copyOrder(){if(!valid())return;const m=message();try{await navigator.clipboard.writeText(m);status("Order details copied. Paste them into WhatsApp.")}catch{status(m)}}
document.addEventListener("DOMContentLoaded",()=>{updateCount();renderMenu();renderCheckout();document.getElementById("send-order")?.addEventListener("click",createOrder);document.getElementById("copy-order")?.addEventListener("click",copyOrder)});
