import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../utils/firebase';


export default function ActionBar(props) {

    const {showList,setShowList} = props;
    return (
        <View style={styles.viewFooter}> 
            <View style={styles.viewClouse}>
                <Text style={styles.textLogou} onPress={() => firebase.auth().signOut()}>Cerrar Sesión</Text>
            </View>
            <View style={styles.viewFecha}>
                <Text style={styles.textLogou} onPress={() => setShowList(!showList)}>
                    {showList ? " Nueva Fecha" : "Cancelar Fecha"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        marginBottom: 20
    },
    viewClouse: {
        backgroundColor: "#820000",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    viewFecha: {
        backgroundColor: "#1ea1f2",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginLeft: 10
    },
    textLogou: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    }
})
