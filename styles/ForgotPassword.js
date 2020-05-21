import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: mainColor,
        alignItems: 'center'
    },
    inputView: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        top: 28
    },
    btnView: {
        position: 'absolute',
        top: 100
    },
    btn: {
        width: 240,
        height: 40,
        borderRadius: 20,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});