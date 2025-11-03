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
        alert('Por favor, adicione um título para a tarefa!');
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
        renderTasks();
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

// Event listeners
addTaskBtn.addEventListener('click', addTask);

taskTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Renderizar tarefas ao iniciar
renderTasks();