import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        height: 180,
        backgroundColor: mainColor,
        alignItems: 'center',
        paddingTop: 20
    },
    main: {
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    slogan: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10
    },
    loginForm: {
        width: 380,
        height: 130,
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        elevation: 1,
        top: -40
    },
    loginInput: {
        width: 330,
        paddingHorizontal: 0,
        paddingVertical: 6,
        borderBottomColor: 'rgba(0, 0, 0, .5)',
        borderBottomWidth: 0.9,
        fontSize: 16
    },
    inputIcon: {
        position: 'absolute',
        right: 0,
        top: 8,
        fontSize: 25,
        color: mainColor
    },
    loginButton: {
        position: 'absolute',
        zIndex: 2,
        elevation: 2,
        top: 70,
        shadowOpacity: 0
    },
    defaultLoginBtn: {
        width: 240,
        height: 40,
        borderRadius: 20,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    googleLoginBtn: {
        width: 240,
        height: 40,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        position: 'absolute',
        top: 620,
        flexDirection: 'row'
    }
});