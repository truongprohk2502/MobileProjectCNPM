import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    top: {
        height: 40,
        backgroundColor: mainColor,
    },
    form: {
        shadowColor: 'black',
        backgroundColor: 'white',
        elevation: 4,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        marginTop: -25,
        marginBottom: 60
    },
    title: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.6,
        width: '100%',
        marginVertical: 10
    },
    selection: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 4
    },
    pinBtn: {
        position: 'absolute',
        bottom: 0,
        shadowColor: 'black',
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    btn: {
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});