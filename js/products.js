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
//cobra
IngresoProductos[0] = {id: '1001', nombrePrenda: 'Cobra Venom', precioPrenda: 8000, stockTotalDePrenda: 10};
IngresoProductos[1] = {id: '1002', nombrePrenda: 'Cobra fang', precioPrenda: 4800, stockTotalDePrenda: 150};
IngresoProductos[2] = {id: '1003', nombrePrenda: 'Cobra Viper', precioPrenda: 4800, stockTotalDePrenda: 150};
IngresoProductos[3] = {id: '1004', nombrePrenda: 'Cobra mamba', precioPrenda: 4800, stockTotalDePrenda: 150};
//disrupted
IngresoProductos[4] = {id: '2001', nombrePrenda: 'D1srupt3d pzk', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[5] = {id: '2002', nombrePrenda: 'D1srupt3d cruella', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[6] = {id: '2003', nombrePrenda: 'D1srupt3d cors3t', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[7] = {id: '2004', nombrePrenda: 'D1srupt3d street', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[8] = {id: '2005', nombrePrenda: 'D1srupt3d cow', precioPrenda: 4500, stockTotalDePrenda: 550};
//blue
IngresoProductos[9] = {id: '3001', nombrePrenda: 'Blue lastic', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[10] = {id: '3002', nombrePrenda: 'Blue fly', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[11] = {id: '3003', nombrePrenda: 'Blue ocean', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[12] = {id: '3004', nombrePrenda: 'Blue longfit', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[13] = {id: '3005', nombrePrenda: 'Blue stamp', precioPrenda: 4500, stockTotalDePrenda: 550};
//green
IngresoProductos[14] = {id: '4001', nombrePrenda: 'Green poison', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[15] = {id: '4002', nombrePrenda: 'Green snake', precioPrenda: 2700, stockTotalDePrenda: 200};
IngresoProductos[16] = {id: '4003', nombrePrenda: 'Green corderoy', precioPrenda: 3800, stockTotalDePrenda: 180};
IngresoProductos[17] = {id: '4004', nombrePrenda: 'Green jungle', precioPrenda: 3100, stockTotalDePrenda: 350};
IngresoProductos[18] = {id: '4005', nombrePrenda: 'Green spring', precioPrenda: 2750, stockTotalDePrenda: 60};
//brown
IngresoProductos[19] = {id: '5001', nombrePrenda: 'Brown sheriff', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[20] = {id: '5002', nombrePrenda: 'Brown bear', precioPrenda: 2700, stockTotalDePrenda: 200};
IngresoProductos[21] = {id: '5003', nombrePrenda: 'Brown cowboy', precioPrenda: 3800, stockTotalDePrenda: 180};
IngresoProductos[22] = {id: '5004', nombrePrenda: 'Brown mess', precioPrenda: 3100, stockTotalDePrenda: 350};
IngresoProductos[23] = {id: '5005', nombrePrenda: 'Brown love', precioPrenda: 2750, stockTotalDePrenda: 60};
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
