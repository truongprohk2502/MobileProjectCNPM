import React, { useState, useContext } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, Alert, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../styles/Register';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { mainColor } from '../constant/constant';
import { AuthContext } from '../App';
import Splash from './Splash';
import axios from 'axios';

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
    const [cpass, setCpass] = useState('');
    const [cpassError, setCpassError] = useState('');
    const [serviceRadio, setServiceRadio] = useState(false);
    const [serviceRadioError, setServiceRadioError] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [chidePass, setChidePass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { signUp } = useContext(AuthContext);

    const registerHandler = () => {
        let err = false;
        if (fullname.trim() === '') {
            setFullNameError('Họ tên là bắt buộc');
            err = true;
        } else {
            setFullNameError('')
        }

        if (email.trim() === '') {
            setEmailError('Email là bắt buộc');
            err = true;
        } else if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
            setEmailError('Email không hợp lệ');
            err = true;
        } else {
            setEmailError('');
        }

        if (phone.trim() === '') {
            setPhoneError('Số điện thoại là bắt buộc');
            err = true;
        } else if (phone.match(/^[0-9]+$/) === null) {
            setPhoneError('Số điện thoại không hợp lệ');
            err = true;
        } else {
            setPhoneError('')
        }

        if (password.trim() === '') {
            setPasswordError('Mật khẩu là bắt buộc là bắt buộc');
            err = true;
        } else if (password.length < 6 || password.length > 32) {
            setPasswordError('Mật khẩu bắt buộc từ 6 - 32 ký tự');
            err = true;
        } else if (password.includes(' ')) {
            setPasswordError('Mật khẩu không được chứa ký tự khoảng trắng');
            err = true;
        } else if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/) === null) {
            setPasswordError('Mật khẩu bắt buộc có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt');
            err = true;
        } else if (password !== cpass) {
            setPasswordError('Vui lòng xác minh lại mật khẩu');
            setPassword('');
            setCpass('');
            err = true;
        } else {
            setPasswordError('');
        }

        if (cpass.trim() === '') {
            setCpassError('Xác minh lại mật khẩu là bắt buộc');
            err = true;
        } else {
            setCpassError('');
        }

        if (!serviceRadio) {
            setServiceRadioError('Đồng ý với các chính sách sử dụng là bắt buộc');
            err = true;
        } else {
            setServiceRadioError('');
        }

        if (!err) {
            props.navigation.setOptions({ headerShown: false });
            setIsLoading(true);
            axios.post('http://hiringtutors.azurewebsites.net/api/Auth/register', { name: fullname, email, password, phone })
                .then(res => {
                    AsyncStorage.setItem('@token', res.data.token);
                    AsyncStorage.setItem('@name', res.data.fullName);
                    AsyncStorage.setItem('@avatar', res.data.avatar);
                    signUp(res.data.token);
                })
                .catch(err => {
                    console.log(err);
                    Alert.alert('', 'Email đã tồn tại');
                    props.navigation.setOptions({ headerShown: true });
                    setPassword('');
                    setCpassError('');
                    setIsLoading(false);
                });
        }
    }

    return (
        isLoading ? <Splash /> :
            <View style={styles.container}>
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
                            secureTextEntry={hidePass} />
                        <FontAwesome
                            style={styles.inputIcon}
                            name={hidePass ? 'eye' : 'eye-slash'}
                            onPress={() => setHidePass(!hidePass)} />
                        <Text style={styles.error}>{passwordError}</Text>
                    </View>
                    <View>
                        <TextInput
                            value={cpass}
                            onChangeText={setCpass}
                            style={styles.registerInput}
                            autoCompleteType='password'
                            placeholder='Nhập lại mật khẩu'
                            secureTextEntry={chidePass} />
                        <FontAwesome
                            style={styles.inputIcon}
                            name={chidePass ? 'eye' : 'eye-slash'}
                            onPress={() => setChidePass(!chidePass)} />
                        <Text style={styles.error}>{cpassError}</Text>
                    </View>
                    <View style={{ marginTop: 5, marginRight: 15 }}>
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
            </View>
    );
}

export default Register;