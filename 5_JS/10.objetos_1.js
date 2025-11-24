// Função que compara a idade de duas pessoas

function compararPessoas(p1, p2) {
    if (p1.idade > p2.idade) {
        console.log(`${p1.nome} é mais velho(a) que ${p2.nome}`);
    } else if (p2.idade > p1.idade) {
        console.log(`${p2.nome} é mais velho(a) que ${p1.nome}`);
    } else {
        console.log(`${p1.nome} e ${p2.nome} tem a mesma idade`);
    }
}

// Criando os objetos que a função espera receber
const p1 = {
    nome: "Vinícius",
    idade: 31
};

const p2 = {
    nome: "Thayssa",
    idade: 32
};

// Chamando a função com os objetos criados
compararPessoas(p1, p2);