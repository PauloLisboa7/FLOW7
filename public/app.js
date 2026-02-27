let PRODUCTS = [];
const PRODUCTS_MAP = {};

// Fallback local products - TODOS OS 20 PRODUTOS STREETWEAR
const DEFAULT_PRODUCTS = [
  // TOPS (5)
  { id: 'top-001', brand: 'Fear of God Essentials', category: 'Camiseta', gender: 'Unissex', title: 'Camiseta Boxy Fit', price: 189.90, img: 'images/Camiseta Boxy Fit.png', description: 'Camiseta de corte quadrado (boxy) com mangas mais largas e ombros caídos. 100% Algodão pesado (Jersey de alta gramatura). Gola alta canelada que não deforma.' },
  { id: 'top-002', brand: 'Champion', category: 'Hoodie', gender: 'Unissex', title: 'Hoodie Reverse Weave', price: 279.90, img: 'images/Hoodie Reverse Weave.png', description: 'Hoodie clássico e pesado com painéis laterais elásticos. Mistura algodão e poliéster com corte transversal. O "padrão ouro" de durabilidade e estrutura.' },
  { id: 'top-003', brand: 'Stüssy', category: 'Jaqueta', gender: 'Masculino', title: 'Jaqueta Coach', price: 449.90, img: 'images/Jaqueta Coach.png', description: 'Jaqueta Coach com exterior em Nylon impermeável e forro em poliéster. Corte regular com ajuste por cordão. Fechamento por botões de pressão e gola dobrável.' },
  { id: 'top-004', brand: 'Supreme', category: 'Flanela', gender: 'Masculino', title: 'Flanela Heavyweight', price: 349.90, img: 'images/Flanela Heavyweight.png', description: 'Flanela de algodão escovado de gramatura alta. Corte relaxado para sobreposição (layering). Toque macio por fora, ultra resistente e durável.' },
  { id: 'top-005', brand: 'Nike ACG', category: 'Colete', gender: 'Unissex', title: 'Colete Utilitário', price: 399.90, img: 'images/Colete Utilitário.png', description: 'Colete de Ripstop Nylon com tecnologia repelente à água. Ajustável por fivelas com múltiplos bolsos 3D. Estética Techwear funcional e moderna.' },
  // BOTTOMS (5)
  { id: 'bottom-001', brand: 'Dickies', category: 'Calça Cargo', gender: 'Masculino', title: 'Calça Cargo 874', price: 189.90, img: 'images/Calça Cargo 874.png', description: 'Calça Cargo 874 em sarja ultra resistente (65% Poliéster / 35% Algodão). Corte reto com cintura alta. Originalmente de trabalho, tornou-se uniforme do skate.' },
  { id: 'bottom-002', brand: 'Yeezy / Adidas', category: 'Sweatpants', gender: 'Unissex', title: 'Sweatpants de Fleece', price: 279.90, img: 'images/Sweatpants de Fleece.png', description: 'Sweatpants de algodão atoalhado (French Terry). Corte afunilado com punho elástico no tornozelo. Visual volumoso no quadril que vai estreitando.' },
  { id: 'bottom-003', brand: 'Carhartt WIP', category: 'Calça', gender: 'Masculino', title: 'Double Knee Pants', price: 349.90, img: 'images/Double Knee Pants.png', description: 'Calça de Canvas de algodão orgânico "Dearborn". Corte relaxado e reto com painéis duplos no joelho com rebites de metal.' },
  { id: 'bottom-004', brand: 'Eric Emanuel', category: 'Bermuda', gender: 'Masculino', title: 'Bermuda Mesh', price: 169.90, img: 'images/Bermuda Mesh.png', description: 'Bermuda de malha de poliéster de dupla camada (mesh). Acima do joelho, transpirável, leve e com cores vibrantes.' },
  { id: 'bottom-005', brand: 'Levi\'s', category: 'Jeans', gender: 'Masculino', title: 'Jeans Selvedge 501 \'93', price: 299.90, img: 'images/Jeans Selvedge.png', description: 'Jeans Levi\'s 501 com Denim rígido de 12oz a 14oz. Corte reto de inspiração vintage anos 90. Acabamento premium na ourela do tecido.' },
  // CALÇADOS (3)
  { id: 'shoe-001', brand: 'Nike', category: 'Sneaker', gender: 'Unissex', title: 'Dunk Low', price: 549.90, img: 'images/Dunk Low.png', description: 'Dunk Low em couro liso ou camurça com solado de borracha de alta tração. Fiel ao tamanho (True to size). Um clássico atemporal do streetwear.', sizes:['38','39','40','41','42','43'] },
  { id: 'shoe-002', brand: 'Converse', category: 'Sneaker', gender: 'Unissex', title: 'Chuck 70 High Top', price: 399.90, img: 'images/Chuck 70 High Top.png', description: 'Chuck 70 High Top em lona de 12oz reforçada. Solado de borracha envernizada mais alto que o All Star comum. Geralmente pede um número menor.', sizes:['37','38','39','40','41','42'] },
  { id: 'shoe-003', brand: 'New Balance', category: 'Sneaker', gender: 'Unissex', title: 'New Balance 990v5', price: 649.90, img: 'images/New Balance 990v5.png', description: 'New Balance 990v5 com mix de camurça suína e mesh respirável. Amortecimento ENCAP. O ápice do "Dad Shoe" (tênis de pai) de luxo e conforto.', sizes:['39','40','41','42','43','44'] },
  // ACESSÓRIOS (7 NOVOS)
  { id: 'acc-001', brand: 'Stüssy', category: 'Boné', gender: 'Unissex', title: 'Boné 5-Panel', price: 119.90, img: 'images/Boné 5-Panel.png', description: 'Boné 5-Panel clássico do Stüssy. Estrutura resistente, pala pré-curvada. Perfeito para completar o look streetwear.' },
  { id: 'acc-002', brand: 'Supreme', category: 'Chapéu', gender: 'Unissex', title: 'Bucket Hat', price: 159.90, img: 'images/Bucket Hat.png', description: 'Bucket Hat com logo bordado. Material resistente e confortável. Um essencial para o estilo Y2K e streetwear.' },
  { id: 'acc-003', brand: 'Carhartt WIP', category: 'Cinto', gender: 'Unissex', title: 'Cinto Industrial', price: 99.90, img: 'images/Cinto Industrial.png', description: 'Cinto Industrial de Carhartt WIP com fivela reforçada. Material durável e acabamento de qualidade premium.' },
  { id: 'acc-004', brand: 'Nike SB', category: 'Meias', gender: 'Unissex', title: 'Meias de Cano Alto', price: 49.90, img: 'images/Meias de Cano Alto.png', description: 'Meias de cano alto com o logo da Nike SB. 80% algodão, 15% poliéster, 5% elastano. Conforto garantido.' },
  { id: 'acc-005', brand: 'Off-White', category: 'Máscara', gender: 'Unissex', title: 'Máscara Streetwear', price: 69.90, img: 'images/Máscara.png', description: 'Máscara premium com design streetwear. Material respirável e estruturado com logo bordado.' },
  { id: 'acc-006', brand: 'The North Face', category: 'Colete', gender: 'Unissex', title: 'Puffer Vest', price: 329.90, img: 'images/Puffer Vest.png', description: 'Colete Puffer do The North Face com tecnologia de isolamento. Leve, quente e perfeito para layering.' },
  { id: 'acc-007', brand: 'Carhartt WIP', category: 'Bolsa', gender: 'Unissex', title: 'Shoulder Bag Cordura', price: 249.90, img: 'images/Shoulder Bag Cordura.png', description: 'Bolsa de ombro em Cordura durável com múltiplos compartimentos. Ideal para o dia a dia e viagens.' }
];

const CART_KEY = 'flow7_cart_v1';
// coupon codes and their respective discounts (fractional)
const COUPONS = {
  ALMICEA: 0.30, // 30% off
  SENAC: 0.25    // new 25% off code
};

// helper to look up discount percentage by code
function getCouponDiscount(code){
  if(!code) return 0;
  const upper = code.trim().toUpperCase();
  return COUPONS[upper] || 0;
}

let state = {
  cart: loadCart(),
  coupon: null
};

// state to remember product being added from card
let pendingAddId = null;

// helper to get size options for a product
function getSizeOptions(prod){
  // if explicit sizes provided, return a copy
  if(prod && prod.sizes && prod.sizes.length) return prod.sizes.slice();
  // attempt to guess numeric sizes for footwear categories
  const cat = (prod && prod.category) ? prod.category.toLowerCase() : '';
  const id = (prod && prod.id) ? prod.id.toLowerCase() : '';
  if(cat.includes('sneaker') || cat.includes('shoe') || id.startsWith('shoe-')){
    // common Brazilian shoe range (adjust if needed)
    return ['36','37','38','39','40','41','42','43','44','45'];
  }
  // default for apparel
  return ['P','M','G','GG'];
}

// migrate default products into Firestore when available
async function migrateProductsToFirestore() {
  if (!(window.firebase && firebase.apps && firebase.apps.length)) return;
  try {
    const db = firebase.firestore();
    const snapshot = await db.collection('products').get();
    if (snapshot.empty) {
      // populate collection from default list
      for (const p of DEFAULT_PRODUCTS) {
        await db.collection('products').doc(p.id).set(p);
      }
      console.log('⚙️ Produtos padrão migrados para Firestore');
    } else {
      // ensure shoe documents have a sizes array (might have been omitted earlier)
      const updates = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if((data.category && data.category.toLowerCase().includes('sneaker')) ||
           (doc.id && doc.id.toLowerCase().startsWith('shoe-'))){
          if(!data.sizes || !data.sizes.length){
            updates.push(db.collection('products').doc(doc.id).update({
              sizes: getSizeOptions(data) // will return numeric range
            }));
          }
        }
      });
      if(updates.length) await Promise.all(updates);
      if(updates.length) console.log('⚙️ Atualizados tamanhos de calçados no Firestore');
    }
  } catch (err) {
    console.warn('⚠️ Erro ao migrar produtos para Firestore:', err);
  }
}

// show simple size picker modal for direct-add
function openSizeModal(productId){
  pendingAddId = productId;
  const modal = document.getElementById('size-modal');
  const sizeSelect = document.getElementById('size-select');
  if(sizeSelect){
    // populate options dynamically
    sizeSelect.innerHTML = '';
    const opts = getSizeOptions(PRODUCTS_MAP[productId] || {});
    sizeSelect.appendChild(new Option('Escolha',''));
    opts.forEach(s=> sizeSelect.appendChild(new Option(s,s)));
  }
  if(modal){
    modal.setAttribute('aria-hidden','false');
  }
}

// close size modal
function closeSizeModal(){
  const modal = document.getElementById('size-modal');
  console.log('Tentando fechar size-modal:', modal);
  if(modal) {
    modal.setAttribute('aria-hidden','true');
    modal.style.display = 'none';
    modal.style.visibility = 'hidden';
    modal.style.pointerEvents = 'none';
    console.log('Size-modal fechado!');
  }
  pendingAddId = null;
}


function saveCart(){localStorage.setItem(CART_KEY, JSON.stringify(state.cart))}
function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return []}}

function formatPrice(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

async function fetchProducts(){
  // Carregar produtos locais IMEDIATAMENTE
  PRODUCTS = DEFAULT_PRODUCTS.slice();
  PRODUCTS.forEach(p => { PRODUCTS_MAP[p.id] = p; });
  renderProducts();
  console.log('✅ Produtos locais carregados (20 itens)');

  // se o Firebase estiver disponível, tente buscar do Firestore
  if (window.firebase && firebase.apps && firebase.apps.length) {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('products').get();
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach(doc => list.push(doc.data()));
        if (list.length) {
          PRODUCTS = list;
          PRODUCTS.forEach(p => { PRODUCTS_MAP[p.id] = p; });
          renderProducts();
          console.log('✅ Produtos carregados do Firestore!');
          return;
        }
      }
    } catch(fsErr) {
      console.warn('Erro ao buscar produtos no Firestore:', fsErr);
    }
  }

  try{
    // Depois buscar do servidor em background
    const origin = window.location && window.location.origin ? window.location.origin : '';
    const tryUrl = origin + '/api/products';
    let res = await fetch(tryUrl);
    if(res.ok && res.headers.get('content-type') && res.headers.get('content-type').includes('application/json')){
      const list = await res.json();
      if(list && list.length > 0) {
        PRODUCTS = list;
        PRODUCTS.forEach(p => { PRODUCTS_MAP[p.id] = p; });
        renderProducts();
        console.log('✅ Produtos sincronizados do servidor!');
      }
      return;
    }
    throw new Error('Resposta não é JSON');
  }catch(e){
    console.warn('Servidor indisponível, usando produtos locais');
  }
}

function renderProducts(){
  const el = document.getElementById('products');
  if(!el) return;
  el.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const imgSrc = (p.img && p.img.trim()) ? p.img : 'https://via.placeholder.com/500x700?text=' + encodeURIComponent(p.title);
    const card = document.createElement('div');
    card.className='card';
    // give each card its product id so styles or links can target it
    card.id = 'prod-' + p.id;
    card.innerHTML = `
      <button class="show-detail" data-id="${p.id}" style="border:0;background:transparent;padding:0;display:block;text-align:left;width:100%">
        <img src="${imgSrc}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/500x700?text=Indisponível'" style="width:100%;height:200px;object-fit:cover;border-radius:8px;">
        <div class="product-title">${p.brand} — ${p.title}</div>
      </button>
      <div class="price">${formatPrice(p.price)}</div>
      <button class="add" data-id="${p.id}">Adicionar</button>
    `;
    el.appendChild(card);
    // animate appearance
    setTimeout(()=>{ card.classList.add('visible'); }, 50);
  })
}

async function showProductDetail(id){
  try{
    const base = window.__FLOW7_API_BASE || (window.location && window.location.origin ? window.location.origin : '');
    const res = await fetch(base + `/api/products/${id}`);
    if(!res.ok) return;
    const p = await res.json();
    PRODUCTS_MAP[id] = p;
    const imgEl = document.getElementById('product-img');
    const imgSrc = (p.img && p.img.trim()) ? p.img : 'https://via.placeholder.com/500x700?text=Indisponível';
    imgEl.src = imgSrc;
    imgEl.alt = p.title;
    imgEl.onerror = function() { this.src = 'https://via.placeholder.com/500x700?text=Indisponível'; };
    document.getElementById('product-title').textContent = p.title;
    document.getElementById('product-brand').textContent = p.brand;
    document.getElementById('product-price').textContent = formatPrice(p.price);
    document.getElementById('product-desc').textContent = p.description || '';
    // populate size dropdown according to product
    const sizeEl = document.getElementById('product-size');
    if(sizeEl){
      sizeEl.innerHTML = '';
      const opts = getSizeOptions(p);
      sizeEl.appendChild(new Option('Escolha',''));
      opts.forEach(s=> sizeEl.appendChild(new Option(s,s)));
      sizeEl.value = '';
    }
    const modal = document.getElementById('product-modal');
    modal.setAttribute('aria-hidden','false');
    document.getElementById('product-add').dataset.id = id;
  }catch(e){
    console.error('Erro ao buscar detalhe:', e);
    const p = PRODUCTS_MAP[id] || DEFAULT_PRODUCTS.find(x=>x.id===id);
    if(p){
      const imgEl = document.getElementById('product-img');
      const imgSrc = (p.img && p.img.trim()) ? p.img : 'https://via.placeholder.com/500x700?text=Indisponível';
      imgEl.src = imgSrc;
      imgEl.alt = p.title;
      imgEl.onerror = function() { this.src = 'https://via.placeholder.com/500x700?text=Indisponível'; };
      document.getElementById('product-title').textContent = p.title;
      document.getElementById('product-brand').textContent = p.brand;
      document.getElementById('product-price').textContent = formatPrice(p.price);
      document.getElementById('product-desc').textContent = p.description || '';
      const modal = document.getElementById('product-modal');
      // reset size dropdown even in fallback
      const sizeEl = document.getElementById('product-size');
      if(sizeEl) sizeEl.value = '';
      modal.setAttribute('aria-hidden','false');
      document.getElementById('product-add').dataset.id = id;
    }
  }
}

async function addToCart(productId, size){
  try {
    let prod = PRODUCTS_MAP[productId];
    if(!prod){
      try{
        const res = await fetch(`/api/products/${productId}`);
        prod = await res.json();
        PRODUCTS_MAP[productId] = prod;
      }catch(e){
        console.error(e);
        prod = DEFAULT_PRODUCTS.find(p => p.id === productId);
        if(!prod) return;
      }
    }
    // match by id AND size so different sizes are separate
    const existing = state.cart.find(i=>i.id===productId && i.size===size);
    if(existing) existing.qty += 1;
    else state.cart.push({id:prod.id,title:prod.title,price:prod.price,img:prod.img,qty:1,size:size||''});
    // bump cart button
    const cartBtn = document.getElementById('cart-btn');
    if(cartBtn){
      cartBtn.classList.add('bump');
      setTimeout(()=>{cartBtn.classList.remove('bump');},500);
    }
    saveCart();
    renderCartCount();
  } catch(e) {
    console.error('Erro ao adicionar ao carrinho:', e);
  }
}

function removeFromCart(productId,size){
  const idx = state.cart.findIndex(i=>i.id===productId && i.size===size);
  if(idx > -1) state.cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function updateQty(productId, delta, size){
  const item = state.cart.find(i=>i.id===productId && i.size===size);
  if(item){
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderCart();
  }
}

function renderCartCount(){
  const el = document.getElementById('cart-count');
  if(el) el.textContent = state.cart.reduce((s,i)=>s+i.qty,0);
}

function renderCart(){
  const el = document.getElementById('cart-items');
  if(!el) return;
  el.innerHTML = '';
  if(state.cart.length === 0){
    el.innerHTML = '<p style="text-align:center;color:var(--text-muted)">Carrinho vazio</p>';
    updateSummary();
    return;
  }
  state.cart.forEach(item=>{
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="">
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600">${item.title}${item.size? ' ('+item.size+')':''}</div>
        <div style="font-size:12px;color:var(--text-muted)">${formatPrice(item.price)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <button onclick="updateQty('${item.id}',-1,'${item.size}')" style="width:28px;height:28px;border:1px solid var(--border);background:transparent;cursor:pointer">−</button>
        <span style="width:30px;text-align:center;font-weight:600">${item.qty}</span>
        <button onclick="updateQty('${item.id}',1,'${item.size}')" style="width:28px;height:28px;border:1px solid var(--border);background:transparent;cursor:pointer">+</button>
      </div>
      <button onclick="removeFromCart('${item.id}','${item.size}')" style="width:28px;height:28px;border:1px solid var(--border);background:#c8102e;color:white;cursor:pointer;border-radius:4px">×</button>
    `;
    el.appendChild(div);
  });
  updateSummary();
}

function updateSummary(){
  const subtotal = state.cart.reduce((s,i)=>s+i.price*i.qty,0);
  const discountPct = getCouponDiscount(state.coupon);
  const discount = subtotal * discountPct;
  const total = subtotal - discount;
  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('discount').textContent = discountPct ? `-${formatPrice(discount)}` : '0,00';
  document.getElementById('total').textContent = formatPrice(total);
}

function applyCoupon(){
  const input = document.getElementById('coupon-input');
  const msg = document.getElementById('coupon-msg');
  const code = input.value.trim().toUpperCase();
  const discount = getCouponDiscount(code);
  if(discount > 0){
    state.coupon = code;
    input.value = '';
    msg.textContent = `Cupom ${code} aplicado com sucesso!`;
    msg.className = 'coupon-msg success';
    updateSummary();
    setTimeout(()=>{ msg.textContent = ''; msg.className = 'coupon-msg'; }, 3000);
  }else{
    msg.textContent = 'Cupom inválido';
    msg.className = 'coupon-msg error';
    setTimeout(()=>{ msg.textContent = ''; msg.className = 'coupon-msg'; }, 3000);
  }
}

function checkout(){
  if(state.cart.length === 0){
    alert('Carrinho vazio!');
    return;
  }
  state.cart = [];
  state.coupon = null;
  saveCart();
  renderCart();
  renderCartCount();
  // hide cart and show thank-you overlay
  document.getElementById('cart-modal').setAttribute('aria-hidden','true');
  const thank = document.getElementById('thankyou-modal');
  if(thank){
    thank.setAttribute('aria-hidden','false');
    setTimeout(()=>{ thank.setAttribute('aria-hidden','true'); }, 5000);
  }
}

// Event delegation para produtos dinâmicos
document.body.addEventListener('click', async (e)=>{
  if(e.target.closest('.show-detail')){
    const id = e.target.closest('.show-detail').dataset.id;
    showProductDetail(id);
  }
  if(e.target.closest('.add')){
    const btn = e.target.closest('.add');
    const id = btn.dataset.id;
    if(btn.id === 'product-add'){
      // from detail modal
      const size = document.getElementById('product-size')?.value || '';
      if(!size){
        alert('Por favor, escolha um tamanho');
        return;
      }
      await addToCart(id, size);
      // Close modal after adding to cart
      document.getElementById('product-modal').setAttribute('aria-hidden','true');
    } else {
      // from card — open size modal
      openSizeModal(id);
    }
  }
});

// size modal buttons
const sizeConfirm = document.getElementById('size-confirm');
if(sizeConfirm){
  sizeConfirm.addEventListener('click', async ()=>{
    console.log('Clique em size-confirm detectado');
    const size = document.getElementById('size-select')?.value || '';
    console.log('Tamanho selecionado:', size);
    if(!size){
      alert('Por favor, escolha um tamanho');
      return;
    }
    await addToCart(pendingAddId,size);
    console.log('Chamando closeSizeModal');
    closeSizeModal();
  });
}
// sizeCancel listener no longer needed; handled by delegation above

// Abrir/Fechar modais
['product-modal','cart-modal'].forEach(id=>{
  const modal = document.getElementById(id);
  if(!modal) return;
  modal.addEventListener('click',(e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });
});

document.getElementById('cart-btn')?.addEventListener('click',()=>{
  renderCart(); // refresh contents before showing
  document.getElementById('cart-modal').setAttribute('aria-hidden','false');
});

// globally handle any close button inside a modal (delegation ensures no duplicates)
document.body.addEventListener('click', e => {
  const btn = e.target.closest('.close');
  if(!btn) return;
  // find nearest ancestor that is a modal container
  const modal = btn.closest('.product-modal, .cart-modal, #size-modal');
  if(modal) modal.setAttribute('aria-hidden','true');
  // reset pending addition if size modal closed
  if(btn.id === 'size-cancel') pendingAddId = null;
});

document.getElementById('coupon-btn')?.addEventListener('click',applyCoupon);
document.getElementById('coupon-input')?.addEventListener('keypress',(e)=>{ if(e.key==='Enter') applyCoupon(); });
document.getElementById('checkout-btn')?.addEventListener('click',checkout);

// Inicializar
if (window.firebase && firebase.apps && firebase.apps.length) {
  migrateProductsToFirestore().catch(()=>{});
}
fetchProducts();
renderCartCount();
renderCart(); // show persisted cart if user opens modal later

// smooth scrolling for footer links (ensures "Início" and "Produtos" behave differently)
document.addEventListener('DOMContentLoaded', () => {
  const topLink = document.querySelector('a[href="#top"]');
  const prodLink = document.querySelector('a[href="#products"]');
  if(topLink) topLink.addEventListener('click', e=>{
    e.preventDefault();
    window.scrollTo({top:0,behavior:'smooth'});
  });
  if(prodLink) prodLink.addEventListener('click', e=>{
    e.preventDefault();
    const el = document.getElementById('products');
    if(el) el.scrollIntoView({behavior:'smooth'});
  });
});
