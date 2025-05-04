import http from '../api/http'

const productsMock = {
    products: Array.from({ length: 100 }, (_, i) => ({
        id: String(i + 1),
        product_barcode: `${100000000000 + i}`,
        product_brand: `Brand ${String.fromCharCode(65 + (i % 26))}`,
        product_name: `Name ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
        product_description: `Description ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    })),
};

export default productsMock;

export async function addProduct(product) {
    const response = await http.post(`/products`, product);
    return response.data.data;
}

export async function getProducts(options) {
    const response = await http.get('/products');
    return response.data.data;
}