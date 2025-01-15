

let total = 0;
let cartCount = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();
});

function addToCart(product, price) {
    const cart = document.getElementById('cart');
    const listItem = document.createElement('li');
    listItem.textContent = `${product} - GH₵${price}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.onclick = function() {
        cart.removeChild(listItem);
        updateTotal(-price);
        updateCartCount(-1);
        saveCart();
    };
    
    listItem.appendChild(removeButton);
    cart.appendChild(listItem);
    
    updateTotal(price);
    updateCartCount(1);
    saveCart();
    
    alert(`${product} successfully added to cart!`);
}

function updateTotal(amount) {
    total += amount;
    document.getElementById('total').textContent = total.toFixed(2);
}

function updateCartCount(count) {
    cartCount += count;
    document.querySelector('.cart-count').textContent = cartCount;
}

function toggleCart() {
    const cartPane = document.getElementById('cart-pane');
    cartPane.style.display = cartPane.style.display === 'block' ? 'none' : 'block';
}

function saveCart() {
    const cartItems = [];
    const cart = document.getElementById('cart').children;
    for (let item of cart) {
        const product = item.firstChild.textContent;
        const price = parseFloat(product.split('$')[1]);
        cartItems.push({ product, price });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', total);
    localStorage.setItem('cartCount', cartCount);
}

function loadCart() {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
        const cart = document.getElementById('cart');
        savedCartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.product;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-button';
            removeButton.onclick = function() {
                cart.removeChild(listItem);
                updateTotal(-item.price);
                updateCartCount(-1);
                saveCart();
            };
            
            listItem.appendChild(removeButton);
            cart.appendChild(listItem);
        });
        
        total = parseFloat(localStorage.getItem('cartTotal'));
        cartCount = parseInt(localStorage.getItem('cartCount'));
        updateTotal(0); 
        updateCartCount(0);
    }
}
