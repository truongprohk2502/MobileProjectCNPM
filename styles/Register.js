import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    top: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    topText: {
        color: 'white',
        fontSize: 15,
        marginTop: 10
    },
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -40
    },
    typeUser: {
        width: 80,
        height: 80,
        borderRadius: 10,
        shadowColor: "#000",
        elevation: 1,
        borderColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    form: {
        width: '90%',
        marginTop: 10,
    },
    registerInput: {
        paddingHorizontal: 0,
        paddingVertical: 3,
        borderBottomColor: 'rgba(0, 0, 0, .5)',
        borderBottomWidth: 0.9,
        fontSize: 16
    },
    inputIcon: {
        position: 'absolute',
        right: 0,
        top: 7,
        fontSize: 20,
        color: mainColor
    },
    error: {
        color: 'red',
        marginTop: 4
    },
    button: {
        width: 240,
        height: 40,
        borderRadius: 20,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});