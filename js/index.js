import { productsDetails } from '../js/index_array.js';

let total = 0;
let cartCount = 0;
let cartItems = {};

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();
    
    const gridContainer = document.getElementById("productGrid");

    productsDetails.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        const productName = product.name;
        const productImages = product.image;
        const productDescription = product.description;
        const productPrice = product.price.replace('GH₵', '');

        productElement.innerHTML = `
            <img src="${productImages[0]}">
            <h2>${productName}</h2>
            <p>${productDescription}</p>
            <h4>GH₵${productPrice}</h4>
            <div class="product-buttons">
                <button class="addToCart-button" data-product-name="${productName}" data-product-price="${productPrice}">Add to Cart</button>
                <button class="view-details" data-product-name="${productName}">View More Details</button>
            </div>
        `;
        gridContainer.appendChild(productElement);
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('addToCart-button')) {
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
            addToCart(productName, productPrice);
        } else if (event.target.classList.contains('view-details')) {
            const productName = event.target.getAttribute('data-product-name');
            const product = productsDetails.find(p => p.name === productName);
            showModal(product.name, product.description, product.price, product.image);
        }
    });

    document.getElementById('searchBar').addEventListener('input', filterProducts);

    document.getElementById('modal-overlay').onclick = closeModal;
    
});

function addToCart(product, price) {
    if (cartItems[product]) {
        cartItems[product].quantity += 1;
    } else {
        cartItems[product] = {
            price: price,
            quantity: 1
        };
    }

    updateCart();
    saveCart();
    showPopup(product);
}

function showPopup(product) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = `${product} successfully added to the cart!`;
    popup.style.display = 'block';

    document.getElementById('popup').onclick = closePopup;
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function updateCart() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';

    total = 0;
    cartCount = 0;

    for (const product in cartItems) {
        const listItem = document.createElement('li');
        const item = cartItems[product];

        listItem.textContent = `${product} - ${item.price} x ${item.quantity}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.onclick = function() {
            removeFromCart(product);
        };

        listItem.appendChild(removeButton);
        cart.appendChild(listItem);

        total += item.price * item.quantity;
        cartCount += item.quantity;
    }

    document.getElementById('total').textContent = total.toFixed(2);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartCount);
}

function removeFromCart(product) {
    if (cartItems[product]) {
        total -= cartItems[product].price * cartItems[product].quantity;
        cartCount -= cartItems[product].quantity;
        delete cartItems[product];
        updateCart();
        saveCart();
    }
}

function toggleCart() {
    const cartPane = document.getElementById('cart-pane');
    cartPane.classList.toggle('open');
}

document.querySelector('.cart').addEventListener('click', toggleCart);

function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total);
    localStorage.setItem('cartCount', cartCount);
}

function loadCart() {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
        cartItems = savedCartItems;

        total = parseFloat(localStorage.getItem('cartTotal'));
        cartCount = parseInt(localStorage.getItem('cartCount'));
        updateCart();
    }
}


function removeAll() {
    console.log("Remove All button clicked"); // Debugging line
    cartItems = {};
    total = 0;
    cartCount = 0;
    updateCart();
    saveCart();
}

function filterProducts() { 
    const searchBar = document.getElementById('searchBar'); 
    const filter = searchBar.value.toLowerCase(); 
    const productGrid = document.getElementById('productGrid'); 
    const products = productGrid.getElementsByClassName('product'); 
    Array.from(products).forEach((product) => { 
        const productName = product.getElementsByTagName('h2')[0].textContent.toLowerCase(); 
        if (productName.includes(filter)) { 
            product.style.display = ''; 
        } else { 
            product.style.display = 'none'; 
        } 
    });
}

var modal = document.getElementById("product-modal");
var modalOverlay = document.getElementById("modal-overlay");

function showModal(productName, productDescription, productPrice, productImages) {
    document.getElementById("modal-title").innerText = productName;
    document.getElementById("modal-description").innerText = productDescription;
    document.getElementById("modal-price").innerText = "GH₵" + productPrice;

    var modalImagesDiv = document.getElementById("modal-images");
    modalImagesDiv.innerHTML = `
        <button class="prev" onclick="changeSlide(-1)">&#10094;</button>
        <div class="slides-container"></div>
        <button class="next" onclick="changeSlide(1)">&#10095;</button>
    `;

    var slidesContainer = modalImagesDiv.querySelector('.slides-container');
    productImages.forEach(image => {
        var imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.className = 'slide';
        slidesContainer.appendChild(imgElement);
    });

    showSlides(slideIndex);

    modal.style.display = "block";
    modalOverlay.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
}

var slideIndex = 0;
function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("slide");
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

modalOverlay.onclick = closeModal;

document.getElementById('popup').onclick = closePopup;
