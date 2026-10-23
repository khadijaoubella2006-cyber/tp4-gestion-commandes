import {
    getOrderDetails,
    getFilteredOrders,
    getTotalAmount
} from "./selectors.js";

function getStatusBadge(status) {
    if (status === "Livrée") return "bg-success";
    if (status === "En cours") return "bg-warning text-dark";
    if (status === "Annulée") return "bg-danger";
    return "bg-secondary";
}

export function renderStats(state) {
    document.getElementById("totalCustomers").textContent =
        state.customers.length;

    document.getElementById("totalProducts").textContent =
        state.products.length;

    document.getElementById("totalOrders").textContent =
        state.orders.length;

    document.getElementById("totalAmount").textContent =
        getTotalAmount(state).toFixed(2) + " DH";
}

export function renderOrders(state) {
    const container = document.getElementById("ordersContainer");
    const orders = getFilteredOrders(state);

    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML =
            '<tr><td colspan="6" class="text-center">Aucune commande trouvée</td></tr>';
        return;
    }

    orders.forEach(order => {
        const details = getOrderDetails(order, state);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${details.customer.name}</td>
            <td>${order.date}</td>
            <td><span class="badge ${getStatusBadge(order.status)}">${order.status}</span></td>
            <td>${details.total.toFixed(2)} DH</td>
            <td>
                <button class="btn btn-primary btn-sm detail-btn"
                        data-id="${order.id}">
                    Détails
                </button>
            </td>
        `;

        container.appendChild(row);
    });

    document.querySelectorAll(".detail-btn").forEach(button => {
        button.addEventListener("click", () => {
            const orderId = Number(button.dataset.id);
            const order = state.orders.find(item => item.id === orderId);

            if (order) {
                renderOrderDetails(order, state);
            }
        });
    });
}

export function renderOrderDetails(order, state) {
    const section = document.getElementById("orderDetails");
    const content = document.getElementById("orderDetailsContent");
    const details = getOrderDetails(order, state);

    content.innerHTML = `
        <p><strong>Commande :</strong> #${order.id}</p>
        <p><strong>Client :</strong> ${details.customer.name}</p>
        <p><strong>Ville :</strong> ${details.customer.city}</p>
        <p><strong>Date :</strong> ${order.date}</p>
        <p><strong>Statut :</strong> <span class="badge ${getStatusBadge(order.status)}">${order.status}</span></p>

        <h5>Produits commandés</h5>

        <table class="table">
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${details.items.map(item => `
                    <tr>
                        <td>${item.product.name}</td>
                        <td>${item.product.price} DH</td>
                        <td>${item.quantity}</td>
                        <td>${item.lineTotal.toFixed(2)} DH</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>

        <h5>Total : ${details.total.toFixed(2)} DH</h5>
    `;

    section.classList.remove("d-none");
}

export function renderProducts(state) {
    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    state.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p>${product.category}</p>
                    <p>${product.price} DH</p>
                    <p>Stock : ${product.stock}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}