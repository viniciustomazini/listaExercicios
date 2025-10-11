# -*- coding: utf-8 -*-
"""
Sistema de Gestão de Notas de Alunos
Este programa permite adicionar notas, calcular a média e determinar a situação de um aluno.
"""

def adicionar_notas():
    """
    Esta função é responsável por pedir as notas ao usuário e armazená-las em uma lista.
    Ela utiliza um laço de repetição (while) para permitir a inserção de várias notas.
    Retorna uma lista contendo as notas (float).
    """
    notas = []
    print("--- Cadastro de Notas ---")
    print("Digite as notas do aluno. Digite 'fim' para terminar.")

    while True: # Laço de repetição infinito para continuar pedindo notas
        entrada = input("Digite uma nota: ")

        if entrada.lower() == 'fim':
            break  # Interrompe o laço se o usuário digitar 'fim'

        try:
            # Tenta converter a entrada para um número (float)
            nota = float(entrada)
            notas.append(nota) # Adiciona a nota na lista
            print(f"Nota {nota} adicionada com sucesso.")
        except ValueError:
            # Se a conversão falhar, informa o usuário sobre a entrada inválida
            print("Entrada inválida. Por favor, digite um número ou 'fim'.")

    return notas

def calcular_media(lista_de_notas):
    """
    Esta função calcula a média das notas de uma lista.
    Recebe uma lista de notas como argumento.
    Retorna a média calculada. Se a lista estiver vazia, retorna 0.
    """
    if not lista_de_notas:  # Verifica se a lista não está vazia
        return 0

    soma_das_notas = sum(lista_de_notas)
    quantidade_de_notas = len(lista_de_notas)
    media = soma_das_notas / quantidade_de_notas
    return media

def determinar_situacao(media):
    """
    Esta função determina se o aluno foi aprovado ou reprovado com base na média.
    Recebe a média como argumento.
    Utiliza uma estrutura condicional (if/else).
    Retorna a string "Aprovado" ou "Reprovado".
    """
    if media >= 7:
        return "Aprovado"
    else:
        return "Reprovado"

def exibir_relatorio(notas, media, situacao):
    """
    Esta função exibe o relatório final com todas as informações.
    Recebe a lista de notas, a média e a situação como argumentos.
    """
    print("\n--- Relatório Final do Aluno ---")
    print(f"Notas Inseridas: {notas}")
    # Formata a média para exibir apenas 2 casas decimais
    print(f"Média Final: {media:.2f}")
    print(f"Situação: {situacao}")
    print("---------------------------------")


# --- Função Principal que Orquestra o Sistema ---
def main():
    """
    Função principal que executa o programa na ordem correta.
    """
    lista_de_notas_aluno = adicionar_notas()

    # Só continua se o usuário tiver inserido pelo menos uma nota
    if lista_de_notas_aluno:
        media_aluno = calcular_media(lista_de_notas_aluno)
        situacao_aluno = determinar_situacao(media_aluno)
        exibir_relatorio(lista_de_notas_aluno, media_aluno, situacao_aluno)
    else:
        print("\nNenhuma nota foi inserida. O programa será encerrado.")


# Ponto de entrada do programa: executa a função main quando o script é rodado
if __name__ == "__main__":
    main()

