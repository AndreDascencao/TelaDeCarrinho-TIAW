const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const productsContainer = document.getElementById('products-container');
const addProductBtn = document.getElementById('add-product');
const finalizePurchaseBtn = document.getElementById('finalize-purchase');
let products = [];

menuBtn.addEventListener('click', () => {
  sidebar.style.left = '0';
});

closeBtn.addEventListener('click', () => {
  sidebar.style.left = '-250px';
});

function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.supplier}</p>
        <p>${product.description}</p>
        <p>Quantidade: <span id="quantity-${index}">${product.quantity}</span></p>
        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
        <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
        <button onclick="deleteProduct(${index})">Deletar</button>
      `;
      productsContainer.appendChild(productDiv);
    });
  }

function getProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      products = data.map(item => ({
        name: item.title,
        supplier: 'Fornecedor Exemplo',
        description: item.description,
        image: item.image,
        quantity: 1,
      }));
      renderProducts();
    });
}

function addProduct() {
  const newProduct = {
    name: 'Novo Produto',
    supplier: 'Novo Fornecedor',
    description: 'Descrição do novo produto',
    image: 'https://via.placeholder.com/150',
    quantity: 1,
  };
  products.push(newProduct);
  renderProducts();
}

function editProduct(index) {
  const product = products[index];
  product.name = prompt('Editar nome do produto:', product.name) || product.name;
  product.supplier = prompt('Editar fornecedor:', product.supplier) || product.supplier;
  product.description = prompt('Editar descrição:', product.description) || product.description;
  renderProducts();
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
}

function increaseQuantity(index) {
  products[index].quantity++;
  document.getElementById(`quantity-${index}`).innerText = products[index].quantity;
}

function decreaseQuantity(index) {
  if (products[index].quantity > 1) {
    products[index].quantity--;
    document.getElementById(`quantity-${index}`).innerText = products[index].quantity;
  }
}

function finalizePurchase() {
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  alert(`Compra finalizada com sucesso! Total de itens: ${totalItems}`);
}

addProductBtn.addEventListener('click', addProduct);
finalizePurchaseBtn.addEventListener('click', finalizePurchase);

getProducts();
