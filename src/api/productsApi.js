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
    console.log(product);
    return productsMock.products[0];
}