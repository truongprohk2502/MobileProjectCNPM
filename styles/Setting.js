import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30
    },
    top: {
        backgroundColor: mainColor,
        height: 200,
        alignItems: 'center',
        paddingTop: 10
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
        borderColor: 'white',
        borderWidth: 2,
    },
    photo: {
        padding: 5,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: mainColor,
        marginTop: -20
    },
    widgets: {
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 4,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        marginTop: -30
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    hr: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 0.6
    },
    icon: {
        width: 20
    },
    text: {
        fontSize: 16,
        paddingLeft: 10
    },
    btn: {
        width: '100%',
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});