import { Text, StyleSheet, View } from 'react-native';
import TaskEdit from '../components/TaskEdit';
import { useRoute } from '@react-navigation/native';

export default function TaskEditScreen() {
    const { params } = useRoute();
    const { task } = params;

    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                <Text style={styles.title}>Editar Tarefa</Text>
                <TaskEdit task={task} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskContainer: {
        paddingTop: 32,
        backgroundColor: "lightblue",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
})
