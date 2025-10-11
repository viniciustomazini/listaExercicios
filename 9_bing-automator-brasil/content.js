// Content script para Bing Automator Brasil
// Executa no contexto das páginas do Bing para interações específicas

(function() {
    'use strict';

    // Verificar se já foi inicializado para evitar execução múltipla
    if (window.bingAutomatorInitialized) {
        return;
    }
    window.bingAutomatorInitialized = true;

    class BingContentScript {
        constructor() {
            this.init();
        }

        init() {
            // Aguardar o DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.onPageReady());
            } else {
                this.onPageReady();
            }
        }

        onPageReady() {
            // Verificar se estamos em uma página de pesquisa do Bing
            if (this.isBingSearchPage()) {
                this.handleBingSearchPage();
            }
        }

        isBingSearchPage() {
            return window.location.hostname.includes('bing.com') && 
                   (window.location.pathname.includes('/search') || 
                    window.location.search.includes('q='));
        }

        handleBingSearchPage() {
            // Simular comportamento humano na página
            this.simulateHumanBehavior();
            
            // Tentar extrair informações de pontos se disponível
            this.extractRewardsInfo();
        }

        simulateHumanBehavior() {
            // Simular scroll suave na página
            setTimeout(() => {
                this.smoothScroll();
            }, 1000 + Math.random() * 2000);

            // Ocasionalmente clicar em um resultado (comportamento mais natural)
            if (Math.random() < 0.3) { // 30% de chance
                setTimeout(() => {
                    this.clickRandomResult();
                }, 2000 + Math.random() * 3000);
            }
        }

        smoothScroll() {
            const scrollHeight = Math.min(
                document.body.scrollHeight * 0.3, // Máximo 30% da página
                window.innerHeight * 2 // Ou 2 telas
            );

            window.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });

            // Voltar ao topo após um tempo
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2000 + Math.random() * 2000);
        }

        clickRandomResult() {
            // Procurar por links de resultados orgânicos
            const resultLinks = document.querySelectorAll('#b_results .b_algo h2 a, #b_results .b_title a');
            
            if (resultLinks.length > 0) {
                // Selecionar um dos primeiros 5 resultados (mais natural)
                const maxIndex = Math.min(5, resultLinks.length);
                const randomIndex = Math.floor(Math.random() * maxIndex);
                const link = resultLinks[randomIndex];

                if (link && link.href) {
                    // Abrir em nova aba para não interferir na automação
                    const newTab = window.open(link.href, '_blank');
                    
                    // Fechar a nova aba após alguns segundos
                    if (newTab) {
                        setTimeout(() => {
                            try {
                                newTab.close();
                            } catch (e) {
                                // Ignorar erros de fechamento (pode ser bloqueado pelo navegador)
                            }
                        }, 3000 + Math.random() * 5000);
                    }
                }
            }
        }

        extractRewardsInfo() {
            // Tentar encontrar informações sobre pontos do Microsoft Rewards
            const rewardsSelectors = [
                '#id_rh', // Seletor comum para área de rewards
                '.rewards-signin',
                '.rewards-points',
                '[data-testid*="reward"]',
                '.mee_rewards'
            ];

            let rewardsInfo = null;

            for (const selector of rewardsSelectors) {
                const element = document.querySelector(selector);
                if (element) {
                    rewardsInfo = {
                        found: true,
                        text: element.textContent?.trim() || '',
                        selector: selector
                    };
                    break;
                }
            }

            // Enviar informações para o background script se encontradas
            if (rewardsInfo) {
                chrome.runtime.sendMessage({
                    action: 'rewardsInfo',
                    data: rewardsInfo
                }).catch(error => {
                    console.log('Erro ao enviar informações de rewards:', error);
                });
            }
        }

        // Método para detectar se o usuário está logado no Microsoft Rewards
        checkRewardsLogin() {
            const loginIndicators = [
                '.id_button', // Botão de perfil
                '.rewards-signin',
                '#id_n', // Nome do usuário
                '.mee_rewards'
            ];

            for (const selector of loginIndicators) {
                const element = document.querySelector(selector);
                if (element) {
                    const text = element.textContent?.toLowerCase() || '';
                    if (text.includes('entrar') || text.includes('sign in')) {
                        return false; // Não logado
                    } else if (text.length > 0) {
                        return true; // Provavelmente logado
                    }
                }
            }

            return null; // Indeterminado
        }

        // Método para adicionar variação no comportamento
        addRandomDelay() {
            return new Promise(resolve => {
                const delay = 500 + Math.random() * 2000; // 0.5 a 2.5 segundos
                setTimeout(resolve, delay);
            });
        }
    }

    // Inicializar o content script
    new BingContentScript();

    // Adicionar listener para mensagens do background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'checkPage') {
            sendResponse({
                url: window.location.href,
                title: document.title,
                isSearchPage: window.location.search.includes('q=')
            });
        }
    });

    // Log para debug (remover em produção)
    console.log('Bing Automator Brasil - Content Script carregado');

})();

