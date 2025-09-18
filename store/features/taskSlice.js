import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "../../services/taskService";

// Thunk para listar todas as tarefas
export const initTasks = createAsyncThunk('tasks/fetch', async () => {
    return await taskService.getTasks();
});

// Thunk para adicionar nova tarefa
export const addTask = createAsyncThunk('tasks/add', async (payload) => {
    return await taskService.addTask(payload);
});

// Thunk para editar tarefa existente
export const editTask = createAsyncThunk('tasks/edit', async ({ taskId, updatedTask }) => {
    return await taskService.editTask(taskId, updatedTask);
});

// Thunk para concluir/desconcluir tarefa
export const finishTask = createAsyncThunk('tasks/finish', async (task) => {
    return await taskService.finishTask(task);
});

// Thunk para remover tarefa específica
export const removeTask = createAsyncThunk('tasks/remove', async (taskId) => {
    return await taskService.removeTask(taskId);
});

// Thunk para remover todas as tarefas
export const removeAllTasks = createAsyncThunk('tasks/removeAll', async () => {
    return await taskService.clearTasks();
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        error: null,
        loading: false, 
    },
    reducers: {
        // Reducers síncronos podem ser mantidos para casos específicos
        clearError(state) {
            state.error = null;
        },
        setLoading(state, { payload }) {
            state.loading = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Casos para initTasks (listar tarefas)
            .addCase(initTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(initTasks.rejected, (state, { error }) => {
                state.error = 'Erro ao carregar lista de tarefas';
                state.loading = false;
                state.tasks = [];
                console.error('initTasks error:', error);
            })
            
            // Casos para addTask (adicionar tarefa)
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, { payload }) => {
                state.tasks.push(payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(addTask.rejected, (state, { error }) => {
                state.error = 'Erro ao adicionar tarefa';
                state.loading = false;
                console.error('addTask error:', error);
            })
            
            // Casos para editTask (editar tarefa)
            .addCase(editTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTask.fulfilled, (state, { payload }) => {
                const index = state.tasks.findIndex(task => task.id === payload.id);
                if (index !== -1) {
                    state.tasks[index] = payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(editTask.rejected, (state, { error }) => {
                state.error = 'Erro ao editar tarefa';
                state.loading = false;
                console.error('editTask error:', error);
            })
            
            // Casos para finishTask (concluir/desconcluir tarefa)
            .addCase(finishTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(finishTask.fulfilled, (state, { payload }) => {
                const index = state.tasks.findIndex(task => task.id === payload.id);
                if (index !== -1) {
                    state.tasks[index] = payload;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(finishTask.rejected, (state, { error }) => {
                state.error = 'Erro ao atualizar status da tarefa';
                state.loading = false;
                console.error('finishTask error:', error);
            })
            
            // Casos para removeTask (remover tarefa específica)
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeTask.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.filter(task => task.id !== payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(removeTask.rejected, (state, { error }) => {
                state.error = 'Erro ao remover tarefa';
                state.loading = false;
                console.error('removeTask error:', error);
            })
            
            // Casos para removeAllTasks (remover todas as tarefas)
            .addCase(removeAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeAllTasks.fulfilled, (state) => {
                state.tasks = [];
                state.loading = false;
                state.error = null;
            })
            .addCase(removeAllTasks.rejected, (state, { error }) => {
                state.error = 'Erro ao remover todas as tarefas';
                state.loading = false;
                console.error('removeAllTasks error:', error);
            });
    },
    selectors: {
        selectTasks: (state) => state.tasks,
        selectError: (state) => state.error,
        selectLoading: (state) => state.loading,
    }
});
export const { clearError, setLoading } = taskSlice.actions;
export const { selectTasks, selectError, selectLoading } = taskSlice.selectors;
export const tasksReducer = taskSlice.reducer;

