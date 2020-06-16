import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    dropdown: {
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 8
    },
    hr: {
        height: 1,
        backgroundColor: mainColor,
        width: 328,
        marginHorizontal: 6,
        marginTop: 4
    },
    inputText: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10
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