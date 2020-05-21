import React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import { styles } from '../styles/ForgotPassword';

function ForgotPassword(props) {
    const onPress = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}><TextInput style={{ fontSize: 15 }} placeholder='Nhập email/ Số điện thoại' /></View>
            <View style={styles.btnView}>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' onPress={onPress} style={styles.btn}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Lấy mật khẩu</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default ForgotPassword;