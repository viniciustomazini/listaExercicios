# Sistema de Gestão de Tarefas - Farmacêutica

## Descrição
Sistema web completo para gestão e monitoramento de tarefas de analistas farmacêuticos, desenvolvido com HTML, CSS e JavaScript puro.

## Funcionalidades

### ✅ Funcionalidades Implementadas
- **Interface colorida e profissional** com design moderno
- **Gráfico de Gantt dinâmico** que se atualiza automaticamente
- **Filtros funcionais** por analista, revisor, status e mês
- **Relatórios automáticos** com gráficos interativos
- **Adição e remoção de tarefas** em tempo real
- **Dashboard com métricas** de produtividade
- **Responsivo** para desktop e mobile

### 📊 Abas da Aplicação

#### 1. Tarefas
- Formulário para adicionar novas tarefas
- Lista de todas as tarefas com informações detalhadas
- Botões para remover tarefas
- Campos obrigatórios: Projeto, Analista, Revisor, Data Início, Data Fim

#### 2. Gantt
- Visualização temporal das tarefas por analista
- Cores diferenciadas por status (0%, 25%, 50%, 75%, 100%)
- Atualização automática conforme novas tarefas são adicionadas

#### 3. Relatórios
- Cards com métricas principais (Total, Em Andamento, Concluídas, Analistas Ativos)
- Gráfico de barras: Tarefas por Analista
- Gráfico de pizza: Distribuição por Status
- Gráfico de barras: Tarefas por Revisor
- Lista de atividades em aberto para transferência

### 🎨 Design e Interface
- **Cores**: Gradiente azul moderno com elementos coloridos
- **Ícones**: Font Awesome para melhor experiência visual
- **Layout**: Cards organizados e responsivos
- **Tipografia**: Fontes legíveis e hierarquia clara

### 👥 Dados Pré-configurados

#### Analistas
- Cintía
- Kamila
- Lara
- Luca
- Luísa

#### Revisores
- Hanna
- Taína
- Maryane
- Vinícius

#### Status Disponíveis
- 0% (Vermelho)
- 25% (Laranja)
- 50% (Amarelo)
- 75% (Verde claro)
- 100% (Verde escuro)

## Como Usar

### 1. Executar Localmente
```bash
# Navegue até o diretório da aplicação
cd farmaceutica-app

# Inicie um servidor HTTP simples
python3 -m http.server 8080

# Acesse no navegador
http://localhost:8080
```

### 2. Adicionar Nova Tarefa
1. Vá para a aba "Tarefas"
2. Preencha todos os campos obrigatórios (*)
3. Clique em "Adicionar Tarefa"
4. A tarefa aparecerá na lista e nos relatórios automaticamente

### 3. Usar Filtros
1. Use os filtros no topo da página
2. Selecione Analista, Revisor, Status ou Mês
3. Os resultados são filtrados em tempo real

### 4. Visualizar Gantt
1. Clique na aba "Gantt"
2. Veja a distribuição temporal das tarefas
3. Cada cor representa um status diferente

### 5. Analisar Relatórios
1. Clique na aba "Relatórios"
2. Visualize métricas e gráficos interativos
3. Identifique atividades em aberto

## Tecnologias Utilizadas
- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização e layout responsivo
- **JavaScript**: Lógica de negócio e interatividade
- **Tailwind CSS**: Framework CSS para design rápido
- **Font Awesome**: Ícones profissionais
- **Chart.js**: Gráficos interativos

## Arquivos Principais
- `index.html`: Interface principal da aplicação
- `app.js`: Lógica JavaScript e funcionalidades
- `README.md`: Documentação (este arquivo)

## Características Técnicas
- **Armazenamento**: Dados mantidos em memória (JavaScript)
- **Responsividade**: Compatível com desktop e mobile
- **Performance**: Carregamento rápido e interface fluida
- **Compatibilidade**: Funciona em navegadores modernos

## Acesso Simultâneo
- Suporta visualização simultânea por múltiplos usuários
- Para acesso compartilhado, hospede em servidor web
- Dados são locais a cada sessão do navegador

## Próximos Passos (Opcionais)
- Implementar persistência de dados (banco de dados)
- Adicionar autenticação de usuários
- Criar notificações por email
- Exportar relatórios em PDF
- Integração com sistemas externos

---

**Desenvolvido para atender às necessidades específicas da indústria farmacêutica com foco em produtividade e controle de qualidade.**

