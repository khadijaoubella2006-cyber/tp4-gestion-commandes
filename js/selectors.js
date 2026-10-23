
export function getOrderDetails(order, state) {
    const customer = state.customers.find(
        customer => customer.id === order.customerId );
    const items = order.items.map(item => {
        const product = state.products.find(
            product => product.id === item.productId );
        const lineTotal = product.price * item.quantity;
        return {
            product: product,
            quantity: item.quantity,
            lineTotal: lineTotal};});
    const total = items.reduce(
        (sum, item) => sum + item.lineTotal,
        0 );
    return {
        customer: customer,
        items: items,
        total: total};}
export function getFilteredOrders(state) {
return state.orders.filter(order => {
 const matchesStatus =
     state.status === "all" ||
     order.status === state.status;
 const customer = state.customers.find(
     customer => customer.id === order.customerId );
const matchesSearch =
    customer &&customer.name.toLowerCase().includes(
     state.search.toLowerCase() );
const matchesCategory =
 state.category === "all" ||
order.items.some(item => {
 const product = state.products.find(
     product => product.id === item.productId);
return product &&product.category === state.category; });
 return matchesStatus && matchesSearch && matchesCategory;});}
export function getTotalAmount(state) {
    return state.orders.reduce((sum, order) => {
        const details = getOrderDetails(order, state);
        return sum + details.total;

    }, 0);
}
