import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { styles } from '../styles/ChangeAddress';
import { Picker } from '@react-native-community/picker';
import { placeholderColor, PROVINCES, DISTRICTS } from '../constant/constant';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

function ChangeAddress(props) {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    useEffect(() => {
        if (props.route.params?.addressData !== null) {
            setCity(props.route.params.addressData.city);
            setDistrict(props.route.params.addressData.district);
            setStreet(props.route.params.addressData.street);
            setHouseNumber(props.route.params.addressData.houseNumber + '');
        }
    }, []);

    const saveHandler = async () => {
        const id = props.route.params.addressData !== null ? props.route.params.addressData.id : -1;
        const phone = props.route.params.addressData !== null ? props.route.params.addressData.phone : '';
        Axios.put('http://hiringtutors.azurewebsites.net/api/Common/UpdateAddress', {
            id, street, phone, houseNumber, district, city,
            status: true,
            typeOfAddress: 1
        }, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
            }
        })
            .then(res => {
                props.route.params.updateAddress({ city, district, street, houseNumber });
                Alert.alert('', 'Cập nhật địa chỉ thành công');
                props.navigation.goBack();
            })
            .catch(err => console.log(err));
    }

    return (
        <View style={styles.container}>
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
        </View>
    );
}

export default ChangeAddress;