import React, { useState, useContext } from 'react';
import { View, Image, Text, TextInput, Alert, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { styles } from '../styles/Login';
import { AuthContext } from '../App';
import axios from 'axios';
import Splash from './Splash';
import { BASE_URI } from '../constant/constant';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useContext(AuthContext);

    const loginHandler = () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('', 'Vui lòng điền đầy đủ thông tin');
        } else {
            setIsLoading(true);
            axios.post('http://hiringtutors.azurewebsites.net/api/Auth/login-user', { email, password })
                .then(res => {
                    AsyncStorage.setItem('@token', res.data.token);
                    AsyncStorage.setItem('@name', res.data.fullName);
                    let avatar = res.data.avatar;
                    if (avatar.includes('http:\\') || avatar.includes('https:\\')) {
                        AsyncStorage.setItem('@avatar', avatar);
                    } else {
                        AsyncStorage.setItem('@avatar', BASE_URI + avatar);
                    }
                    signIn(res.data.token);
                })
                .catch(err => {
                    console.log(err);
                    Alert.alert('', 'Email hoặc mật khẩu không đúng');
                    setIsLoading(false);
                    setPassword('');
                });
        }
    }

    const loginGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            setIsLoading(true);
            axios.post('http://hiringtutors.azurewebsites.net/api/Auth/login', { token: userInfo.idToken })
                .then(res => {
                    AsyncStorage.setItem('@token', res.data.token);
                    AsyncStorage.setItem('@name', res.data.fullName);
                    AsyncStorage.setItem('@avatar', res.data.avatar);
                    signIn(res.data.token);
                })
                .catch(err => {
                    Alert.alert('', 'Đã xảy ra lỗi');
                    setIsLoading(false);
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    return (
        isLoading ? <Splash /> :
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../asset/images/logo.jpg')} />
                    <Text style={styles.slogan}>Chia sẻ tri thức - Xây dựng tương lai</Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.loginForm}>
                        <View>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                autoCompleteType='username'
                                style={styles.loginInput}
                                placeholder='Email' />
                            <MaterialCommunityIcons style={styles.inputIcon} name='email-outline' />
                        </View>
                        <View>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                autoCompleteType='password'
                                style={styles.loginInput}
                                placeholder='Mật khẩu'
                                secureTextEntry={hidePass} />
                            <FontAwesome
                                style={styles.inputIcon}
                                name={hidePass ? 'eye' : 'eye-slash'}
                                onPress={() => setHidePass(!hidePass)} />
                        </View>
                    </View>
                    <View style={styles.loginButton}>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor='#2bbba5'
                            onPress={loginHandler}
                            style={styles.defaultLoginBtn}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Đăng nhập</Text>
                        </TouchableHighlight>
                        <TouchableHighlight activeOpacity={0.6} underlayColor='#c92c2c' onPress={loginGoogle} style={styles.googleLoginBtn}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                                <AntDesign name='googleplus' color='white' size={15} /> | Đăng nhập bằng google +
                        </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text onPress={() => props.navigation.navigate('ForgotPassword')}>Quên mật khẩu ?</Text>
                    <Text> | </Text>
                    <Text onPress={() => props.navigation.navigate('Register')} style={{ fontWeight: 'bold' }}>Đăng ký</Text>
                </View>
            </View>
    );
}

export default Login;