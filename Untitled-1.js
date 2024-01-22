fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
.then(res => res.json())
.then(data => {
    let maxValue = 0;

    data.forEach(item => {
        if (item.price * 5,50 > maxValue) {
            maxValue = item.name;
        }
    });
    console.log(maxValue)
});