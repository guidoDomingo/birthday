import React, {useState} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, TextInput} from 'react-native';
import {validateEmail} from '../utils/validation';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
    
    const {changueForm} = props;

    const [formData, setFormData] = useState(defaultValue());

    const [formError, setFormError] = useState({});

    const login = () => {
        const errors = {};

        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
        }else if(!validateEmail(formData.email)){
            errors.email = true;
        }else{
            firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
            .then(() => {
                console.log("ok");
            })
            .catch(() => {
                setFormError({
                    email: true,
                    password: true
                });
            });
        }

        setFormError(errors);
    }

    const onChangue = (e , type) => {
        // console.log("Data: ",e.nativeEvent.text);
        // console.log("Type: ",type);
        setFormData({...formData,[type] : e.nativeEvent.text} );
        console.log(formData);
    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={(e) => {onChangue(e,"email")}}
            />
             <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => {onChangue(e,"password")}}
            />

            <TouchableOpacity onPress={login}>
                <Text style={styles.textButton}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={styles.view}>
                <TouchableOpacity onPress={changueForm}>
                    <Text style={styles.textButton}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValue(){
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    textButton: {
        color: "#fff",
        fontSize: 20
    },
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
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
    error: {
        borderColor: "#940c0c"
    }
})
