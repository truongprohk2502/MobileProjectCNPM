import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../styles/ChangePassword';
import Axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { showToastWithGravity } from '../constant/function';
import Splash from './Splash';

function ChangePassword(props) {
    const [curentPassword, setCurentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const saveHandler = async () => {
        if (curentPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
            setAlertMessage('Vui lòng điền đầy đủ thông tin');
            setShowAlert(true);
        } else {
            if (newPassword.length < 6 || newPassword.length > 32) {
                setAlertMessage('Mật khẩu bắt buộc từ 6 - 32 ký tự');
                setShowAlert(true);
                setNewPassword('');
                setConfirmPassword('');
            } else if (newPassword.includes(' ')) {
                setAlertMessage('Mật khẩu không được chứa ký tự khoảng trắng');
                setShowAlert(true);
                setNewPassword('');
                setConfirmPassword('');
            } else if (newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/) === null) {
                setAlertMessage('Mật khẩu bắt buộc có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt');
                setShowAlert(true);
                setNewPassword('');
                setConfirmPassword('');
            } else if (newPassword !== confirmPassword) {
                setAlertMessage('Vui lòng xác minh lại mật khẩu');
                setShowAlert(true);
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setIsLoading(true);
                Axios.put('http://hiringtutors.azurewebsites.net/api/User/ChangePassword', {
                    oldPassword: curentPassword,
                    newPassword
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                    }
                })
                    .then(res => {
                        showToastWithGravity('Bạn đã đổi mật khẩu thành công');
                        props.navigation.goBack();
                    })
                    .catch(err => {
                        setAlertMessage('Mật khẩu không đúng');
                        setShowAlert(true);
                        setIsLoading(false);
                        setCurentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                    });
            }
        }
    }

    return (
        isLoading ? <Splash /> :
            <View style={{ flex: 1 }}>
                <View style={{ elevation: -1 }}>
                    <View style={styles.bgTop} />
                    <View style={styles.form}>
                        <Text style={{ ...styles.title, marginTop: 5 }}>Mật khẩu hiện tại</Text>
                        <TextInput value={curentPassword} onChangeText={setCurentPassword} style={styles.input} secureTextEntry={true} />
                        <Text style={{ ...styles.title, marginTop: 10 }}>Mật khẩu mới</Text>
                        <TextInput value={newPassword} onChangeText={setNewPassword} style={styles.input} secureTextEntry={true} />
                        <Text style={{ ...styles.title, marginTop: 10 }}>Nhập lại mật khẩu mới</Text>
                        <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry={true} />
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
                <AwesomeAlert
                    show={showAlert}
                    message={alertMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="Đã hiểu"
                    cancelButtonColor="#DD6B55"
                    onCancelPressed={() => setShowAlert(false)}
                    onDismiss={() => setShowAlert(false)}
                />
            </View>
    );
}

export default ChangePassword;