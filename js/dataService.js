
export async function getData() {
    try {
        const customersResponse = await fetch("./data/customers.json");
        const productsResponse = await fetch("./data/products.json");
        const ordersResponse = await fetch("./data/orders.json");

        if (
            !customersResponse.ok ||
            !productsResponse.ok ||
            !ordersResponse.ok
        ) {
            throw new Error("Erreur lors du chargement des données");
        }

        const customers = await customersResponse.json();
        const products = await productsResponse.json();
        const orders = await ordersResponse.json();

        return { customers, products, orders };

    } catch (error) {
        console.error("Erreur :", error);
        throw new Error("Impossible de charger les données.");
    }
}
