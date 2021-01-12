import React, {useState} from 'react'
import { StyleSheet, Text, View, Button,TouchableOpacity,TextInput } from 'react-native'
import {validateEmail} from '../utils/validation';
import firebase from '../utils/firebase';

export default function RegisterForm(props) {
    const {changueForm} = props;

    const [formData, setFormData] = useState(defaultValue());

    const [formError, setFormError] = useState({});

    const register = () => {
       let errors = {};

       if(!formData.email || !formData.password || !formData.repeatPassword){
           if(!formData.email) errors.email = true;
           if(!formData.password) errors.password = true;
           if(!formData.repeatPassword) errors.repeatPassword = true;
       }else if(!validateEmail(formData.email)){
            errors.email = true;
       }else if(formData.password !== formData.repeatPassword){
            errors.password = true;
            errors.repeatPassword = true;
       }else if(formData.password.length < 6){
            errors.password = true;
            errors.repeatPassword = true;
       }else{
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                console.log("Cuenta creada");
            }).catch(() => {
                setFormError({
                    email:true,
                    password: true,
                    repeatPassword: true,
                });
            })
            
       }
       setFormError(errors);
       
    }

    return (
        <>
            <TextInput 
            style={[styles.input , formError.email && styles.errorInput]}
            placeholder="Correo electronico"
            placeholderTextColor="#969696"
            onChange={(e) => setFormData({...formData,email: e.nativeEvent.text})}
            />

            <TextInput 
            style={[styles.input , formError.password && styles.errorInput]}
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            secureTextEntry={true}
            onChange={(e) => setFormData({...formData,password: e.nativeEvent.text})}
            />

            <TextInput 
            style={[styles.input , formError.repeatPassword && styles.errorInput]}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#969696"
            secureTextEntry={true}
            onChange={(e) => setFormData({...formData,repeatPassword: e.nativeEvent.text})}
            />

            <TouchableOpacity onPress={register} >
                <Text style={styles.textButton}>Registrate</Text>
            </TouchableOpacity>
            
            <View style={styles.login}>
                <TouchableOpacity onPress={changueForm} >
                    <Text style={styles.textButton}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValue(){
    return {
        email: '',
        password: '',
        repeatPassword: ''
    }
}

const styles = StyleSheet.create({
    textButton: {
        color: "#fff",
        fontSize: 20
    },
    input: {
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 15,
        backgroundColor: "#1e3040",
        paddingHorizontal: 25,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040" 
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    errorInput: {
        borderColor: "#940c0c",

    }
})
