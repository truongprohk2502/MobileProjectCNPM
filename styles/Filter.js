import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 20
    },
    row: {
        flexDirection: 'row'
    },
    icon: {
        flex: 1,
        paddingTop: 14,
        paddingLeft: 14
    },
    input: {
        flex: 8,
        padding: 10,
    },
    hr: {
        marginTop: -10,
        borderBottomWidth: 0.6,
        borderBottomColor: 'black'
    },
    advance: {
        alignSelf: 'flex-end',
        marginTop: 20,
        marginBottom: 10
    },
    button: {
        width: 240,
        height: 40,
        borderRadius: 20,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});