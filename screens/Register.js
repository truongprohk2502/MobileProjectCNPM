import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import { styles } from '../styles/Register';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { mainColor } from '../constant/constant';

function Register(props) {
    const [userType, setUserType] = useState('student');
    const [fullname, setFullname] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serviceRadio, setServiceRadio] = useState(false);
    const [serviceRadioError, setServiceRadioError] = useState('');


    const registerHandler = () => {
        if (fullname.trim() === '') {
            setFullNameError('Họ tên là bắt buộc');
        } else {
            setFullNameError('')
        }

        if (email.trim() === '') {
            setEmailError('Email là bắt buộc');
        } else if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
            setEmailError('Email không hợp lệ');
        } else {
            setEmailError('');
        }

        if (phone.trim() === '') {
            setPhoneError('Số điện thoại là bắt buộc');
        } else if (phone.match(/^[0-9]+$/) === null) {
            setPhoneError('Số điện thoại không hợp lệ')
        } else {
            setPhoneError('')
        }

        if (password.trim() === '') {
            setPasswordError('Mật khẩu là bắt buộc là bắt buộc');
        } else if(password.length < 6 || password.length > 32) {
            setPasswordError('Mật khẩu bắt buộc từ 6 - 32 ký tự');
        } else if (password.includes(' ')) {
            setPasswordError('Mật khẩu không được chứa ký tự khoảng trắng')
        } else {
            setPasswordError('');
        }

        if (!serviceRadio) {
            setServiceRadioError('Đồng ý với các chính sách sử dụng là bắt buộc');
        } else {
            setServiceRadioError('');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.top}>
                <Text style={styles.topText}>{`Đang tạo tài khoản dành cho ${userType === 'student' ? 'học viên' : 'gia sư'}`}</Text>
            </View>
            <View style={styles.checkbox}>
                <TouchableWithoutFeedback onPress={() => setUserType('student')}>
                    <View style={userType === 'student' ? { ...styles.typeUser, marginRight: 30, borderWidth: 3 }
                        : { ...styles.typeUser, marginRight: 30, borderWidth: 0 }} >
                        <FontAwesome5 name='user-graduate' size={30} color={userType === 'student' ? mainColor : 'black'} />
                        <Text style={{ marginTop: 10 }, userType === 'student' ? { color: mainColor } : { color: 'black' }}>Học viên</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setUserType('teacher')}>
                    <View style={userType === 'teacher' ? { ...styles.typeUser, borderWidth: 3 } : { ...styles.typeUser, borderWidth: 0 }}>
                        <FontAwesome5 name='chalkboard-teacher' size={30} color={userType === 'teacher' ? mainColor : 'black'} />
                        <Text style={{ marginTop: 10 }, userType === 'teacher' ? { color: mainColor } : { color: 'black' }}>Gia sư</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.form}>
                <Text>Vui lòng điền đầy đủ thông tin</Text>
                <View>
                    <TextInput
                        value={fullname}
                        onChangeText={setFullname}
                        autoCompleteType='name'
                        style={styles.registerInput}
                        placeholder='Họ và tên' />
                    <FontAwesome style={styles.inputIcon} name='user' />
                    <Text style={styles.error}>{fullNameError}</Text>
                </View>
                <View>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        autoCompleteType='email'
                        style={styles.registerInput}
                        placeholder='Email' />
                    <MaterialCommunityIcons style={styles.inputIcon} name='email-outline' />
                    <Text style={styles.error}>{emailError}</Text>
                </View>
                <View>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType='numeric'
                        autoCompleteType='tel'
                        style={styles.registerInput}
                        placeholder='Số điện thoại' />
                    <FontAwesome style={styles.inputIcon} name='phone' />
                    <Text style={styles.error}>{phoneError}</Text>
                </View>
                <View>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.registerInput}
                        autoCompleteType='password'
                        placeholder='Mật khẩu'
                        secureTextEntry={true} />
                    <FontAwesome style={styles.inputIcon} name='eye' />
                    <Text style={styles.error}>{passwordError}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                    >
                        {
                            [{ label: <Text>Tôi đồng ý với <Text onPress={() => props.navigation.navigate('TermOfService')} style={{ color: mainColor }}>điều khoản sử dụng</Text> của Blacasa</Text> }]
                                .map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={serviceRadio}
                                            onPress={() => setServiceRadio(true)}
                                            borderWidth={2}
                                            buttonInnerColor={mainColor}
                                            buttonOuterColor={serviceRadio ? mainColor : 'black'}
                                            buttonSize={10}
                                            buttonOuterSize={20}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={() => setServiceRadio(true)}
                                            labelStyle={{ fontSize: 15 }}
                                            labelWrapStyle={{ marginRight: 10 }}
                                        />
                                    </RadioButton>
                                ))
                        }
                    </RadioForm>
                    <Text style={styles.error}>{serviceRadioError}</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' onPress={registerHandler} style={styles.button}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Đăng ký</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
}

export default Register;