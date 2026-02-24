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
  { id: 'shoe-001', brand: 'Nike', category: 'Sneaker', gender: 'Unissex', title: 'Dunk Low', price: 549.90, img: 'images/Dunk Low.png', description: 'Dunk Low em couro liso ou camurça com solado de borracha de alta tração. Fiel ao tamanho (True to size). Um clássico atemporal do streetwear.' },
  { id: 'shoe-002', brand: 'Converse', category: 'Sneaker', gender: 'Unissex', title: 'Chuck 70 High Top', price: 399.90, img: 'images/Chuck 70 High Top.png', description: 'Chuck 70 High Top em lona de 12oz reforçada. Solado de borracha envernizada mais alto que o All Star comum. Geralmente pede um número menor.' },
  { id: 'shoe-003', brand: 'New Balance', category: 'Sneaker', gender: 'Unissex', title: 'New Balance 990v5', price: 649.90, img: 'images/New Balance 990v5.png', description: 'New Balance 990v5 com mix de camurça suína e mesh respirável. Amortecimento ENCAP. O ápice do "Dad Shoe" (tênis de pai) de luxo e conforto.' },
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
const COUPON_CODE = 'ALMICEA';
const COUPON_DISCOUNT = 0.20;

let state = {
  cart: loadCart(),
  coupon: null
};

function saveCart(){localStorage.setItem(CART_KEY, JSON.stringify(state.cart))}
function loadCart(){try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(e){return []}}

function formatPrice(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

async function fetchProducts(){
  // Carregar produtos locais IMEDIATAMENTE
  PRODUCTS = DEFAULT_PRODUCTS.slice();
  PRODUCTS.forEach(p => { PRODUCTS_MAP[p.id] = p; });
  renderProducts();
  console.log('✅ Produtos locais carregados (20 itens)');

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
    card.innerHTML = `
      <button class="show-detail" data-id="${p.id}" style="border:0;background:transparent;padding:0;display:block;text-align:left;width:100%">
        <img src="${imgSrc}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/500x700?text=Indisponível'" style="width:100%;height:200px;object-fit:cover;border-radius:8px;">
        <div class="product-title">${p.brand} — ${p.title}</div>
      </button>
      <div class="price">${formatPrice(p.price)}</div>
      <button class="add" data-id="${p.id}">Adicionar</button>
    `;
    el.appendChild(card);
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
      modal.setAttribute('aria-hidden','false');
      document.getElementById('product-add').dataset.id = id;
    }
  }
}

async function addToCart(productId){
  let prod = PRODUCTS_MAP[productId];
  if(!prod){
    try{
      const res = await fetch(`/api/products/${productId}`);
      prod = await res.json();
      PRODUCTS_MAP[productId] = prod;
    }catch(e){console.error(e);return}
  }
  const existing = state.cart.find(i=>i.id===productId);
  if(existing) existing.qty += 1; else state.cart.push({id:prod.id,title:prod.title,price:prod.price,img:prod.img,qty:1});
  saveCart();
  renderCartCount();
}

function removeFromCart(productId){
  const idx = state.cart.findIndex(i=>i.id===productId);
  if(idx > -1) state.cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function updateQty(productId, delta){
  const item = state.cart.find(i=>i.id===productId);
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
        <div style="font-size:14px;font-weight:600">${item.title}</div>
        <div style="font-size:12px;color:var(--text-muted)">${formatPrice(item.price)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <button onclick="updateQty('${item.id}',-1)" style="width:28px;height:28px;border:1px solid var(--border);background:transparent;cursor:pointer">−</button>
        <span style="width:30px;text-align:center;font-weight:600">${item.qty}</span>
        <button onclick="updateQty('${item.id}',1)" style="width:28px;height:28px;border:1px solid var(--border);background:transparent;cursor:pointer">+</button>
      </div>
      <button onclick="removeFromCart('${item.id}')" style="width:28px;height:28px;border:1px solid var(--border);background:#c8102e;color:white;cursor:pointer;border-radius:4px">×</button>
    `;
    el.appendChild(div);
  });
  updateSummary();
}

function updateSummary(){
  const subtotal = state.cart.reduce((s,i)=>s+i.price*i.qty,0);
  const discount = state.coupon ? subtotal * COUPON_DISCOUNT : 0;
  const total = subtotal - discount;
  document.getElementById('subtotal').textContent = formatPrice(subtotal);
  document.getElementById('discount').textContent = state.coupon ? `-${formatPrice(discount)}` : '0,00';
  document.getElementById('total').textContent = formatPrice(total);
}

function applyCoupon(){
  const input = document.getElementById('coupon-input');
  const code = input.value.trim().toUpperCase();
  if(code === COUPON_CODE){
    state.coupon = COUPON_CODE;
    input.value = '';
    document.getElementById('coupon-msg').textContent = '✅ Cupom aplicado com sucesso!';
    updateSummary();
    setTimeout(()=>{ document.getElementById('coupon-msg').textContent = ''; }, 3000);
  }else{
    document.getElementById('coupon-msg').textContent = '❌ Cupom inválido';
    setTimeout(()=>{ document.getElementById('coupon-msg').textContent = ''; }, 3000);
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
  alert('OBRIGADO POR ASSISTIR A NOSSA APRESENTAÇÃO');
  document.getElementById('cart-modal').setAttribute('aria-hidden','true');
}

// Event delegation para produtos dinâmicos
document.body.addEventListener('click', (e)=>{
  if(e.target.closest('.show-detail')){
    const id = e.target.closest('.show-detail').dataset.id;
    showProductDetail(id);
  }
  if(e.target.closest('.add')){
    addToCart(e.target.closest('.add').dataset.id);
  }
});

// Abrir/Fechar modais
['product-modal','cart-modal'].forEach(id=>{
  const modal = document.getElementById(id);
  if(!modal) return;
  modal.addEventListener('click',(e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });
});

document.getElementById('cart-btn')?.addEventListener('click',()=>{
  document.getElementById('cart-modal').setAttribute('aria-hidden','false');
});

document.getElementById('product-close')?.addEventListener('click',()=>{
  document.getElementById('product-modal').setAttribute('aria-hidden','true');
});

document.getElementById('cart-close')?.addEventListener('click',()=>{
  document.getElementById('cart-modal').setAttribute('aria-hidden','true');
});

document.getElementById('coupon-btn')?.addEventListener('click',applyCoupon);
document.getElementById('coupon-input')?.addEventListener('keypress',(e)=>{ if(e.key==='Enter') applyCoupon(); });
document.getElementById('checkout-btn')?.addEventListener('click',checkout);

// Inicializar
fetchProducts();
renderCartCount();
