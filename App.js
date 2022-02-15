import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  function deleteTodo(sended) {
    setData(data.filter(current => current !== sended));
  }
  function addTodo() {
    if (text) {
      setData([...data, text]);
      setText('');
      setError('');
    } else {
      setError('Please insert a valid text');
    }
  }
  useEffect(() => {}, [data]);
  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        style={styles.input}
        onChangeText={text => {
          setText(text);
        }}
        placeholder="Write something"
      />
      <TouchableOpacity style={styles.btn} onPress={addTodo}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
      {error ? <Text>{error}</Text> : <Text></Text>}
      <View style={styles.texts}>
        {data.length > 0 ? (
          data.map(current => (
            <View style={styles.item}>
              <Text style={styles.element}>{current}</Text>
              <TouchableOpacity
                onPress={() => deleteTodo(current)}
                key={Math.random() * 10 + new Date().getFullYear()}>
                <Text style={styles.close}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: '#000',
    fontSize: 24,
  },
  btn: {
    width: 120,
    height: 50,
    backgroundColor: 'rgba(0,0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  texts: {
    marginTop: 20,
  },
  item: {
    borderColor: '#000',
    borderWidth: 2,
    fontSize: 30,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
    height: 40,
  },
  element: {
    fontSize: 20,
  },
  close: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    fontSize: 24,
  },
});
export default App;
