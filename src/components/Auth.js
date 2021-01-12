import React, {  useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth() {
   

        const [isLogin,setIsLogin] = useState(true);

        const changueForm = () => {
            setIsLogin(!isLogin);
        }

        return (
            <View style={styles.view}>
                <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
                {isLogin ? (
                    <LoginForm changueForm = {changueForm}></LoginForm>
                ) : (
                    <RegisterForm  changueForm = {changueForm}></RegisterForm>
                )}
            </View>
        )
    
}

const styles = StyleSheet.create({
    view : {
        flex: 1,
        alignItems: "center",
    },
    logo : {
        width: "80%",
        height: 230,
        marginTop: 50,
        marginBottom: 50
    },
  
})
