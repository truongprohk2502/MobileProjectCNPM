import { StyleSheet } from "react-native";
import { mainColor } from "../constant/constant";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
        paddingBottom: 60
    },
    top: {
        height: 40,
        backgroundColor: mainColor,
        alignItems: 'center'
    },
    summary: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 4,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        top: 20
    },
    headerSize: {
        fontSize: 18,
        marginVertical: 10
    },
    requestForm: {
        shadowColor: "#000",
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10
    },
    reqRow: {
        flexDirection: 'row'
    },
    iconReq: {
        flex: 1,
        paddingTop: 14,
        paddingLeft: 14
    },
    inputReq: {
        flex: 8,
        paddingHorizontal: 10,
    },
    detailDescription: {
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
    rowSelect: {
        flexDirection: 'row',
        marginVertical: 5
    },
    dayCol: {
        flex: 1,
        color: mainColor,
        fontSize: 16,
        marginTop: 3
    },
    chooseCol: {
        flex: 5,
        flexDirection: 'row',
    },
    morning: {
        flex: 1,
        paddingVertical: 5,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center'
    },
    afternoon: {
        flex: 1,
        paddingVertical: 5,
        borderStartWidth: 1,
        borderEndWidth: 1,
        alignItems: 'center'
    },
    evening: {
        flex: 1,
        paddingVertical: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'
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
        width: 150,
        height: 30,
        borderRadius: 5,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    marquee: {
        fontSize: 16,
        width: 260,
        marginVertical: 10,
        marginLeft: 2
    }
});