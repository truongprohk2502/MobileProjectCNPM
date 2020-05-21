import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableHighlight, Alert, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { styles } from '../styles/PostFindTeacher';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { mainColor, subjectsData, provinces } from '../constant/constant';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DaySelect from '../components/DaySelect';

function PostFindTeacher(props) {
    const [summary, setSummary] = useState('');
    const [subject, setSubject] = useState('');
    const [theme, setTheme] = useState([]);
    const [timeStudy, setTimeStudy] = useState('');
    const [typeStudy, setTypeStudy] = useState('');
    const [tuition, setTuition] = useState('');
    const [province, setProvince] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [numberOfSessions, setNumberOfSessions] = useState('');

    const numberOfSessionsOptions = [
        { label: '1 buổi', value: 1 },
        { label: '2 buổi', value: 2 },
        { label: '3 buổi', value: 3 },
        { label: '4 buổi', value: 4 },
    ];

    const setThemeFunc = (themesSelected) => {
        setTheme(themesSelected);
    }

    const getThemesStr = () => {
        const themeStr = theme.reduce((str, theme) => str + theme.label + ', ', '');
        return themeStr.slice(0, themeStr.length - 2)
    }

    const themeSelectHandler = () => {
        if (subject === '') {
            Alert.alert('', 'Vui lòng chọn bộ môn trước');
        } else {
            props.navigation.navigate('ThemeSelection', {
                subject: subjectsData.find(s => s.value === subject),
                themeSelected: theme,
                setThemeFunc
            });
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.top}>
                    <View style={styles.summary}>
                        <TextInput value={summary} onChangeText={setSummary} style={{ fontSize: 15 }} placeholder='Tóm tắt yêu cầu tìm gia sư' />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.headerSize}>Yêu cầu</Text>
                    <View style={styles.requestForm}>
                        <View style={styles.reqRow}>
                            <Entypo name='book' color={mainColor} size={20} style={styles.iconReq} />
                            <Picker mode='dropdown' style={styles.inputReq} selectedValue={subject} onValueChange={setSubject}>
                                <Picker.Item label="Môn học" value="" color='grey' />
                                {subjectsData.map(subject => <Picker.Item key={subject.id} label={subject.label} value={subject.value} />)}
                            </Picker>
                        </View>
                        <View style={{ ...styles.reqRow, paddingVertical: 5 }}>
                            <Foundation
                                name='clipboard-notes'
                                color={mainColor}
                                size={20}
                                style={{ ...styles.iconReq, paddingLeft: 18, paddingTop: 0 }} />
                            <TouchableWithoutFeedback onPress={themeSelectHandler}>
                                <View style={{ flex: 8, marginLeft: 3 }}>
                                    {
                                        theme.length === 0
                                            ? <Text style={{ color: 'grey', fontSize: 16 }}>Chủ đề</Text>
                                            : <Text style={{ fontSize: 16 }}>{getThemesStr()}</Text>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.reqRow}>
                            <Foundation name='clock' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 18 }} />
                            <Picker mode='dropdown' style={{ ...styles.inputReq, marginLeft: -4 }} selectedValue={timeStudy} onValueChange={setTimeStudy}>
                                <Picker.Item label="Thời lượng học" value="" color='grey' />
                                <Picker.Item label="1h" value="1" />
                                <Picker.Item label="1.5h" value="1.5" />
                                <Picker.Item label="2h" value="2" />
                                <Picker.Item label="2.5h" value="2.5" />
                            </Picker>
                        </View>
                        <View style={styles.reqRow}>
                            <AntDesign name='database' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16 }} />
                            <Picker mode='dropdown' style={styles.inputReq} selectedValue={typeStudy} onValueChange={setTypeStudy}>
                                <Picker.Item label="Hình thức dạy" value="" color='grey' />
                                <Picker.Item label="Online" value="online" />
                                <Picker.Item label="Offline" value="offline" />
                                <Picker.Item label="Online, Offline" value="both" />
                            </Picker>
                        </View>
                        <View style={styles.reqRow}>
                            <FontAwesome name='dollar' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 20 }} />
                            <TextInput
                                keyboardType='numeric'
                                placeholder='Học phí dự kiến (VNĐ/buổi)'
                                value={tuition}
                                onChangeText={setTuition}
                                style={{ ...styles.inputReq, fontSize: 16, marginLeft: -6 }} />
                        </View>
                        <View style={styles.reqRow}>
                            <Entypo name='location-pin' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16 }} />
                            <Picker mode='dropdown' style={styles.inputReq} selectedValue={province} onValueChange={setProvince}>
                                <Picker.Item label="Tỉnh thành" value="" color='grey' />
                                {provinces.map(province => <Picker.Item key={province.id} label={province.label} value={province.value} />)}
                            </Picker>
                        </View>
                        <View style={styles.reqRow}>
                            <Entypo name='phone' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16 }} />
                            <TextInput
                                keyboardType='numeric'
                                placeholder='Số điện thoại'
                                value={phone}
                                onChangeText={setPhone}
                                style={{ ...styles.inputReq, fontSize: 16 }} />
                        </View>
                        <View style={styles.reqRow}>
                            <Entypo name='home' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16 }} />
                            <TextInput
                                placeholder='Địa chỉ cụ thể'
                                value={address}
                                onChangeText={setAddress}
                                style={{ ...styles.inputReq, fontSize: 16 }} />
                        </View>
                    </View>
                    <Text style={styles.headerSize}>Mô tả chi tiết</Text>
                    <TextInput
                        style={styles.detailDescription}
                        multiline={true}
                        numberOfLines={2}
                        placeholder='Mô tả các nội dung lớp học' />
                    <Text style={styles.headerSize}>Số buổi học trong tuần</Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                    >
                        {
                            numberOfSessionsOptions.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={numberOfSessions == (i + 1)}
                                        onPress={() => setNumberOfSessions(i + 1)}
                                        borderWidth={2}
                                        buttonInnerColor={mainColor}
                                        buttonOuterColor={numberOfSessions == (i + 1) ? mainColor : 'black'}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={() => setNumberOfSessions(i + 1)}
                                        labelStyle={{ fontSize: 15 }}
                                        labelWrapStyle={{ marginRight: 15 }}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                    <Text style={styles.headerSize}>Thời gian học</Text>
                    <View style={styles.timeWeekView}>
                        <DaySelect day='monday' morning={true} afternoon={false} evening={true} />
                        <DaySelect day='tuesday' morning={false} afternoon={false} evening={true} />
                        <DaySelect day='wendnesday' morning={false} afternoon={false} evening={false} />
                        <DaySelect day='thursday' morning={true} afternoon={false} evening={false} />
                        <DaySelect day='friday' morning={true} afternoon={true} evening={true} />
                        <DaySelect day='satturday' morning={false} afternoon={true} evening={true} />
                        <DaySelect day='sunday' morning={true} afternoon={false} evening={false} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.pinBtn}>
                <Text style={{ flex: 1, fontSize: 16, marginTop: 5 }}>Đăng yêu cầu ngay</Text>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Đăng yêu cầu</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default PostFindTeacher;