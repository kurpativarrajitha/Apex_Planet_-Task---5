const PRODUCTS = [
  {id:1,title:"Phone",desc:"Compact smartphone",price:299,img:"/images/phone.jpg"},
  {id:2,title:"Headphones",desc:"Noise-cancelling",price:149,img:"/images/headphones.jpg"},
  {id:3,title:"Watch",desc:"Fitness tracker",price:199,img:"/images/watch.jpg"}
];
const grid = document.getElementById("grid");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const reset = document.getElementById("reset");
const cartCount = document.getElementById("cart-count");
let cart = {};
function render(list){
  grid.innerHTML="";
  if(!list.length){grid.innerHTML="<p>No products found.</p>";return;}
  list.forEach(p=>{
    grid.innerHTML+=`
      <div class="card">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="row">
          <span class="price">₹${p.price}</span>
          <button class="btn add" data-id="${p.id}">Add</button>
        </div>
      </div>`;
  });
}
render(PRODUCTS);
function updateCart(id){
  cart[id]=(cart[id]||0)+1;
  cartCount.textContent=Object.values(cart).reduce((a,b)=>a+b,0);
}
function applyFilters(){
  let q=search.value.toLowerCase();
  let list=PRODUCTS.filter(p=>p.title.toLowerCase().includes(q));
  if(sort.value==="asc") list.sort((a,b)=>a.price-b.price);
  if(sort.value==="desc") list.sort((a,b)=>b.price-a.price);
  render(list);
}
grid.addEventListener("click",e=>{
  if(e.target.classList.contains("add")) updateCart(e.target.dataset.id);
});
search.addEventListener("input",applyFilters);
sort.addEventListener("change",applyFilters);
reset.addEventListener("click",()=>{search.value="";sort.value="featured";render(PRODUCTS);});
