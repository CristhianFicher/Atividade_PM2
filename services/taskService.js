
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/'
});
const endpoint = 'tasks';

// Listar todas as tarefas
const getTasks = async () => {
    try {
        const response = await api.get(endpoint);
        console.log('[getTasks] response: ', response);
        return response.data;
    } catch (error) {
        console.error('[getTasks] error: ', error);
        throw error;
    }
}

// Adicionar nova tarefa
const addTask = async (newTask) => {
    try {
        const taskData = {
            ...newTask,
            createdDate: new Date().toISOString(),
            completedDate: null
        };
        const response = await api.post(endpoint, taskData);
        console.log('[addTask] response: ', response);
        return response.data;
    } catch (error) {
        console.error('[addTask] error: ', error);
        throw error;
    }
}

// Editar tarefa existente
const editTask = async (taskId, updatedTask) => {
    try {
        const response = await api.put(`${endpoint}/${taskId}`, updatedTask);
        console.log('[editTask] response: ', response);
        return response.data;
    } catch (error) {
        console.error('[editTask] error: ', error);
        throw error;
    }
}

// Concluir/desconcluir tarefa
const finishTask = async (task) => {
    try {
        const updatedTask = {
            ...task,
            done: !task.done,
            completedDate: !task.done ? new Date().toISOString() : null
        };
        const response = await api.put(`${endpoint}/${task.id}`, updatedTask);
        console.log('[finishTask] response: ', response);
        return response.data;
    } catch (error) {
        console.error('[finishTask] error: ', error);
        throw error;
    }
}

// Remover tarefa específica
const removeTask = async (taskId) => {
    try {
        const response = await api.delete(`${endpoint}/${taskId}`);
        console.log('[removeTask] response: ', response);
        return taskId; // Retorna o ID da tarefa removida
    } catch (error) {
        console.error('[removeTask] error: ', error);
        throw error;
    }
}

// Remover todas as tarefas
const clearTasks = async () => {
    try {
        // Primeiro, obtemos todas as tarefas
        const tasks = await getTasks();
        
        // Depois, removemos cada uma individualmente
        const deletePromises = tasks.map(task => api.delete(`${endpoint}/${task.id}`));
        await Promise.all(deletePromises);
        
        console.log('[clearTasks] Todas as tarefas foram removidas');
        return true;
    } catch (error) {
        console.error('[clearTasks] error: ', error);
        throw error;
    }
}

export default {
    getTasks,
    addTask,
    editTask,
    finishTask,
    removeTask,
    clearTasks
};