// App.js
import React, { useRef, useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Button
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Color from '../../constants/Color';
import {Picker} from '@react-native-picker/picker';
import { useQuery } from '@apollo/client';
import GET_CATEGOREIS from '../../graphql/queries/Categories';


 const UploadForm = () => {
    // initial state
    const [isVisible, setIsVisible] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState();
    const {error, loading, data} = useQuery(GET_CATEGOREIS);
    
    // hide show modal
    const displayModal = (show) =>{
        setIsVisible(show)
    }
 
    return (
      <View style = { styles.container }>
        <Modal
            animationType = {"slide"}
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>
                <View style = {styles.modal}>
                    <FontAwesome5.Button style={styles.icon} name='cloud-upload-alt' size={80} color={Color.secondary} backgroundColor='transparent' 
                    onPress={() => {console.log('cleck')}}
                    />
                    <TextInput placeholder="Chose File" style={styles.inputStyle} />
                    <TextInput placeholder="Enter Title" style={styles.inputStyle} />
                    <TextInput
                    secureTextEntry={true}
                    placeholder="Enter Description"
                    style={styles.inputStyle}
                    />
                    <View style={styles.pickerView}>
                        <Picker
                        style={styles.pickerSelect}
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCategory(itemValue)
                        }>
                            {data?.categories?.data?.map((category, index) => {
                                // console.log('category', category)
                                return <Picker.Item label={category?.attributes?.title} value={category?.id} />
                            })}
                        </Picker>
                    </View>
                    <View style = {styles.Buttons}>
                        <Button
                            title="Cancel"
                            color={Color.redSecond}
                            onPress={() => {
                                displayModal(!isVisible);}}
                        />
                        <Button
                            title="Upload"
                            color={Color.blueSecond}
                            onPress={() => {
                                displayModal(!isVisible);}}
                        />
                        
                    </View>
                </View>
          </Modal>
            
          <TouchableOpacity
            style={styles.screen}
              onPress={() => {
                displayModal(true);
              }}>
                <View style={styles.border}>
                <FontAwesome5.Button style={styles.icon} name='cloud-upload-alt' size={80} color={Color.gray} backgroundColor='transparent' 
                onPress={() => {displayModal(true);}}
                />
                </View>
                <Text style={styles.title}>Tap To Upload {"\n"}
                your media</Text>
                
          </TouchableOpacity>          
        </View>
      );
  }

export default UploadForm
const styles = StyleSheet.create({
  container: {
    // padding: 25,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
    },
    modal:{
        width: Dimensions.get('window').width - 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:10, 
    },
    screen : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        },
    border : {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        borderWidth: 4,
        borderColor: Color.gray,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        color: Color.gray,
        marginTop: 10
    },
    inputStyle:{
        borderBottomWidth: 2,
        borderColor: Color.secondary,
        width : Dimensions.get('window').width / 1.5,
        marginTop: 10,
    },
    Buttons:{
        width : Dimensions.get('window').width / 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 35,
    },
    pickerSelect:{
        width : Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').height / 10,
    },
    pickerView:{
        width : Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').height / 10,
        borderBottomWidth: 2,
        borderColor: Color.secondary,
        marginTop:-10,
    },
});