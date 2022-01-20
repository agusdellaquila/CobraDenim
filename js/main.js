//----------------- Funciones ----------------
function cartTotal(item1, item2, item3) {
    //retonra el total de los items en el carrito, seria mejor pasarle un array donde se encuentren los items en carrito
    // y que los sume, pero por el momento con variables
    return (item1 + item2 + item3);
}

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

//-------------------Simulador-------------------------
let cartItem1 = 5000;
let cartItem2 = 2000;
let cartItem3 = 3000;
let totalCarrito;
let palabraDescuento = '';
let palabraCuotas = '';
let valorDescuento;
let cantCuotas;
let porcentajeCuotas = 20;
let valorDeCuota;

// INTERFAZ EN CONSOLE
totalCarrito = cartTotal(cartItem1, cartItem2, cartItem3);
console.log('Su total es de ' + totalCarrito);

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








