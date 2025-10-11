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

function calcularValorFinal(precoEtiqueta, formaDePagamento) {
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

    return valorFinal;
}

// --- Função Principal (main) para organizar a execução ---
function main() {
    // --- Área de Testes ---
    const precoEtiqueta = 100; // em R$
    const formaDePagamento = 4; // Mude este número para testar outros casos   
    
    // 1. Chama a função para calcular o valor final a ser pago
    const valorFinal = calcularValorFinal(precoEtiqueta, formaDePagamento);

    // 2. Exibe o resultado final de forma organizada
    console.log(`O valor final a ser pago é R$ ${valorFinal.toFixed(2)}`);  
}

// Executa a função principal para iniciar o programa
main();
