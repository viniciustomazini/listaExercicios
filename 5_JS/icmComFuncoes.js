/*
 O IMC (Índice de Massa Corporal) é um valor calculado a partir do peso e da altura de uma pessoa. Ele é usado para avaliar se uma pessoa está com peso saudável, abaixo do peso, com sobrepeso ou obesa.

 A fórmula para calcular o IMC é a seguinte:
    IMC = peso / (altura * altura)

Elabore um algoritmo que dado o peso e a altura de uma pessoa, calcule o IMC e mostre sua classificação conforme a tabela abaixo:

| IMC                      | Classificação       |
|--------------------------|---------------------|
| Abaixo de 18,5           | Abaixo do peso      |
| Entre 18,5 e 24,9        | Peso normal         |
| Entre 25,0 e 29,9        | Sobrepeso           |
| Entre 30,0 e 34,9        | Obesidade grau I    |
| Entre 35,0 e 39,9        | Obesidade grau II   |
| 40,0 ou mais             | Obesidade grau III  |
*/

function calcularIMC(peso, altura) {
    return peso / Math.pow(altura, 2);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        return 'Peso normal';
    } else if (imc >= 25.0 && imc <= 29.9) {
        return 'Sobrepeso';
    } else if (imc >= 30.0 && imc <= 34.9) {
        return 'Obesidade grau I';
    } else if (imc >= 35.0 && imc <= 39.9) {
        return 'Obesidade grau II';
    } else {
        return 'Obesidade grau III';
    }
}

// --- Função Principal (main) para organizar a execução ---
function main() {
    // --- Área de Testes ---
    const peso = 73; // em kg
    const altura = 1.77; // em metros

    // 1. Chama a função para calcular o valor do IMC
    const imcCalculado = calcularIMC(peso, altura);

    // 2. Chama a função para obter a classificação com base no resultado anterior
    const classificacao = classificarIMC(imcCalculado);

    // 3. Exibe o resultado final de forma organizada
    console.log(`Seu IMC é ${imcCalculado.toFixed(2)} e sua classificação é: ${classificacao}`);
}

// Executa a função principal para iniciar o programa
main();

