
import { state } from "./state.js";
import { getData } from "./dataService.js";
import { renderStats, renderOrders, renderProducts } from "./view.js";

async function init() {
    const errorMessage = document.getElementById("errorMessage");

    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    try {
        const data = await getData();

        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        console.log("Customers:", state.customers);
        console.log("Products:", state.products);
        console.log("Orders:", state.orders);

        renderStats(state);
        renderOrders(state);
        renderProducts(state);

        // Recherche par nom du client
        searchInput.addEventListener("input", () => {
            state.search = searchInput.value.trim();
            renderOrders(state);
        });

        // Filtrer par statut
        statusFilter.addEventListener("change", () => {
            state.status = statusFilter.value;
            renderOrders(state);
        });

        // Filtrer par catégorie
        categoryFilter.addEventListener("change", () => {
            state.category = categoryFilter.value;
            renderOrders(state);
        });

        errorMessage.classList.add("d-none");

    } catch (error) {
        console.error("Erreur :", error);

        errorMessage.textContent =
            "Impossible de charger les données. Vérifiez les fichiers JSON.";

        errorMessage.classList.remove("d-none");
    }
}

init();
