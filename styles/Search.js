import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBtn: {
        width: 300,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRadius: 20,
        position: 'absolute',
        top: 15,
        backgroundColor: mainColor,
        alignSelf: 'center',
    },
    leftBtn: {
        flex: 1,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: 'white'
    },
    rightBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    round: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1
    },
    icon: {
        marginTop: 5,
        marginLeft: 5
    },
    teacherInfo: {
        flexDirection: 'row',
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10
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
    profile: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopColor: mainColor,
        borderTopWidth: 2,
        flexDirection: 'row',
    },
});