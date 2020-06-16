import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from '../styles/PersonalInfo';
import { mainColor } from '../constant/constant';
import MarqueeText from 'react-native-marquee';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from './Splash';

function PersonalInfo(props) {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [addressData, setAddressData] = useState({ value: '' });

    useEffect(() => {
        const fetchData = async () => {
            Axios.get('http://hiringtutors.azurewebsites.net/api/User/GetUserInfo', {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    setFullname(res.data.fullName)
                    setEmail(res.data.email);
                    setPhone(res.data.phoneNumber);
                    setAddressData(res.data.addressView);
                    if (res.data.addressView !== null) {
                        setAddress(`${res.data.addressView.houseNumber} ${res.data.addressView.street}, ${res.data.addressView.district}, ${res.data.addressView.city}`);
                    } else {
                        setAddress('Nhập địa chỉ');
                    }
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, [address]);

    const updateAddress = (addr) => {
        setAddress(`${addr.houseNumber} ${addr.street}, ${addr.district}, ${addr.city}`);
    }

    const saveHandler = async () => {
        if (fullname.trim() === '') {
            Alert.alert('', 'Họ tên không được để trống');
        } else {
            Axios.put('http://hiringtutors.azurewebsites.net/api/User/EditUserInfor', {
                userInfoView: {
                    fullName: fullname,
                    phone
                },
                addressView: {
                    status: false
                }
            }, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    AsyncStorage.setItem('@name', fullname);
                    props.route.params.setName(fullname);
                    Alert.alert('', 'Lưu thông tin thành công');
                })
                .catch(err => console.log(err));
        }
    }

    return (
        isLoading ? <Splash /> :
            <View style={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.title}>Họ tên</Text>
                    <View style={styles.hr} />
                    <View style={styles.inputRow}>
                        <FontAwesome name='user' color={mainColor} size={18} style={styles.icon} />
                        <TextInput value={fullname} onChangeText={setFullname} placeholder='Nhập họ tên' style={styles.txtInput} />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.title}>Email</Text>
                    <View style={styles.hr} />
                    <View style={styles.inputRow}>
                        <MaterialIcons name='email' color={mainColor} size={18} style={styles.icon} />
                        <TextInput value={email} style={styles.txtInput} editable={false} />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.title}>Số điện thoại</Text>
                    <View style={styles.hr} />
                    <View style={styles.inputRow}>
                        <FontAwesome name='phone' color={mainColor} size={18} style={styles.icon} />
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.txtInput}
                            keyboardType='numeric'
                            placeholder='Nhập số điện thoại' />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.title}>Địa chỉ</Text>
                    <View style={styles.hr} />
                    <View style={styles.inputRow}>
                        <Entypo name='location-pin' color={mainColor} size={18} style={styles.icon} />
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ChangeAddress', { addressData, updateAddress })}>
                            <MarqueeText
                                style={styles.marquee}
                                duration={3000}
                                marqueeOnStart
                                loop
                                marqueeDelay={1000}
                                marqueeResetDelay={1000} >{address}</MarqueeText>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ChangePassword')}>
                    <View style={styles.btn}>
                        <Entypo name='key' color={mainColor} size={18} style={styles.btnIcon} />
                        <Text style={styles.btnText}>Đổi mật khẩu</Text>
                        <Ionicons name='ios-arrow-forward' color={mainColor} size={24} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.saveBtnView}>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor='#2bbba5'
                        onPress={saveHandler}
                        style={styles.saveBtn}>
                        <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
                    </TouchableHighlight>
                </View>
            </View>
    );
}

export default PersonalInfo;