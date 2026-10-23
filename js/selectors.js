
/* 1. Récupérer les détails d'une commande */
export function getOrderDetails(order, state) {

    // Chercher le client associé à la commande
    const customer = state.customers.find(
        customer => customer.id === order.customerId
    );

    // Récupérer les produits commandés et calculer les totaux
    const items = order.items.map(item => {

        const product = state.products.find(
            product => product.id === item.productId
        );

        const lineTotal = product.price * item.quantity;

        return {
            product: product,
            quantity: item.quantity,
            lineTotal: lineTotal
        };
    });

    // Calculer le total de la commande
    const total = items.reduce(
        (sum, item) => sum + item.lineTotal,
        0
    );

    return {
        customer: customer,
        items: items,
        total: total
    };
}


/* 2. Filtrer les commandes */
export function getFilteredOrders(state) {

    return state.orders.filter(order => {

        // Filtrer par statut
        const matchesStatus =
            state.status === "all" ||
            order.status === state.status;

        // Trouver le client de la commande
        const customer = state.customers.find(
            customer => customer.id === order.customerId
        );

        // Filtrer par nom du client
        const matchesSearch =
            customer &&
            customer.name.toLowerCase().includes(
                state.search.toLowerCase()
            );

        // Vérifier si un produit de la commande correspond
        // à la catégorie sélectionnée
        const matchesCategory =
            state.category === "all" ||
            order.items.some(item => {

                const product = state.products.find(
                    product => product.id === item.productId
                );

                return product &&
                    product.category === state.category;
            });

        // Les trois conditions doivent être respectées
        return matchesStatus && matchesSearch && matchesCategory;
    });
}


/* 3. Calculer le montant total de toutes les commandes */
export function getTotalAmount(state) {

    return state.orders.reduce((sum, order) => {

        const details = getOrderDetails(order, state);

        return sum + details.total;

    }, 0);
}
