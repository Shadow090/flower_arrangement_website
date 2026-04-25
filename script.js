// The inventory database
const inventory = [
    { id: 1, name: "Desert Rose Bouquet", price: 45.00, category: "arrangements" },
    { id: 2, name: "Crystal Floral Vase", price: 30.00, category: "arrangements" },
    { id: 3, name: "Spring Lily Arrangement", price: 55.00, category: "arrangements" },
    { id: 4, name: "Pruning Shears", price: 15.00, category: "supplies" },
    { id: 5, name: "Satin Ribbon Pack", price: 10.00, category: "supplies" },
    { id: 6, name: "Premium Wrapping Paper", price: 12.00, category: "supplies" }
];

// Cart state
let cart = [];

// 1. Render Products to the Page
function renderProducts() {
    const productList = document.getElementById('product-list');
    const supplyList = document.getElementById('supply-list');

    // Clear containers first
    if(productList) productList.innerHTML = "";
    if(supplyList) supplyList.innerHTML = "";

    inventory.forEach(item => {
        const cardHTML = `
            <div class="product-card">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="cta add-to-cart" data-id="${item.id}">Add to Cart</button>
            </div>
        `;
        
        if (item.category === "arrangements" && productList) {
            productList.innerHTML += cardHTML;
        } else if (item.category === "supplies" && supplyList) {
            supplyList.innerHTML += cardHTML;
        }
    });
}

// 2. Update the Cart UI
function updateCartUI() {
    const cartBtn = document.getElementById('cart-btn');
    const cartItemsList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    
    // Update header button
    cartBtn.innerText = `Cart (${cart.length})`;
    
    // Update modal list
    cartItemsList.innerHTML = "";
    if (cart.length === 0) {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    } else {
        cart.forEach((item, index) => {
            cartItemsList.innerHTML += `
                <li style="margin-bottom: 8px;">
                    ${item.name} - $${item.price.toFixed(2)}
                    <button class="remove-item" data-index="${index}" style="margin-left: 10px; cursor: pointer;">X</button>
                </li>
            `;
        });
    }
    
    // Calculate and update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.innerText = total.toFixed(2);
}

// 3. Global Event Listener (Handles all dynamic button clicks)
document.addEventListener('click', (e) => {
    
    // Add to Cart Logic
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = inventory.find(i => i.id === productId);
        if (item) {
            cart.push(item);
            updateCartUI();
            alert(`Added ${item.name} to your cart!`);
        }
    }

    // Remove from Cart Logic
    if (e.target.classList.contains('remove-item')) {
        const indexToRemove = parseInt(e.target.getAttribute('data-index'));
        cart.splice(indexToRemove, 1); // Removes 1 item at the specific index
        updateCartUI();
    }

    // Book a Class Logic
    if (e.target.id === 'book-class-btn') {
        // We can add a dummy class product to the cart
        const classItem = { id: 99, name: "Weekend Arrangement Class", price: 99.00 };
        cart.push(classItem);
        updateCartUI();
        alert("Added Class Booking to your cart!");
    }

    // Consultation Buttons
    if (e.target.classList.contains('contact-btn')) {
        alert("This would open a contact form or email link for staging consultations!");
    }
});

// 4. Modal Open/Close & Checkout Logic
document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cart-modal');
    const openCartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Open Modal
    openCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
    });

    // Close Modal
    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // Checkout Process
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Add some items before checking out.");
            return;
        }
        
        // Simulate a successful purchase
        alert("Thank you for your purchase! Your order has been placed.");
        
        // Clear the cart and update the UI
        cart = [];
        updateCartUI();
        cartModal.classList.add('hidden');
    });

    // Initialize the page on load
    renderProducts();
    updateCartUI();
});
