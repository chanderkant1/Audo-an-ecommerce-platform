function displayCartItems() {
    var cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    var cartData = JSON.parse(localStorage.getItem('cart')) || {};
    for (var productId in cartData) {
        var quantity = cartData[productId];


        productId = parseInt(productId);

        var productDetails = getProductDetails(productId);
        var productImage = productDetails.image;
        var productName = productDetails.name;
        var productPrice = productDetails.price;
        var itemHTML = `<div class="cart-item-data">
        <div class="cart-item-image"> 
        <img src="${productImage}" alt="">
        </div>
        <div class="cart-item-name">~${productName}~
        </div>
        <div class="cart-item-price">${productPrice}
        </div>
        <div class="cart-item-quantity">
            <button class="sub-quan" onclick="updateQuantity(${productId}, -1)">-</button> ${quantity}
            <button class="add-quan" onclick="updateQuantity(${productId}, 1)">+</button>
        </div>
        <div class="cart-item-totalprice">Total~${productPrice * quantity}
        </div>
        </div>`;
        cartItemsDiv.innerHTML += itemHTML;
    }
}

// Call displayCartItems when the cart page is loaded
window.addEventListener('load', displayCartItems);

// ... (Your existing JavaScript code)

function applyCoupon() {
    var couponInput = document.getElementById('couponInput');
    var couponValidDiv = document.querySelector('.coupon-valid');
    var valDiv = document.querySelector('.val');
    var totalValue = calculateTotalValue();
    if (couponInput.value.toLowerCase() === 'welcome22') {
        // Assuming total value is calculated and stored in the variable 'totalValue'

        var discount = 0.1 * totalValue;

        couponValidDiv.innerHTML = `Coupon is valid! You get a 10% discount: -Rs.${discount.toFixed(2)}`;
        valDiv.textContent = `TOTAL PRODUCT VALUE: Rs.${(totalValue - discount).toFixed(2)}`;
    } else {
        couponValidDiv.textContent = 'Coupon is not valid.';

        valDiv.textContent = `TOTAL PRODUCT VALUE: Rs.${totalValue.toFixed(2)}`;
    }
}
// Function to display total value
function displayTotalValue() {
    var totalValueDiv = document.querySelector('.val');
    var totalValue = calculateTotalValue();
    totalValueDiv.textContent = `TOTAL PRODUCT VALUE: Rs.${totalValue.toFixed(2)}`;
}

// Call displayTotalValue when the page is loaded
window.addEventListener('load', function () {
    displayTotalValue();
});
function calculateTotalValue() {
    // Modify this function to calculate the total value of the cart
    var cartData = JSON.parse(localStorage.getItem('cart')) || {};
    var totalValue = 0;

    for (var productId in cartData) {
        var quantity = cartData[productId];
        var productDetails = getProductDetails(parseInt(productId));
        totalValue += productDetails.price * quantity;
    }

    return totalValue;
}

// ... (Your existing JavaScript code)


function updateQuantity(productId, quantityChange) {
    var cartData = JSON.parse(localStorage.getItem('cart')) || {};

    // Update quantity
    cartData[productId] = (cartData[productId] || 0) + quantityChange;

    // Remove item if quantity is zero
    if (cartData[productId] <= 0) {
        delete cartData[productId];
    }

    // Save updated cart data
    localStorage.setItem('cart', JSON.stringify(cartData));

    // Update the displayed cart items
    displayCartItems();
    // Update the total value display
    applyCoupon();
    displayTotalValue();
}
function displayTotalValue() {
    var totalValueDiv = document.querySelector('.val');
    var totalValue = calculateTotalValue();
    totalValueDiv.textContent = `TOTAL PRODUCT VALUE: Rs.${totalValue.toFixed(2)}`;
}

var products = [
    { id: 1, name: "Bed", price: 19999, image: "img/bed.avif" },
    { id: 2, name: "Dining Table", price: 2000, image: "img/dinningtable.avif" },
    { id: 3, name: "Mirror", price: 3099, image: "img/dressing.avif" },
    { id: 4, name: "Silver Lamp", price: 7999, image: "img/lamp.avif" },
    { id: 5, name: "Hanging Lamp", price: 650, image: "img/lamp2.avif" },
    { id: 6, name: "Sofa Set", price: 799, image: "img/set.avif" },
    { id: 7, name: "Chair", price: 3000, image: "img/sofa.avif" },
    { id: 8, name: "Dressing Table", price: 499, image: "img/twm.avif" }
];
function getProductDetails(productId) {
    // Find the product in the products array based on its ID
    var product = products.find(product => product.id === productId);
    if (product) {
        return { name: product.name, price: product.price, image: product.image };
    } else {
        console.error('Product with ID', productId, 'not found.');
        return { name: 'Unknown', price: 0 }; // Return default values or handle the missing product case appropriately
    }
}

// Function to add an item to the cart
function addToCart(productId) {
    var cartData = JSON.parse(localStorage.getItem('cart')) || {};
    cartData[productId] = (cartData[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cartData));

    // Update cart count in the header
    updateCartCount();
}
