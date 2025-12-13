/*
 * ======================================================
 * EXPLICAÇÃO: PROGRAMAÇÃO ORIENTADA A OBJETOS (POO)
 * ======================================================
 */

// ------------------------------------------------------
// 1. CLASSES E INSTÂNCIAS (O BÁSICO)
// ------------------------------------------------------

// 'class' define o molde (a planta). Não é o objeto real, apenas a estrutura.
class Pessoa {
    // O 'constructor' é um método especial que roda automaticamente quando usamos 'new'.
    // Ele serve para inicializar as variáveis (atributos) do objeto.
    constructor(nome, idade) {
        // 'this' refere-se ao objeto que está sendo criado AGORA.
        // Estamos dizendo: "O nome DESTE objeto recebe o valor passado por parâmetro".
        this.nome = nome;
        this.idade = idade;
    }
}

// 'new' cria uma nova cópia (instância) baseada no molde Pessoa.
const pessoa1 = new Pessoa("Ana", 25);
console.log(pessoa1.nome); // Acessa a propriedade 'nome' do objeto pessoa1.

// pessoa2 é totalmente independente de pessoa1, embora usem o mesmo molde.
const pessoa2 = new Pessoa("Bruno", 30);
console.log(pessoa2.nome); 


// ------------------------------------------------------
// 2. MÉTODOS (ADICIONANDO AÇÃO)
// ------------------------------------------------------

class Carro {
    constructor(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }   
    
    // Isto é um Método. É uma função que pertence a esta classe.
    // Ela pode acessar os dados do próprio objeto usando 'this'.
    exibirDetalhes() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}`;
    }
}

const carro1 = new Carro("Toyota", "Corolla");
// Chamamos o método. O 'this' dentro dele saberá que estamos falando do Toyota.
console.log(carro1.exibirDetalhes()); 

const carro2 = new Carro("Honda", "City");
// Aqui, o 'this' saberá que estamos falando do Honda.
console.log(carro2.exibirDetalhes()); 


// ------------------------------------------------------
// 3. HERANÇA (REAPROVEITAMENTO DE CÓDIGO)
// ------------------------------------------------------

// Classe "Mãe" ou Superclasse
class Animal {
    constructor(nome) {
        this.nome = nome;
    }
    fazerSom() {
        return "Som genérico";
    }
}

// 'extends' significa que Cachorro herda tudo o que Animal tem (nome e fazerSom).
class Cachorro extends Animal {
    // Sobrescrita (Override): Estamos substituindo o comportamento padrão
    // da classe mãe por um comportamento específico do Cachorro.
    fazerSom() {
        return "Latido";
    }
}   

const cachorro1 = new Cachorro("Rex");
console.log(cachorro1.nome);      // Funciona! Ele herdou a propriedade 'nome' de Animal.
console.log(cachorro1.fazerSom()); // Usa a versão específica da classe Cachorro ("Latido").

const animal1 = new Animal("Leão");
console.log(animal1.fazerSom());   // Usa a versão original ("Som genérico").


// ------------------------------------------------------
// 4. ENCAPSULAMENTO (GETTERS E SETTERS)
// ------------------------------------------------------
// (Adicionei este exemplo pois o seu código terminava no título)

class ContaBancaria {
    constructor(saldoInicial) {
        // O underline (_) é uma convenção para indicar "privado/não mexa diretamente"
        this._saldo = saldoInicial;
    }

    // GET: Permite LER o valor, mas podemos formatá-lo antes de entregar.
    get saldo() {
        return `R$ ${this._saldo.toFixed(2)}`;
    }

    // SET: Permite ALTERAR o valor, mas podemos validar antes de aceitar.
    set saldo(novoValor) {
        if (novoValor < 0) {
            console.log("Erro: Saldo não pode ser negativo!");
        } else {
            this._saldo = novoValor;
        }
    }
}

const minhaConta = new ContaBancaria(100);
minhaConta.saldo = -50; // O Setter bloqueia isso e avisa o erro.
minhaConta.saldo = 200; // O Setter aceita.
console.log(minhaConta.saldo); // O Getter entrega formatado: "R$ 200.00"