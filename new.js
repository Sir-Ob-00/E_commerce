import { productsDetails } from '../js/product.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event triggered");
    loadCart();
    const gridContainer = document.getElementById("productGrid");

    if (!gridContainer) {
        console.error("Grid container with id 'productGrid' not found.");
        return;
    }

    // Function to render products
    function renderProducts(products) {
        gridContainer.innerHTML = ""; // Clear the grid
        products.forEach((product) => {
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
                    <button class="addToCart-button" 
                            data-product-name="${productName}" 
                            data-product-price="${productPrice}" 
                            data-product-image="${productImages[0]}" 
                            data-product-description="${productDescription}">
                        Add to Cart
                    </button>
                    <button class="view-details" data-product-name="${productName}">
                        View More Details
                    </button>
                </div>
            `;
            gridContainer.appendChild(productElement);
        });
    }

    // Initial render of products
    renderProducts(productsDetails);

    // Search functionality
    window.filterProducts = () => {
        const searchTerm = document.getElementById("searchBar").value.toLowerCase();
        const filteredProducts = productsDetails.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    };

    // Cart functionality
    const cartIcon = document.getElementById("cartIcon");
    const cartCount = document.getElementById("cartCount"); // Cart count element
    const cartPane = document.getElementById("cartPane");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const cartItemsList = document.getElementById("cartItemsList");
    const cartTotalPrice = document.getElementById("cartTotalPrice");

    let cart = []; // To store cart items
    
    // Function to update the cart count
    function updateCartCount() {
        cartCount.textContent = cart.length; // Update cart count display
    }

    // Function to render cart items
    function renderCart() {
        cartItemsList.innerHTML = ""; // Clear the cart list
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>GH₵${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        // Update the total price
        cartTotalPrice.textContent = total.toFixed(2);
    }

    // Function to add product to the cart
    function addToCart(product) {
        cart.push(product);
        renderCart();
        updateCartCount(); // Update the cart count
        showCartPane(); // Show cart pane after adding an item
    }

    // Function to remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
        updateCartCount(); // Update the cart count after removal
    }

    // Function to show the cart pane
    function showCartPane() {
        console.log("Showing cart pane");
        cartPane.style.display = "block";
    }

    // Function to hide the cart pane
    function hideCartPane() {
        console.log("Hiding cart pane");
        cartPane.style.display = "none";
    }

    // Event listeners for cart pane toggle
    cartIcon.addEventListener("click", () => {
        console.log("Cart icon clicked");
        if (cartPane.style.display === "none" || cartPane.style.display === "") {
            showCartPane(); // Show the cart if it's hidden
        } else {
            hideCartPane(); // Hide the cart if it's visible
        }
    });

    // Event listener for close button in the cart pane
    closeCartBtn.addEventListener("click", hideCartPane);

    // Event listener for checkout button
    checkoutBtn.addEventListener("click", () => {
        alert("Proceeding to checkout!");
    });

    // Function to handle "View More Details" click
    function viewProductDetails(productName) {
        console.log(`Viewing details for: ${productName}`);
    }

    // Event delegation for buttons
    gridContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("addToCart-button")) {
            const button = event.target;
            const product = {
                name: button.getAttribute("data-product-name"),
                price: parseFloat(button.getAttribute("data-product-price")),
                image: button.getAttribute("data-product-image"),
                description: button.getAttribute("data-product-description"),
            };
            addToCart(product);
        }

        if (event.target.classList.contains("view-details")) {
            const productName = event.target.getAttribute("data-product-name");
            viewProductDetails(productName);
        }
    });
});

function loadCart() {
    console.log("Cart loaded");
}

function addToCart(product) {
    console.log(`Added to cart: ${product.name}`);
}

function viewProductDetails(productName) {
    console.log(`Viewing details for: ${productName}`);
}
