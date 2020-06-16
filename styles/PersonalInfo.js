import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    field: {
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputRow: {
        flexDirection: 'row'
    },
    icon: {
        marginHorizontal: 8,
        marginTop: 10
    },
    txtInput: {
        flex: 1,
        padding: 5,
        fontSize: 16
    },
    hr: {
        height: 1,
        backgroundColor: mainColor,
        flex: 1,
        marginTop: 4
    },
    marquee: {
        paddingVertical: 8,
        fontSize: 16,
        width: 280
    },
    btn: {
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        flexDirection: 'row',
    },
    btnIcon: {
        marginHorizontal: 8,
    },
    btnText: {
        fontSize: 16,
        width: 270
    },
    saveBtnView: {
        marginHorizontal: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    saveBtn: {
        backgroundColor: mainColor,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
    },
    saveBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});