// Dados iniciais
let tasks = [
    {
        id: 1,
        projeto: 'Análise de Estabilidade - Produto A',
        Elaborador: 'Cintía',
        Suporte: 'Hanna',
        status: '75%',
        dataInicio: '2025-07-15',
        dataFim: '2025-07-30'
    },
    {
        id: 2,
        projeto: 'Validação de Método - Produto B',
        Elaborador: 'Kamila',
        Suporte: 'Taína',
        status: '50%',
        dataInicio: '2025-07-03',
        dataFim: '2025-07-29'
    },
    {
        id: 3,
        projeto: 'Controle de Qualidade - Lote 123',
        Elaborador: 'Lara',
        Suporte: 'Maryane',
        status: '100%',
        dataInicio: '2025-07-10',
        dataFim: '2025-07-25'
    }
];

const Elaboradores = ['Cintía', 'Kamila', 'Lara', 'Luca', 'Luísa', 'Hanna', 'Taína', 'Maryane', 'Vinícius'];
const Suportes = ['Hanna', 'Taína', 'Maryane', 'Vinícius'];
const statusOptions = ['0%', '25%', '50%', '75%', '100%'];

const statusColors = {
    '0%': '#ef4444',
    '25%': '#f97316',
    '50%': '#eab308',
    '75%': '#22c55e',
    '100%': '#10b981'
};

let filteredTasks = [...tasks];
let charts = {};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
    updateReports();
    renderGantt();
});

// Navegação entre abas
function showTab(tabName) {
    // Hide all content
    document.querySelectorAll('[id^="content-"]').forEach(el => el.classList.add('hidden'));
    
    // Show selected content
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
    
    // Update tab styles
    document.querySelectorAll('[id^="tab-"]').forEach(el => {
        el.className = el.className.replace('tab-active', 'tab-inactive');
    });
    
    document.getElementById(`tab-${tabName}`).className = 
        document.getElementById(`tab-${tabName}`).className.replace('tab-inactive', 'tab-active');
    
    // Update charts if reports tab is shown
    if (tabName === 'reports') {
        setTimeout(updateCharts, 100);
    }
    
    // Update Gantt if gantt tab is shown
    if (tabName === 'gantt') {
        renderGantt();
    }
}

// Adicionar nova tarefa
function addTask() {
    const projeto = document.getElementById('new-projeto').value;
    const Elaborador = document.getElementById('new-Elaborador').value;
    const Suporte = document.getElementById('new-Suporte').value;
    const status = document.getElementById('new-status').value;
    const dataInicio = document.getElementById('new-data-inicio').value;
    const dataFim = document.getElementById('new-data-fim').value;
    
    if (!projeto || !Elaborador || !Suporte || !dataInicio || !dataFim) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        projeto,
        Elaborador,
        Suporte,
        status,
        dataInicio,
        dataFim
    };
    
    tasks.push(newTask);
    
    // Clear form
    document.getElementById('new-projeto').value = '';
    document.getElementById('new-Elaborador').value = '';
    document.getElementById('new-Suporte').value = '';
    document.getElementById('new-status').value = '0%';
    document.getElementById('new-data-inicio').value = '';
    document.getElementById('new-data-fim').value = '';
    
    applyFilters();
    updateReports();
    renderGantt();
}

// Editar tarefa
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    //Preenhe os campos do formulário com os dados da tarefa
    document.getElementById('new-projeto').value = task.projeto;
    document.getElementById('new-Elaborador').value = task.Elaborador;
    document.getElementById('new-Suporte').value = task.Suporte;
    document.getElementById('new-status').value = task.status;
    document.getElementById('new-data-inicio').value = task.dataInicio;
    document.getElementById('new-data-fim').value = task.dataFim;

    //Altera o botão de adicionar para Atualizar
     const addButton = document.querySelector('button[onclick="addTask()"]');
        addButton.textContent = "Atualizar Tarefa";
        addButton.onclick = function () {
        updateTask(id);
    }
}

// Remover tarefa
function removeTask(id) {
    if (confirm('Tem certeza que deseja remover esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        applyFilters();
        updateReports();
        renderGantt();
    }
}

// Atualizar tarefa
function updateTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;

    const projeto = document.getElementById('new-projeto').value;
    const Elaborador = document.getElementById('new-Elaborador').value;
    const Suporte = document.getElementById('new-Suporte').value;
    const status = document.getElementById('new-status').value;
    const dataInicio = document.getElementById('new-data-inicio').value;
    const dataFim = document.getElementById('new-data-fim').value;

    if (!projeto || !Elaborador || !Suporte || !dataInicio || !dataFim) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    tasks[index] = {
        ...tasks[index],
        projeto,
        Elaborador,
        Suporte,
        status,
        dataInicio,
        dataFim
    };

    // Limpa o formulário
    document.getElementById('new-projeto').value = '';
    document.getElementById('new-Elaborador').value = '';
    document.getElementById('new-Suporte').value = '';
    document.getElementById('new-status').value = '0%';
    document.getElementById('new-data-inicio').value = '';
    document.getElementById('new-data-fim').value = '';

    // Restaura o botão para "Adicionar Tarefa"
    const addButton = document.querySelector('button[onclick^="updateTask"]');
    addButton.textContent = "Adicionar Tarefa";
    addButton.onclick = addTask;

    applyFilters();
    updateReports();
    renderGantt();
}

// Aplicar filtros
function applyFilters() {
    const ElaboradorFilter = document.getElementById('filter-Elaborador').value;
    const SuporteFilter = document.getElementById('filter-Suporte').value;
    const statusFilter = document.getElementById('filter-status').value;
    const mesFilter = document.getElementById('filter-mes').value;
    
    filteredTasks = tasks.filter(task => {
        if (ElaboradorFilter && task.Elaborador !== ElaboradorFilter) return false;
        if (SuporteFilter && task.Suporte !== SuporteFilter) return false;
        if (statusFilter && task.status !== statusFilter) return false;
        if (mesFilter) {
            const taskMonth = task.dataInicio.substring(0, 7);
            const taskEndMonth = task.dataFim.substring(0, 7);
            if (taskMonth !== mesFilter && taskEndMonth !== mesFilter) return false;
        }
        return true;
    });
    
    renderTasks();
    updateReports();
}

// Renderizar lista de tarefas
function renderTasks() {
    const container = document.getElementById('tasks-container');
    const taskCount = document.getElementById('task-count');
    
    taskCount.textContent = filteredTasks.length;
    
    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-circle text-5xl mb-4 opacity-50"></i>
                <p>Nenhuma tarefa encontrada com os filtros aplicados.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredTasks.map(task => `
        <div class="border rounded-lg p-4 bg-white shadow-sm">
            <div class="flex justify-between items-start mb-3">
                <h4 class="font-semibold text-lg">${task.projeto}</h4>
                <div class="flex space-x-2">
                    <button onclick="editTask(${task.id})" class="btn-primary">
                        <i class="fas fa-edit"></i>
                    </button>
                                   
                    <button onclick="removeTask(${task.id})" class="btn-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                    <span class="font-medium text-gray-600">Elaborador:</span>
                    <p class="flex items-center space-x-1">
                        <i class="fas fa-user text-xs"></i>
                        <span>${task.Elaborador}</span>
                    </p>
                </div>
                
                <div>
                    <span class="font-medium text-gray-600">Suporte:</span>
                    <p class="flex items-center space-x-1">
                        <i class="fas fa-user-check text-xs"></i>
                        <span>${task.Suporte}</span>
                    </p>
                </div>
                
                <div>
                    <span class="font-medium text-gray-600">Status:</span>
                    <span class="badge" style="background-color: ${statusColors[task.status]}">
                        ${task.status}
                    </span>
                </div>
                
                <div>
                    <span class="font-medium text-gray-600">Início:</span>
                    <p class="flex items-center space-x-1">
                        <i class="fas fa-calendar text-xs"></i>
                        <span>${formatDate(task.dataInicio)}</span>
                    </p>
                </div>
                
                <div>
                    <span class="font-medium text-gray-600">Fim:</span>
                    <p class="flex items-center space-x-1">
                        <i class="fas fa-calendar text-xs"></i>
                        <span>${formatDate(task.dataFim)}</span>
                    </p>
                </div>
            </div>
        </div>
    `).join('');
}

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Renderizar Gantt
function renderGantt() {
    const container = document.getElementById('gantt-container');
    
    // Generate days for current month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let ganttHTML = `
        <div class="flex border-b">
            <div class="w-32 p-2 font-semibold bg-gray-50">Elaborador</div>
    `;
    
    // Header with days
    for (let day = 1; day <= daysInMonth; day++) {
        ganttHTML += `<div class="gantt-cell bg-gray-50 text-xs text-center p-1">${day}</div>`;
    }
    ganttHTML += '</div>';
    
    // Rows for each analyst
    Elaboradores.forEach(Elaborador => {
        const ElaboradorTasks = filteredTasks.filter(task => task.Elaborador === Elaborador);
        
        ganttHTML += `
            <div class="flex border-b hover:bg-gray-50">
                <div class="w-32 p-2 font-medium">${Elaborador}</div>
        `;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const tasksOnDay = ElaboradorTasks.filter(task => 
                dayStr >= task.dataInicio && dayStr <= task.dataFim
            );
            
            ganttHTML += '<div class="gantt-cell">';
            
            tasksOnDay.forEach((task, index) => {
                ganttHTML += `
                    <div class="gantt-task status-${task.status.replace('%', '')}" 
                         style="top: ${index * 18 + 2}px;" 
                         title="${task.projeto} (${task.status})">
                        ${task.status}
                    </div>
                `;
            });
            
            ganttHTML += '</div>';
        }
        
        ganttHTML += '</div>';
    });
    
    container.innerHTML = ganttHTML;
}

// Atualizar relatórios
function updateReports() {
    const totalTasks = filteredTasks.length;
    const inProgressTasks = filteredTasks.filter(task => task.status !== '100%').length;
    const completedTasks = filteredTasks.filter(task => task.status === '100%').length;
    const activeAnalysts = new Set(filteredTasks.map(task => task.Elaborador)).size;
    
    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('in-progress-tasks').textContent = inProgressTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('active-analysts').textContent = activeAnalysts;
    
    // Update open tasks
    const openTasksContainer = document.getElementById('open-tasks-container');
    const openTasks = filteredTasks.filter(task => task.status !== '100%');
    
    if (openTasks.length === 0) {
        openTasksContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Todas as tarefas foram concluídas!</p>';
    } else {
        openTasksContainer.innerHTML = openTasks.map(task => `
            <div class="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span class="text-sm">${task.projeto}</span>
                <span class="badge" style="background-color: ${statusColors[task.status]}">
                    ${task.status}
                </span>
            </div>
        `).join('');
    }
}

// Atualizar gráficos
function updateCharts() {
    updateAnalystChart();
    updateStatusChart();
    updateReviewerChart();
}

function updateAnalystChart() {
    const ctx = document.getElementById('analyst-chart').getContext('2d');
    
    if (charts.analyst) {
        charts.analyst.destroy();
    }
    
    const data = Elaboradores.map(Elaborador => {
        const ElaboradorTasks = filteredTasks.filter(task => task.Elaborador === Elaborador);
        const completed = ElaboradorTasks.filter(task => task.status === '100%').length;
        return {
            Elaborador,
            total: ElaboradorTasks.length,
            completed
        };
    });
    
    charts.analyst = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.Elaborador),
            datasets: [
                {
                    label: 'Total',
                    data: data.map(d => d.total),
                    backgroundColor: '#3b82f6'
                },
                {
                    label: 'Concluídas',
                    data: data.map(d => d.completed),
                    backgroundColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateStatusChart() {
    const ctx = document.getElementById('status-chart').getContext('2d');
    
    if (charts.status) {
        charts.status.destroy();
    }
    
    const data = statusOptions.map(status => ({
        status,
        count: filteredTasks.filter(task => task.status === status).length
    })).filter(d => d.count > 0);
    
    charts.status = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(d => d.status),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: data.map(d => statusColors[d.status])
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateReviewerChart() {
    const ctx = document.getElementById('reviewer-chart').getContext('2d');
    
    if (charts.reviewer) {
        charts.reviewer.destroy();
    }
    
    const data = Suportes.map(Suporte => ({
        Suporte,
        count: filteredTasks.filter(task => task.Suporte === Suporte).length
    }));
    
    charts.reviewer = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.Suporte),
            datasets: [{
                label: 'Total',
                data: data.map(d => d.count),
                backgroundColor: '#8b5cf6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

