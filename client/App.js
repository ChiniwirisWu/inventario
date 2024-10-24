import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  async function fetchData(){
    const response = await fetch('http://192.168.1.7:9090/getAllCards/'); 
    const data = await response.json();
    setCards(data);
  }

  async function addCard(){
    const data = {author: 'autor', title: 'titulo', edition: 2, city: 'ciudad', editorial: 'editorial', year: 2024, category: 200, volume: 3, collection: 'especial', isbn: '2328943', amount: 3, borrowed: 3};
    const response = await fetch('http://192.168.1.7:9090/addCard/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type':'application/json'}
    })
    console.log(response);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FlatList
        data={cards}
        renderItem={({item, index})=> <Text>{item.title}, {item.isbn}</Text>}
      />
      <Button onPress={()=> addCard()} title="add item" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
