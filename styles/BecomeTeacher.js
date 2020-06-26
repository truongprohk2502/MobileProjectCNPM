import { StyleSheet } from "react-native";
import { mainColor, placeholderColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
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
    form: {
        paddingHorizontal: 10
    },
    input: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 5,
        padding: 10,
        marginBottom: 5
    },
    icon: {
        width: 25,
        marginTop: 4
    },
    iconScecial: {
        marginTop: 1,
        marginRight: 8
    },
    inputText: {
        fontSize: 16,
        paddingVertical: 0
    },
    inputTextSpecial: {
        fontSize: 16,
        paddingVertical: 0,
        marginLeft: 9,
        flex: 10,
    },
    picker: {
        width: 300,
        marginVertical: -10,
        marginHorizontal: -4
    },
    arrowIcon: {
        color: placeholderColor,
        marginTop: 4,
        fontSize: 20,
        marginLeft: 6
    },
    headerSize: {
        fontSize: 16,
        marginVertical: 10
    },
    introduction: {
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 4,
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 10
    },
    timeWeekView: {
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 4,
        padding: 10,
        borderRadius: 10
    },
    marquee: {
        paddingVertical: 3,
        fontSize: 16,
        width: 280
    },
    marqueeSpecial: {
        paddingVertical: 3,
        fontSize: 16,
        width: 275
    },
    continueBtn: {
        marginVertical: 10,
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