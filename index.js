//import {products} from "./index_array";


/*
let customerProducts = JSON.parse(localStorage.getItem("customerProducts")) || []

var gridContainer = document.getElementById('grid_container');
console.log(gridContainer); // Check if gridContainer is correctly selected

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    productImages.forEach(product => {
        console.log(`Adding product: ${product.name}`);
        gridContainer.innerHTML += `<div class="card">
                <img class="card_image" src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <h4>${product.price}</h4>
                <button id="AddProduct${product.id}"  class="card_button">Add to Cart</button>
            </div>`;
    });
});


*/



//NEW LINE OF CODES

let total = 0;
let cartCount = 0;
let cartItems = {}; // Use an object to store cart items by product name

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();
});

function addToCart(product, price) {
    // Check if the product is already in the cart
    if (cartItems[product]) {
        // If product is already in the cart, increase the quantity
        cartItems[product].quantity += 1;
    } else {
        // If product is not in the cart, add it with quantity 1
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

        listItem.textContent = `${product} - GH₵${item.price} x ${item.quantity}`;
        
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
    cartPane.style.display = cartPane.style.display === 'block' ? 'none' : 'block';
}

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
    cartItems = {};
    total = 0;
    cartCount = 0;
    updateCart();
    saveCart();
}


// Filter search bar for products
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
};




 // Get the modal elements
var modal = document.getElementById("product-modal");
var modalOverlay = document.getElementById("modal-overlay");
var slideIndex = 0;

    // Function to show modal with product details
    function showModal(productName, productDescription, productPrice, productImages) {
    // Populate modal content
    document.getElementById("modal-title").innerText = productName;
    document.getElementById("modal-description").innerText = productDescription;
    document.getElementById("modal-price").innerText = "GH₵" + productPrice;

    // Clear existing images
    var modalImagesDiv = document.getElementById("modal-images");
    modalImagesDiv.innerHTML = "";

    // Add product images to modal
    productImages.forEach(image => {
        var imgElement = document.createElement("img");
        imgElement.src = image;
        modalImagesDiv.appendChild(imgElement);
    });

    // Display modal and overlay
    modal.style.display = "block";
    modalOverlay.style.display = "block";
    }

    // Function to close modal
    function closeModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
    }

    // Function to change slide 
    function changeSlide(n) { 
        var slides = document.getElementsByClassName("slide"); slideIndex += n; 
        if (slideIndex >= slides.length) { 
            slideIndex = 0; 
        } 
        if (slideIndex < 0) { 
            slideIndex = slides.length - 1; 
        } 
        for (var i = 0; i < slides.length; i++) { 
            slides[i].style.display = "none"; 
        } 
        slides[slideIndex].style.display = "block"; 
    }

    // Attach event listeners to "View More Details" buttons
    document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function () {
        var product = this.closest('.product');
        var productName = product.getAttribute('data-name');
        var productDescription = product.getAttribute('data-description');
        var productPrice = product.getAttribute('data-price');
        var productImages = JSON.parse(product.getAttribute('data-image'));

        showModal(productName, productDescription, productPrice, productImages);
    });
    });

    // Close modal when clicking outside of it
    modalOverlay.onclick = closeModal;



