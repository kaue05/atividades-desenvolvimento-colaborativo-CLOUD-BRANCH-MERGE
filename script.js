// Sistema de Gerenciamento de Tarefas
let tasks = [];
let taskIdCounter = 1;

const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');

// Função para adicionar tarefa
function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title) {
        taskTitle.style.borderColor = '#dc3545';
        taskTitle.placeholder = '⚠️ O título é obrigatório!';
        taskTitle.focus();

        setTimeout(() => {
            taskTitle.style.borderColor = '';
            taskTitle.placeholder = 'Título da tarefa';
        }, 3000);

        return;
    }

    const task = {
    id: taskIdCounter++,
    title: title,
    description: description,
    priority: priority,
    completed: false,  // Adicionar esta linha
    createdAt: new Date().toLocaleString('pt-BR')
};

    tasks.push(task);

    // Ordenar por prioridade
    sortTasksByPriority();
    renderTasks();

    // Limpar formulário
    taskTitle.value = '';
    taskDescription.value = '';
    document.getElementById('taskPriority').value = 'media';
    taskTitle.focus();
}

// Função para ordenar tarefas por prioridade
function sortTasksByPriority() {
    const priorityOrder = { alta: 1, media: 2, baixa: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

// Função para obter ícone de prioridade
function getPriorityIcon(priority) {
    const icons = {
        alta: '🔴',
        media: '🟡',
        baixa: '🟢'
    };
    return icons[priority] || '⚪';
}

// Função para obter classe de prioridade
function getPriorityClass(priority) {
    return `priority-${priority}`;
}

// Função para deletar tarefa
function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        // Adicionar animação antes de deletar
        const taskElement = event.target.closest('.task-card');
        if (taskElement) {
            taskElement.classList.add('deleting');
            setTimeout(() => {
                tasks = tasks.filter(task => task.id !== id);

                // Verificar se há filtro ativo
                const filterValue = document.getElementById('filterInput').value;
                if (filterValue.trim()) {
                    filterTasks();
                } else {
                    renderTasks();
                }
            }, 300);
        } else {
            tasks = tasks.filter(task => task.id !== id);
            const filterValue = document.getElementById('filterInput').value;
            if (filterValue.trim()) {
                filterTasks();
            } else {
                renderTasks();
            }
        }
    }
}

// Função para renderizar tarefas
// Função para renderizar tarefas
function renderTasks() {
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <p>📭 Nenhuma tarefa cadastrada</p>
                <p style="font-size: 14px;">Adicione sua primeira tarefa acima!</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-card ${getPriorityClass(task.priority)} ${task.completed ? 'completed' : ''}">
            <div class="task-header">
                <div class="task-priority">${getPriorityIcon(task.priority)} ${task.priority.toUpperCase()}</div>
                <label class="checkbox-container">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
                    <span class="checkmark"></span>
                </label>
            </div>
            <h3>${task.title}</h3>
            <p>${task.description || 'Sem descrição'}</p>
            <small style="color: #999;">Criado em: ${task.createdAt}</small>
            <div class="task-actions">
                <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Excluir</button>
            </div>
        </div>
    `).join('');
}
// Sistema de filtro de tarefas
const filterInput = document.getElementById('filterInput');

// Sistema de filtro de tarefas
function filterTasks() {
    const searchTerm = filterInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderTasks();
        return;
    }
    
    const filteredTasks = tasks.filter(task => {
        const titleMatch = task.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = task.description.toLowerCase().includes(searchTerm);
        const priorityMatch = task.priority.toLowerCase().includes(searchTerm);
        return titleMatch || descriptionMatch || priorityMatch;
    });
    
    // Renderizar apenas tarefas filtradas
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <p>🔍 Nenhuma tarefa encontrada</p>
                <p style="font-size: 14px;">Tente buscar por outro termo</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = filteredTasks.map(task => `
        <div class="task-card ${getPriorityClass(task.priority)} ${task.completed ? 'completed' : ''}">
            <div class="task-header">
                <div class="task-priority">${getPriorityIcon(task.priority)} ${task.priority.toUpperCase()}</div>
                <label class="checkbox-container">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
                    <span class="checkmark"></span>
                </label>
            </div>
            <h3>${task.title}</h3>

filterInput.addEventListener('input', filterTasks);

// Event listeners
addTaskBtn.addEventListener('click', addTask);

taskTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Renderizar tarefas ao iniciar
renderTasks();

<p>${task.description || 'Sem descrição'}</p>
            <small style="color: #999;">Criado em: ${task.createdAt}</small>
            <div class="task-actions">
                <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Excluir</button>
            </div>
        </div>
    `).join('');
}

// Função para destacar termo buscado
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Função para resetar todo o sistema
function resetAll() {
    if (confirm('⚠️ ATENÇÃO: Isso irá deletar TODAS as tarefas e resetar o sistema. Tem certeza?')) {
        if (confirm('Última confirmação: Realmente deseja apagar tudo?')) {
            tasks = [];
            taskIdCounter = 1;
            localStorage.removeItem('teamwork-tasks');
            localStorage.removeItem('teamwork-counter');
            filterInput.value = '';
            renderTasks();
            alert('✅ Sistema resetado com sucesso!');
        }
    }
}

// Event listener para botão de reset
document.getElementById('resetAllBtn').addEventListener('click', resetAll);
// Função para alternar status da tarefa
function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        
        // Verificar se há filtro ativo
        const filterValue = filterInput.value;
        if (filterValue.trim()) {
            filterTasks();
        } else {
            renderTasks();
        }
        
        // Salvar no localStorage
        saveTasks();
    }
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('teamwork-tasks', JSON.stringify(tasks));
    localStorage.setItem('teamwork-counter', taskIdCounter);
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('teamwork-tasks');
    const savedCounter = localStorage.getItem('teamwork-counter');
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    
    if (savedCounter) {
        taskIdCounter = parseInt(savedCounter);
    }
    
    renderTasks();
}

// Modificar função addTask para salvar automaticamente
const originalAddTask = addTask;
window.addTask = function() {
    originalAddTask();
    saveTasks();
};

// Modificar função deleteTask para salvar automaticamente
const originalDeleteTask = deleteTask;
window.deleteTask = function(id) {
    const taskElement = event?.target?.closest('.task-card');
    
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        if (taskElement) {
            taskElement.classList.add('deleting');
            setTimeout(() => {
                tasks = tasks.filter(task => task.id !== id);
                
                const filterValue = filterInput.value;
                if (filterValue.trim()) {
                    filterTasks();
                } else {
                    renderTasks();
                }
                saveTasks();
            }, 300);
        } else {
            tasks = tasks.filter(task => task.id !== id);
            const filterValue = filterInput.value;
            if (filterValue.trim()) {
                filterTasks();
            } else {
                renderTasks();
            }
            saveTasks();
        }
    }
};

// Carregar tarefas ao iniciar
loadTasks();


// Função para atualizar estatísticas
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Atualizar cards principais
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('progressPercentage').textContent = progress + '%';
    
    // Contar por prioridade
    const highPriority = tasks.filter(t => t.priority === 'alta').length;
    const mediumPriority = tasks.filter(t => t.priority === 'media').length;
    const lowPriority = tasks.filter(t => t.priority === 'baixa').length;
    
    // Atualizar contadores de prioridade
    document.getElementById('highPriorityCount').textContent = highPriority;
    document.getElementById('mediumPriorityCount').textContent = mediumPriority;
    document.getElementById('lowPriorityCount').textContent = lowPriority;
    
    // Calcular porcentagens para as barras
    const maxCount = Math.max(highPriority, mediumPriority, lowPriority, 1);
    const highPercent = (highPriority / maxCount) * 100;
    const mediumPercent = (mediumPriority / maxCount) * 100;
    const lowPercent = (lowPriority / maxCount) * 100;
    
    // Atualizar barras de prioridade
    document.getElementById('highPriorityBar').style.width = highPercent + '%';
    document.getElementById('mediumPriorityBar').style.width = mediumPercent + '%';
    document.getElementById('lowPriorityBar').style.width = lowPercent + '%';
}

// Modificar renderTasks para atualizar estatísticas
const originalRenderTasks = renderTasks;
window.renderTasks = function() {
    originalRenderTasks();
    updateStatistics();
};

// Modificar filterTasks para não atualizar estatísticas (mostra estatísticas gerais)
const originalFilterTasks = filterTasks;
window.filterTasks = function() {
    originalFilterTasks();
    updateStatistics(); // Mantém estatísticas gerais mesmo com filtro
};

// Atualizar estatísticas ao carregar
updateStatistics();