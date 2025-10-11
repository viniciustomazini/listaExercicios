# 🇧🇷 Bing Automator Brasil

Uma extensão completa e funcional para Microsoft Edge que realiza pesquisas automatizadas no Bing sobre assuntos brasileiros em português, com recursos avançados de temporização, filtros e emulação mobile.

## ✨ Características Principais

- **🔍 Pesquisas Automatizadas**: Realiza pesquisas automáticas no Bing com termos relacionados ao Brasil
- **🇧🇷 Conteúdo Brasileiro**: Mais de 200 termos de pesquisa em português sobre diversos assuntos brasileiros
- **⏱️ Temporização Configurável**: Intervalo personalizável entre pesquisas (5 segundos a 2 minutos)
- **📱 Emulação Mobile**: Simula pesquisas em dispositivos móveis para maximizar pontos
- **🎯 Categorias Selecionáveis**: 10 categorias diferentes de assuntos brasileiros
- **📊 Monitoramento**: Acompanhe o progresso com contador de pesquisas e histórico
- **🎲 Ordem Aleatória**: Randomização dos termos para comportamento mais natural
- **💾 Configurações Persistentes**: Suas preferências são salvas automaticamente

## 📂 Categorias de Pesquisa

A extensão inclui termos de pesquisa organizados nas seguintes categorias:

- **🏆 Esportes**: Futebol, atletas brasileiros, competições nacionais
- **⭐ Celebridades**: Artistas, apresentadores, personalidades brasileiras
- **🏖️ Turismo**: Destinos turísticos, pontos turísticos, cidades brasileiras
- **🚗 Carros**: Modelos populares no Brasil, montadoras nacionais
- **🏛️ Política**: Políticos, instituições, eventos políticos brasileiros
- **⛪ Religião**: Religiões no Brasil, líderes religiosos, festividades
- **🧪 Ciência**: Instituições de pesquisa, cientistas brasileiros
- **🛢️ Petróleo**: Petrobras, exploração petrolífera, energia no Brasil
- **💰 Investimentos**: Bolsa de valores, empresas brasileiras, economia
- **🎭 Cultura**: Manifestações culturais, literatura, cinema brasileiro

## 🚀 Instalação

### Método 1: Instalação Manual (Recomendado)

1. **Baixe a extensão**: Faça download de todos os arquivos da extensão
2. **Abra o Microsoft Edge**: Vá para `edge://extensions/`
3. **Ative o modo desenvolvedor**: Clique no botão "Modo de desenvolvedor" no canto inferior esquerdo
4. **Carregue a extensão**: Clique em "Carregar sem compactação" e selecione a pasta da extensão
5. **Confirme a instalação**: A extensão aparecerá na lista de extensões instaladas

### Método 2: Arquivo .crx (Se disponível)

1. Baixe o arquivo `.crx` da extensão
2. Arraste o arquivo para a página `edge://extensions/`
3. Confirme a instalação quando solicitado

## 🎮 Como Usar

### Configuração Inicial

1. **Clique no ícone da extensão** na barra de ferramentas do Edge
2. **Configure suas preferências**:
   - Defina o intervalo entre pesquisas
   - Escolha o tipo de dispositivo (Desktop/Mobile/Ambos)
   - Selecione o número máximo de pesquisas por sessão
   - Marque as categorias de interesse

### Iniciando a Automação

1. **Clique em "Iniciar Automação"** no popup da extensão
2. **Acompanhe o progresso** através do contador de pesquisas
3. **Monitore o status** através do indicador visual (verde = executando)

### Parando a Automação

- Clique em "Parar Automação" a qualquer momento
- A automação para automaticamente ao atingir o limite de pesquisas

## ⚙️ Configurações Avançadas

### Temporização
- **Intervalo mínimo**: 5 segundos (recomendado para evitar detecção)
- **Intervalo máximo**: 2 minutos
- **Sugestão**: Use 10-15 segundos para comportamento natural

### Emulação de Dispositivo
- **Desktop**: Pesquisas normais do navegador
- **Mobile**: Simula dispositivo móvel (pode gerar mais pontos)
- **Ambos**: Alterna entre desktop e mobile automaticamente

### Categorias
- Selecione apenas as categorias de seu interesse
- Pelo menos uma categoria deve estar ativa
- Mais categorias = maior variedade de termos

## 🔧 Recursos Técnicos

### Arquitetura
- **Manifest V3**: Compatível com as mais recentes especificações
- **Service Worker**: Background script eficiente e moderno
- **Content Scripts**: Interação inteligente com páginas do Bing
- **Declarative Net Request**: Emulação mobile via modificação de headers

### Comportamento Inteligente
- **Simulação Humana**: Scroll suave e cliques ocasionais em resultados
- **Randomização**: Ordem aleatória de termos para evitar padrões
- **Gestão de Abas**: Reutilização inteligente de abas para economia de recursos
- **Persistência**: Configurações e progresso salvos localmente

### Segurança e Privacidade
- **Dados Locais**: Todas as configurações ficam no seu navegador
- **Sem Telemetria**: Nenhum dado é enviado para servidores externos
- **Código Aberto**: Todo o código está disponível para auditoria

## 📊 Monitoramento

### Informações Disponíveis
- **Contador de Pesquisas**: Total de pesquisas realizadas na sessão
- **Última Pesquisa**: Termo e horário da última pesquisa realizada
- **Status em Tempo Real**: Indicador visual do estado da automação

### Resetar Contador
- Duplo clique no contador de pesquisas para resetar
- Útil para iniciar uma nova sessão de contagem

## 🛠️ Solução de Problemas

### Extensão Não Funciona
1. Verifique se está logado no Microsoft Rewards
2. Confirme que o Bing está acessível
3. Recarregue a extensão em `edge://extensions/`

### Pesquisas Não São Realizadas
1. Verifique as permissões da extensão
2. Confirme que pelo menos uma categoria está selecionada
3. Verifique se o intervalo não está muito baixo

### Emulação Mobile Não Funciona
1. Confirme que as regras de rede estão ativas
2. Recarregue a página do Bing após ativar
3. Verifique o User-Agent nas ferramentas de desenvolvedor

## 📝 Notas Importantes

### Uso Responsável
- Use intervalos razoáveis entre pesquisas (recomendado: 10+ segundos)
- Não execute múltiplas instâncias simultaneamente
- Respeite os termos de uso do Microsoft Rewards

### Limitações
- Funciona apenas com o Bing (conforme especificação)
- Requer login no Microsoft Rewards para acumular pontos
- Pode ser detectado se usado de forma excessiva

### Compatibilidade
- **Microsoft Edge**: Versão 88 ou superior
- **Chromium**: Compatível com navegadores baseados em Chromium
- **Sistema**: Windows, macOS, Linux

## 🔄 Atualizações

### Versão 1.0.0
- Lançamento inicial
- Mais de 200 termos de pesquisa brasileiros
- Interface completa em português
- Emulação mobile via Declarative Net Request
- Configurações persistentes

### Próximas Versões
- Integração com API do Microsoft Rewards (se disponível)
- Mais categorias de termos
- Estatísticas avançadas
- Exportação/importação de configurações

## 🤝 Contribuição

Esta extensão foi desenvolvida para a comunidade brasileira. Sugestões de melhorias e novos termos de pesquisa são bem-vindas.

### Como Contribuir
1. Sugira novos termos de pesquisa brasileiros
2. Reporte bugs ou problemas encontrados
3. Proponha novas funcionalidades
4. Ajude na documentação

## 📄 Licença

Este projeto é distribuído sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## ⚠️ Disclaimer

Esta extensão é uma ferramenta educacional e de automação. O uso deve estar em conformidade com os termos de serviço do Microsoft Rewards e Bing. Os desenvolvedores não se responsabilizam por qualquer violação dos termos de uso ou suspensão de contas.

---

**Desenvolvido com 💚💛 para a comunidade brasileira**

