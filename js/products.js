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
//uso await para asegurarme que si o si se capturen los productos antes de comenzar el programa
const importarProductos = async () => {
    let IngresoProductos = [];
    await fetch('../stock.json').then( async (resp) => resp.json() ).then( async (data) => {IngresoProductos = data});
} 

importarProductos();
//-------------------------------------------------------
//-----------declaro array de prendas--------------------
//-------------------------------------------------------
let arrayPrendas = JSON.parse(localStorage.getItem('arrayStock')) || [];
if (arrayPrendas.length === 0) {
    arrayPrendas = IngresoProductos.map((item) => new Prenda(item.id, item.nombrePrenda, item.precioPrenda, item.stockTotalDePrenda));
}
//-------------------------------------------------------
//-----------declaro array de carrito--------------------
//-------------------------------------------------------
let carrito = JSON.parse(localStorage.getItem('carritoEnJson')) || [];
//-------------------------------------------------------
//------------------- funciones -------------------------
//-------------------------------------------------------
//--------- logic caller ------------
function btnToCart(idProducto) {
    getProductsForCart(idProducto, 1);
    //mando array de carro ls
    let jsonCart = JSON.stringify(carrito);
    localStorage.setItem('carritoEnJson', jsonCart);
    //mando array de stock a ls
    let arrayStock = JSON.stringify(arrayPrendas);
    localStorage.setItem('arrayStock', arrayStock);
}
function getProductsForCart(idProducto, cantItem) {
    let prod = findProduct(arrayPrendas, idProducto);
    if (checkStock(prod, cantItem)) {
        manageStock(prod, cantItem);
        carrito = addToCart(carrito, prod, cantItem);
        Toastify({
            text: "Item added to cart",
            duration: 1000,
            style: {background: "linear-gradient(to right, #00b09b, #96c93d)",}
        }).showToast();
    } else {
        Toastify({
            text: "Not enough stock of " + prod.nombrePrenda,
            duration: 1000,
            style: {background: "#dc3545",}
        }).showToast();
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
    let modifique = false;
    array = array.map((element) => {
        if (element.id == item.id) {
            modifique = true;
            return {...element, stockDePrendaEnCarro: element.stockDePrendaEnCarro + amount};
        } else {
            return element
        }
    });
    if (modifique == false) {
        array = [...array, new PrendaEnCarro(item.id, item.nombrePrenda, item.precioPrenda, amount)];
    }
    return array
}
