# 📦 Instruções de Instalação - Bing Automator Brasil

## 🚀 Instalação no Microsoft Edge

### Pré-requisitos
- Microsoft Edge versão 88 ou superior
- Windows, macOS ou Linux
- Conexão com a internet

### Passo a Passo

#### 1. Preparar os Arquivos
1. Baixe todos os arquivos da extensão para uma pasta no seu computador
2. Certifique-se de que todos os arquivos estão presentes:
   - `manifest.json`
   - `background.js`
   - `popup.html`
   - `popup.css`
   - `popup.js`
   - `content.js`
   - `rules.json`
   - Pasta `icons/` com os ícones

#### 2. Abrir o Microsoft Edge
1. Abra o Microsoft Edge
2. Digite `edge://extensions/` na barra de endereços
3. Pressione Enter

#### 3. Ativar o Modo Desenvolvedor
1. No canto inferior esquerdo da página, encontre o botão **"Modo de desenvolvedor"**
2. Clique para ativá-lo (o botão ficará azul)

#### 4. Carregar a Extensão
1. Clique no botão **"Carregar sem compactação"**
2. Navegue até a pasta onde você salvou os arquivos da extensão
3. Selecione a pasta e clique em **"Selecionar pasta"**

#### 5. Confirmar a Instalação
1. A extensão aparecerá na lista de extensões instaladas
2. Certifique-se de que está **habilitada** (botão azul)
3. O ícone da extensão aparecerá na barra de ferramentas

## 🔧 Configuração Inicial

### 1. Primeiro Acesso
1. Clique no ícone da extensão na barra de ferramentas
2. O popup da extensão será aberto
3. Configure suas preferências iniciais

### 2. Configurações Recomendadas
- **Intervalo entre pesquisas**: 10-15 segundos (para comportamento natural)
- **Tipo de dispositivo**: Desktop (para começar)
- **Máximo de pesquisas**: 30 (padrão do Microsoft Rewards)
- **Categorias**: Selecione as de seu interesse

### 3. Teste Inicial
1. Selecione poucas categorias para o primeiro teste
2. Configure um limite baixo de pesquisas (ex: 5)
3. Clique em "Iniciar Automação"
4. Observe se as pesquisas estão sendo realizadas

## 🛠️ Solução de Problemas

### Extensão Não Aparece
- Verifique se todos os arquivos estão na pasta
- Certifique-se de que o `manifest.json` está válido
- Recarregue a extensão clicando no botão de atualização

### Erro de Permissões
- Verifique se o modo desenvolvedor está ativado
- Certifique-se de que o Edge tem permissões para acessar arquivos locais

### Pesquisas Não Funcionam
- Verifique se está logado no Microsoft Rewards
- Teste acessando o Bing manualmente
- Verifique se há bloqueadores de popup ativos

## 🔄 Atualizações

### Como Atualizar
1. Baixe os novos arquivos da extensão
2. Substitua os arquivos antigos pelos novos
3. Vá para `edge://extensions/`
4. Clique no botão de atualização da extensão

### Backup das Configurações
- As configurações são salvas automaticamente no navegador
- Para backup manual, use as ferramentas de desenvolvedor para exportar dados do `chrome.storage.local`

## ⚠️ Avisos Importantes

### Uso Responsável
- Use intervalos razoáveis entre pesquisas (mínimo 5 segundos)
- Não execute múltiplas instâncias simultaneamente
- Respeite os limites diários do Microsoft Rewards

### Segurança
- A extensão funciona apenas localmente
- Nenhum dado é enviado para servidores externos
- Todas as configurações ficam no seu navegador

### Compatibilidade
- Testado no Microsoft Edge 88+
- Compatível com navegadores baseados em Chromium
- Pode funcionar no Google Chrome com pequenos ajustes

## 📞 Suporte

### Problemas Comuns
1. **Extensão não carrega**: Verifique o console de erros em `edge://extensions/`
2. **Pesquisas muito rápidas**: Aumente o intervalo nas configurações
3. **Não acumula pontos**: Verifique se está logado no Microsoft Rewards

### Debug
- Abra as ferramentas de desenvolvedor (F12)
- Vá para a aba Console
- Procure por mensagens de erro relacionadas à extensão

### Logs
- A extensão gera logs no console do background script
- Para acessar: `edge://extensions/` → Detalhes da extensão → "Inspecionar visualizações: background.html"

---

**Desenvolvido para a comunidade brasileira 🇧🇷**

