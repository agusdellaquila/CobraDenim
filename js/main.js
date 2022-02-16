//-------------------------------------------------------
//----creacion de objetos--------------------------------
//-------------------------------------------------------
class Prenda {
    constructor(id, nombrePrenda, precioPrenda, stockTotalDePrenda) {
        //propiedades del objeto
        this.id = id;
        this.nombrePrenda = nombrePrenda;
        this.precioPrenda = precioPrenda;
        this.stockTotalDePrenda = stockTotalDePrenda;
    }
}
class PrendaEnCarro {
    constructor(id, nombrePrenda, precioPrenda, stockDePrendaEnCarro) {
        //propiedades del objeto
        this.id = id;
        this.nombrePrenda = nombrePrenda;
        this.precioPrenda = precioPrenda;
        this.stockDePrendaEnCarro = stockDePrendaEnCarro;
    }
}
//-------------------------------------------------------
//----base de datos(?--------------------------
//-------------------------------------------------------
let IngresoProductos = [];

IngresoProductos[0] = {id: '1001', nombrePrenda: 'Cobra Venom nr1', precioPrenda: 8000, stockTotalDePrenda: 10};
IngresoProductos[1] = {id: '1002', nombrePrenda: 'Cobra Venom nr2', precioPrenda: 4800, stockTotalDePrenda: 150};
IngresoProductos[2] = {id: '1003', nombrePrenda: 'Cobra Venom nr3', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[3] = {id: '2001', nombrePrenda: 'D1srupted nr1', precioPrenda: 2700, stockTotalDePrenda: 200};
IngresoProductos[4] = {id: '2002', nombrePrenda: 'D1srupted nr2', precioPrenda: 3800, stockTotalDePrenda: 180};
IngresoProductos[5] = {id: '2003', nombrePrenda: 'D1srupted nr3', precioPrenda: 3100, stockTotalDePrenda: 350};
IngresoProductos[6] = {id: '3001', nombrePrenda: 'Blue Denim nr1', precioPrenda: 2750, stockTotalDePrenda: 60};
IngresoProductos[7] = {id: '3002', nombrePrenda: 'Blue Denim nr2', precioPrenda: 3500, stockTotalDePrenda: 400};
//-------------------------------------------------------
//-----------declaro array de prendas--------------------
//-------------------------------------------------------
let arrayPrendas = [];
arrayPrendas = IngresoProductos.map((item) => new Prenda(item.id, item.nombrePrenda, item.precioPrenda, item.stockTotalDePrenda));
let arrayStock = JSON.stringify(arrayPrendas)
localStorage.setItem('arrayStock', arrayStock);
//-------------------------------------------------------
//-----------declaro array de carrito--------------------
//-------------------------------------------------------
let carrito = JSON.parse(localStorage.getItem('carritoEnJson')) || [];

//-------------------------------------------------------
//------------------- funciones -------------------------
//-------------------------------------------------------
//--------- logic caller ------------
function btnToCart() {
    let arrayItemsCobra = document.getElementsByClassName('itemsCobra');
    let arrayItemsDisrupted = document.getElementsByClassName('itemsDisrupted');
    let arrayItemsBlue = document.getElementsByClassName('itemsBlue');
    let arrayItemsGreen = document.getElementsByClassName('itemsGreen');
    let arrayItemsBrown = document.getElementsByClassName('itemsBrown');

    recorrerArrayPorValoresValidos([...arrayItemsCobra,...arrayItemsDisrupted,...arrayItemsBlue,...arrayItemsGreen,...arrayItemsBrown]);

    let jsonCart = JSON.stringify(carrito);
    localStorage.setItem('carritoEnJson', jsonCart);
}
function recorrerArrayPorValoresValidos(array){
    for (let element of array) {
        if ((element.value !== undefined) && (element.value > 0)) {
            getProductsForCart(element);
        }
    }
}
function getProductsForCart({id: idItem, value: cantItem}) {
    let prod = findProduct(arrayPrendas, idItem);

    if (checkStock(prod, cantItem)) {
        manageStock(prod, cantItem);
        addToCart(carrito, prod, cantItem);
    } else {
        //hacer funcion de noStock
        let noStockContainer = document.createElement("div");
        noStockContainer.innerHTML = `<p class="textOnTop"> Not enough stock </p>`;
        element.appendChild(noStockContainer);
    }
}
//---------Main set of functions------
function findProduct(array, idAEncontrar) {
    //searches prodcut by id on arrayPrendas and returns the item
    for (item of array) {
        if (item.id == idAEncontrar) {
            return item;
        }
    }
}
function checkStock(item, amount) {
    //checks if there is stock for the set amount on the given item
    if (amount <= item.stockTotalDePrenda) {
        return true
    }
}
function manageStock(item, amount) {
    item.stockTotalDePrenda -= amount;
}
function addToCart(array, item, amount) {
    // let modifique = false;
    // array = array.map((element) => {
    //     if (element.id == item.id) {
    //         modifique = true;
    //         return {...item, cantidad: element.cantidad + amount};
    //     } else {
    //         return element
    //     }
    // });
    // if (!modifique) {
    //     carrito.push(new PrendaEnCarro(item.id, item.nombrePrenda, item.precioPrenda, amount));
    // }
    array.push(new PrendaEnCarro(item.id, item.nombrePrenda, item.precioPrenda, amount));
}
