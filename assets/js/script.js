function validarLuhn(numeroTarjeta) {
    if (numeroTarjeta.length == 0) {
        return false;
    }
    // PASO 0: Almacenar el número en un arreglo (cada dígito será un elemento).
    let numArr = Array.from(numeroTarjeta);
    // console.log("Paso 0: " + numArr);
    // PASO 1: Invertir el número
    numArr = numArr.reverse();
    // console.log("Paso 1: " + numArr);

    // PASO 2: Multiplicar por 2 los dígitos en posiciones pares (partiendo en 1, i.e., 
    // el elemento con índice 0 será considerado como el elemento 1).
    for (let i = 1; i <= numArr.length; i++) {
        if (i % 2 == 0) {
            let digitoComoNumero = 2 * parseInt(numArr[i - 1]);
            // Si el número obtenido es mayor o igual a 10 (tiene dos dígitos), debemos sumar ambos dígitos.
            if (digitoComoNumero >= 10) {
                // Debemos convertir el número a string para poder separlo en la decena y la unidad.
                let digitoComoString = digitoComoNumero.toString();
                // La decena estará en la posición 0 y la unidad en la posición 1.
                // Debemos "parsear" (convertir) los dos valores a número entero para así poder sumarlos.
                let suma = parseInt(digitoComoString[0]) + parseInt(digitoComoString[1]);
                // El resultado obtenido lo almacenamos en el arreglo numArr como string.
                numArr[i - 1] = suma.toString();
            } else {
                // En el caso de ser menor a 10 (tener solo un dígito), solo debemos convertirlo en string.
                numArr[i - 1] = digitoComoNumero.toString();
            }
        }
    }
    // console.log("Paso 2: " + numArr);

    // PASO 3: Sumamos todos los elementos del arreglo.
    let acumulador = 0;
    for (let j = 0; j < numArr.length; j++) {
        acumulador += parseInt(numArr[j]);
    }
    // console.log("Paso 3: " + acumulador);

    // PASO 4: Validar si la suma de los números es divisible por 10 (termina en 0).
    if (acumulador % 10 == 0) {
        // console.log("Paso 4: Es válida");
        // Si la tarjeta es válida...
        return true;
    } else {
        // console.log("Paso 4: No es válida");
        return false;
    }
}

function mostrarMensaje(esValida) {
    let parrafo = document.getElementById("mensaje");
    if (esValida) {
        parrafo.innerText = "Tarjeta Válida";
        parrafo.className = "valid";
    } else {
        parrafo.innerText = "Tarjeta Inválida";
        // parrafo.style.color = "red";
        // parrafo.style.backgroundColor = "#f0a19f";
        parrafo.className = "invalid";
    }
}

// Cambiaremos todos los dígitos menos los últimos 4 por asteriscos si el número es válido.
function enmascarar() {
    let cardnumber = document.getElementById("cardnumber");
    let numero = cardnumber.value;
    // Si tiene más de 4 dígitos debemos enmascarar.
    if (numero.length > 4) {
        let digitosAEnmascarar = numero.length - 4;
        for (let k = 0; k < digitosAEnmascarar; k++) {
            numero = numero.replace(numero[k], "*");
        }
    }
    document.getElementById("svgnumber").innerHTML = numero;
}

document.getElementById("btn-validar").addEventListener("click", function() {
    var cardnumber = document.getElementById("cardnumber");
    var numero = cardnumber.value;
    var esValida = validarLuhn(numero);

    mostrarMensaje(esValida);
    // Acciones a realizarse si el número es válido.
    if (esValida) {
        enmascarar();
        document.getElementById("btn-validar").hidden = true;
        cardnumber.value = "";
    };
});