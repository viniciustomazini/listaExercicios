/*
  Exemplo de cálculo e classificação de IMC (Índice de Massa Corporal)
  ---------------------------------------------------------------
  O IMC é um valor que relaciona o peso e a altura de uma pessoa para
  estimar se ela está em uma faixa de peso considerada saudável.
  Fórmula: IMC = peso / (altura * altura)
*/

// 1️⃣ Definição das variáveis de entrada
const peso = 73;        // peso da pessoa em quilogramas (kg)
const altura = 1.77;    // altura da pessoa em metros (m)

// 2️⃣ Cálculo do IMC usando a fórmula
// Math.pow(altura, 2) eleva a altura ao quadrado (altura * altura)
const imc = peso / Math.pow(altura, 2);

// 3️⃣ Variável para armazenar a classificação de acordo com o valor do IMC
let classificacao = '';

// 4️⃣ Estrutura de decisão para determinar a faixa de classificação
if (imc < 18.5) {
    // Se IMC for menor que 18,5 → abaixo do peso
    classificacao = 'Abaixo do peso';
} else if (imc >= 18.5 && imc <= 24.9) {
    // Se IMC estiver entre 18,5 e 24,9 → peso normal
    classificacao = 'Peso normal';
} else if (imc >= 25.0 && imc <= 29.9) {
    // Se IMC estiver entre 25,0 e 29,9 → sobrepeso
    classificacao = 'Sobrepeso';
} else if (imc >= 30.0 && imc <= 34.9) {
    // Se IMC estiver entre 30,0 e 34,9 → obesidade grau I
    classificacao = 'Obesidade grau I';
} else if (imc >= 35.0 && imc <= 39.9) {
    // Se IMC estiver entre 35,0 e 39,9 → obesidade grau II
    classificacao = 'Obesidade grau II';
} else {
    // Se IMC for 40,0 ou mais → obesidade grau III
    classificacao = 'Obesidade grau III';
}

// 5️⃣ Saída do resultado no console
// toFixed(2) formata o IMC com duas casas decimais
console.log(`IMC: ${imc.toFixed(2)} - Classificação: ${classificacao}`);

/*
  Resumo da lógica:
  1. Pegamos o peso (kg) e a altura (m).
  2. Calculamos o IMC dividindo o peso pelo quadrado da altura.
  3. Comparamos o valor obtido com as faixas predefinidas.
  4. Atribuímos uma string descritiva à variável 'classificacao'.
  5. Exibimos tudo de forma legível no console.

  Possíveis melhorias / observações:
  - Validar se 'peso' e 'altura' são números positivos.
  - Extrair a classificação para uma função separada, tornando o código mais modular.
  - Tratar casos em que o usuário não fornece valores ou fornece valores inválidos.
*/
// --- IGNORE ---