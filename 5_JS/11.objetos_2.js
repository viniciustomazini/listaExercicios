/*
    1- Crie uma classe para representar carros.
    Os carros possuem uma marca, uma cor e um gasto médio de combustível por km rodado.
    Crie um método que dado a quantidade de km e o preço do combustível nos dê o valor gasto em reais para realizar este percurso.
    
*/

//* Definição da Classe Carro e Calculo para o Gasto de Combustivel */
class Carro {
    constructor(marca, cor, gastoMedioPorKm) {
        this.marca = marca;
        this.cor = cor;
        this.gastoMedioPorKm = gastoMedioPorKm; // em litros por km}
    }

    //* Função para Calcular o Gasto de Combustível */
    calcularGasto(distanciaKm, precoCombustivel) {
        const litrosConsumidos = this.gastoMedioPorKm * distanciaKm;
        const custoTotal = litrosConsumidos * precoCombustivel;
        return custoTotal;
    }
}

//* Criação de Instâncias da Classe Carro */
const carro1 = new Carro("Ford", "Vermelho", 0.1); // 0.1 litros por km
const carro2 = new Carro("Toyota", "Cinza", 0.08); // 0.08 litros por km

//* Exemplo de Uso */
const distancia = 150; // km
const precoCombustivel = 5.50; // reais por litro

// Calculando o gasto para o Carro 1 (Ford)
const gastoCarro1 = carro1.calcularGasto(distancia, precoCombustivel);
console.log(`O ${carro1.marca} ${carro1.cor} gastará R$ ${gastoCarro1.toFixed(2)} para percorrer ${distancia}km.`);

// Calculando o gasto para o Carro 2 (Toyota)
const gastoCarro2 = carro2.calcularGasto(distancia, precoCombustivel);
console.log(`O ${carro2.marca} ${carro2.cor} gastará R$ ${gastoCarro2.toFixed(2)} para percorrer ${distancia}km.`);
