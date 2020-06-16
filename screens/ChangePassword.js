import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { styles } from '../styles/ChangePassword';

function ChangePassword(props) {
    const [curentPassword, setCurentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const saveHandler = () => {

    }

    return (
        <View>
            <View style={styles.bgTop} />
            <View style={styles.form}>
                <Text style={{ ...styles.title, marginTop: 5 }}>Mật khẩu hiện tại</Text>
                <TextInput value={curentPassword} onChangeText={setCurentPassword} style={styles.input} />
                <Text style={{ ...styles.title, marginTop: 10 }}>Mật khẩu mới</Text>
                <TextInput value={newPassword} onChangeText={setNewPassword} style={styles.input} />
                <Text style={{ ...styles.title, marginTop: 10 }}>Nhập lại mật khẩu mới</Text>
                <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} />
            </View>
            <View style={styles.btnView}>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor='#2bbba5'
                    onPress={saveHandler}
                    style={styles.btn}>
                    <Text style={styles.btnText}>Lưu thay đổi</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default ChangePassword;