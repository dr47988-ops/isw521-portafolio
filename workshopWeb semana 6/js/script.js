// EJERCICIO 1 - FizzBuzz

console.log("FizzBuzz");

for (let i = 1; i <= 30; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    }
    else if (i % 3 === 0) {
        console.log("Fizz");
    }
    else if (i % 5 === 0) {
        console.log("Buzz");
    }
    else {
        console.log(i);
    }

}


// EJERCICIO 3 - Suma de un arreglo

console.log("Suma del Arreglo");

let numeros = [4, 8, 15, 16, 23, 42];

let suma = 0;

for (let numero of numeros) {

    suma += numero;

}

console.log("La suma total es: " + suma);