/*
Criar uma função que receba a idade de uma pessoa e informe se ela é maior ou menor de idade.

Exemplo:
verificarIdade(18) // Retorno: "Maior de idade"
verificarIdade(15) // Retorno: "Menor de idade"

*/

function verificarIdade(idade) {
    if (idade >= 18) {
        return "Maior de idade";
    } else {
        return "Menor de idade";
    }
}

// Testes
console.log(verificarIdade(18)); // Retorno: "Maior de idade"
console.log(verificarIdade(15)); // Retorno: "Menor de idade"