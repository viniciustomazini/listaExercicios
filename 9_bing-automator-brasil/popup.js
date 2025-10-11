// JavaScript para o popup da extensão Bing Automator Brasil

class PopupController {
    constructor() {
        this.isRunning = false;
        this.searchCount = 0;
        this.settings = {};
        this.lastSearch = '-';
        
        this.init();
    }

    async init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUI());
        } else {
            this.setupUI();
        }
    }

    setupUI() {
        // Elementos do DOM
        this.elements = {
            statusDot: document.getElementById('status-dot'),
            statusText: document.getElementById('status-text'),
            searchCount: document.getElementById('search-count'),
            lastSearch: document.getElementById('last-search'),
            startBtn: document.getElementById('start-btn'),
            stopBtn: document.getElementById('stop-btn'),
            intervalSelect: document.getElementById('interval-select'),
            deviceSelect: document.getElementById('device-select'),
            maxSearches: document.getElementById('max-searches'),
            randomOrder: document.getElementById('random-order'),
            categoryCheckboxes: document.querySelectorAll('.category-item input[type="checkbox"]')
        };

        // Event listeners
        this.setupEventListeners();
        
        // Carregar status inicial
        this.loadStatus();
        
        // Atualizar status a cada 2 segundos
        setInterval(() => this.loadStatus(), 2000);
    }

    setupEventListeners() {
        // Botões de controle
        this.elements.startBtn.addEventListener('click', () => this.startAutomation());
        this.elements.stopBtn.addEventListener('click', () => this.stopAutomation());

        // Configurações
        this.elements.intervalSelect.addEventListener('change', () => this.saveSettings());
        this.elements.deviceSelect.addEventListener('change', () => this.saveSettings());
        this.elements.maxSearches.addEventListener('change', () => this.saveSettings());
        this.elements.randomOrder.addEventListener('change', () => this.saveSettings());

        // Categorias
        this.elements.categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.saveSettings());
        });

        // Duplo clique no contador para resetar
        this.elements.searchCount.addEventListener('dblclick', () => this.resetSearchCount());
    }

    async loadStatus() {
        try {
            const response = await this.sendMessage({ action: 'getStatus' });
            
            if (response.error) {
                console.error('Erro ao carregar status:', response.error);
                return;
            }

            this.isRunning = response.isRunning;
            this.searchCount = response.searchCount;
            this.settings = response.settings;
            this.lastSearch = response.lastSearch;

            this.updateUI();
            this.loadSettingsToUI();

        } catch (error) {
            console.error('Erro ao comunicar com background script:', error);
        }
    }

    updateUI() {
        // Status indicator
        this.elements.statusDot.className = `status-dot ${this.isRunning ? 'running' : 'stopped'}`;
        this.elements.statusText.textContent = this.isRunning ? 'Executando' : 'Parado';

        // Estatísticas
        this.elements.searchCount.textContent = this.searchCount;
        this.elements.lastSearch.textContent = this.lastSearch;

        // Botões
        this.elements.startBtn.disabled = this.isRunning;
        this.elements.stopBtn.disabled = !this.isRunning;

        // Texto dos botões
        if (this.isRunning) {
            this.elements.startBtn.innerHTML = '<span class="btn-icon">⏸️</span>Executando...';
            this.elements.stopBtn.innerHTML = '<span class="btn-icon">⏹️</span>Parar Automação';
        } else {
            this.elements.startBtn.innerHTML = '<span class="btn-icon">▶️</span>Iniciar Automação';
            this.elements.stopBtn.innerHTML = '<span class="btn-icon">⏹️</span>Parar Automação';
        }
    }

    loadSettingsToUI() {
        if (!this.settings) return;

        // Configurações básicas
        this.elements.intervalSelect.value = this.settings.interval || 10;
        this.elements.deviceSelect.value = this.settings.deviceType || 'desktop';
        this.elements.maxSearches.value = this.settings.maxSearches || 30;
        this.elements.randomOrder.checked = this.settings.randomOrder !== false;

        // Categorias
        if (this.settings.categories) {
            this.elements.categoryCheckboxes.forEach(checkbox => {
                const category = checkbox.value;
                checkbox.checked = this.settings.categories[category] !== false;
            });
        }
    }

    async saveSettings() {
        const newSettings = {
            interval: parseInt(this.elements.intervalSelect.value),
            deviceType: this.elements.deviceSelect.value,
            maxSearches: parseInt(this.elements.maxSearches.value),
            randomOrder: this.elements.randomOrder.checked,
            categories: {}
        };

        // Coletar categorias selecionadas
        this.elements.categoryCheckboxes.forEach(checkbox => {
            newSettings.categories[checkbox.value] = checkbox.checked;
        });

        try {
            const response = await this.sendMessage({
                action: 'updateSettings',
                settings: newSettings
            });

            if (response.error) {
                console.error('Erro ao salvar configurações:', response.error);
                this.showNotification('Erro ao salvar configurações', 'error');
            } else {
                this.showNotification('Configurações salvas', 'success');
            }

        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            this.showNotification('Erro ao salvar configurações', 'error');
        }
    }

    async startAutomation() {
        try {
            // Salvar configurações antes de iniciar
            await this.saveSettings();

            const response = await this.sendMessage({ action: 'start' });

            if (response.error) {
                console.error('Erro ao iniciar automação:', response.error);
                this.showNotification('Erro ao iniciar automação', 'error');
            } else {
                this.showNotification('Automação iniciada', 'success');
                this.loadStatus(); // Atualizar status imediatamente
            }

        } catch (error) {
            console.error('Erro ao iniciar automação:', error);
            this.showNotification('Erro ao iniciar automação', 'error');
        }
    }

    async stopAutomation() {
        try {
            const response = await this.sendMessage({ action: 'stop' });

            if (response.error) {
                console.error('Erro ao parar automação:', response.error);
                this.showNotification('Erro ao parar automação', 'error');
            } else {
                this.showNotification('Automação parada', 'info');
                this.loadStatus(); // Atualizar status imediatamente
            }

        } catch (error) {
            console.error('Erro ao parar automação:', error);
            this.showNotification('Erro ao parar automação', 'error');
        }
    }

    async resetSearchCount() {
        if (confirm('Deseja resetar o contador de pesquisas?')) {
            try {
                const response = await this.sendMessage({ action: 'resetCount' });

                if (response.error) {
                    console.error('Erro ao resetar contador:', response.error);
                    this.showNotification('Erro ao resetar contador', 'error');
                } else {
                    this.showNotification('Contador resetado', 'info');
                    this.loadStatus();
                }

            } catch (error) {
                console.error('Erro ao resetar contador:', error);
                this.showNotification('Erro ao resetar contador', 'error');
            }
        }
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos inline para a notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '10px 15px',
            borderRadius: '5px',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            zIndex: '10000',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            maxWidth: '250px',
            wordWrap: 'break-word'
        });

        // Cores baseadas no tipo
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };

        notification.style.backgroundColor = colors[type] || colors.info;

        // Adicionar ao DOM
        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Método para validar configurações
    validateSettings() {
        const interval = parseInt(this.elements.intervalSelect.value);
        const maxSearches = parseInt(this.elements.maxSearches.value);

        if (interval < 5) {
            this.showNotification('Intervalo mínimo é 5 segundos', 'warning');
            this.elements.intervalSelect.value = 5;
            return false;
        }

        if (maxSearches < 1 || maxSearches > 100) {
            this.showNotification('Máximo de pesquisas deve estar entre 1 e 100', 'warning');
            this.elements.maxSearches.value = Math.max(1, Math.min(100, maxSearches));
            return false;
        }

        // Verificar se pelo menos uma categoria está selecionada
        const hasSelectedCategory = Array.from(this.elements.categoryCheckboxes)
            .some(checkbox => checkbox.checked);

        if (!hasSelectedCategory) {
            this.showNotification('Selecione pelo menos uma categoria', 'warning');
            return false;
        }

        return true;
    }

    // Método para exportar/importar configurações (funcionalidade extra)
    exportSettings() {
        const settingsJson = JSON.stringify(this.settings, null, 2);
        const blob = new Blob([settingsJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bing-automator-settings.json';
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Configurações exportadas', 'success');
    }
}

// Inicializar o controlador do popup
const popupController = new PopupController();

// Adicionar funcionalidades extras via console (para usuários avançados)
window.bingAutomator = {
    exportSettings: () => popupController.exportSettings(),
    getStatus: () => popupController.loadStatus(),
    version: '1.0.0'
};

