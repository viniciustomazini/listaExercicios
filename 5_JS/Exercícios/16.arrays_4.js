// 2) Crie um programa que seja capaz de percorrer uma lista de números e imprima cada número par encontrado.

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        console.log(numeros[i]);
    }
}

// 3) Crie um programa que receba uma lista de nomes e imprima apenas os nomes que começam com a letra "A".

const nomes = ["Ana", "Bruno", "Alice", "Carlos", "Amanda", "Pedro"];

for (let i = 0; i < nomes.length; i++) {
    if (nomes[i].startsWith("A")) {
        console.log(nomes[i]);
    }   
}

// 4) Crie um programa que percorra uma lista de frutas e imprima o nome de cada fruta em letras maiúsculas.

const frutas = ["maçã", "banana", "laranja", "uva", "morango"];
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i].toUpperCase());
}


