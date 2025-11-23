//* Definindo uma Classe e uma Instância

class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
}

const pessoa1 = new Pessoa("Ana", 25);
console.log(pessoa1.nome); // Saída: Ana
console.log(pessoa1.idade); // Saída: 25

const pessoa2 = new Pessoa("Bruno", 30);
console.log(pessoa2.nome); // Saída: Bruno
console.log(pessoa2.idade); // Saída: 30

//* Adicionando Métodos a uma Classe
class Carro {
    constructor(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }   
    exibirDetalhes() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}`;
    }
}

const carro1 = new Carro("Toyota", "Corolla");
console.log(carro1.exibirDetalhes()); // Saída: Marca: Toyota, Modelo: Corolla

const carro2 = new Carro("Honda", "City");
console.log(carro2.exibirDetalhes()); // Saída: Marca: Honda, Modelo: City

//* Herança entre Classes
class Animal {
    constructor(nome) {
        this.nome = nome;
    }
    fazerSom() {
        return "Som genérico";
    }
}

class Cachorro extends Animal {
    fazerSom() {
        return "Latido";
    }
}   
const cachorro1 = new Cachorro("Rex");
console.log(cachorro1.nome); // Saída: Rex
console.log(cachorro1.fazerSom()); // Saída: Latido

const animal1 = new Animal("Leão");
console.log(animal1.nome); // Saída: Leão
console.log(animal1.fazerSom()); // Saída: Som genérico

//* Encapsulamento com Getters e Setters




