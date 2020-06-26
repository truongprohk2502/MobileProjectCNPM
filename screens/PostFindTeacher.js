import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { styles } from '../styles/PostFindTeacher';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { mainColor, placeholderColor } from '../constant/constant';
import DaySelect from '../components/DaySelect';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Splash from './Splash';
import MarqueeText from 'react-native-marquee';
import { showToastWithGravity, getAddressText } from '../constant/function';
import AwesomeAlert from 'react-native-awesome-alerts';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

function PostFindTeacher(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [title, setTitle] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [timeStudy, setTimeStudy] = useState('');
    const [typeStudy, setTypeStudy] = useState('');
    const [tuition, setTuition] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({ value: '' });
    const [addressText, setAddressText] = useState('');
    const [subjectText, setSubjectText] = useState('');
    const [categoryText, setCategoryText] = useState('');
    const [content, setContent] = useState('');
    const [schedule, setSchedule] = useState({
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('@token');
            Axios.get('http://hiringtutors.azurewebsites.net/api/User/GetUserInfo', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {
                    setAddress(res.data.addressView);
                    if (res.data.addressView !== null) {
                        setAddressText(getAddressText(res.data.addressView));
                    }
                    setPhone(res.data.phoneNumber);
                    Axios.post('http://hiringtutors.azurewebsites.net/api/Common/GetSubjects', {}, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                        .then(sbjRes => {
                            let subjectsArr = [];
                            let categoriesArr = [];
                            sbjRes.data.forEach(s => {
                                s.subjects.forEach(c => {
                                    categoriesArr.push({ ...c, subjectId: s.categoryView.id, select: false });
                                });
                                subjectsArr.push({ ...s.categoryView, select: false });
                            });
                            setSubjects(subjectsArr);
                            setCategories(categoriesArr);
                            setIsLoading(false);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            setIsLoading(false);
        }
        const fetchData = async () => {
            const { data } = props.route.params;
            setUpdate(true);
            setAddress(data.addressView);
            setAddressText(getAddressText(data.addressView));
            setPhone(data.inforNewsView.phoneNumber);
            setTimeStudy(data.inforNewsView.amountOfTeachingTimePerLesson + '');
            setTypeStudy(data.inforNewsView.teachingType + '');
            setTitle(data.inforNewsView.title);
            setContent(data.inforNewsView.content);
            setTuition(1000 * data.inforNewsView.tuitionPerHour + '');
            setSchedule(data.scheduleView);
            Axios.post('http://hiringtutors.azurewebsites.net/api/Common/GetSubjects', {}, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    let subjectsArr = [];
                    let categoriesArr = [];
                    res.data.forEach(s => {
                        s.subjects.forEach(c => {
                            categoriesArr.push({ ...c, subjectId: s.categoryView.id, select: false });
                        });
                        subjectsArr.push({ ...s.categoryView, select: false });
                    });
                    if (data.subjectViews && data.subjectViews.length !== 0) {
                        let str = '';
                        data.subjectViews.forEach(s => {
                            str += s.name + ', ';
                            const category = categoriesArr.find(c => c.id === s.id);
                            if (category) {
                                category.select = true;
                            }
                            const subject = subjectsArr.find(s2 => s2.id === category.subjectId);
                            if (subject) {
                                subject.select = true
                            }
                        });
                        str = str.slice(0, str.length - 2);
                        setCategoryText(str);
                    }
                    setSubjects(subjectsArr);
                    setCategories(categoriesArr);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }
        if (props.route.params?.data) {
            fetchData();
        } else {
            fetchUserInfo();
        }
    }, []);

    useEffect(() => {
        let str = '';
        subjects.forEach(s => {
            if (s.select) {
                str = str + s.name + ', ';
            }
        });
        str = str.slice(0, str.length - 2);
        setSubjectText(str);
    }, [subjects]);

    const updateSubjects = (subs) => {
        const temp = [...categories];
        temp.forEach(c => {
            c.select = false;
        });
        let str = subs.reduce((str, item) => item.select ? str + item.name + ', ' : str, '');
        str = str.slice(0, str.length - 2);
        setCategories(temp);
        setCategoryText('');
        setSubjects(subs);
        setSubjectText(str);
    }

    const updateCategories = (cattArr) => {
        let arr = [];
        subjects.filter(s => !s.select).map(s => arr = arr.concat(categories.filter(c => c.subjectId === s.id)));
        cattArr.forEach(c => arr = arr.concat(c.categories));
        let str = '';
        categories.forEach(c => {
            if (c.select) {
                str = str + c.name + ', ';
            }
        });
        str = str.slice(0, str.length - 2);
        setCategoryText(str);
    }

    const selectCategoryHandler = () => {
        const arr = subjects.filter(s => s.select).map(s => {
            const arr = categories.filter(c => c.subjectId === s.id);
            const obj = { name: s.name };
            obj.categories = arr;
            return obj;
        });
        if (arr.length !== 0) {
            props.navigation.navigate('ThemeSelection', { categories: arr, updateCategories });
        } else {
            setAlertMessage('Vui lòng chọn bộ môn trước');
            setShowAlert(true);
        }
    }

    const updateAddress = (addr) => {
        setAddress(addr);
        setAddressText(`${addr.houseNumber} ${addr.street}, ${addr.commune}, ${addr.district}, ${addr.city}`);
    }

    const setScheduleHandler = (day, morning, afternoon, evening) => {
        if (!morning && !afternoon && !evening) {
            const temp = { ...schedule };
            temp[day] = 0;
            setSchedule({ ...temp });
        } else if (morning && afternoon && evening) {
            const temp = { ...schedule };
            temp[day] = 1;
            setSchedule({ ...temp });
        } else if (morning && !afternoon && !evening) {
            const temp = { ...schedule };
            temp[day] = 2;
            setSchedule({ ...temp });
        } else if (!morning && afternoon && !evening) {
            const temp = { ...schedule };
            temp[day] = 3;
            setSchedule({ ...temp });
        } else if (!morning && !afternoon && evening) {
            const temp = { ...schedule };
            temp[day] = 4;
            setSchedule({ ...temp });
        } else if (morning && afternoon && !evening) {
            const temp = { ...schedule };
            temp[day] = 5;
            setSchedule({ ...temp });
        } else if (morning && !afternoon && evening) {
            const temp = { ...schedule };
            temp[day] = 6;
            setSchedule({ ...temp });
        } else if (!morning && afternoon && evening) {
            const temp = { ...schedule };
            temp[day] = 7;
            setSchedule({ ...temp });
        }
    }

    const saveHandler = async () => {
        let arrIds = [];
        categories.forEach(c => {
            if (c.select) {
                arrIds.push(c.id);
            }
        });
        if (phone.trim() === '' || typeStudy === '' || addressText === '' || arrIds.length === 0 || tuition.trim() === '' || title.trim() === '' || content.trim() === ''
            || (schedule.monday === 0 && schedule.tuesday === 0 && schedule.wednesday === 0 && schedule.thursday === 0 && schedule.friday === 0 && schedule.saturday === 0 && schedule.sunday === 0)) {
            setAlertMessage('Bạn vui lòng nhập đầy đủ thông tin');
            setShowAlert(true);
        } else {
            setIsLoading(true);
            if (props.route.params?.data) {
                const { street, commune, houseNumber, district, city } = address;
                const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = schedule;
                Axios.put('http://hiringtutors.azurewebsites.net/api/News', {
                    id: props.route.params.data.id,
                    updateInforNewsView: {
                        title,
                        content,
                        teachingType: parseInt(typeStudy),
                        tuitionPerHour: Math.round(parseInt(tuition) / 1000),
                        phoneNumber: phone,
                        amountOfTeachingTimePerLesson: parseInt(timeStudy)
                    },
                    hasUpdateInfo: true,
                    updateScheduleView: {
                        typeUpdate: 3,
                        id: props.route.params.data.scheduleView.id,
                        monday, tuesday, wednesday, thursday, friday, saturday, sunday
                    },
                    hasUpdateSchedule: true,
                    updateAddressView: {
                        id: props.route.params.data.addressView.id,
                        street, commune, houseNumber, district, city
                    },
                    hasUpdateAddress: true,
                    subjectIds: arrIds,
                    hasUpdateSubject: true
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                    }
                })
                    .then(res => {
                        showToastWithGravity('Bạn đã chỉnh sửa yêu cầu thành công');
                        props.navigation.goBack();
                        props.route.params.reloadNews();
                        setIsLoading(false);
                    })
                    .catch(err => console.log(err));
            } else {
                const { street, commune, houseNumber, district, city } = address;
                const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = schedule;
                Axios.post('http://hiringtutors.azurewebsites.net/api/News', {
                    createAddressView: { street, commune, houseNumber, district, city },
                    createScheduleView: { monday, tuesday, wednesday, thursday, friday, saturday, sunday },
                    subjectIds: arrIds,
                    inforNewsView: {
                        title, content,
                        teachingType: parseInt(typeStudy),
                        tuitionPerHour: Math.round(parseInt(tuition) / 1000),
                        phoneNumber: phone,
                        amountOfTeachingTimePerLesson: parseInt(timeStudy)
                    }
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                    }
                })
                    .then(res => {
                        showToastWithGravity('Bạn đã đăng yêu cầu thành công');
                        props.navigation.goBack();
                        setIsLoading(false);
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    return (
        isLoading ? <Splash /> :
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, elevation: -1 }}>
                    <ScrollView>
                        <View style={styles.top}>
                            <View style={styles.summary}>
                                <TextInput value={title} onChangeText={setTitle} style={{ fontSize: 15 }} placeholder='Bạn hãy viết bản tóm tắt yêu cầu tìm gia sư' />
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.headerSize}>Yêu cầu</Text>
                            <View style={styles.requestForm}>
                                <View style={styles.reqRow}>
                                    <Entypo name='book' color={mainColor} size={20} style={{ ...styles.iconReq, marginTop: -4 }} />
                                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SubjectSelection', { subjects, setSubjects: updateSubjects })}>
                                        <View style={{ flex: 8, marginLeft: 5 }}><MarqueeText
                                            style={subjectText === '' ? { ...styles.marquee, color: placeholderColor } : styles.marquee}
                                            duration={3000}
                                            marqueeOnStart
                                            loop
                                            marqueeDelay={1000}
                                            marqueeResetDelay={1000} >{subjectText === '' ? 'Môn học' : subjectText}</MarqueeText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.reqRow}>
                                    <Foundation
                                        name='clipboard-notes'
                                        color={mainColor}
                                        size={20}
                                        style={{ ...styles.iconReq, paddingLeft: 18, paddingTop: 17 }} />
                                    <TouchableWithoutFeedback onPress={selectCategoryHandler}>
                                        <View style={{ flex: 8, marginLeft: 1, marginVertical: 5 }}>
                                            <MarqueeText
                                                style={categoryText === '' ? { ...styles.marquee, color: placeholderColor } : styles.marquee}
                                                duration={3000}
                                                marqueeOnStart
                                                loop
                                                marqueeDelay={1000}
                                                marqueeResetDelay={1000} >{categoryText === '' ? 'Chủ đề' : categoryText}</MarqueeText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.reqRow}>
                                    <Foundation name='clock' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 18 }} />
                                    <Picker mode='dropdown' style={{ ...styles.inputReq, marginLeft: -4 }} selectedValue={timeStudy} onValueChange={setTimeStudy}>
                                        <Picker.Item label="Thời lượng học" value="" color={placeholderColor} />
                                        <Picker.Item label="1h" value="1" />
                                        <Picker.Item label="2h" value="2" />
                                        <Picker.Item label="3h" value="3" />
                                    </Picker>
                                </View>
                                <View style={styles.reqRow}>
                                    <AntDesign name='database' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16 }} />
                                    <Picker mode='dropdown' style={styles.inputReq} selectedValue={typeStudy} onValueChange={setTypeStudy}>
                                        <Picker.Item label="Hình thức dạy" value="" color={placeholderColor} />
                                        <Picker.Item label="Online" value="1" />
                                        <Picker.Item label="Offline" value="2" />
                                        <Picker.Item label="Online, Offline" value="3" />
                                    </Picker>
                                </View>
                                <View style={styles.reqRow}>
                                    <FontAwesome name='dollar' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 20 }} />
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder='Học phí dự kiến (VNĐ/giờ)'
                                        value={tuition}
                                        onChangeText={setTuition}
                                        style={{ ...styles.inputReq, fontSize: 16, marginLeft: -6 }} />
                                </View>
                                <View style={styles.reqRow}>
                                    <Entypo name='phone' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16 }} />
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder='Số điện thoại'
                                        value={phone}
                                        onChangeText={setPhone}
                                        style={{ ...styles.inputReq, fontSize: 16, marginLeft: -4 }} />
                                </View>
                                <View style={styles.reqRow}>
                                    <Entypo name='home' color={mainColor} size={20} style={{ ...styles.iconReq, paddingLeft: 16, marginTop: -3 }} />
                                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ChangeAddress', { addressData: address, updateAddress, type: 'News' })}>
                                        <View style={{ flex: 8, marginLeft: 3 }}>
                                            <MarqueeText
                                                style={addressText === '' ? { ...styles.marquee, color: placeholderColor } : styles.marquee}
                                                duration={3000}
                                                marqueeOnStart
                                                loop
                                                marqueeDelay={1000}
                                                marqueeResetDelay={1000} >{addressText === '' ? 'Địa chỉ cụ thể' : addressText}</MarqueeText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <Text style={styles.headerSize}>Mô tả chi tiết</Text>
                            <TextInput
                                style={styles.detailDescription}
                                multiline={true}
                                numberOfLines={2}
                                value={content}
                                onChangeText={setContent}
                                placeholder='Mô tả các nội dung lớp học' />
                            <Text style={styles.headerSize}>Thời gian học</Text>
                            <View style={styles.timeWeekView}>
                                <DaySelect day='monday' status={schedule.monday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                                <DaySelect day='tuesday' status={schedule.tuesday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                                <DaySelect day='wednesday' status={schedule.wednesday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                                <DaySelect day='thursday' status={schedule.thursday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                                <DaySelect day='friday' status={schedule.friday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                                <DaySelect day='saturday' status={schedule.saturday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                                <DaySelect day='sunday' status={schedule.sunday}
                                    setSchedule={(day, morning, afternoon, evening) => setScheduleHandler(day, morning, afternoon, evening)} />
                            </View>
                        </View>
                    </ScrollView>
                    {update && props.route.params.data.inforNewsView.status !== 5 && props.route.params.data.inforNewsView.status !== 6 &&
                        <HideWithKeyboard>
                            <View style={styles.pinBtn}>
                                <Text style={{ flex: 1, fontSize: 16, marginTop: 5 }}>{update ? 'Cập nhật ngay' : 'Đăng yêu cầu ngay'}</Text>
                                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn} onPress={saveHandler}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{update ? 'Cập nhật' : 'Đăng yêu cầu'}</Text>
                                </TouchableHighlight>
                            </View>
                        </HideWithKeyboard>}
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

export default PostFindTeacher;