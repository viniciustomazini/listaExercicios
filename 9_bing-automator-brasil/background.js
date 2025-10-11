// Background script para Bing Automator Brasil
// Gerencia a lógica principal da automação de pesquisas

class BingAutomatorBrasil {
    constructor() {
        this.isRunning = false;
        this.searchCount = 0;
        this.currentTermIndex = 0;
        this.settings = {
            interval: 10, // segundos
            deviceType: 'desktop',
            maxSearches: 30,
            randomOrder: true,
            categories: {
                esportes: true,
                celebridades: true,
                turismo: true,
                carros: true,
                politica: true,
                religiao: true,
                ciencia: true,
                petroleo: true,
                investimentos: true,
                cultura: true
            }
        };
        this.searchTerms = this.generateSearchTerms();
        this.currentTabId = null;
        this.alarmName = 'bingAutomatorAlarm';
        
        this.init();
    }

    init() {
        // Carregar configurações salvas
        this.loadSettings();
        
        // Configurar listeners
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true; // Manter o canal aberto para resposta assíncrona
        });

        chrome.alarms.onAlarm.addListener((alarm) => {
            if (alarm.name === this.alarmName) {
                this.performSearch();
            }
        });

        // Listener para quando uma aba é fechada
        chrome.tabs.onRemoved.addListener((tabId) => {
            if (tabId === this.currentTabId) {
                this.currentTabId = null;
            }
        });
    }

    generateSearchTerms() {
        const terms = {
            esportes: [
                'Flamengo', 'Corinthians', 'Palmeiras', 'São Paulo FC', 'Santos FC',
                'Pelé', 'Ronaldinho Gaúcho', 'Kaká', 'Neymar', 'Vinicius Jr',
                'Seleção Brasileira', 'Copa do Mundo Brasil', 'Maracanã',
                'Arena Corinthians', 'Allianz Parque', 'Brasileirão',
                'Copa América Brasil', 'Fórmula 1 Brasil', 'Ayrton Senna',
                'Gabriel Medina surf', 'Rebeca Andrade ginástica', 'Marta futebol feminino'
            ],
            celebridades: [
                'Anitta', 'Ivete Sangalo', 'Caetano Veloso', 'Gilberto Gil',
                'Xuxa', 'Silvio Santos', 'Fausto Silva', 'Luciano Huck',
                'Gisele Bündchen', 'Rodrigo Santoro', 'Wagner Moura',
                'Fernanda Montenegro', 'Sônia Braga', 'Cauã Reymond',
                'Bruna Marquezine', 'Paolla Oliveira', 'Taís Araújo',
                'Lázaro Ramos', 'José de Abreu', 'Tony Ramos'
            ],
            turismo: [
                'Cristo Redentor', 'Pão de Açúcar', 'Copacabana', 'Ipanema',
                'Iguaçu Cataratas', 'Fernando de Noronha', 'Bonito MS',
                'Chapada Diamantina', 'Lençóis Maranhenses', 'Jericoacoara',
                'Gramado RS', 'Campos do Jordão', 'Ouro Preto', 'Salvador Bahia',
                'Recife Olinda', 'Florianópolis', 'Búzios', 'Paraty',
                'Amazônia turismo', 'Pantanal', 'Monte Roraima'
            ],
            carros: [
                'Volkswagen Gol', 'Chevrolet Onix', 'Fiat Uno', 'Ford Ka',
                'Hyundai HB20', 'Renault Kwid', 'Nissan March', 'Toyota Corolla',
                'Honda Civic', 'Volkswagen Polo', 'Chevrolet Cruze',
                'Fiat Argo', 'Jeep Compass', 'Volkswagen T-Cross',
                'Chevrolet Tracker', 'Fiat Toro', 'Ford EcoSport',
                'Renault Duster', 'Peugeot 208', 'Citroën C3'
            ],
            politica: [
                'Luiz Inácio Lula da Silva', 'Jair Bolsonaro', 'Dilma Rousseff',
                'Fernando Henrique Cardoso', 'Getúlio Vargas', 'Juscelino Kubitschek',
                'Congresso Nacional', 'Supremo Tribunal Federal', 'Planalto',
                'Senado Federal', 'Câmara dos Deputados', 'TSE Brasil',
                'Eleições Brasil', 'Constituição 1988', 'Impeachment Brasil',
                'Operação Lava Jato', 'Mensalão', 'Presidência República'
            ],
            religiao: [
                'Igreja Católica Brasil', 'Padre Marcelo Rossi', 'Edir Macedo',
                'Igreja Universal', 'Assembleia de Deus', 'Igreja Batista',
                'Umbanda', 'Candomblé', 'Espiritismo Brasil', 'Allan Kardec',
                'Nossa Senhora Aparecida', 'São Francisco de Assis',
                'Padre Fábio de Melo', 'Ana Paula Valadão', 'Silas Malafaia',
                'Valdemiro Santiago', 'RR Soares', 'Templo de Salomão'
            ],
            ciencia: [
                'Embraer', 'Instituto Butantan', 'Fiocruz', 'INPE Brasil',
                'CNPq', 'CAPES', 'USP Universidade', 'UNICAMP', 'UFRJ',
                'Cesar Lattes', 'Carlos Chagas', 'Oswaldo Cruz',
                'Bertha Lutz', 'Johanna Döbereiner', 'Miguel Nicolelis',
                'Pesquisa Amazônia', 'Biodiversidade Brasil', 'Cerrado bioma'
            ],
            petroleo: [
                'Petrobras', 'Pré-sal Brasil', 'Bacia de Santos', 'Campos Basin',
                'Refinaria Paulínia', 'RNEST', 'Comperj', 'BR Distribuidora',
                'Transpetro', 'Gás natural Brasil', 'Etanol combustível',
                'Biodiesel Brasil', 'ANP Agência', 'Exploração petróleo',
                'Plataforma P-51', 'Campo de Libra', 'Óleo diesel S-10'
            ],
            investimentos: [
                'Bovespa B3', 'Ibovespa', 'CDI taxa', 'Selic meta',
                'Tesouro Direto', 'CDB investimento', 'LCI LCA',
                'Fundos imobiliários', 'Ações Petrobras', 'Vale mineração',
                'Itaú Unibanco', 'Banco do Brasil', 'Bradesco',
                'Nubank IPO', 'Magazine Luiza', 'JBS ações',
                'Ambev investimento', 'WEG ações', 'Suzano papel'
            ],
            cultura: [
                'Carnaval Rio', 'Festa Junina', 'Bumba meu boi', 'Frevo',
                'Samba', 'Bossa Nova', 'MPB', 'Forró', 'Axé music',
                'Capoeira', 'Literatura brasileira', 'Machado de Assis',
                'Jorge Amado', 'Clarice Lispector', 'Paulo Coelho',
                'Cinema Novo', 'Glauber Rocha', 'Cidade de Deus filme',
                'Novela brasileira', 'Teatro brasileiro'
            ]
        };

        return terms;
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.local.get(['bingAutomatorSettings']);
            if (result.bingAutomatorSettings) {
                this.settings = { ...this.settings, ...result.bingAutomatorSettings };
            }
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
        }
    }

    async saveSettings() {
        try {
            await chrome.storage.local.set({ bingAutomatorSettings: this.settings });
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
        }
    }

    getActiveSearchTerms() {
        let activeTerms = [];
        
        Object.keys(this.settings.categories).forEach(category => {
            if (this.settings.categories[category] && this.searchTerms[category]) {
                activeTerms = activeTerms.concat(this.searchTerms[category]);
            }
        });

        if (this.settings.randomOrder) {
            // Embaralhar array
            for (let i = activeTerms.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [activeTerms[i], activeTerms[j]] = [activeTerms[j], activeTerms[i]];
            }
        }

        return activeTerms;
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.action) {
                case 'getStatus':
                    sendResponse({
                        isRunning: this.isRunning,
                        searchCount: this.searchCount,
                        settings: this.settings,
                        lastSearch: await this.getLastSearchTerm()
                    });
                    break;

                case 'start':
                    await this.start();
                    sendResponse({ success: true });
                    break;

                case 'stop':
                    await this.stop();
                    sendResponse({ success: true });
                    break;

                case 'updateSettings':
                    this.settings = { ...this.settings, ...message.settings };
                    await this.saveSettings();
                    sendResponse({ success: true });
                    break;

                case 'resetCount':
                    this.searchCount = 0;
                    await this.saveSearchCount();
                    sendResponse({ success: true });
                    break;

                default:
                    sendResponse({ error: 'Ação não reconhecida' });
            }
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            sendResponse({ error: error.message });
        }
    }

    async start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.currentTermIndex = 0;
        
        // Configurar emulação mobile se necessário
        if (this.settings.deviceType === 'mobile' || this.settings.deviceType === 'both') {
            await this.enableMobileEmulation();
        }

        // Realizar primeira pesquisa imediatamente
        await this.performSearch();

        // Configurar alarme para próximas pesquisas
        chrome.alarms.create(this.alarmName, {
            delayInMinutes: this.settings.interval / 60,
            periodInMinutes: this.settings.interval / 60
        });

        console.log('Automação iniciada');
    }

    async stop() {
        this.isRunning = false;
        chrome.alarms.clear(this.alarmName);
        
        // Desabilitar emulação mobile
        await this.disableMobileEmulation();

        console.log('Automação parada');
    }

    async performSearch() {
        if (!this.isRunning || this.searchCount >= this.settings.maxSearches) {
            await this.stop();
            return;
        }

        const activeTerms = this.getActiveSearchTerms();
        if (activeTerms.length === 0) {
            console.error('Nenhum termo de pesquisa ativo');
            return;
        }

        const searchTerm = activeTerms[this.currentTermIndex % activeTerms.length];
        this.currentTermIndex++;

        try {
            // Alternar entre desktop e mobile se configurado
            if (this.settings.deviceType === 'both') {
                if (this.searchCount % 2 === 0) {
                    await this.enableMobileEmulation();
                } else {
                    await this.disableMobileEmulation();
                }
            }

            await this.searchOnBing(searchTerm);
            this.searchCount++;
            await this.saveSearchCount();
            await this.saveLastSearchTerm(searchTerm);

            console.log(`Pesquisa realizada: ${searchTerm} (${this.searchCount}/${this.settings.maxSearches})`);

        } catch (error) {
            console.error('Erro ao realizar pesquisa:', error);
        }
    }

    async searchOnBing(searchTerm) {
        const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
        
        try {
            // Criar nova aba ou reutilizar existente
            if (this.currentTabId) {
                await chrome.tabs.update(this.currentTabId, { url: searchUrl });
            } else {
                const tab = await chrome.tabs.create({ url: searchUrl, active: false });
                this.currentTabId = tab.id;
            }

            // Aguardar um pouco para a página carregar
            await this.sleep(2000);

        } catch (error) {
            console.error('Erro ao abrir aba do Bing:', error);
            this.currentTabId = null;
        }
    }

    async enableMobileEmulation() {
        try {
            await chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ['mobile_user_agent']
            });
        } catch (error) {
            console.error('Erro ao habilitar emulação mobile:', error);
        }
    }

    async disableMobileEmulation() {
        try {
            await chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ['mobile_user_agent']
            });
        } catch (error) {
            console.error('Erro ao desabilitar emulação mobile:', error);
        }
    }

    async saveSearchCount() {
        try {
            await chrome.storage.local.set({ searchCount: this.searchCount });
        } catch (error) {
            console.error('Erro ao salvar contador:', error);
        }
    }

    async saveLastSearchTerm(term) {
        try {
            await chrome.storage.local.set({ 
                lastSearchTerm: term,
                lastSearchTime: new Date().toLocaleTimeString('pt-BR')
            });
        } catch (error) {
            console.error('Erro ao salvar último termo:', error);
        }
    }

    async getLastSearchTerm() {
        try {
            const result = await chrome.storage.local.get(['lastSearchTerm', 'lastSearchTime']);
            if (result.lastSearchTerm && result.lastSearchTime) {
                return `${result.lastSearchTerm} (${result.lastSearchTime})`;
            }
            return '-';
        } catch (error) {
            console.error('Erro ao obter último termo:', error);
            return '-';
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar o automator quando o service worker for carregado
const automator = new BingAutomatorBrasil();

// Carregar contador de pesquisas salvo
chrome.storage.local.get(['searchCount']).then(result => {
    if (result.searchCount) {
        automator.searchCount = result.searchCount;
    }
});

