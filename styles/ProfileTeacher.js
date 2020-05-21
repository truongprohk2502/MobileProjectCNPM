import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    top: {
        height: 80,
        backgroundColor: mainColor
    },
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    head: {
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 4,
        width: 300,
        alignItems: 'center',
        marginTop: -60,
        paddingTop: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    star: {
        position: 'absolute',
        bottom: -10,
        left: 33,
        shadowColor: 'black',
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 5,
        borderRadius: 10
    },
    btn: {
        height: 30,
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: -15,
        borderRadius: 15,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoRow: {
        flexDirection: 'row',
        marginVertical: 4
    },
    infoCol: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#c3c5c7',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    info: {
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
    infoText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    theme: {
        alignItems: 'center',
        padding: 5,
        marginVertical: 5,
        backgroundColor: '#c3c5c7',
        borderRadius: 15
    },
    pinBottom: {
        position: 'absolute',
        bottom: 0,
        shadowColor: 'black',
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    pinBtn: {
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});