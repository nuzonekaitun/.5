// script.js - basic interactivity for w-washop demo

// Sample product data (could be loaded from localStorage or API)
const SAMPLE_PRODUCTS = [
  {id:1, name:'สินค้า A', price:120, stock:10},
  {id:2, name:'สินค้า B', price:250, stock:6},
  {id:3, name:'สินค้า C', price:75, stock:20},
  {id:4, name:'สินค้า D', price:199, stock:3},
  {id:5, name:'สินค้า E', price:420, stock:8},
  {id:6, name:'สินค้า F', price:59, stock:40}
];

function $(id){ return document.getElementById(id); }

// Carousel
let slides = [];
let current = 0;
function initCarousel(){
  slides = Array.from(document.querySelectorAll('.carousel .slide'));
  if(!slides.length) return;
  document.getElementById('next').addEventListener('click', ()=>{ go(1); });
  document.getElementById('prev').addEventListener('click', ()=>{ go(-1); });
  setInterval(()=> go(1), 5000);
}
function go(dir){
  slides[current].classList.remove('active');
  current = (current + dir + slides.length) % slides.length;
  slides[current].classList.add('active');
}

// Render products
function renderProducts(){
  const wrap = document.getElementById('products');
  wrap.innerHTML='';
  SAMPLE_PRODUCTS.forEach(p=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<div class="thumb">รูปสินค้า</div>
      <h3>${p.name}</h3><p>รายละเอียดสั้น ๆ ของสินค้า</p>
      <div class="meta"><div class="price">${p.price} บ.</div><button class="btn" onclick="addToCart(${p.id})">ใส่ตะกร้า</button></div>`;
    wrap.appendChild(div);
  });
}

// Simple cart simulation (local only)
function addToCart(id){
  alert('เพิ่มสินค้าเข้าไปในตะกร้า (จำลอง)');
}

// Stats (demo numbers derived from sample products)
function setStats(){
  const users = 3421; // example
  const products = SAMPLE_PRODUCTS.length;
  const stock = SAMPLE_PRODUCTS.reduce((s,p)=>s+p.stock,0);
  const sold = 12400; // example
  document.getElementById('stat-users').innerText = users.toLocaleString();
  document.getElementById('stat-products').innerText = products;
  document.getElementById('stat-stock').innerText = stock;
  document.getElementById('stat-sold').innerText = sold.toLocaleString();
}

// Modal simple login/signup forms
function openModal(html){ document.getElementById('modal-body').innerHTML = html; document.getElementById('modal').classList.remove('hidden'); }
function closeModal(){ document.getElementById('modal').classList.add('hidden'); document.getElementById('modal-body').innerHTML = ''; }

document.addEventListener('DOMContentLoaded', ()=>{
  initCarousel();
  renderProducts();
  setStats();
  document.getElementById('open-login').addEventListener('click', ()=>{
    openModal(`<h3>เข้าสู่ระบบ</h3><input id="li-user" placeholder="ยูสเซอร์" style="width:100%;padding:8px;margin:8px 0;border-radius:6px"/><input id="li-pass" placeholder="รหัสผ่าน" style="width:100%;padding:8px;margin:8px 0;border-radius:6px"/><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn" onclick="closeModal()">ยกเลิก</button><button class="btn primary" onclick="closeModal()">เข้าใช้งาน</button></div>`);
  });
  document.getElementById('open-signup').addEventListener('click', ()=>{
    openModal(`<h3>สมัครสมาชิก</h3><input id="su-user" placeholder="ยูสเซอร์" style="width:100%;padding:8px;margin:8px 0;border-radius:6px"/><input id="su-pass" placeholder="รหัสผ่าน" style="width:100%;padding:8px;margin:8px 0;border-radius:6px"/><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn" onclick="closeModal()">ยกเลิก</button><button class="btn primary" onclick="closeModal()">สมัคร</button></div>`);
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
});
