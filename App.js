import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';


export default function App() {
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const onHandlerChangeItem=(textItem)=> setTextItem(textItem)

  const onHandlerAddItem =()=> {
    setItemList(currentItems=>[...currentItems,{id:Math.random()+10, value: textItem}])
    setTextItem('')
  }

  const onHandlerDeletedItem = id =>{
    setItemList(currentItems => currentItems.filter(item => item.id !== id))
    setItemSelected({})
    setModalVisible(!modalVisible)
  }

  const onHandlerModal = id =>{
    setItemSelected(itemList.find(item=>item.id === id))    
    setModalVisible(!modalVisible)
  }
  return (
    
    <View style={styles.container}>
      <View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
        >
        <View>
          <Button
            title='Eliminar'
            onPress={onHandlerDeletedItem(itemSelected.id)}
          />
        </View>
        </Modal>
      </View>
      <TextInput 
        placeholder='Escriba su Nombre'
        style={styles.TextInput}
        value={textItem}
        onChangeText={onHandlerChangeItem}
      />
      <Button
        title='Agregar'
        onPress={onHandlerAddItem}     
      />
     <FlatList
        data={itemList}
        renderItem={data=>(
          <TouchableOpacity 
            onPress={onHandlerModal(data.item.id)}
            style={styles.item}>
            <Text>{data.item.value}</Text>
            <Text>{data.item.id}</Text>
          </TouchableOpacity>
        )}
     />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text:{
    color:'red',
    fontSize: 65,
  },
  TextInput:{
    color:'blue',
    fontSize: 45,
    marginTop: 70,
  },
  item:{
    marginTop:5,
    backgroundColor:'orange',
    width:300,
  }
  
});
