import { productImages } from "../js/index_array.js";

var gridContainer = document.getElementById('grid_container');



document.addEventListener('DOMContentLoaded', () => {
    productImages.forEach(product =>{
        gridContainer.innerHTML += `<div class="card">
                <img class="card_image" src="${product.image}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <h4>${product.price}</h4>
                <button class="card_button">Add to Cart</button>
            </div>`
    })
});