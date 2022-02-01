//----------------- Funciones ----------------
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

function filtrado(array) {
    // filtra el carro segun si hay mas de 3 prendas del mismo item en el carro
    let salida = array.filter((item) => (item.stockEnCarro > 3));
    return salida
}

//objetos
class Prenda {
    constructor(nroItem, precio, stockTotal, stockEnCarro, estadoEnCarro, dineroTotalEnCarro) {
        //propiedades del objeto
        this.nroItem = nroItem;
        this.precio = precio;
        this.stockTotal = stockTotal; 
        this.stockEnCarro = stockEnCarro;
        this.estadoEnCarro = estadoEnCarro;
        this.dineroTotalEnCarro = dineroTotalEnCarro;
    }
    mostrar() {

        console.log('El producto ' + this.nroItem + ' tiene un precio de ' + this.precio + ' y un stock de ' + this.stockTotal);
    }
    valorDeMercaderia () {
        let valorTotalDeMercaderia;
        valorTotalDeMercaderia = this.precio * this.stockTotal;
        console.log('El valor total invertido en el item ' + this.nroItem + ' es de ' + valorTotalDeMercaderia + '$')
        return valorTotalDeMercaderia
    }

    valorDeMercaderiaEnCarro () {
        this.dineroTotalEnCarro = this.precio * this.stockEnCarro;
        return this.dineroTotalEnCarro
    }
}


//-------------------declaraciones-------------------------
let carrito = [];

let totalCarrito = 0;
let palabraDescuento = '';
let palabraCuotas = '';
let valorDescuento;
let cantCuotas;
let porcentajeCuotas = 20;
let valorDeCuota;

//creacion de objeos
let item1 = new Prenda(1, 5000, 10, 0, false, 0);
let item2 = new Prenda(2, 3500, 13, 0, false, 0);
let item3 = new Prenda(3, 7000, 5, 0, false, 0);

//carga de carro
carrito.push(item1, item2, item3);

// INTERFAZ EN CONSOLE
//--------------------incorporacion de objetos---------------------------
let flag = false;
while (!flag) {
    let agregarAlCarro = Number(prompt('Que item quiere agregar al carro? (1-2-3): '))
    let CantidadAgregarAlCarro = Number(prompt('Que cantidad del item ' + agregarAlCarro + ' quiere agregar? : '))

    if (agregarAlCarro == 1) { //esto dentro de este if se repite 3 veces, podria estar en una funcion que probablemente implemente mas adelante

        if ((carrito[0].stockTotal > 0) && (carrito[0].stockTotal >= CantidadAgregarAlCarro)) {
            carrito[0].stockTotal = carrito[0].stockTotal - CantidadAgregarAlCarro;
            carrito[0].estadoEnCarro = true;
            carrito[0].stockEnCarro = carrito[0].stockEnCarro + CantidadAgregarAlCarro;
            // carrito[0].dineroTotalEnCarro = carrito[0].precio * carrito[0].stockEnCarro;
        } 
        else {
            console.log('Lo sentimos no queda suficiente stock de este producto');
        }
    } else if (agregarAlCarro == 2) {
        if ((carrito[1].stockTotal > 1) && (carrito[1].stockTotal >= CantidadAgregarAlCarro)) {
            carrito[1].stockTotal = carrito[1].stockTotal - CantidadAgregarAlCarro;
            carrito[1].estadoEnCarro = true;
            carrito[1].stockEnCarro = carrito[1].stockEnCarro + CantidadAgregarAlCarro;
            // carrito[1].dineroTotalEnCarro = carrito[1].precio * carrito[1].stockEnCarro;
        } 
        else {
            console.log('Lo sentimos no queda suficiente stock de este producto');
        }
    } else if (agregarAlCarro == 3) {
        if ((carrito[2].stockTotal > 2) && (carrito[2].stockTotal >= CantidadAgregarAlCarro)) {
            carrito[2].stockTotal = carrito[2].stockTotal - CantidadAgregarAlCarro;
            carrito[2].estadoEnCarro = true;
            carrito[2].stockEnCarro = carrito[2].stockEnCarro + CantidadAgregarAlCarro;
            // carrito[2].dineroTotalEnCarro = carrito[2].precio * carrito[2].stockEnCarro;
        }
        else {
            console.log('Lo sentimos no queda suficiente stock de este producto');
        }
    } else {
        console.log('EROrr');
    }

    let aux = prompt('Ingrese un 0 para SALIR, Ingrese cualquier tecla para seguir agregando items al carrito.');
    if (aux == '0') {
        flag = true;
    }
}


//000000000000000000000000000000000000000000000000000000000000000000
let vtc;
for (let i of carrito) {
    vtc = i.valorDeMercaderiaEnCarro();
    totalCarrito = totalCarrito + vtc;
} 
console.log('Su total del carrito es de ' + totalCarrito);

valorDescuento = 15; //15% con el codigo coder
palabraDescuento = prompt('Ingrese el codigo de descuento: ');

if (palabraDescuento == 'coder') {
    totalCarrito = applyDiscount(totalCarrito, valorDescuento)
    console.log('Su total con descuento incluido es de ' + totalCarrito);
} else {
    console.log('Lo sentimos, *' + palabraDescuento + '* no es un codigo de descuento valido :(');
}

totalCarrito = applyTaxes(totalCarrito);

console.log('Su total con IVA incluido es de ' + totalCarrito);

while ((palabraCuotas != 'si') && (palabraCuotas != 'no')) {
    palabraCuotas = prompt('Desea pagar en cuotas (con interes 20%)? si/no ');
    if (palabraCuotas != 'si' && palabraCuotas != 'no') {
        alert('Ingrese correctamente su respuesta');
    }
}

if (palabraCuotas == 'si') {
    cantCuotas = Number(prompt('Que cantidad de cuotas deseea? elija entre 6 - 12 - 18 '));
    valorDeCuota = applyDues(totalCarrito, porcentajeCuotas, cantCuotas);
    console.log('Pagara un total de '+ cantCuotas + ' cuotas de un valor de ' + valorDeCuota + ' cada una.');
} else {
    console.log('No eligio cuotas, asi que su total permanece en '+ totalCarrito);
}

//metodo de map, saca un array con estado de items en carro
let itemsEnCarro = enCarrito(carrito);
console.log(itemsEnCarro);

//metodo de find, buscar si hay mas de 3 prendas del mismo item en el carro 
let carroFiltrado = filtrado(carrito);
console.log('estos son las prendas las cuales tiene mas de 3 en el carro: ');
console.log(carroFiltrado)