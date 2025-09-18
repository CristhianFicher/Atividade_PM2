import { Text, Card, Button as PButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { formatDateTime } from '../utils/date';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeTask, finishTask } from "../store/features/taskSlice";

export default function TaskDetail({ task }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleEditTask = () => {
        navigation.navigate('TaskEdit', { task });
    };

    const handleFinishTask = () => {
        dispatch(finishTask(task));
        navigation.navigate('TaskList');
    };

    const handleRemoveTask = () => {
        dispatch(removeTask(task.id));
        navigation.navigate('TaskList');
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.fieldContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Nome
                        </Text>
                        <Text variant="bodyLarge" style={styles.value}>
                            {task.name || 'Sem nome'}
                        </Text>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Descrição
                        </Text>
                        <Text variant="bodyLarge" style={styles.value}>
                            {task.description || 'Sem descrição'}
                        </Text>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Status
                        </Text>
                        <Text variant="bodyLarge" style={styles.value}>
                            {task.done ? 'Concluída' : 'Pendente'}
                        </Text>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Data de Criação
                        </Text>
                        <Text variant="bodyLarge" style={styles.value}>
                            {formatDateTime(task.createdDate)}
                        </Text>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text variant="titleMedium" style={styles.label}>
                            Data de Conclusão
                        </Text>
                        <Text variant="bodyLarge" style={styles.value}>
                            {formatDateTime(task.completedDate)}
                        </Text>
                    </View>
                </Card.Content>
            </Card>
            
            <View style={styles.buttonContainer}>
                <PButton 
                    icon="pencil" 
                    mode="contained" 
                    onPress={handleEditTask}
                    style={styles.button}
                >
                    Editar
                </PButton>
                <PButton 
                    icon={task.done ? "undo" : "check"} 
                    mode="contained-tonal" 
                    onPress={handleFinishTask}
                    style={styles.button}
                >
                    {task.done ? "Marcar como Pendente" : "Concluir"}
                </PButton>
                <PButton 
                    icon="delete" 
                    mode="outlined" 
                    onPress={handleRemoveTask}
                    style={styles.button}
                >
                    Remover
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
    card: {
        borderRadius: 12,
        elevation: 4,
        backgroundColor: '#ffffff',
        marginBottom: 16,
    },
    fieldContainer: {
        marginBottom: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    label: {
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    value: {
        color: '#555555',
        lineHeight: 24,
    },
    buttonContainer: {
        gap: 12,
        marginTop: 16,
    },
    button: {
        marginVertical: 4,
    },
});