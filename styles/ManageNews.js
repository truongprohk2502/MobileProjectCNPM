import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
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
        width: 300,
        fontSize: 16
    },
    price: {
        fontWeight: 'bold',
        color: 'orange'
    },
    fee: {
        color: mainColor,
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 1
    },
});