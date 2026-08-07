/* =====================================================================
   KIDSE TOYS — App engine
   Renders shared header/footer, product grids, product pages, and the
   localStorage-backed cart. One source of truth for nav + legal footer.
   ===================================================================== */

const BIZ = {
  dba: "KIDSE TOYS",
  legalName: "GLOBAL TRADE ALLIANCE LLC",
  addr1: ["1712 Pioneer Ave Ste 7000", "Cheyenne, WY 82001"],
  addr2: ["333 South 34th St", "San Jose, CA 95116"],
  phone: "(415) 266-6284",
  phoneHref: "+14152666284",
  email: "support@kidsetoys.com",
  social: "@kidsetoys"
};

/* Work out a relative path prefix so links work from / and /pages/ */
const IN_PAGES = location.pathname.includes("/pages/");
const ROOT = IN_PAGES ? "../" : "";
const P = IN_PAGES ? "" : "pages/";     // path to /pages files
const fmt = n => "$" + Number(n).toLocaleString("en-US");

/* ------------------------------------------------------------------ Cart */
const CART_KEY = "kidse_cart_v1";
const readCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const writeCart = c => { localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartUI(); };
function addToCart(id, qty = 1){
  const cart = readCart();
  const line = cart.find(l => l.id === id);
  if (line) line.qty += qty; else cart.push({ id, qty });
  writeCart(cart);
  openDrawer();
  toast("Added to cart ✓");
}
function setQty(id, qty){
  let cart = readCart();
  cart = cart.map(l => l.id === id ? { ...l, qty } : l).filter(l => l.qty > 0);
  writeCart(cart);
}
function removeLine(id){ writeCart(readCart().filter(l => l.id !== id)); }
const cartCount = () => readCart().reduce((s,l) => s + l.qty, 0);
const cartTotal = () => readCart().reduce((s,l) => { const p = getProduct(l.id); return s + (p ? p.price * l.qty : 0); }, 0);

/* ------------------------------------------------------------------ Header */
function navLink(href, label, key){
  const active = (window.PAGE_KEY === key) ? " active" : "";
  return `<a class="${active}" href="${ROOT}${href}">${label}</a>`;
}
function renderHeader(){
  const el = document.getElementById("site-header");
  if (!el) return;
  el.innerHTML = `
  <div class="announce">🚚 Free shipping on orders $50+ &nbsp;•&nbsp; New viral drops every week &nbsp;•&nbsp; Use code SQUISH10 for 10% off</div>
  <header class="site-header" style="position:static">
    <div class="wrap nav">
      <a class="brand" href="${ROOT}index.html">
        <span class="logo">🧸</span>
        <span>KIDSE TOYS<small>Viral Squishies & Plush</small></span>
      </a>
      <nav class="nav-links" id="navLinks">
        ${navLink("index.html","Home","home")}
        ${navLink("squishy.html","Squishy Toys","squishy")}
        ${navLink("plush.html","Plush Toys","plush")}
        ${navLink("bundles.html","Bundles","bundles")}
        ${navLink(P+"about.html","About","about")}
        ${navLink(P+"contact.html","Contact","contact")}
      </nav>
      <div class="nav-actions">
        <button class="cart-btn" onclick="openDrawer()">🛒 Cart <span class="cart-count" id="cartCount">0</span></button>
        <button class="nav-toggle" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
      </div>
    </div>
  </header>`;
}

/* ------------------------------------------------------------------ Footer */
function renderFooter(){
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="${ROOT}index.html"><span class="logo">🧸</span><span style="color:#fff">KIDSE TOYS</span></a>
          <p>The home of viral, squish-tested, hug-approved toys. Squishies and plush your feed keeps showing you — now on your shelf.</p>
          <div class="footer-legal-info">
            <b>${BIZ.dba}</b>
            A DBA of ${BIZ.legalName}<br>
            ${BIZ.addr1[0]}<br>${BIZ.addr1[1]}<br><br>
            <b style="margin-top:4px">Address 2</b>
            ${BIZ.addr2[0]}<br>${BIZ.addr2[1]}<br><br>
            📞 <a href="tel:${BIZ.phoneHref}" style="color:#c2cbdd">${BIZ.phone}</a><br>
            ✉️ <a href="mailto:${BIZ.email}" style="color:#c2cbdd">${BIZ.email}</a>
          </div>
        </div>

        <div class="footer-col">
          <h5>Shop</h5>
          <ul>
            <li><a href="${ROOT}squishy.html">Squishy Toys</a></li>
            <li><a href="${ROOT}plush.html">Plush Toys</a></li>
            <li><a href="${ROOT}bundles.html">Bundles & Deals</a></li>
            <li><a href="${ROOT}index.html#bestsellers">Best Sellers</a></li>
            <li><a href="${ROOT}${P}contact.html">Track My Order</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Support</h5>
          <ul>
            <li><a href="${ROOT}${P}about.html">About Us</a></li>
            <li><a href="${ROOT}${P}contact.html">Contact Us</a></li>
            <li><a href="${ROOT}${P}faq.html">FAQ</a></li>
            <li><a href="mailto:${BIZ.email}">${BIZ.email}</a></li>
            <li><a href="tel:${BIZ.phoneHref}">${BIZ.phone}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="${ROOT}${P}privacy-policy.html">Privacy Policy</a></li>
            <li><a href="${ROOT}${P}terms.html">Terms &amp; Conditions</a></li>
            <li><a href="${ROOT}${P}subscription-agreement.html">Subscription Agreement</a></li>
            <li><a href="${ROOT}${P}refund-policy.html">Refund Policy</a></li>
            <li><a href="${ROOT}${P}shipping-policy.html">Fulfillment Policy</a></li>
            <li><a href="${ROOT}${P}business-disclaimer.html">Business Disclaimer</a></li>
          </ul>
          <div class="footer-pay">
            <span class="pay-badge">VISA</span><span class="pay-badge">MASTERCARD</span>
            <span class="pay-badge">AMEX</span><span class="pay-badge">DISCOVER</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${BIZ.dba} — ${BIZ.legalName}. All rights reserved.</span>
        <span>🔒 Secure SSL checkout &nbsp;•&nbsp; Follow us ${BIZ.social}</span>
      </div>
    </div>
  </footer>`;
}

/* ------------------------------------------------------------------ Cart drawer */
function renderDrawer(){
  if (document.getElementById("cartDrawer")) return;
  const d = document.createElement("div");
  d.innerHTML = `
    <div class="drawer-overlay" id="drawerOverlay" onclick="closeDrawer()"></div>
    <aside class="drawer" id="cartDrawer" aria-label="Shopping cart">
      <div class="drawer-head"><h3>Your Cart 🛒</h3><button class="drawer-close" onclick="closeDrawer()">×</button></div>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-foot" id="drawerFoot"></div>
    </aside>
    <div id="toast" style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--ink);color:#fff;padding:12px 22px;border-radius:999px;font-family:var(--font-head);font-weight:600;opacity:0;pointer-events:none;transition:.25s;z-index:200"></div>`;
  document.body.appendChild(d);
}
function openDrawer(){ renderDrawer(); document.getElementById("cartDrawer").classList.add("open"); document.getElementById("drawerOverlay").classList.add("open"); updateCartUI(); }
function closeDrawer(){ document.getElementById("cartDrawer")?.classList.remove("open"); document.getElementById("drawerOverlay")?.classList.remove("open"); }
let toastT;
function toast(msg){ const t = document.getElementById("toast"); if(!t) return; t.textContent = msg; t.style.opacity=1; t.style.transform="translateX(-50%) translateY(0)"; clearTimeout(toastT); toastT=setTimeout(()=>{t.style.opacity=0;t.style.transform="translateX(-50%) translateY(20px)";},1600); }

function cartLineHTML(l){
  const p = getProduct(l.id); if(!p) return "";
  return `<div class="cart-line">
    <div class="thumb" style="background:${gradOf(p)}">${p.emoji}</div>
    <div class="info">
      <h4>${p.name}</h4>
      <span class="cl-price">${fmt(p.price)}</span>
      <div class="qty">
        <button onclick="setQty('${p.id}',${l.qty-1})">−</button>
        <span>${l.qty}</span>
        <button onclick="setQty('${p.id}',${l.qty+1})">+</button>
      </div>
    </div>
    <button class="cart-remove" onclick="removeLine('${p.id}')">Remove</button>
  </div>`;
}
function updateCartUI(){
  const c = cartCount();
  document.querySelectorAll("#cartCount").forEach(e => e.textContent = c);
  const body = document.getElementById("drawerBody"); const foot = document.getElementById("drawerFoot");
  if (body){
    const cart = readCart();
    body.innerHTML = cart.length ? cart.map(cartLineHTML).join("")
      : `<div class="empty-cart"><div class="big">🫧</div><p>Your cart is empty.<br>Let's fix that!</p><a class="btn btn-primary" href="${ROOT}squishy.html" onclick="closeDrawer()">Shop Squishies</a></div>`;
    foot.innerHTML = cart.length ? `
      <div class="row"><span>Subtotal</span><span>${fmt(cartTotal())}</span></div>
      <p style="font-size:.8rem;color:var(--muted);margin:0 0 14px">Shipping & taxes calculated at checkout.</p>
      <a class="btn btn-primary btn-block btn-lg" href="${ROOT}${P}checkout.html">Checkout →</a>` : "";
  }
  // live cart page
  if (typeof renderCartPage === "function") renderCartPage();
}

/* ------------------------------------------------------------------ Product cards */
function badgeHTML(p){
  const map = { new:["new","New"], hot:["hot","Bestseller"], limited:["limited","Limited"], sold:["sold","Sold Out"] };
  if(!p.badge || !map[p.badge]) return "";
  return `<span class="badge ${map[p.badge][0]}">${map[p.badge][1]}</span>`;
}
function mediaStyle(p){ return p.img ? `background:#f6f3ff` : `background:${gradOf(p)}`; }
function mediaInner(p){ return p.img ? `<img src="${ROOT}${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">` : `<span class="emoji">${p.emoji}</span>`; }
function catTag(p){ return p.cat==="squishy" ? "Squishy Toy" : p.cat==="plush" ? "Plush Toy" : "Bundle"; }

function cardHTML(p){
  return `<article class="card">
    <a href="${ROOT}${P}product.html?id=${p.id}" class="card-media" style="${mediaStyle(p)}">
      ${badgeHTML(p)}${mediaInner(p)}
    </a>
    <div class="card-body">
      <span class="card-tag">${catTag(p)}</span>
      <h3 class="card-title"><a href="${ROOT}${P}product.html?id=${p.id}">${p.name}</a></h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-foot">
        <span class="price">${fmt(p.price)}</span>
        <button class="add-btn" title="Add to cart" onclick="addToCart('${p.id}')">+</button>
      </div>
    </div>
  </article>`;
}

/* Render a grid into #productGrid, honoring data-collection + filters */
function renderGrid(list, mount){
  const el = typeof mount === "string" ? document.getElementById(mount) : mount;
  if(!el) return;
  el.innerHTML = list.length ? list.map(cardHTML).join("")
    : `<p style="grid-column:1/-1;text-align:center;color:var(--muted)">No products match that filter yet.</p>`;
}

/* Collection page with price filter + sort */
function initCollectionPage(cat){
  const grid = document.getElementById("productGrid");
  if(!grid) return;
  let base = cat === "all" ? PRODUCTS : productsByCat(cat);
  let priceFilter = "all", sort = "featured";
  function apply(){
    let list = base.slice();
    if (priceFilter !== "all") list = list.filter(p => p.price === Number(priceFilter));
    if (sort === "low") list.sort((a,b)=>a.price-b.price);
    else if (sort === "high") list.sort((a,b)=>b.price-a.price);
    else if (sort === "name") list.sort((a,b)=>a.name.localeCompare(b.name));
    renderGrid(list, grid);
    const cnt = document.getElementById("resultCount"); if(cnt) cnt.textContent = `${list.length} product${list.length!==1?"s":""}`;
  }
  document.querySelectorAll("[data-price]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-price]").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active"); priceFilter = btn.dataset.price; apply();
  }));
  const sortSel = document.getElementById("sortSelect");
  if (sortSel) sortSel.addEventListener("change", e => { sort = e.target.value; apply(); });
  apply();
}

/* ------------------------------------------------------------------ Product detail */
function initProductPage(){
  const mount = document.getElementById("pdp");
  if(!mount) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id);
  if(!p){ mount.innerHTML = `<div class="center" style="grid-column:1/-1"><h1>Product not found 🫥</h1><a class="btn btn-primary" href="${ROOT}index.html">Back to shop</a></div>`; return; }
  document.title = `${p.name} — KIDSE TOYS`;
  const packRow = p.packInfo ? `<div><b>Includes</b><span>${p.packInfo}</span></div>` : "";
  const bundleList = p.includes ? `<ul class="bundle-list" style="margin:18px 0">${p.includes.map(i=>`<li>${i}</li>`).join("")}</ul>` : "";
  mount.innerHTML = `
    <div class="pdp-media" style="${mediaStyle(p)}">${badgeHTML(p)}${p.img?mediaInner(p):`<span class="emoji">${p.emoji}</span>`}</div>
    <div>
      <div class="breadcrumbs"><a href="${ROOT}index.html">Home</a> / <a href="${ROOT}${p.cat==='plush'?'plush':p.cat==='bundle'?'bundles':'squishy'}.html">${catTag(p)}s</a> / ${p.name}</div>
      <span class="pdp-tag">${catTag(p)}${p.collection?" · "+p.collection:""}</span>
      <h1>${p.name}</h1>
      <div class="price">${fmt(p.price)}</div>
      <p style="margin-top:14px">${p.desc}</p>
      ${bundleList}
      <div class="pdp-actions">
        <div class="qty" style="padding:8px 14px">
          <button onclick="pdpQty(-1)">−</button><span id="pdpQty">1</span><button onclick="pdpQty(1)">+</button>
        </div>
        <button class="btn btn-primary btn-lg" onclick="addToCart('${p.id}', pdpQtyVal())">Add to Cart</button>
      </div>
      <div class="pdp-meta">
        <div><b>Category</b><span>${catTag(p)}</span></div>
        ${packRow}
        <div><b>Shipping</b><span>Ships in 1–2 business days · Free over $50</span></div>
        <div><b>Ages</b><span>6+ · Not for children under 3 (small parts)</span></div>
        <div><b>Returns</b><span>30-day satisfaction guarantee</span></div>
      </div>
    </div>`;
  // related
  const rel = document.getElementById("relatedGrid");
  if (rel) renderGrid(productsByCat(p.cat).filter(x=>x.id!==p.id).slice(0,4), rel);
}
let _pdpQty = 1;
function pdpQty(d){ _pdpQty = Math.max(1, _pdpQty + d); document.getElementById("pdpQty").textContent = _pdpQty; }
function pdpQtyVal(){ return _pdpQty; }

/* ------------------------------------------------------------------ Boot */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader(); renderFooter(); renderDrawer(); updateCartUI();
  // FAQ accordions
  document.querySelectorAll(".faq-q").forEach(q => q.addEventListener("click", () => {
    const item = q.closest(".faq-item"); const a = item.querySelector(".faq-a");
    const open = item.classList.toggle("open");
    a.style.maxHeight = open ? a.scrollHeight + "px" : 0;
  }));
  // Newsletter / demo forms
  document.querySelectorAll("form[data-demo]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault(); f.reset(); toast(f.dataset.demo || "Thanks! 🎉");
  }));
  initProductPage();
});
window.addToCart=addToCart; window.setQty=setQty; window.removeLine=removeLine;
window.openDrawer=openDrawer; window.closeDrawer=closeDrawer; window.pdpQty=pdpQty; window.pdpQtyVal=pdpQtyVal;
window.fmt=fmt; window.readCart=readCart; window.cartTotal=cartTotal; window.getProduct=getProduct;
