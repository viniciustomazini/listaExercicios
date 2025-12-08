const alunos = ['João', 'Juliana', 'Ana', 'Caio', 'Lara', 'Marjorie', 'Guilherme', 'Aline', 'Fabiana', 'André', 'Carlos', 'Paulo'];
const medias = [10, 8, 9.5, 7, 6, 8.5, 9, 5, 7.5, 6.5, 8, 9];

// Criamos uma lista de listas (matriz)
const listaDeAlunosEMedias = [alunos, medias];

// Usamos o loop 'for' para percorrer a lista de alunos
// 'listaDeAlunosEMedias[0]' é a lista de nomes

for (let i = 0; i < listaDeAlunosEMedias[0].length; i++) {
    
    // Pegamos o nome do aluno atual (usando o índice 'i')
    const aluno = listaDeAlunosEMedias[0][i];
    
    // Pegamos a média correspondente (usando o mesmo índice 'i')
    const media = listaDeAlunosEMedias[1][i];

    // Exibimos a mensagem
    console.log(`${aluno}, sua média é ${media}.`);
}

