/*
 2) Crie uma classe paraa representar pessoas.
 Para cada pessoa teremos os atributos nome, peso e altura.
 As pessoas devem ter a capacidade de dizer o valor do seu IMC (IMC = peso / (altura * altura)).
 Instaancie uma pessoa chamada José que tenha 70kg de peso e 1.75 de altura e peça ao José para dizer o valor do seu IMC.
 Crie um método para classificar o IMC em abaixo do peso, peso normal, sobrepeso e obesidade.
*/

//* Definição da Classe Pessoa e Cálculo do IMC */
class Pessoa {
  constructor(nome, peso, altura) {
    this.nome = nome;
    this.peso = peso;
    this.altura = altura;
  }

    calcularIMC() {
    const imc = this.peso / (this.altura * this.altura);
    return imc;
  }

    classificarIMC() {
    const imc = this.calcularIMC();
    
        if (imc < 18.5) {
        return "Abaixo do peso";
        } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal";
        } else if (imc >= 25 && imc < 30) {
        return "Sobrepeso";
        } else {
        return "Obesidade";
        }
    }
} 

//* Criação da Instância da Classe Pessoa */
const Jose = new Pessoa("José", 70, 1.75);

//* Exemplo de Uso */
const imcJose = Jose.calcularIMC();
const classificacaoJose = Jose.classificarIMC();

console.log(`O IMC do ${Jose.nome} é ${imcJose.toFixed(2)} e ele está classificado como: ${classificacaoJose}.`);