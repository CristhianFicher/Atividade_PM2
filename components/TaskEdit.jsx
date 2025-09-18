import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button as PButton } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { editTask } from "../store/features/taskSlice";

export default function TaskEdit({ task }) {
  const [taskName, setTaskName] = useState(task?.name || "");
  const [taskDescription, setTaskDescription] = useState(task?.description || "");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTaskName(task.name || "");
      setTaskDescription(task.description || "");
    }
  }, [task]);

  const onChangeNameHandler = (name) => {
    setTaskName(name);
  };

  const onChangeDescriptionHandler = (description) => {
    setTaskDescription(description);
  };

  const onPressHandler = () => {
    if (!task?.id) {
      console.error("ID da tarefa não encontrado");
      return;
    }

    const updatedTask = {
      name: taskName,
      description: taskDescription,
      done: task.done,
      createdDate: task.createdDate,
      completedDate: task.completedDate
    };

    dispatch(editTask({ taskId: task.id, updatedTask }));
    navigation.navigate('TaskList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.taskInput}
          value={taskName}
          onChangeText={onChangeNameHandler}
          placeholder="Digite o nome da tarefa"
        />
        <TextInput
          style={styles.taskInput}
          value={taskDescription}
          onChangeText={onChangeDescriptionHandler}
          placeholder="Digite a descrição da tarefa"
          multiline
          numberOfLines={3}
        />
      </View>
      <View style={globalStyles.taskItemButtons}>
        <PButton icon="check" mode="contained" onPress={onPressHandler}>
          Salvar Alterações
        </PButton>
        <PButton 
          icon="arrow-left" 
          mode="outlined" 
          onPress={() => navigation.navigate('TaskList')}
        >
          Cancelar
        </PButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 16,
    gap: 12,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
});
