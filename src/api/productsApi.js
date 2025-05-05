import http from '../api/http'

const productsMock = {
    products: Array.from({ length: 100 }, (_, i) => ({
        _id: String(i + 1),
        product_barcode: `${100000000000 + i}`,
        product_brand: `Brand ${String.fromCharCode(65 + (i % 26))}`,
        product_name: `Name ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
        product_description: `Description ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    })),
};

export default productsMock;

export async function addProduct(product) {
    let result;
    try {
        const response = await http.post(`/products`, product);
        result = { products: response.data.data, error: response.data.error };
    } catch (error) {
        result = { products: {}, error: true };
    }
    return result;
}

export async function getProducts(options) {
    let result;
    try {
        const response = await http.get('/products', {
            params: options,
        });
        result = { products: response.data.data, totals: response.data.totals, error: response.data.error };
    } catch (error) {
        result = { products: [], totals: 0, error: true };
    }
    return result;
}

export async function getProductById(id) {
    let result;
    try {
        const response = await http.get(`/products/${id}`);
        result = { products: response.data.data, error: response.data.error };
    } catch (error) {
        result = { products: {}, error: true };
    }
    return result;
}

export async function updateProduct(id, product) {
    let result;
    try {
        const response = await http.put(`/products/${id}`, product);
        result = { products: response.data.data, error: response.data.error };
    } catch (error) {
        result = { products: {}, error: true };
    }
    return result;
}

export async function deleteProduct(id) {
    let result;
    try {
        const response = await http.delete(`/products/${id}`);
        result = { products: response.data.data, error: response.data.error };
    } catch (error) {
        result = { products: {}, error: true };
    }
    return result;
}