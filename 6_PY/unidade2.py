# -*- coding: utf-8 -*-
"""
Sistema de Gerenciamento de Livros para Biblioteca.

Este script implementa um sistema simples de linha de comando para gerenciar
livros, permitindo cadastrar, listar, buscar e gerar um gráfico de gêneros.
"""

# Importa a biblioteca Matplotlib para a geração de gráficos.
# Se não estiver instalada, execute no terminal: pip install matplotlib
import matplotlib.pyplot as plt

# Passo 1: Definir a classe Livro
class Livro:
    """
    Representa um livro com seus atributos.
    A função __init__ é o construtor da classe, executada ao criar um novo objeto.
    """
    def __init__(self, titulo, autor, genero, quantidade):
        self.titulo = titulo
        self.autor = autor
        self.genero = genero
        self.quantidade = quantidade

# Passo 2: Criar a lista de livros (nosso acervo)
# Esta lista irá armazenar todos os objetos do tipo Livro.
biblioteca = []

# Passo 3.1: Implementar função para cadastrar um novo livro
def cadastrar_livro(acervo):
    """
    Solicita os dados de um novo livro ao usuário e o adiciona ao acervo.
    """
    print("\n--- Cadastro de Novo Livro ---")
    titulo = input("Digite o título do livro: ")
    autor = input("Digite o autor do livro: ")
    genero = input("Digite o gênero do livro: ")

    # Laço para garantir que a quantidade seja um número inteiro válido
    while True:
        try:
            quantidade = int(input("Digite a quantidade disponível: "))
            break # Sai do laço se a conversão para inteiro for bem-sucedida
        except ValueError:
            print("Erro: A quantidade deve ser um número inteiro. Tente novamente.")

    # Cria um novo objeto (instância) da classe Livro
    novo_livro = Livro(titulo, autor, genero, quantidade)
    
    # Adiciona o novo livro à lista que representa a biblioteca
    acervo.append(novo_livro)
    print(f"\nLivro '{titulo}' cadastrado com sucesso!")

# Passo 3.2: Implementar função para listar todos os livros
def listar_livros(acervo):
    """
    Exibe todos os livros cadastrados no acervo.
    """
    print("\n--- Lista de Todos os Livros ---")
    
    # Verifica se a biblioteca está vazia
    if not acervo:
        print("A biblioteca está vazia. Nenhum livro cadastrado.")
        return

    # Percorre cada objeto 'livro' na lista 'acervo' e imprime seus atributos
    for i, livro in enumerate(acervo, start=1):
        print(f"{i}. Título: {livro.titulo}")
        print(f"   Autor: {livro.autor}")
        print(f"   Gênero: {livro.genero}")
        print(f"   Quantidade: {livro.quantidade}")
        print("-" * 20)

# Passo 3.3: Implementar função para buscar um livro pelo título
def buscar_livro(acervo):
    """
    Busca um livro no acervo pelo título e exibe seus detalhes se encontrado.
    """
    print("\n--- Busca de Livro por Título ---")
    titulo_busca = input("Digite o título do livro que deseja buscar: ")
    
    livro_encontrado = None
    # Percorre a lista de livros para encontrar uma correspondência
    for livro in acervo:
        # .lower() torna a busca insensível a maiúsculas/minúsculas
        if titulo_busca.lower() == livro.titulo.lower():
            livro_encontrado = livro
            break # Para o laço assim que encontra o primeiro resultado

    if livro_encontrado:
        print("\nLivro encontrado:")
        print(f"   Título: {livro_encontrado.titulo}")
        print(f"   Autor: {livro_encontrado.autor}")
        print(f"   Gênero: {livro_encontrado.genero}")
        print(f"   Quantidade: {livro_encontrado.quantidade}")
    else:
        print(f"\nO livro com o título '{titulo_busca}' não foi encontrado.")

# Passo 4: Utilizar a biblioteca Matplotlib para gerar um gráfico
def gerar_grafico_generos(acervo):
    """
    Conta a quantidade de livros por gênero e exibe um gráfico de barras.
    """
    print("\n--- Gerando Gráfico de Livros por Gênero ---")
    if not acervo:
        print("A biblioteca está vazia. Não é possível gerar o gráfico.")
        return

    # Dicionário para armazenar a contagem de livros por gênero
    contagem_generos = {}
    
    # Percorre a biblioteca e conta os livros de cada gênero
    for livro in acervo:
        # .capitalize() para padronizar o nome do gênero (ex: "ficção" -> "Ficção")
        genero = livro.genero.capitalize()
        # CORREÇÃO: Somar a quantidade do livro, em vez de apenas contar +1
        contagem_generos[genero] = contagem_generos.get(genero, 0) + livro.quantidade
    
    # Extrai os nomes dos gêneros e as contagens para o gráfico
    generos = list(contagem_generos.keys())
    quantidades = list(contagem_generos.values())
    
    # Cria o gráfico
    plt.figure(figsize=(10, 6)) # Define o tamanho da figura
    plt.bar(generos, quantidades, color='skyblue')
    plt.xlabel('Gênero') # Rótulo do eixo X
    plt.ylabel('Quantidade de Livros') # Rótulo do eixo Y
    plt.title('Quantidade de Livros por Gênero na Biblioteca') # Título do gráfico
    plt.xticks(rotation=45, ha='right') # Rotaciona os nomes dos gêneros para melhor visualização
    plt.tight_layout() # Ajusta o layout para não cortar os rótulos
    
    print("O gráfico será exibido em uma nova janela.")
    plt.show() # Exibe o gráfico

# Função principal que executa o menu do sistema
def main():
    """
    Função principal que exibe o menu e gerencia a interação com o usuário.
    """
    while True:
        print("\n===== Sistema de Gerenciamento da Biblioteca =====")
        print("1. Cadastrar Novo Livro")
        print("2. Listar Todos os Livros")
        print("3. Buscar Livro por Título")
        print("4. Gerar Gráfico de Gêneros")
        print("5. Sair")
        
        escolha = input("Escolha uma opção (1-5): ")

        if escolha == '1':
            cadastrar_livro(biblioteca)
        elif escolha == '2':
            listar_livros(biblioteca)
        elif escolha == '3':
            buscar_livro(biblioteca)
        elif escolha == '4':
            gerar_grafico_generos(biblioteca)
        elif escolha == '5':
            print("Saindo do sistema. Até logo!")
            break
        else:
            print("Opção inválida. Por favor, escolha um número de 1 a 5.")

# Ponto de entrada do programa: executa a função main quando o script é rodado
if __name__ == "__main__":
    main()