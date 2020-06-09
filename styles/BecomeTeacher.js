import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {

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
    inputText: {
        fontSize: 16,
        paddingVertical: 0
    },
    picker: {
        width: 300,
        marginVertical: -10,
        marginHorizontal: -4
    }
});