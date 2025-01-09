import {productImages} from '../js/index_array';

var gridContainer = document.getElementById('grid_container');

    function displayCards(){
        productImages.forEach((product) => {

        var menuCard = document.createElement('div');
        var menuContent = document.createElement('div');
        var menuImage = document.createElement('img');
        var menuTitle = document.createElement('p');
        
        menuCard.className = 'card';
        menuTitle.className = 'label';
        menuTitle.style.fontSize = '200';

        menuImage.src = meal.image;
        menuTitle = meal.title;
        menuContent.append(menuImage);
        menuContent.append(menuTitle);
        menuCard.append(menuContent);
        gridContainer.append(menuCard);

        });
    };

    document.addEventListener('DOMContentLoaded', displayCards());