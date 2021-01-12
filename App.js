import React, { useEffect,useState } from 'react';
import { SafeAreaView,Text, View,StyleSheet, StatusBar, Button } from 'react-native';
import {decode,encode} from "base-64";
import Auth from "./src/components/Auth";
import firebase from './src/utils/firebase';
import 'firebase/auth';
import ListBirthday from './src/components/ListBirthday';

if(!global.btoa) global.btoa = encode;

if(!global.atob) global.atob = decode;

export default function App() {
  
  const [user, setUsaer] = useState(undefined);

  useEffect(() => {

   firebase.auth().onAuthStateChanged((response) => {
      setUsaer(response);
   });

  }, []);

  if(user === undefined) return null; 

    return (
      <>
        <StatusBar barStyle="light-content"></StatusBar>
        <SafeAreaView style={styles.background}>
          {user ? <ListBirthday></ListBirthday> : <Auth></Auth>}
        </SafeAreaView>
      </>
    );
  
}



const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%"
  }
});
