import { productsDetails } from '../js/product.js';

let total = 0;
let cartCount = 0;
let cartItems = {};

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();
    const gridContainer = document.getElementById("productGrid");
    
    // Generate product elements
    productsDetails.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        const productName = product.name;
        const productImages = product.image;
        const productDescription = product.description;
        const productPrice = parseFloat(product.price.replace(/,/g, ''));

        productElement.innerHTML = `
            <img src="${productImages[0]}" alt="${productName}">
            <h2>${productName}</h2>
            <p>${productDescription}</p>
            <h4>GH₵${productPrice.toFixed(2)}</h4>
            <div class="product-buttons">
                <button class="addToCart-button" data-product-name="${productName}" data-product-price="${productPrice}" data-product-image="${productImages[0]}" data-product-description="${productDescription}">Add to Cart</button>
                <button class="view-details" data-product-name="${productName}">View More Details</button>
            </div>
        `;
        gridContainer.appendChild(productElement);
    });

    // Event delegation for buttons
    document.addEventListener('click', function (event) {
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
    });

    // Event listeners for search and modal/popup
    document.getElementById('searchBar').addEventListener('input', filterProducts);
});

// Function to add items to the cart
function addToCart(productName, productPrice, productImage, productDescription) {
    if (!cartItems[productName]) {
        cartItems[productName] = {
            price: productPrice,
            quantity: 1,
            image: productImage,
            description: productDescription
        };
        cartCount++;
    } else {
        cartItems[productName].quantity++;
    }
    updateCart();
    saveCart();
}

// Function to remove items from the cart
function removeFromCart(productName) {
    if (cartItems[productName]) {
        total -= cartItems[productName].price * cartItems[productName].quantity;
        cartCount -= cartItems[productName].quantity;
        delete cartItems[productName];
    }
    updateCart();
    saveCart();
}

// Function to increment item quantity
function incrementQuantity(productName) {
    cartItems[productName].quantity++;
    updateCart();
    saveCart();
}

// Function to decrement item quantity
function decrementQuantity(productName) {
    if (cartItems[productName].quantity > 1) {
        cartItems[productName].quantity--;
    } else {
        removeFromCart(productName);
    }
    updateCart();
    saveCart();
}

// Function to update the cart UI
function updateCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    total = 0;
    for (const [productName, item] of Object.entries(cartItems)) {
        total += item.price * item.quantity;
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${productName}">
                <div class="cart-item-details">
                    <p>${productName}</p>
                    <p>${item.description}</p>
                    <p>GH₵${item.price.toFixed(2)} x ${item.quantity}</p>
                    <div class="quantity-controls">
                        <button class="decrement" data-product-name="${productName}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increment" data-product-name="${productName}">+</button>
                    </div>
                    <button class="remove-item" data-product-name="${productName}"><i class="fas fa-trash"></i> Remove</button>
                </div>
            </div>
        `;
        cartList.appendChild(cartItem);
    }
    document.getElementById('total').innerText = total.toFixed(2);
    document.querySelector('.cart-count').innerText = cartCount;
}

// Function to save cart data to localStorage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('total', total.toFixed(2));
}

// Function to load cart data from localStorage
function loadCart() {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    total = parseFloat(localStorage.getItem('total')) || 0;
    updateCart();
}

// Function to toggle the cart pane
// function toggleCart() {
//     console.log('toggleCart triggered'); // Debugging log
//     const cartPane = document.getElementById('cart-pane');
//     if (!cartPane) {
//         console.error('Cart pane element not found');
//         return;
//     }
//     cartPane.classList.toggle('active');
// }

// close the cart pane
document.getElementById("close_pane").addEventListener('click', () => {
    const cart_pane = document.getElementById('cart-pane');
    cart_pane.style.display = "none";
})


// Functionality for cart icon
const cart_icon = document.getElementById('cart-icon');
cart_icon.addEventListener('click', () => {
    
    const cart_pane = document.querySelector('.cart-pane.active');
    cart_pane.style.display = "block";
    
});

// Function to filter products based on search input
function filterProducts() {
    const searchBar = document.getElementById('searchBar').value.toLowerCase();
    const productElements = document.querySelectorAll('.product');

    productElements.forEach(productElement => {
        const productName = productElement.querySelector('h2').textContent.toLowerCase();
        productElement.style.display = productName.includes(searchBar) ? 'block' : 'none';
    });
}