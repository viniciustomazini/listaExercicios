/*
 * ======================================================
 * EXPLICAÇÃO DA LÓGICA: CÁLCULO DE MÉDIA COM ARRAYS
 * ======================================================
 */

// 1. PREPARAÇÃO DA LISTA (ARRAY)
// Criamos uma variável constante chamada 'notas' que inicia como uma lista vazia [].
// O objetivo é ter um local para armazenar todos os valores numéricos.
const notas = [];

// 2. ENTRADA DE DADOS (POPULANDO A LISTA)
// O comando .push() "empurra" um novo valor para o final da lista.
// Após estas linhas, o array será: [7, 8, 9, 6, 5]
notas.push(7);
notas.push(8);
notas.push(9);
notas.push(6);
notas.push(5);

// 3. INICIALIZAÇÃO DO ACUMULADOR
// Criamos uma variável 'soma' começando com 0.
// É essencial começar com 0 para não alterar o resultado matemático da soma.
let soma = 0;

/* * 4. O LAÇO DE REPETIÇÃO (LOOP FOR)
 * O computador vai percorrer a lista item por item.
 * * - let i = 0;          -> Começa no índice 0 (primeiro item da lista).
 * - i < notas.length;   -> Continua enquanto 'i' for menor que o tamanho total da lista (5).
 * - i++;                -> A cada volta, aumenta 1 no índice (vai para o próximo item).
 */
for (let i = 0; i < notas.length; i++) {
  // A cada volta, pegamos o valor acumulado em 'soma' e adicionamos a nota atual.
  // Ex: na primeira volta: 0 + 7 = 7
  // Ex: na segunda volta: 7 + 8 = 15... e assim por diante.
  soma += notas[i];
}

// 5. CÁLCULO FINAL (PROCESSAMENTO)
// Agora que temos o total acumulado (35), dividimos pelo tamanho da lista (5).
// notas.length retorna automaticamente a quantidade de itens no array.
const media = soma / notas.length;

// 6. SAÍDA DE DADOS (OUTPUT)
// Exibimos o resultado final formatado no terminal.
console.log(`A média das notas é: ${media}`);