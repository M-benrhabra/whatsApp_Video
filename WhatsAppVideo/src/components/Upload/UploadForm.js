// App.js
import React, { useEffect, useRef, useState } from 'react';
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
import { useQuery, useMutation } from '@apollo/client';
import GET_CATEGOREIS from '../../graphql/queries/Categories';
import * as ImagePicker from 'react-native-image-picker';
import FILE_UPLOAD from '../../graphql/mutations/UploadVideo';
import CREATE_DOWNLOAD from '../../graphql/mutations/CreateDownload';
import { ReactNativeFile } from 'apollo-upload-client';
import { Formik } from 'formik'
import * as yup from 'yup'
import RNRestart from 'react-native-restart';

function generateRNFile(uri,type, name) {
    return uri ? new ReactNativeFile({
      uri,
      type,
      name,
    }) : null;
}

const UploadForm = () => {
    const uploadValidationSchema = yup.object().shape({
        title: yup
          .string()
          .required('Title is Required'),
          categories: yup
          .string()
          .required('Category is required'),
      })
    // initial state
    const [isVisible, setIsVisible] = useState(false)
    const [mediaRes, setMediaRes] = useState({})
    const [idMedia, setIdMedia] = useState('')
    const {error, loading, data} = useQuery(GET_CATEGOREIS);
    const [uploadMedia , {error: fileUploadErr,loading:fileUploadLoding,data:fileUploadData}] = useMutation(FILE_UPLOAD);
    // hide show modal
    const displayModal = (show) =>{
        setIsVisible(show)
    }
    useEffect(() => {
        if(fileUploadData?.upload?.data?.id !== undefined || fileUploadData?.upload?.data?.id !== ''){
            setIdMedia(fileUploadData?.upload?.data?.id)
        }  
    },[fileUploadData?.upload?.data])
    const selectMedia = async () => {
        await ImagePicker.launchImageLibrary({ mediaType: 'mixed', includeBase64: true }, (response) => {
            
            const file = generateRNFile(response?.assets[0]?.uri, response?.assets[0]?.type, `picture-${Date.now()}`);
            console.log('file', file)
            uploadMedia({
                variables: { file: file },
            });
            
            setMediaRes(response?.assets[0])
            
        })
    }

    const [uploadData , {error: createUploadErr,loading:createUploadLoding,data:createUploadData}] = useMutation(CREATE_DOWNLOAD);
    console.log('mediaRes', mediaRes)
    console.log('fileUploadData?.upload?.data?.id==>', idMedia)
    console.log('createUploadData====>', createUploadData?.createDownload?.data?.id)
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
                    <FontAwesome5 style={styles.icon} name='cloud-upload-alt' size={80} color={Color.secondary} backgroundColor='transparent' />
                    <TouchableOpacity onPress={() => selectMedia()}>
                        <View style={styles.upload}>
                            <FontAwesome5 name='images' size={40} color={!mediaRes?.uri ? Color.placeholderColor : Color.inactive} />
                            <Text style={{color:Color.placeholderColor, marginLeft:15}}>{!mediaRes?.uri ? 'Chose File' : mediaRes?.fileName}</Text>
                        </View>
                    </TouchableOpacity> 
                    <Formik
                        validationSchema={uploadValidationSchema}
                        initialValues={{ title: '', description: '',picture: '', published: false, categories: '' }}
                        onSubmit={values => {(idMedia !== undefined || idMedia !=='') && uploadData({
                            variables: values,
                        }), console.log(values), RNRestart.Restart()}
                        }
                    >
                        {({ handleChange, handleSubmit, values, setFieldValue,resetForm, errors,isValid,touched }) => (
                        <>
                            <TextInput 
                            name="title"
                            placeholder="Enter Title" 
                            style={styles.inputStyle} 
                            onChangeText={handleChange('title')}
                            value={values.title}
                            />
                            {(errors.title && touched.title) &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.title}</Text>
                            }
                            <TextInput
                            name="description"
                            placeholder="Enter Description"
                            style={styles.inputStyle}
                            onChangeText={handleChange('description')}
                            value={values.description}
                            />
                            <TextInput 
                            name="picture"
                            style={styles.inputhidden} 
                            onChangeText={handleChange('picture')}
                            value={values.picture = idMedia}
                            />
                            <TextInput 
                            name="published"
                            style={styles.inputhidden}
                            value={values.published}
                            />  
                            <View style={styles.pickerView}>
                                <Picker
                                // name="categories"
                                style={styles.pickerSelect}
                                selectedValue={values.categories}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFieldValue('categories',itemValue)
                                }>
                                    <Picker.Item label='select Category' />
                                    {data?.categories?.data?.map((category, index) => {
                                        // console.log('category', category)
                                        return <Picker.Item key={index} label={category?.attributes?.title} value={category?.id} />
                                    })}
                                </Picker>
                                {(errors.categories && touched.categories) &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.categories}</Text>
                                }
                            </View>
                            <View style = {styles.Buttons}>
                                <Button
                                    title="Cancel"
                                    color={Color.redSecond}
                                    onPress={() => {
                                        displayModal(!isVisible), resetForm}}
                                />
                                {(idMedia !== undefined || idMedia !=='') && 
                                <Button
                                    title="Upload"
                                    color={Color.blueSecond}
                                    onPress={handleSubmit}
                                    disabled={fileUploadData?.upload?.data?.id === undefined}
                                />}
                                
                            </View>
                        </>
                        )}
                    </Formik>
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
                {createUploadData?.createDownload?.data?.id && <Text style={{ fontSize: 15, color: Color.primary, marginVertical:15 }}>Your Video is Uploaded</Text>}
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
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        color: Color.gray,
        marginTop: 10
    },
    icon:{
        marginBottom:20,
        marginLeft: 10,
    },
    upload:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width : Dimensions.get('window').width / 1.5,
        borderBottomWidth: 2,
        borderColor: Color.secondary,
        paddingBottom:10,
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
    inputhidden:{
        opacity: 0, 
        height: 0,
        padding: 0,
        margin: 0,
    },
});