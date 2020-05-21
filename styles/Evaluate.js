import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    top: {
        height: 40,
        backgroundColor: mainColor,
        alignItems: 'center',
        marginBottom: 25
    },
    title: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        top: 20
    },
    formView: {
        shadowColor: 'black',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        width: '100%'
    },
    headerForm: {
        backgroundColor: mainColor,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    form: {
        paddingHorizontal: 10,
    },
    textarea: {
        textAlignVertical: 'top',
        fontSize: 16,
        borderRadius: 10
    },
    criteria: {
        shadowColor: 'black',
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    sliderNum: {
        flex: 1,
        textAlign: 'right',
        fontSize: 18,
        marginTop: 5
    },
    btn: {
        width: 140,
        height: 30,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});