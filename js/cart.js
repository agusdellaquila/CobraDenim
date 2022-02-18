let getCarrito = localStorage.getItem('carritoEnJson');
let carrito = JSON.parse(getCarrito);

let getArrayPrendas = localStorage.getItem('arrayStock');
let arrayPrendas = JSON.parse(getArrayPrendas);

let total = totalCartPrice(carrito);

//---------Mostrar items en carro------
showItemsOnCart(carrito);

// //---------Mostrar burbuja en carro------
amountItemsInCart(carrito);

// //---------Mostrar precio total del carro------
showTotalPrice(carrito);



//-------------------------------------------------------
//------------------- funciones -------------------------
//-------------------------------------------------------
//---------Main set of functions------
function totalCartPrice(array) {
    let total = 0;
    for (item of array) {
        total += (item.precioPrenda * item.stockDePrendaEnCarro);
    }
    return total
}
function applyDiscount() {
    let total = totalCartPrice(carrito)
    let keyword = document.getElementById('promocodeInput').value;
    let desc = 35;
    let newtotal;
    if (keyword == 'venenous') {
        newtotal = total - ((total * desc) / 100);
        let showTotalPrice = document.getElementById('productFinalPriceOnCart');
        showTotalPrice.innerHTML = newtotal;
    }
}
    
//---------Borrar carrito------
function clearCart(arrayCarro, arrayProd) {
    // Swal.fire({
    //     title: 'Are you sure you want to delete the cart?',
    //     confirmButtonText: yes,
    //     cancelButtonText: no,
    // })
    // let arrayShowItemName = document.getElementsByClassName('productNameOnCart');
    // let arrayShowItemAmount = document.getElementsByClassName('productAmountOnCart');
    // let arrayShowItemPrice = document.getElementsByClassName('productPriceOnCart');
    // let showTotalPrice = document.getElementById('productFinalPriceOnCart');
    // let showTotalAmount = document.getElementById('productFinalAmountOnCart');
    // let i = 0;

    // for (element of arrayCarro) {
    //     returnStockBack(arrayProd, element.id, element.stockDePrendaEnCarro);
    //     arrayShowItemName[i].innerHTML = '';
    //     arrayShowItemAmount[i].innerHTML = '';
    //     arrayShowItemPrice[i].innerHTML = '';
    //     arrayCarro.shift();
    //     i++;
    // }
    // showTotalPrice.innerHTML = '';
    // showTotalAmount.innerHTML = '';  
}
function returnStockBack(arrayProd, idToReturn, amountToReturn) {
    let i = 0;
    while (true) {
        if (arrayProd[i].id == idToReturn) {
            arrayProd[i].stockTotalDePrenda += amountToReturn;
            break;
        }
        i++;
    }
}
//---------Prints, show on screen------
function showItemsOnCart(array) {
    let elementoPadre = document.getElementById('checkoutListing');
    for (element of array) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<div class="list-group">
        <li id="cart-prodList" class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="productNameOnCart my-0"></h6>
                <small class="productAmountOnCart text-muted"></small>
            </div>
            <span class="productPriceOnCart text-muted"></span>
        </li>
        </div>`;
        elementoPadre.appendChild(contenedor);
    }
    let arrayShowItemName = document.getElementsByClassName('productNameOnCart');
    let arrayShowItemAmount = document.getElementsByClassName('productAmountOnCart');
    let arrayShowItemPrice = document.getElementsByClassName('productPriceOnCart');
    let i = 0;

    for (element of array) {
        arrayShowItemName[i].innerHTML = element.nombrePrenda;
        arrayShowItemAmount[i].innerHTML = 'x' + element.stockDePrendaEnCarro;
        arrayShowItemPrice[i].innerHTML = element.precioPrenda;
        i++;
    }
    // para el delete cart
    // if (array !== undefined) {
    // } else {
    //     let deleteCartItems = document.getElementsByClassName('list-group');
    //     for (element of deleteCartItems) {
    //         element.innerHTML = '';
    //     }
    // }
}
function amountItemsInCart(array) {
    let bubble = document.getElementById('numOfItemsInCart')
    array !== undefined ? bubble.innerHTML = array.length : bubble.innerHTML = ''
}
function showTotalPrice(array) {
    let elementoPadre = document.getElementById('checkoutListing');
    let contenedorFinalPrice = document.createElement("div");
    contenedorFinalPrice.innerHTML = `<div class="list-group">
    <li id="cart-prodList" class="list-group-item d-flex justify-content-between lh-sm">
        <div>
            <h5 my-0">Total</h5>
            <small id="productFinalAmountOnCart" class="text-muted"></small>
        </div>
        <span id="productFinalPriceOnCart" class="text-muted"></span>
    </li>
    </div>`
    elementoPadre.appendChild(contenedorFinalPrice);

    let showTotalPrice = document.getElementById('productFinalPriceOnCart');
    let showTotalAmount = document.getElementById('productFinalAmountOnCart');
    let total = totalCartPrice(carrito);
    showTotalPrice.innerHTML = total;
    showTotalAmount.innerHTML = 'x' + array.length;
}
//Estas funciones estan creadas pero no usadas de momento
function applyTaxes(total) {
    let tax = 21;
    total = total + ((total * tax) / 100)
    return total;
}

function applyDues(total, duePercentaje , cantDues) {
    total = total + ((total * duePercentaje ) / 100)
    return (total/cantDues)
}

function enCarrito(array) {
    //retorna un nuevo array con la informacion booleanda de si los items se encuentran en el carro o no
    let salida = array.map((item => item.estadoEnCarro));
    return salida
}