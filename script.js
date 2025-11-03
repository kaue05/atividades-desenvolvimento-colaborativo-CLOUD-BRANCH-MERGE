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

    if (!title) {
        // Melhorar feedback visual
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
        createdAt: new Date().toLocaleString('pt-BR')
    };

    tasks.push(task);
    renderTasks();

    // Limpar formulário
    taskTitle.value = '';
    taskDescription.value = '';
    taskTitle.focus();
}

// Função para deletar tarefa
function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);

        // Verificar se há filtro ativo
        const filterValue = document.getElementById('filterInput').value;
        if (filterValue.trim()) {
            filterTasks();
        } else {
            renderTasks();
        }
    }
}

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
        <div class="task-card">
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

function filterTasks() {
    const searchTerm = filterInput.value.toLowerCase().trim();

    if (!searchTerm) {
        renderTasks();
        return;
    }

    const filteredTasks = tasks.filter(task => {
        const titleMatch = task.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = task.description.toLowerCase().includes(searchTerm);
        return titleMatch || descriptionMatch;
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
        <div class="task-card">
            <h3>${task.title}</h3>
            <p>${task.description || 'Sem descrição'}</p>
            <small style="color: #999;">Criado em: ${task.createdAt}</small>
            <div class="task-actions">
                <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Excluir</button>
            </div>
        </div>
    `).join('');
}

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