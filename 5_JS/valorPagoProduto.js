/*
Elabore um algoritmo que calcule o que deve ser pago por um produto, consirando o preço normal de etiqueta
e a escolha da condição de pagamento.

Utilize os códigos da tabela a seguir para ler qual a condição de pagamento escolhida e efetuar o cálculo adequado.

Código Condição de pagamento:
1 - À vista Débito, recebe 10% de desconto;
2 - À vista no Dinheiro ou PIX, recebe 15% de desconto;
3 - Em duas vezes, preço normal de etiqueta sem juros;
4 - Acima de duas vezes, preço normal de etiqueta mais juros de 10%;
*/

const precoEtiqueta = 100;
const formaDePagamento = 4; // Mude este número para testar outros casos
let valorFinal;

if (formaDePagamento === 1) {
    valorFinal = precoEtiqueta * 0.90;
} else if (formaDePagamento === 2) {
    valorFinal = precoEtiqueta * 0.85;
} else if (formaDePagamento === 3) {
    valorFinal = precoEtiqueta;
} else { 
    valorFinal = precoEtiqueta * 1.10;
}

console.log(`O valor total do seu produto é: R$ ${valorFinal.toFixed(2)}`);