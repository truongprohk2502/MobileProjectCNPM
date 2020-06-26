import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    top: {
        alignItems: 'center',
        backgroundColor: mainColor,
        height: 40,
    },
    searchLink: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 40,
        borderRadius: 20,
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        marginTop: 20
    },
    img: {
        width: '100%',
        height: 250,
        resizeMode: 'contain'
    },
    imgText: {
        width: 220,
        marginTop: -210,
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
    teacherInfo: {
        flexDirection: 'row',
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    imgElem: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover'
    },
    infoElem: {
        flex: 2,
        marginLeft: -10,
        marginTop: 13
    },
    widgets: {
        height: '100%',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        top: 0,
        right: 0,
        padding: 10
    },
    btn: {
        paddingHorizontal: 15,
        height: 30,
        borderRadius: 15,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    marquee: {
        paddingVertical: 0,
        width: 150
    },
});