import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Todo from './todo';

function App1() {
  const [todo, setTodo] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [todos, setTodos] = React.useState([]);
  const ref = firestore().collection('todos');

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);

  if (loading) {
    return null; // or a spinner
  }

  return (
    <View style={styles.container}>
      <Appbar style={styles.appbar}>
        <Appbar.Content title="TODOs List" titleStyle={styles.title} />
      </Appbar>
           
      <FlatList
        style={styles.flatList}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <View style={styles.inputContainer}>
        <TextInput
          label="New Todo"
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={styles.input}
        />
        <Button
          icon={() => <Icon name="cat" size={25} color="black" />}
          onPress={addTodo}
          mode="contained"
          style={styles.addButton}>
          Add TODO
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appbar: {
    backgroundColor: '#00FFFF',
  },
  title: {
    flex:1,
    textAlign: 'center',
    marginTop:22,
    color: 'red',
    fontSize:25,
  },
  flatList: {
    flex: 1,
    fontSize:30,
  },
  inputContainer: {
    flex:1,
    padding: 15,
    backgroundColor: 'white',
    minHeight:100,
    justifyContent: 'flex-end',
  },
  input: {
    marginBottom: 8,
  },
  addButton: {
    flex:1,
    backgroundColor: '#6200ee',
    maxHeight:50,
    fontSize:35,
  },
});

export default App1;
