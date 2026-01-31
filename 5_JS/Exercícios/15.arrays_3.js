// 1) Crie um programa que dado um número imprima a sua tabuada de multiplicação de 1 a 10.

function tabuada(numero) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
  }
}

tabuada(6);