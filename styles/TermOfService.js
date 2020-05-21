import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    headerTitle: {
        color: mainColor,
        fontSize: 23,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 240,
        resizeMode: 'contain',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 10
    },
    sTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 5
    },
    content: {
        fontSize: 16,
        textAlign: 'justify'
    },
    element: {
        paddingRight: 16,
        flexDirection: 'row'
    },
    count: {
        fontSize: 16,
    },
    elemContent: {
        fontSize: 16,
        textAlign: 'justify'
    }
});