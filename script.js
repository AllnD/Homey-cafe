/* Homey Cafe: edit PRODUCTS and WHATSAPP_NUMBER. Put your QR at assets/tng-qr.png. */
const WHATSAPP_NUMBER="60129313052"; // e.g. "60123456789"
 const PRODUCTS = [
  { id: "spicy-bento", name: "Uncle's Choice Bento", description: "Chicken curry, omelette egg,sambal prawns and vegetables.", price: 30, image: "images/spicy.jpg" },
  { id: "dakgalbi-bento", name: "Dakgalbi Bento", description: "Korean-style chicken with stir-fried vegetables.", price: 20, image: "images/dakgalbi.jpg" },
  { id: "japanese-curry", name: "Japanese Curry Bento", description: "Japanese curry chicken with potato and carrot.", price: 25, image: "images/japanese.png" },
  { id: "paprika-chicken", name: "Hungarian Paprika Chicken", description: "Roasted chicken with paprika vegetable spaghetti.", price: 22, image: "images/paprika-chicken.jpg" },
  { id: "tuna-corn", name: "Tuna Corn Bento", description: "Tuna, sweet corn, egg roll and broccoli.", price: 21, image: "images/tuna.jpeg" },
  { id: "kimchi-chicken", name: "Kimchi Chicken Bento", description: "Savory chicken with cooked kimchi and vegetables.", price: 20, image: "images/kimchi-chicken.png" }

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
function renderCheckout(){const w=document.getElementById("checkout-items"),t=document.getElementById("checkout-total");if(!w||!t)return;const c=getCart(),ids=Object.keys(c);if(!ids.length){w.innerHTML=`<div class="empty"><p>Your cart is empty.</p><a class="primary-btn" href="index.html">Browse the menu</a></div>`;t.textContent=money(0);return}let total=0;w.innerHTML=ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id),q=c[id],line=p.price*q;total+=line;return `<div class="order-row"><div><div class="order-name">${p.name}</div><small>${money(p.price)} each</small></div><div class="qty"><button onclick="changeQty('${id}',-1)">−</button><b>${q}</b><button onclick="changeQty('${id}',1)">+</button></div><div><div class="order-price">${money(line)}</div><button class="remove" onclick="removeItem('${id}')">remove</button></div></div>`}).join("");t.textContent=money(total)}
function message(){const c=getCart(),ids=Object.keys(c);if(!ids.length)return"";let total=0;const lines=ids.map(id=>{const p=PRODUCTS.find(x=>x.id===id),q=c[id];total+=p.price*q;return `- ${p.name} x ${q} = ${money(p.price*q)}`});const v=id=>document.getElementById(id)?.value.trim()||"";return ["HOMEY CAFE ORDER","",...lines,"",`TOTAL: ${money(total)}`,"",`Name: ${v("customer-name")}`,`Phone: ${v("customer-phone")}`,`Delivery address: ${v("customer-address")}`,`Payment reference: ${v("payment-ref")}`,`Notes: ${v("customer-notes")||"-"}`].join("\n")}
function valid(){const f=document.getElementById("order-form");if(f&&!f.reportValidity())return false;if(!Object.keys(getCart()).length){status("Your cart is empty.");return false}return true}
function status(s){const e=document.getElementById("checkout-status");if(e)e.textContent=s}
function createOrder(){if(!valid())return;const m=message();if(WHATSAPP_NUMBER){window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`,"_blank");status("Opening WhatsApp with your order.")}else{status(m)}}
async function copyOrder(){if(!valid())return;const m=message();try{await navigator.clipboard.writeText(m);status("Order details copied. Paste them into WhatsApp.")}catch{status(m)}}
document.addEventListener("DOMContentLoaded",()=>{updateCount();renderMenu();renderCheckout();document.getElementById("send-order")?.addEventListener("click",createOrder);document.getElementById("copy-order")?.addEventListener("click",copyOrder)});
