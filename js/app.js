
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    filterListener();
});

async function fetchProducts() {
    try{
        const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
        const products = await response.json();
        allProducts = products;
        displayProducts(products);
    }  catch (error) {
        console.error(error);
    }

    function displayProducts(products){
        const productList = document.getElementById('catalog');
        productList.innerHTML = '';
        products.forEach(product => {
            const priceConverted = (product.price * 5.5).toFixed(2);
            const productElement = document.createElement('div');
            productElement.className = 'product-item';

            const image = document.createElement('img');
            image.className = 'product-image';
            image.src = product.image_link;
            image.alt = product.name;

            const productInfo = `
            <h2 class="product-name">${product.name}</h2>
            <div class="product-details">
                <span class="product-brand">${product.brand || ''}</span>
                <span class="product-price">$${priceConverted}</span>
            </div>
            `;
            productElement.appendChild(image);
            productElement.innerHTML += productInfo;
            productList.appendChild(productElement);
        });
    }
}

function filterListener() {
    document.getElementById('filter-name').addEventListener('input', handleFilterChange);
    document.getElementById('filter-brand').addEventListener('input', handleFilterChange);
    document.getElementById('sort-type').addEventListener('change', handleSortChange);
}

function handleFilterChange() {
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const brandFilter = document.getElementById('filter-brand').value.toLowerCase();

    const filteredProducts = allProducts.filter(product => {
        const matchName = product.name.toLowerCase().includes(nameFilter);
        const matchBrand = !brandFilter || product.brand?.toLowerCase().includes(brandFilter);
        return matchName && matchBrand;
    });
    displayProducts(filteredProducts);
}

function handleSortChange(){
    const sortType = document.getElementById('sort-type').value;
    let sortedProducts = [];
    switch(sortType){
        case 'Melhor Avaliados':
            sortedProducts = [...allProducts].sort((a, b) => b.rating - a.rating);
            break;
        case 'Menor Preço':
            sortedProducts = [...allProducts].sort((a, b) => a.price - b.price);
            break;
        case 'Maior Preço':            
            sortedProducts = [...allProducts].sort((a, b) => b.price - a.price);
            break;
        case 'Ordem Alfabética':
            sortedProducts = [...allProducts].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'Z-A':
            sortedProducts = [...allProducts].sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            sortedProducts = [...allProducts];
    }
    displayProducts(sortedProducts);
}