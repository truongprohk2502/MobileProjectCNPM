import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        flex: 1
    },
    topBG: {
        backgroundColor: mainColor,
        height: 40
    },
    header: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 20,
        alignItems: 'center',
        top: -20,
        alignSelf: 'center'
    },
    progress: {
        flexDirection: 'row',
        marginVertical: 3
    },
    circle: {
        backgroundColor: mainColor,
        width: 14,
        height: 14,
        borderRadius: 7
    },
    pipe: {
        backgroundColor: mainColor,
        width: 80,
        height: 6,
        marginTop: 4,
        marginLeft: -4,
        marginRight: -4
    },
    main: {
        paddingHorizontal: 5
    },
    title: {
        marginVertical: 10,
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: 10
    },
    img: {
        flex: 1,
        // width: '100%',
        width: 120,
        height: 100,
        marginRight: 10
    },
    txt: {
        flex: 2
    },
    link: {
        color: mainColor,
        fontSize: 16,
        fontWeight: 'bold'
    },
    tip: {
        color: 'grey',
        textAlign: 'justify'
    },
    continueBtn: {
        marginVertical: 20,
        padding: 5,
        borderRadius: 8,
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    continueText: {
        color: mainColor,
        fontSize: 20,
    },
    continueArrow: {
        color: mainColor,
        marginTop: 4,
        fontSize: 20,
        marginLeft: 6
    }
});