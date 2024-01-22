fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
.then(res => res.json())
.then(data => {
    const filteredProducts = data.filter(item => item.brand === "revlon" && item.product_type === "eyeliner");
    const maxPriceProduct = filteredProducts.reduce((maxProduct, currentProduct) => {
        const maxPrice = maxProduct.price * 5.50;
        const currentPrice = currentProduct.price * 5.50;
        return currentPrice > maxPrice ? currentProduct : maxProduct;
    });
    console.log(maxPriceProduct);
});
