# KIDSE TOYS — Storefront

A modern, responsive storefront for **KIDSE TOYS** (a DBA of Global Trade Alliance LLC)
selling viral **Squishy Toys** and **Plush Toys**, inspired by the layout of albatuna.com.

## Run it
It's a static site — no build step. Just open `index.html` in a browser, or serve the folder:

```bash
cd kidse-toys
python3 -m http.server 8080
```
Then visit http://localhost:8080

## Pages
- `index.html` — home (hero, category split, best sellers, reviews, FAQ, newsletter)
- `squishy.html` — Squishy Toys collection (price + sort filters)
- `plush.html` — Plush Toys collection (price + sort filters)
- `bundles.html` — bundle deals
- `pages/product.html?id=…` — dynamic product detail page
- `pages/checkout.html` — cart summary + demo checkout
- `pages/about.html`, `pages/contact.html`, `pages/faq.html`
- **Legal (matches Albatuna's Legal column):** `pages/privacy-policy.html`,
  `pages/terms.html`, `pages/subscription-agreement.html`, `pages/refund-policy.html`,
  `pages/shipping-policy.html` (Fulfillment Policy), `pages/business-disclaimer.html`

## Editing products
All products live in **`assets/js/products.js`**. Each entry:
```js
{ id:"sq-hello-duck-glitter", cat:"squishy", name:"…", price:5,
  emoji:"🦆", grad:"lemon", badge:"hot", desc:"…", collection:"…" }
```
- `cat` = `"squishy"`, `"plush"`, or `"bundle"`
- `price` = a number (use your points: 5, 25, 35, 50, 60, 70, 90, 100, 110, 130)
- `badge` = `""`, `"new"`, `"hot"` (Bestseller), `"limited"`, or `"sold"`

### Adding real product photos
Placeholders use an emoji + gradient. To use a real photo, drop it in
`assets/img/` and add an `img` key to that product — the site uses it automatically:
```js
{ id:"sq-hello-duck-glitter", …, img:"assets/img/hello-duck.jpg" }
```

## Header, footer & business info
The nav and the footer (including the **Legal** column and your business details)
are generated in **`assets/js/app.js`** — edit the `BIZ` object at the top to change
address, phone, or email in one place. It updates everywhere.

## Cart
Cart is saved in the browser via `localStorage`. Add-to-cart, quantity, the slide-out
cart drawer, and the checkout summary all work client-side.

## Going live / taking real payments
This is a front-end demo — the checkout does **not** charge cards. To sell for real:
- Easiest: rebuild the catalog on **Shopify**, **Squarespace**, or **BigCommerce**.
- Keep this design + add a processor: **Stripe Checkout**, **Snipcart**, or **PayPal**
  buttons wired to the "Add to cart" / "Checkout" actions in `assets/js/app.js`.

## Notes
- Product names/descriptions are adapted from public Toptrenz listings; swap in your
  own copy/photos before launch. Policy pages are original templates using your
  business info — have them reviewed by a professional before publishing.
