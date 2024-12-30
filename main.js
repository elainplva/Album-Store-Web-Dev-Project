const listProductHTML = document.querySelector('.listProduct');
const listCartHTML = document.querySelector('.listCart');
const searchInput = document.querySelector('input[type="search"]'); // Reference to the search input
const searchForm = document.querySelector('form[role="search"]'); // Reference to the search form
const iconCart = document.querySelector('.icon-cart');
const iconCartSpan = document.querySelector('.icon-cart span');
const body = document.querySelector('body');
const closeCart = document.querySelector('.close');
const checkOutButton = document.querySelector('.checkOut');
let products = [];
let cart = [];

// Toggle cart display
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

checkOutButton.addEventListener('click', () => {
    addCartToMemory(); // Ensure the cart is saved
    window.location.href = 'checkout.html'; // Redirect to the checkout page
});



// Render products
const addDataToHTML = (filteredProducts = products) => {
    listProductHTML.innerHTML = ''; // Clear previous products
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">€${product.price}</div>
                <button class="addCart">Add to cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    } else {
        listProductHTML.innerHTML = `<p>No products found.</p>`;
    }
};

// Search functionality
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const query = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );
    addDataToHTML(filteredProducts); // Display only the matching products
});

// Add product to cart
listProductHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        const product_id = event.target.parentElement.dataset.id;
        addToCart(product_id);
    }
});

// Add item to cart
const addToCart = (product_id) => {
    const positionInCart = cart.findIndex(item => item.product_id == product_id);
    if (positionInCart < 0) {
        cart.push({ product_id: product_id, quantity: 1 });
    } else {
        cart[positionInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

// Save cart to localStorage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Render cart items
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;

        const product = products.find(p => p.id == item.product_id);
        if (product) {
            const newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            newItem.innerHTML = `
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="name">${product.name}</div>
                <div class="totalPrice">€${product.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            listCartHTML.appendChild(newItem);
        }
    });

    iconCartSpan.innerText = totalQuantity;
};

// Update item quantity in cart
listCartHTML.addEventListener('click', (event) => {
    const product_id = event.target.parentElement.parentElement.dataset.id;
    if (event.target.classList.contains('minus')) {
        changeQuantityCart(product_id, 'minus');
    } else if (event.target.classList.contains('plus')) {
        changeQuantityCart(product_id, 'plus');
    }
});

// Change quantity in cart
const changeQuantityCart = (product_id, type) => {
    const index = cart.findIndex(item => item.product_id == product_id);
    if (index >= 0) {
        if (type === 'plus') {
            cart[index].quantity += 1;
        } else if (type === 'minus' && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); // Remove item if quantity becomes zero
        }
        addCartToHTML();
        addCartToMemory();
    }
};

// Initialize app
const initApp = () => {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products.');
            }
            return response.json();
        })
        .then(data => {
            products = data;
            addDataToHTML();
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => console.error('Error:', error));
};

initApp();