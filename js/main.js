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
//----equivalente temp al .json--------------------------
//-------------------------------------------------------
let IngresoProductos = [];

IngresoProductos[0] = {id: '1001', nombrePrenda: 'Cobra Venom', precioPrenda: 8000, stockTotalDePrenda: 10};
IngresoProductos[1] = {id: '1002', nombrePrenda: 'Brown Denim teddy', precioPrenda: 4800, stockTotalDePrenda: 150};
IngresoProductos[2] = {id: '1003', nombrePrenda: 'Green Denim viper', precioPrenda: 4500, stockTotalDePrenda: 550};
IngresoProductos[3] = {id: '4', nombrePrenda: 'D1srupted nr1', precioPrenda: 2700, stockTotalDePrenda: 200};
IngresoProductos[4] = {id: '5', nombrePrenda: 'D1srupted nr2', precioPrenda: 3800, stockTotalDePrenda: 180};
IngresoProductos[5] = {id: '6', nombrePrenda: 'D1srupted nr3', precioPrenda: 3100, stockTotalDePrenda: 350};
IngresoProductos[6] = {id: '7', nombrePrenda: 'Blue Denim lake', precioPrenda: 2750, stockTotalDePrenda: 60};
IngresoProductos[7] = {id: '8', nombrePrenda: 'Blue Denim nr2', precioPrenda: 3500, stockTotalDePrenda: 400};

//-------------------------------------------------------
//-----------declaro array de prendas--------------------
//-------------------------------------------------------
let arrayPrendas = [];
arrayPrendas = IngresoProductos.map((item) => new Prenda(item.id, item.nombrePrenda, item.precioPrenda, item.stockTotalDePrenda));

//-------------------------------------------------------
//-----------declaro array de carrito--------------------
//-------------------------------------------------------
let carrito = [];

//Parte de la tarea de usar un event on ENTER key
let inputPromocode = document.getElementById('promocodeInput');

let pCorrecto = document.getElementById('pEnter');
inputPromocode.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (inputPromocode.value == 'venenous') {
            pCorrecto.innerHTML = "Codigo correcto";
        } else pCorrecto.innerHTML = "Codigo INCORRECTO";
    }
});
//------------------------------------------------

let btnRestar = document.getElementById('restar');
let btnSumar = document.getElementById('sumar');
let cantidadEntrante = document.getElementById('ingresoDeCantidad');

btnRestar.addEventListener('click', () => {
    subtractAmount(cantidadEntrante);
});

btnSumar.addEventListener('click', () => {
    addAmount(cantidadEntrante);
});

//-------------------------------------------------------
//------------------- funciones -------------------------
//-------------------------------------------------------
//--------- logic caller ------------
function btnToCart() {
    let nombreID = document.getElementById('ingresoDeId').value;
    let cantidadFinal = parseInt(document.getElementById('ingresoDeCantidad').value);
    
    let prod = findProduct(arrayPrendas, nombreID);
    
    if (prod == undefined) {
        wrongInput();
    } else {
        if (checkStock(prod, cantidadFinal)) {
            manageStock(prod, cantidadFinal);
            addToCart(carrito, prod, cantidadFinal);

            //---------calcular precio total del carro------
            let cartTotal = totalCartPrice(carrito);

            //---------Mostrar items en carro------
            let productoDelCarro = findProduct(carrito, nombreID);
            showItemOnCart(productoDelCarro);

            //---------Mostrar burbuja en carro------
            amountItemsInCart(carrito);

            //calcular descuento si es necesario
            cartTotal = applyDiscount(cartTotal);
            
            //---------Mostrar precio total del carro------
            showTotalPrice(cartTotal);
        } else {
            noStock();
        }
    }
}
//---------Main set of functions------
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
function addToCart(array, item, amount) {
    array.push(new PrendaEnCarro(item.id, item.nombrePrenda, item.precioPrenda, amount));
}
function totalCartPrice(array) {
    let total = 0;
    for (item of array) {
        total = total + (item.precioPrenda * item.stockDePrendaEnCarro);
    }

    return total
}
function applyDiscount(total) {
    let keyword = document.getElementById('promocodeInput').value;
    let desc = 35;
    let newtotal;
    if (keyword == 'venenous') {
        newtotal = total - ((total * desc) / 100);
        return newtotal;
    } else return total
}
//---------Add amount functions------
function addAmount(input) {
    input.value = parseInt(input.value) + 1;
}
function subtractAmount(input) {
    input.value = parseInt(input.value) - 1;
}
//---------Borrar carrito------
function ClearCart(arrayCarro, arrayProd) {
    for (element of arrayCarro) {
        returnStockBack(arrayProd, element.id, element.stockDePrendaEnCarro);
        arrayCarro.shift()
    }
    showItemOnCart();
    showTotalPrice();
    amountItemsInCart();
    
}
function returnStockBack(arrayProd, idToReturn, amountToReturn) {
    let i = 0;
    while (true) {
        if (arrayProd[i].id == idToReturn) {
            arrayProd[i].stockTotalDePrenda += amountToReturn;
            break;
        }
    }
}
//---------errors & warnings------
function noStock() {
    let showName = document.getElementById('cartProduct1');
    showName.innerText = 'No hay stock suficiente de este producto';
}
function wrongInput() {
    let showName = document.getElementById('cartProduct1');
    showName.innerText = 'Error al ingresar los datos';
}
//---------Prints, show on screen------
function showItemOnCart(item) {
    let showName = document.getElementById('cartProduct1');
    let showAmount = document.getElementById('cartProductAmount1');
    let showPrice = document.getElementById('cartPrice1');

    if (item !== undefined) {
        showName.innerText = item.nombrePrenda;
        showAmount.innerText = 'x' + item.stockDePrendaEnCarro;
        showPrice.innerText = item.precioPrenda * item.stockDePrendaEnCarro;
    } else {
        showName.innerText = 'Empty';
        showAmount.innerText = '';
        showPrice.innerText = '';
    }
}
function amountItemsInCart(array) {
    let bubble = document.getElementById('numOfItemsInCart')
    let total = 0;
    if (array !== undefined) {
        for (element of array) {
            total = total + element.stockDePrendaEnCarro;
        }
        bubble.innerHTML = total;
    } else bubble.innerHTML = ''
}
function showTotalPrice(total) {
    let showTotal = document.getElementById('cartTotalPrice');
    if (total !== undefined) {
        showTotal.innerText = total;
    } else {
        showTotal.innerText = '';
    }
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