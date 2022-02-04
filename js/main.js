//objetos
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

/* Creo un array con los productos, como si fuera un .json */
let IngresoProductos = [];

IngresoProductos[0] = {id: '1001', nombrePrenda: 'Cobra Venom', precioPrenda: 8000, stockTotalDePrenda: 10};
IngresoProductos[1] = {id: '1002', nombrePrenda: 'Brown Denim teddy', precioPrenda: 4800, stockTotalDePrenda: 150};
IngresoProductos[2] = {id: '1003', nombrePrenda: 'Green Denim viper', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[3] = {id: '4', nombrePrenda: 'D1srupted nr1', precioPrenda: 2700, stockTotalDePrenda: 200};
IngresoProductos[4] = {id: '5', nombrePrenda: 'D1srupted nr2', precioPrenda: 3800, stockTotalDePrenda: 180};
IngresoProductos[5] = {id: '6', nombrePrenda: 'D1srupted nr3', precioPrenda: 3100, stockTotalDePrenda: 350};
IngresoProductos[6] = {id: '7', nombrePrenda: 'Blue Denim lake', precioPrenda: 2750, stockTotalDePrenda: 60};
IngresoProductos[7] = {id: '8', nombrePrenda: 'Blue Denim nr2', precioPrenda: 3500, stockTotalDePrenda: 400};

//-------------------declaro array de prendas-------------------------
let arrayPrendas = [];
arrayPrendas = IngresoProductos.map((item) => new Prenda(item.id, item.nombrePrenda, item.precioPrenda, item.stockTotalDePrenda));

//-------------------declaro array de carrito-------------------------
let carrito = [];

// ESTO SE VA A HACER CON EVENTOS, al tocar la img del producto, se agrega al carrito

// let nombreID = captureInput();

let flag = false;
//ahora las etradas de datos son con prompt pero dejaran de serlo y pasara a ser eventos

let nombreID = prompt('Ingrese ID del item para ingresar al carro (IDs: 1001-1002-1003): ');
let cantidadEntrante = Number(prompt('Ingrese la cantidad de items que deseea agregar: '));

let prod = findProduct(arrayPrendas, nombreID);

if (prod == undefined) {
    wrongInput();
} else {
    if (checkStock(prod, cantidadEntrante)) {
        manageStock(prod, cantidadEntrante);
        addToCart(carrito, prod, cantidadEntrante);
    } else {
        noStock();
    }
}

//mostrar items del carro
let productoDelCarro = findProduct(carrito, nombreID);
showItemOnCart(productoDelCarro);

//precio total del carro
let cartTotal = totalCartPrice(carrito);

//aplico descuento si es necesario
let inputPromocode = document.getElementById('promocodeInput').value
let desc = 35;
if (inputPromocode == 'venenous') {
    cartTotal = applyDiscount(cartTotal, desc);
}
//muestro el total del carro
let showTotalPrice = document.getElementById('cartTotalPrice');
showTotalPrice.innerText = cartTotal;

//BUBBLE cantidad de items en el carro
document.getElementById('numOfItemsInCart').innerHTML = amountItemsInCart(carrito);
//---------------------------



//----------------- Funciones ----------------
//!!!!!!!!!!!!!!!!!!HACER: btn to cart, agarrar el id del boton y pasarlo como parametro

function captureInput() {
    let input = document.getElementById('ingresoDeId').value;
    return input
}

function findProduct(array, id) {
    //searches prodcut by id on arrayPrendas and returns the item
    for (item of array) {
        if (item.id == id) {
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

function noStock() {
    let showName = document.getElementById('cartProduct1');
    showName.innerText = 'No hay stock suficiente de este producto';
}

function wrongInput() {
    let showName = document.getElementById('cartProduct1');
    showName.innerText = 'Error al ingresar los datos';
}

function addToCart(array, item, amount) {
    array.push(new PrendaEnCarro(item.id, item.nombrePrenda, item.precioPrenda, amount));
}

function showItemOnCart(item) {
    let showName = document.getElementById('cartProduct1');
    let showAmount = document.getElementById('cartProductAmount1');
    let showPrice = document.getElementById('cartPrice1');

    showName.innerText = item.nombrePrenda;
    showAmount.innerText = 'x' + item.stockDePrendaEnCarro;
    showPrice.innerText = item.precioPrenda * item.stockDePrendaEnCarro;
}

function totalCartPrice(array) {
    let total;
    for (item of array) {
        total = total + (item.precioPrenda * item.stockDePrendaEnCarro);
    }

    return total
}

function amountItemsInCart(array) {
    return array.length
}



//masssssssssssssssssssssssssssssssss
function applyDiscount(total, descuento) {
    total = total - ((total * descuento) / 100);
    return total;
}

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