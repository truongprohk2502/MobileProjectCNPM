import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 50
    },
    topBG: {
        backgroundColor: mainColor,
        height: 50
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
        top: 30,
        alignSelf: 'center'
    },
    marqueeTitle: {
        lineHeight: 40,
        fontSize: 16,
        width: 260,
    },
    marqueeAddress: {
        fontSize: 16,
        width: 220,
    },
    form: {
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 10,
        marginTop: 30,
        padding: 10,
    },
    row: {
        flexDirection: 'row'
    },
    icon: {
        color: mainColor,
        fontSize: 16,
        marginTop: 2,
        width: '10%',
        paddingLeft: 5
    },
    name: {
        fontSize: 16,
        width: '90%',
    },
    hr: {
        width: '90%',
        alignSelf: 'center',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 8,
        opacity: 0.2
    },
    headerText: {
        fontSize: 16,
        marginVertical: 8
    },
    content: {
        fontSize: 16,
        textAlign: 'justify'
    },
    timeWeekView: {
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 4,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
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
        borderRadius: 5,
        paddingHorizontal: 5,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
});