import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    bgTop: {
        backgroundColor: mainColor,
        height: 60
    },
    form: {
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: -40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20
    },
    title: {
        fontSize: 16
    },
    input: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        paddingVertical: 2,
        marginTop: 5
    },
    btnView: {
        marginHorizontal: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    btn: {
        backgroundColor: mainColor,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});