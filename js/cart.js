let getCarrito = localStorage.getItem('carritoEnJson');
let carrito = JSON.parse(getCarrito);

let getArrayPrendas = localStorage.getItem('arrayStock');
let arrayPrendas = JSON.parse(getArrayPrendas);

//---------Mostrar items en carro------
showItemsOnCart(carrito);
// //---------Mostrar burbuja en carro------
amountItemsInCart(carrito);
// //---------Mostrar precio total del carro------
showTotalPrice(carrito);

//------------------- funciones -------------------------
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
        Toastify({
            text: "Valid code. Enjoy!",
            duration: 1000,
            style: {background: "linear-gradient(to right, #00b09b, #96c93d)",}
        }).showToast();
    } else {
        Toastify({
            text: "Invalid code",
            duration: 1000,
            style: {background: "#dc3545",}
        }).showToast();
    }
}  
//---------Borrar carrito------
function clearCart(arrayCarro, arrayProd) {
    //pendiente: modularizar mas esta funcion
    Swal.fire({
        title:'Are you sure you want to delete the cart?',
        confirmButtonText: 'yes, delete',
        confirmButtonColor: '#96c93d',
        showDenyButton: true,
        DenyButtonText: 'no'}).then((result) => {
            if (result.isConfirmed) {
                confirmedDeleteCart(arrayCarro, arrayProd)
                
                arrayCarro = [];
                toLocalStorage(arrayCarro, arrayProd);  
            } else {
                Toastify({
                    text: "No items deleted",
                    duration: 1500,
                    style: {background: "#ffc107",}
                }).showToast();
            }
        });
}
function confirmedDeleteCart(arrayCarro, arrayProd) {
    let allItems = document.getElementById('checkoutListing');
    let showTotalBubble = document.getElementById('numOfItemsInCart');
    
    for (element of arrayCarro) {
        returnStockBack(arrayProd, element.id, element.stockDePrendaEnCarro);
    }

    allItems.remove();
    showTotalBubble.remove();

    Toastify({
        text: "Items deleted from cart",
        duration: 3000,
        style: {background: "#dc3545",}
    }).showToast();
}
function deleteItem(idToDelete) {
    let itemToDelete = findProduct(carrito, idToDelete);
    returnStockBack(arrayPrendas, idToDelete, itemToDelete.stockDePrendaEnCarro);

    let index = carrito.indexOf(itemToDelete);
    if (index > -1) {
        carrito.splice(index, 1);
    }

    let deleteItemHtml = document.getElementById(idToDelete);
    deleteItemHtml.remove();

    toLocalStorage(carrito, arrayPrendas);

    updateFinalPrice();
    amountItemsInCart(carrito);
}
function returnStockBack(arrayProd, idToReturn, amountToReturn) {
    for (element of arrayProd) {
        if (element.id == idToReturn) {
            element.stockTotalDePrenda += amountToReturn;
        }
    }
}
function findProduct(array, idAEncontrar) {
    //searches prodcut by id on arrayPrendas and returns the item
    for (item of array) {
        if (item.id == idAEncontrar) {
            return item;
        }
    }
}
//---------Prints, show on screen------
function showItemsOnCart(array) {
    let elementoPadre = document.getElementById('checkoutListing');
    for (element of array) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<div class="list-group" id="`+element.id+`">
        <li id="cart-prodList" class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="productNameOnCart my-0"></h6>
                <small class="productAmountOnCart text-muted"></small>
            </div>
            <span class="productPriceOnCart text-muted"></span>
        </li>
        <button onclick="deleteItem('`+(element.id)+`')">delete</button>
        </div>`;
        elementoPadre.appendChild(contenedor);
    }
    let arrayShowItemName = document.getElementsByClassName('productNameOnCart');
    let arrayShowItemAmount = document.getElementsByClassName('productAmountOnCart');
    let arrayShowItemPrice = document.getElementsByClassName('productPriceOnCart');
    
    let i = 0;
    if (array.length !== 0) {
        for (element of array) {
            arrayShowItemName[i].innerHTML = element.nombrePrenda;
            arrayShowItemAmount[i].innerHTML = 'x' + element.stockDePrendaEnCarro;
            arrayShowItemPrice[i].innerHTML = element.precioPrenda;
            i++;
        }
    }
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
            <h5 class="my-0" id="totalFinalName">Total</h5>
            <small id="productFinalAmountOnCart" class="text-muted"></small>
        </div>
        <span id="productFinalPriceOnCart" class="text-muted"></span>
    </li>
    </div>`
    elementoPadre.appendChild(contenedorFinalPrice);

    updateFinalPrice();
    amountItemsInCart(array);
}
function updateFinalPrice() {
    let showTotalPrice = document.getElementById('productFinalPriceOnCart');
    let showTotalAmount = document.getElementById('productFinalAmountOnCart');
    let total = totalCartPrice(carrito);
    showTotalPrice.innerHTML = total;

    let bubbleTotal = 0;
    carrito.forEach(item => {
        bubbleTotal += item.stockDePrendaEnCarro
    });

    showTotalAmount.innerHTML = 'x' + bubbleTotal;
}
//---------Local storage------
function toLocalStorage(arrayCarro, arrayProd) {
    let arrayStock = JSON.stringify(arrayProd);
    localStorage.setItem('arrayStock', arrayStock);

    let carrito = JSON.stringify(arrayCarro);
    localStorage.setItem('carritoEnJson', carrito);
}