const inventory = [
    { id: 1, name: "Desert Rose Bouquet", price: 45, category: "arrangements" },
    { id: 2, name: "Crystal Floral Vase", price: 30, category: "arrangements" },
    { id: 3, name: "Pruning Shears", price: 15, category: "supplies" },
    { id: 4, name: "Satin Ribbon Pack", price: 10, category: "supplies" },
    { id: 5, name: "Premium Wrapping Paper", price: 12, category: "supplies" }
];

let cart = [];

function renderProducts() {
    const productList = document.getElementById('product-list');
    const supplyList = document.getElementById('supply-list');

    inventory.forEach(item => {
        const card = `
            <div class="product-card">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button class="cta" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        if(item.category === "arrangements") productList.innerHTML += card;
        else supplyList.innerHTML += card;
    });
}

function addToCart(id) {
    const item = inventory.find(i => i.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-btn').innerText = `Cart (${cart.length})`;
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    
    cartItems.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        cartItems.innerHTML += `<li>${item.name} - $${item.price}</li>`;
        total += item.price;
    });
    totalSpan.innerText = total;
}

// Simple Modal Toggle
document.getElementById('cart-btn').onclick = () => {
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

// Initialize
renderProducts();