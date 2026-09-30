# Homey Cafe — GitHub Pages site

Simple menu + cart + checkout site with no backend.

## Edit these first

1. Open `script.js` and change the `PRODUCTS` array: meal names, descriptions and prices.
2. Set `WHATSAPP_NUMBER` to your WhatsApp number using digits only, e.g. `60123456789`.
3. Put your actual TNG QR image in `images/tng-qr.png`.
4. Open `checkout.html` and replace the placeholder bank details.
5. Replace the CSS food placeholders with your own photos when ready.

## GitHub Pages

Create a repository and upload the contents of this folder. Then GitHub → Settings → Pages → Deploy from a branch → main → `/ (root)`.

The cart uses browser localStorage. Payment is manual: customers pay by TNG QR/bank transfer and send the generated order message to you. No payment gateway or server is required.


## Food photos

Put your menu photos in the `images` folder. The product entries in `script.js` expect:

- `images/spicy-bento.jpg`
- `images/dakgalbi.jpg`
- `images/japanese-curry.jpg`
- `images/paprika-chicken.jpg`
- `images/tuna-corn.jpg`
- `images/kimchi-chicken.jpg`

Change the filenames in `script.js` if you use different names.

Your TNG QR image should be named `images/tng-qr.png`.
