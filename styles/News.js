import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    img: {
        width: '100%',
        height: 210,
        resizeMode: 'contain'
    },
    imgText: {
        width: 220,
        marginTop: -180,
        paddingLeft: 12
    },
    requestBtn: {
        backgroundColor: mainColor,
        width: 140,
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newsInfo: {
        flexDirection: 'row',
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    info: {
        flex: 5,
        marginLeft: 10,
        marginVertical: 5
    },
    button: {
        flex: 2,
        paddingTop: 25
    },
    icon: {
        width: 20,
        fontSize: 16,
        marginTop: 2
    },
    marquee: {
        fontWeight: 'bold',
        color: mainColor,
        width: 260,
        fontSize: 16
    },
    price: {
        fontWeight: 'bold',
        color: 'orange'
    },
    btn: {
        paddingHorizontal: 5,
        height: 25,
        borderRadius: 15,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
    fee: {
        color: mainColor,
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 1
    },
    widgets: {
        height: '100%',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        top: 0,
        right: 0,
        padding: 10,
        marginLeft: 10,
    },
    btn2: {
        paddingHorizontal: 15,
        height: 30,
        borderRadius: 15,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
});