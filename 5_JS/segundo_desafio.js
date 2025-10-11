// Faça um programa para calcular o valor de uma viagem.

// Você terá 3 variáveis. Sendo elas:
// 1 - Preço do etanol;
// 2 - Preço da gasolina;
// 3 - Tipo de combustível que está no seu carro;
// 4 - Gasto médio de combustível do carro por KM;
// 5 - Distância em KM da viagem;

// Imprima no console o valor que será gasto para realizar esta viagem.

const precoEtanol = 4.89;
const precoGasolina = 5.79;
const tipoCombustivel = "gasolina";
const gastoMedioPorKm = 10;
const distanciaEmKm = 100;

const calcularValorViagem = (precoEtanol, precoGasolina, tipoCombustivel, gastoMedioPorKm, distanciaEmKm) => {
    const litrosConsumidos = distanciaEmKm / gastoMedioPorKm;
    let valorTotal;
    if (tipoCombustivel === "etanol") {
        valorTotal = litrosConsumidos * precoEtanol;
    } else if (tipoCombustivel === "gasolina") {
        valorTotal = litrosConsumidos * precoGasolina;
    } else {
        return "Tipo de combustível inválido.";
    }   
    return `O valor total da viagem é R$ ${valorTotal.toFixed(2)}`;
}

console.log(calcularValorViagem(precoEtanol, precoGasolina, tipoCombustivel, gastoMedioPorKm, distanciaEmKm));


