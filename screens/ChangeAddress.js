import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from '../styles/ChangeAddress';
import { Picker } from '@react-native-community/picker';
import { placeholderColor, PROVINCES, DISTRICTS, COMMUNES } from '../constant/constant';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { showToastWithGravity } from '../constant/function';

function ChangeAddress(props) {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [commune, setCommune] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    useEffect(() => {
        if (props.route.params?.addressData !== null) {
            setCity(props.route.params.addressData.city);
            setDistrict(props.route.params.addressData.district);
            setCommune(props.route.params.addressData.commune);
            setStreet(props.route.params.addressData.street);
            setHouseNumber(props.route.params.addressData.houseNumber + '');
        }
    }, []);

    const saveHandler = async () => {
        const { type, updateAddress, addressData } = props.route.params;
        const id = addressData !== null ? addressData.id : -1;
        if (type === 'News') {
            updateAddress({ id, city, district, commune, street, houseNumber });
            showToastWithGravity('Cập nhật địa chỉ thành công');
            props.navigation.goBack();
        } else {
            Axios.put('http://hiringtutors.azurewebsites.net/api/Common/UpdateAddress', {
                id, street, houseNumber, commune, district, city,
                typeUpdate: 1
            }, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    updateAddress({ id, city, district, commune, street, houseNumber });
                    showToastWithGravity('Cập nhật địa chỉ thành công');
                    props.navigation.goBack();
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.dropdown}>
                <Text style={styles.title}>Tỉnh / Thành phố</Text>
                <View style={styles.hr} />
                <Picker mode='dropdown' selectedValue={city} onValueChange={setCity}>
                    <Picker.Item label="Chọn tỉnh/thành" value="" color={placeholderColor} />
                    {PROVINCES.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)}
                </Picker>
            </View>
            <View style={styles.dropdown}>
                <Text style={styles.title}>Quận / Huyện</Text>
                <View style={styles.hr} />
                <Picker mode='dropdown' selectedValue={district} onValueChange={setDistrict}>
                    <Picker.Item label="Chọn quận/huyện" value="" color={placeholderColor} />
                    {city !== '' && DISTRICTS.filter(d => d.provinceId === PROVINCES.find(p => p.name === city).id).map(item =>
                        <Picker.Item key={item.id} label={item.name} value={item.name} />)}
                </Picker>
            </View>
            <View style={styles.dropdown}>
                <Text style={styles.title}>Phường / Xã</Text>
                <View style={styles.hr} />
                <Picker mode='dropdown' selectedValue={commune} onValueChange={setCommune}>
                    <Picker.Item label="Chọn phường/xã" value="" color={placeholderColor} />
                    {district !== '' && COMMUNES.filter(c => c.districtId === DISTRICTS.find(d => d.name === district).id).map(item =>
                        <Picker.Item key={item.id} label={item.name} value={item.name} />)}
                </Picker>
            </View>
            <View style={styles.dropdown}>
                <Text style={styles.title}>Tên đường</Text>
                <View style={styles.hr} />
                <TextInput value={street} onChangeText={setStreet} placeholder='Nhập tên đường' style={styles.inputText} />
            </View>
            <View style={styles.dropdown}>
                <Text style={styles.title}>Số nhà</Text>
                <View style={styles.hr} />
                <TextInput keyboardType='numeric' value={houseNumber} onChangeText={setHouseNumber} placeholder='Nhập số nhà' style={styles.inputText} />
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
        </ScrollView>
    );
}

export default ChangeAddress;