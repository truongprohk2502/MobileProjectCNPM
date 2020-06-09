import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/BecomeTeacher';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { mainColor, placeholderColor } from '../constant/constant';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';

function BecomeTeacher(props) {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [typeStudy, setTypeStudy] = useState('');
    const [job, setJob] = useState('');
    const [address, setAddress] = useState('');
    const [tuition, setTuition] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.topBG}></View>
            <View style={styles.header}>
                <Text>Thông tin đã cập nhật</Text>
                <View style={styles.progress}>
                    <View style={styles.circle}></View>
                    <View style={styles.pipe}></View>
                    <View style={{ ...styles.circle, elevation: 3 }}></View>
                    <View style={{ ...styles.pipe, backgroundColor: '#aafff2' }}></View>
                    <View style={{ ...styles.circle, backgroundColor: '#aafff2' }}></View>
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <FontAwesome name='user' color={mainColor} size={20} style={{ marginLeft: 3 }} />
                    </View>
                    <TextInput placeholder='Họ và tên' style={styles.inputText} value={fullname} onChangeText={setFullname} />
                </View>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <Entypo name='phone' color={mainColor} size={20} />
                    </View>
                    <TextInput
                        keyboardType='numeric'
                        placeholder='Số điện thoại'
                        style={styles.inputText}
                        value={phone}
                        onChangeText={setPhone} />
                </View>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons name='email' color={mainColor} size={20} />
                    </View>
                    <TextInput placeholder='Email' style={styles.inputText} value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <Entypo name='briefcase' color={mainColor} size={20} />
                    </View>
                    <Picker mode='dropdown' selectedValue={job} onValueChange={setJob} style={styles.picker}>
                        <Picker.Item label="Nghề nghiệp" value="" color={placeholderColor} />
                        <Picker.Item label="Học sinh" value="student" />
                        <Picker.Item label="Sinh viên" value="university-student" />
                        <Picker.Item label="Người đi làm" value="job" />
                        <Picker.Item label="Giảng viên đại học" value="university-teacher" />
                        <Picker.Item label="Chuyên gia" value="master" />
                        <Picker.Item label="Người nước ngoài" value="foreign" />
                    </Picker>
                </View>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <AntDesign name='database' color={mainColor} size={20} />
                    </View>
                    <Picker mode='dropdown' selectedValue={typeStudy} onValueChange={setTypeStudy} style={styles.picker}>
                        <Picker.Item label="Hình thức dạy" value="" color={placeholderColor} />
                        <Picker.Item label="Online" value="online" />
                        <Picker.Item label="Offline" value="offline" />
                        <Picker.Item label="Online, Offline" value="both" />
                    </Picker>
                </View>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <Entypo name='home' color={mainColor} size={20} />
                    </View>
                    <TextInput placeholder='Địa chỉ nhà' style={styles.inputText} value={address} onChangeText={setAddress} />
                </View>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <FontAwesome name='dollar' color={mainColor} size={20} style={{ marginLeft: 5 }} />
                    </View>
                    <TextInput placeholder='Học phí 1 giờ (VNĐ)' style={styles.inputText} value={tuition} onChangeText={setTuition} />
                </View>
            </View>
        </View>
    );
}

export default BecomeTeacher;