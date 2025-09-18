# Projeto de Gerenciamento de Tarefas - React Native + Redux Toolkit

Este projeto implementa um sistema completo de gerenciamento de tarefas usando React Native, Redux Toolkit com Thunks, e integração com JSON Server para simular uma API REST.

## Funcionalidades Implementadas

### ✅ Operações CRUD Completas
- **Listar tarefas**: Carrega todas as tarefas do servidor
- **Adicionar tarefa**: Cria nova tarefa com validação
- **Editar tarefa**: Modifica tarefa existente
- **Concluir/Desconcluir**: Altera status da tarefa
- **Remover tarefa**: Remove tarefa específica
- **Remover todas**: Limpa todas as tarefas

### ✅ Integração com API (JSON Server)
- Configuração completa do Axios
- Tratamento de erros robusto
- Estados de loading e error
- Endpoints RESTful completos

### ✅ Redux Toolkit + Thunks
- Store configurado com Redux Toolkit
- Thunks assíncronos para todas as operações
- ExtraReducers para gerenciar estados de loading/error
- Selectors para acesso otimizado ao estado

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado (`npm install -g @expo/cli`)
- JSON Server instalado (`npm install -g json-server`)

### Passos para Execução

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o JSON Server** (em um terminal separado):
   ```bash
   npm run server
   ```
   O servidor estará rodando em `http://localhost:3000`

3. **Iniciar o aplicativo Expo**:
   ```bash
   npm start
   ```

4. **Executar no dispositivo/emulador**:
   - Pressione `a` para Android
   - Pressione `i` para iOS
   - Escaneie o QR code com o app Expo Go

## Estrutura do Projeto

```
mobile2-main/
├── components/           # Componentes reutilizáveis
│   ├── TaskDetail.jsx   # Detalhes da tarefa com ações
│   ├── TaskEdit.jsx      # Formulário de edição
│   ├── TaskList.jsx      # Lista de tarefas
│   └── TaskRegister.jsx # Formulário de criação
├── screens/              # Telas da aplicação
│   ├── TaskDetailScreen.jsx
│   ├── TaskEditScreen.jsx
│   ├── TaskFormScreen.jsx
│   ├── TaskHomeScreen.jsx
│   └── TaskListScreen.jsx
├── store/                # Configuração do Redux
│   ├── features/
│   │   └── taskSlice.js  # Slice com thunks e reducers
│   └── index.js          # Store principal
├── services/             # Serviços de API
│   └── taskService.js    # Funções de integração com API
├── db.json               # Banco de dados JSON Server
└── App.js                # Configuração de navegação
```

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma de desenvolvimento React Native
- **Redux Toolkit**: Gerenciamento de estado
- **Redux Thunk**: Middleware para ações assíncronas
- **Axios**: Cliente HTTP para requisições
- **JSON Server**: API REST simulada
- **React Navigation**: Navegação entre telas
- **React Native Paper**: Biblioteca de componentes UI

## Funcionalidades Técnicas

### Thunks Implementados
- `initTasks`: Carrega tarefas do servidor
- `addTask`: Adiciona nova tarefa
- `editTask`: Edita tarefa existente
- `finishTask`: Conclui/desconclui tarefa
- `removeTask`: Remove tarefa específica
- `removeAllTasks`: Remove todas as tarefas

### Estados Gerenciados
- `tasks`: Array de tarefas
- `loading`: Estado de carregamento
- `error`: Mensagens de erro

### Tratamento de Erros
- Estados de loading durante requisições
- Mensagens de erro específicas para cada operação
- Fallbacks para falhas de rede
- Logs detalhados para debugging

## Exemplo de Uso

1. **Criar tarefa**: Navegue para "Adicionar" → Preencha formulário → Salve
2. **Visualizar tarefas**: Lista automática na tela principal
3. **Editar tarefa**: Clique em "Detalhes" → "Editar" → Modifique → Salve
4. **Concluir tarefa**: Clique em "Concluir" ou use o botão na tela de detalhes
5. **Remover tarefa**: Use "Remover" na lista ou na tela de detalhes
6. **Limpar tudo**: Botão "Excluir tudo" remove todas as tarefas

## Desenvolvimento

Para desenvolvimento adicional:
- Modifique `db.json` para alterar dados iniciais
- Adicione novos campos em `taskService.js`
- Estenda `taskSlice.js` com novos thunks
- Crie novos componentes em `components/`

## Troubleshooting

- **Erro de conexão**: Verifique se o JSON Server está rodando
- **Erro de navegação**: Confirme se todas as telas estão registradas no App.js
- **Erro de estado**: Verifique se o Redux Provider está configurado corretamente
