import { productsDetails } from '../js/product.js';

let total = 0;
let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    setupEventListeners();
});

function loadCart() {
    updateCartUI();
}

function renderProducts() {
    const gridContainer = document.getElementById("productGrid");
    productsDetails.forEach((product) => {
        const productElement = createProductElement(product);
        gridContainer.appendChild(productElement);
    });
}

function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
        <img src="${product.image[0]}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <h4>GH₵${parseFloat(product.price.replace(/,/g, '')).toFixed(2)}</h4>
        <div class="product-buttons">
            <button class="addToCart-button" data-product-name="${product.name}" data-product-price="${parseFloat(product.price.replace(/,/g, ''))}" data-product-image="${product.image[0]}" data-product-description="${product.description}">Add to Cart</button>
            <button class="view-details" data-product-name="${product.name}">View More Details</button>
        </div>
    `;
    return productElement;
}

function setupEventListeners() {
    document.addEventListener('click', handleButtonClick);
    document.getElementById('searchBar').addEventListener('input', filterProducts);
    document.getElementById('modal-overlay').addEventListener('click', closeModal);
    document.getElementById('popup').addEventListener('click', closePopup);
    document.querySelector('.cartIcon').addEventListener('click', toggleCart);
}

function handleButtonClick(event) {
    if (event.target.classList.contains('addToCart-button')) {
        const productName = event.target.getAttribute('data-product-name');
        const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
        const productImage = event.target.getAttribute('data-product-image');
        const productDescription = event.target.getAttribute('data-product-description');
        addToCart(productName, productPrice, productImage, productDescription);
    } else if (event.target.classList.contains('view-details')) {
        const productName = event.target.getAttribute('data-product-name');
        const product = productsDetails.find(p => p.name === productName);
        showModal(product.name, product.description, product.price, product.image);
    } else if (event.target.classList.contains('remove-item')) {
        const productName = event.target.getAttribute('data-product-name');
        removeFromCart(productName);
    } else if (event.target.classList.contains('increment')) {
        const productName = event.target.getAttribute('data-product-name');
        incrementQuantity(productName);
    } else if (event.target.classList.contains('decrement')) {
        const productName = event.target.getAttribute('data-product-name');
        decrementQuantity(productName);
    }
}

function addToCart(productName, productPrice, productImage, productDescription) {
    if (!cartItems[productName]) {
        cartItems[productName] = {
            price: productPrice,
            image: productImage,
            description: productDescription,
            quantity: 1
        };
    } else {
        cartItems[productName].quantity++;
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(productName) {
    delete cartItems[productName];
    saveCart();
    updateCartUI();
}

function incrementQuantity(productName) {
    cartItems[productName].quantity++;
    saveCart();
    updateCartUI();
}

function decrementQuantity(productName) {
    if (cartItems[productName].quantity > 1) {
        cartItems[productName].quantity--;
    } else {
        removeFromCart(productName);
    }
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function updateCartUI() {
    const cartList = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    const cartCountElement = document.querySelector('.cart-count');
    cartList.innerHTML = '';
    total = 0;
    cartCount = 0;

    Object.keys(cartItems).forEach((productName) => {
        const item = cartItems[productName];
        total += item.price * item.quantity;
        cartCount += item.quantity;
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${productName}">
            <span>${productName} (x${item.quantity}) - GH₵${(item.price * item.quantity).toFixed(2)}</span>
            <button class="decrement" data-product-name="${productName}">-</button>
            <button class="increment" data-product-name="${productName}">+</button>
            <button class="remove-item" data-product-name="${productName}">Remove</button>
        `;
        cartList.appendChild(listItem);
    });

    totalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cartCount;
}

function filterProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h2').textContent.toLowerCase();
        product.style.display = name.includes(searchQuery) ? '' : 'none';
    });
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function toggleCart() {
    document.getElementById('cart-pane').classList.toggle('active');
}
