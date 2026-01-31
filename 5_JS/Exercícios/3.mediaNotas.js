/*
Desafio - Média de Notas

1) Faça um algoritmo que dado as 3 notas tiradas por um aluno em um semestre da faculdade calcule e imprima a 
sua média e a sua classificação conforme a tabela abaixo:

Média = (nota1 + nota2 + nota3) / 3

Classificação:
- Média menor que 5,0: Reprovado;
- Média entre 5,0 e 7,0: Recuperação;
- Média acima de 7,0: Passou de semestre;

*/

const nota1 = 5;
const nota2 = 3;
const nota3 = 7;
const media = (nota1 + nota2 + nota3) / 3;
console.log(media)

if (media < 5) {
    console.log('Reprovado');
} else if (media >= 5 && media <= 7) {
    console.log('Recuperação');
}
else {
    console.log('Passou de semestre');
}   

