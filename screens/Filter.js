import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../styles/Filter';
import { Picker } from '@react-native-community/picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { subjectsData, mainColor, provinces, themes, jobs } from '../constant/constant';

function Filter(props) {
    const [province, setProvince] = useState('');
    const [subject, setSubject] = useState('');
    const [theme, setTheme] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [job, setJob] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Entypo name='location-pin' color={mainColor} size={20} style={styles.icon} />
                <Picker mode='dropdown' style={styles.input} selectedValue={province} onValueChange={setProvince}>
                    <Picker.Item label="Tỉnh thành" value="" color='grey' />
                    {provinces.map(item => <Picker.Item key={item.id} label={item.label} value={item.value} />)}
                </Picker>
            </View>
            <View style={styles.hr} />
            <View style={styles.row}>
                <Entypo name='book' color={mainColor} size={20} style={styles.icon} />
                <Picker mode='dropdown' style={styles.input} selectedValue={subject} onValueChange={setSubject}>
                    <Picker.Item label="Môn học" value="" color='grey' />
                    {subjectsData.map(item => <Picker.Item key={item.id} label={item.label} value={item.value} />)}
                </Picker>
            </View>
            <View style={styles.hr} />
            <View style={styles.row}>
                <Foundation name='clipboard-notes' color={mainColor} size={20} style={{ ...styles.icon, paddingLeft: 18 }} />
                <Picker mode='dropdown' style={{ ...styles.input, marginLeft: -4 }} selectedValue={theme} onValueChange={setTheme}>
                    <Picker.Item label="Chủ đề" value="" color='grey' />
                    {themes.map(item => <Picker.Item key={item.id} label={item.label} value={item.value} />)}
                </Picker>
            </View>
            <View style={styles.hr} />
            <Text style={styles.advance}>Tìm kiếm nâng cao</Text>
            <View style={styles.row}>
                <AntDesign name='database' color={mainColor} size={18} style={styles.icon} />
                <Picker mode='dropdown' style={styles.input} selectedValue={type} onValueChange={setType}>
                    <Picker.Item label="Hình thức dạy" value="" color='grey' />
                    <Picker.Item label="Online" value="online" />
                    <Picker.Item label="Offline" value="offline" />
                </Picker>
            </View>
            <View style={styles.hr} />
            <View style={styles.row}>
                <MaterialCommunityIcons name='gender-male-female' color={mainColor} size={18} style={styles.icon} />
                <Picker mode='dropdown' style={styles.input} selectedValue={gender} onValueChange={setGender}>
                    <Picker.Item label="Giới tính" value="" color='grey' />
                    <Picker.Item label="Nam" value="male" />
                    <Picker.Item label="Nữ" value="female" />
                </Picker>
            </View>
            <View style={styles.hr} />
            <View style={styles.row}>
                <Entypo name='suitcase' color={mainColor} size={18} style={styles.icon} />
                <Picker mode='dropdown' style={styles.input} selectedValue={job} onValueChange={setJob}>
                    <Picker.Item label="Nghề nghiệp" value="" color='grey' />
                    {jobs.map(item => <Picker.Item key={item.id} label={item.label} value={item.value} />)}
                </Picker>
            </View>
            <View style={styles.hr} />
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.button}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Tìm kiếm</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default Filter;