//---------Get items from LS------
let getCarrito = localStorage.getItem('carritoEnJson');
let carrito = JSON.parse(getCarrito);

let getArrayPrendas = localStorage.getItem('arrayStock');
let arrayPrendas = JSON.parse(getArrayPrendas);

let sub = localStorage.getItem('subscription');
let subscription = JSON.parse(sub);

if ((carrito == null) || (carrito == undefined) || (carrito.length == 0)) {
    emptyCart();
} else {
    filledCart(); 
}
//---------Main set of functions------
function emptyCart() {
    let emptyC = document.getElementById('cartTitle');
    let emptyText = document.createElement("div");
    emptyText.innerHTML = `<div class="emptyMsg"> <span class="centrado"> Cart is empty. </span> <span class="centrado"> You can start by grabbing a <a href="../pages/productos.html" class="textoVerdeOscuroLink"> Cobra Venom ;)</a> </span> </div>`;
    emptyC.appendChild(emptyText);
}
function filledCart() {
    //---------Show items on cart------
    showItemsOnCart(carrito);
    // //---------Show cart bubble------
    amountItemsInCart(carrito);
    // //---------Show final price------
    showTotalPrice(carrito);
    // //---------Show promo code------
    showPromocode();
    //---------Show deleteCart btn------
    showDeleteCartBtn();
}
function findProduct(array, idAEncontrar) {
    //searches prodcut by id on arrayPrendas and returns the item
    for (item of array) {
        if (item.id == idAEncontrar) {
            return item;
        }
    }
}
function totalCartPrice(array) {
    let total = 0;
    for (item of array) {
        total += (item.precioPrenda * item.stockDePrendaEnCarro);
    }
    return total
}
function applyDiscount() {
    if ((carrito !== null) && (carrito !== undefined) && (carrito.length !== 0)) {
        let total = totalCartPrice(carrito)
        let keyword = document.getElementById('promocodeInput').value;
        if (keyword !== null) {
            let desc = 35;
            let newtotal;
            if (keyword == 'venenous') {
                newtotal = total - ((total * desc) / 100);
                let showTotalPrice = document.getElementById('productFinalPriceOnCart');
                showTotalPrice.innerHTML = '$' + newtotal;
                
                let promoMsg = document.getElementById('promoCodeMsg');
                let contenedor = document.createElement("span");
                let codeMsg = document.getElementById('codeMsg');

                if (codeMsg == null) {
                    contenedor.innerHTML = `<span id="codeMsg">(35% off)</span>`;
                    promoMsg.appendChild(contenedor);
                }

                Toastify({
                    text: "Valid code. Enjoy!",
                    duration: 3000,
                    style: {background: "linear-gradient(to right, #00b09b, #96c93d)",}
                }).showToast();
        }
    } else {
            Toastify({
                text: "Invalid code",
                duration: 1000,
                style: {background: "#dc3545",}
            }).showToast();
        }
    }
}  
//---------Borrar carrito------
function clearCart(arrayCarro, arrayProd) {
    Swal.fire({
        title:'Are you sure you want to delete the cart?',
        showDenyButton: true,
        DenyButtonText: 'no',
        confirmButtonColor: '#96c93d',
        confirmButtonText: 'yes, delete'}).then((result) => {
            if (result.isConfirmed) {
                confirmedDeleteCart(arrayCarro, arrayProd);
                
                arrayCarro = [];
                toLocalStorage(arrayCarro, arrayProd);
                
                window.location.reload()
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
    //returns stock back to array of stock
    for (element of arrayCarro) {
        returnStockBack(arrayProd, element.id, element.stockDePrendaEnCarro);
    }
    //removes items
    allItems.remove();
    showTotalBubble.remove();
    //alert of delete cart
    Toastify({
        text: "Items deleted from cart",
        duration: 3000,
        style: {background: "#dc3545",}
    }).showToast();
}
function deleteItem(idToDelete) {
    //finds item and returns stock
    let itemToDelete = findProduct(carrito, idToDelete);
    returnStockBack(arrayPrendas, idToDelete, itemToDelete.stockDePrendaEnCarro);
    //manages array length
    let index = carrito.indexOf(itemToDelete);
    if (index > -1) {
        carrito.splice(index, 1);
    }
    //deletes item
    let deleteItemHtml = document.getElementById(idToDelete);
    deleteItemHtml.remove();
    //saves to local storage the new array without that item
    toLocalStorage(carrito, arrayPrendas);
    //updates the price & amount without that item
    updateFinalPrice();
    amountItemsInCart(carrito);
    //alert of item deleted
    Toastify({
        text: "Item deleted from cart",
        duration: 3000,
        style: {background: "#dc3545",}
    }).showToast();

    if ((carrito == null) || (carrito == undefined) || (carrito.length == 0)) {
        window.location.reload()
    }

    applyDiscount();
}
function returnStockBack(arrayProd, idToReturn, amountToReturn) {
    //return stock back of all deleted items
    for (element of arrayProd) {
        if (element.id == idToReturn) {
            element.stockTotalDePrenda += amountToReturn;
        }
    }
}
//---------Prints, show on screen------
function showItemsOnCart(array) {
    if (array !== null) {
        let elementoPadre = document.getElementById('checkoutListing');
        for (element of array) {
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `<div class="list-group" id="${element.id}">
                <li id="cart-prodList" class="list-group-item d-flex justify-content-between lh-sm">
                    <div class="cartItemInfo">
                        <h6 class="productNameOnCart my-0"></h6>
                        <small class="productAmountOnCart text-muted"></small>
                    </div>
                    <div>
                        <span class="productPriceOnCart text-muted d-flex"></span>
                        <img class="deleteIndiviudalItem w-50 ms-3" onclick="deleteItem('${element.id}')" src="../img/trash-fill.svg"></img>
                    </div>
                </li>
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
                arrayShowItemPrice[i].innerHTML = '$' + element.precioPrenda;
                i++;
            }
        }
    }
}
function amountItemsInCart(array) {
    if (array !== null) {
        let bubble = document.getElementById('numOfItemsInCart')
        array !== undefined ? bubble.innerHTML = array.length : bubble.innerHTML = ''
    }
}
function showTotalPrice(array) {
    if (array !== null) {
        let elementoPadre = document.getElementById('checkoutListing');
        let contenedorFinalPrice = document.createElement("div");
        contenedorFinalPrice.innerHTML = `<div class="lineaDivision mt-2 mb-2"></div>
        <div class="list-group">
        <li id="cart-prodList" class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h5 class="my-0" id="totalFinalName">Total</h5>
                <small id="productFinalAmountOnCart" class="text-muted"></small>
            </div>
            <div id="promoCodeMsg">
            </div>
            <span id="productFinalPriceOnCart" class="text-muted"></span>
        </li>
        </div>`;
        elementoPadre.appendChild(contenedorFinalPrice);

        updateFinalPrice();
        amountItemsInCart(array);
    }
}
function showPromocode() {
    let elementoPadre = document.getElementById('checkoutListing');
    let contenedorPromocode = document.createElement("div");

    contenedorPromocode.innerHTML = `<div class="lineaDivision mt-2"></div> <div class="d-flex flex-row mt-2"> <input id="promocodeInput" type="text" class="form-control" placeholder="Promo code">
    <button type="submit" class="btn btn-terciary promoCodeSubmit" onclick="applyDiscount()">Redeem</button> </div>`;
    
    elementoPadre.appendChild(contenedorPromocode);
}
function showDeleteCartBtn() {
    let elementoPadre = document.getElementById('checkoutListing');
    let contenedorDeleteCartBtn = document.createElement("div");

    contenedorDeleteCartBtn.innerHTML = `<button type="button" class="mt-2 btn btn-secondary fw-bold" onclick="clearCart(carrito, arrayPrendas)">ClearCart</button>`;
    
    elementoPadre.appendChild(contenedorDeleteCartBtn);
}
function updateFinalPrice() {
    let showTotalPrice = document.getElementById('productFinalPriceOnCart');
    let showTotalAmount = document.getElementById('productFinalAmountOnCart');
    let total = totalCartPrice(carrito);
    showTotalPrice.innerHTML = '$' + total;

    let bubbleTotal = 0;
    carrito.forEach(item => {
        bubbleTotal += item.stockDePrendaEnCarro
    });

    showTotalAmount.innerHTML = 'x' + bubbleTotal;
}
function finalCheckout() {
    //validates the fields for checkout
    if ((carrito == null) || (carrito == undefined) || (carrito.length == 0)) {
        Toastify({
            text: "Error. No items on cart",
            duration: 1000,
            style: {background: "#dc3545",}
        }).showToast();
    } else {
        let checkoutInfo = document.getElementsByClassName('checkoutUserInfo');


        let i = 0;
        let emptyField = false;

        while (i < checkoutInfo.length) {
            if (checkoutInfo[i].value == '') {
                emptyField = true;
                break;
            }
            i++;
        }

        if (emptyField) {
            Toastify({
                text: "Error, there are blank fields",
                duration: 3000,
                style: {background: "#dc3545",}
            }).showToast();
        } else {
            Toastify({
                text: "Chekout complete, your order is on the way!",
                duration: 5000,
                style: {background: "linear-gradient(to right, #00b09b, #96c93d)",}
            }).showToast();
        }
    }

}
//---------Local storage------
function toLocalStorage(arrayCarro, arrayProd) {
    let arrayStock = JSON.stringify(arrayProd);
    localStorage.setItem('arrayStock', arrayStock);

    let carrito = JSON.stringify(arrayCarro);
    localStorage.setItem('carritoEnJson', carrito);
}
