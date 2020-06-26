import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../styles/BecomeTeacher';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mainColor, placeholderColor, JOBS, STUDY_TYPE } from '../constant/constant';
import { Picker } from '@react-native-community/picker';
import DaySelect from '../components/DaySelect';
import Axios from 'axios';
import Splash from './Splash';
import MarqueeText from 'react-native-marquee';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getAddressText } from '../constant/function';

function BecomeTeacher(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [typeStudy, setTypeStudy] = useState('');
    const [job, setJob] = useState('');
    const [addressText, setAddressText] = useState('');
    const [tuition, setTuition] = useState('');
    const [subjectText, setSubjectText] = useState('');
    const [categoryText, setCategoryText] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [certificeImages, setCertificeImages] = useState([]);
    const [address, setAddress] = useState({
        typeUpdate: 1,
        id: -1,
        houseNumber: '',
        street: '',
        commune: '',
        district: '',
        city: ''
    });
    const [schedule, setSchedule] = useState({
        typeUpdate: 2,
        id: -1,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
    });

    useEffect(() => {
        let fetchData = async () => {
            const token = await AsyncStorage.getItem('@token');
            Axios.post('http://hiringtutors.azurewebsites.net/api/Tutor', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {
                    setFullname(res.data.name);
                    setPhone(res.data.phone);
                    setEmail(res.data.email);
                    setJob(res.data.job);
                    setTypeStudy(res.data.teachingType);
                    if (res.data.address !== null) {
                        setAddress(res.data.address);
                        setAddressText(getAddressText(res.data.address));
                    }
                    setIntroduction(res.data.introduction);
                    setTuition(1000 * res.data.tuitionPerHour + '');
                    if (res.data.certificationImageViews) {
                        setCertificeImages(res.data.certificationImageViews);
                    }
                    if (res.data.scheduleView !== null) {
                        setSchedule(res.data.scheduleView);
                    }
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
                            if (res.data.subjects !== null) {
                                let str = '';
                                res.data.subjects.forEach(s => {
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
                })
                .catch(err => console.log(err));

        }
        fetchData();
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

    const updateSubjects = (subs) => {
        const temp = [...categories];

        temp.forEach(c => {
            c.select = false;
        });
        setCategories(temp);
        setCategoryText('');
        setSubjects(subs);
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
        console.log('lick');
        const arr = subjects.filter(s => s.select).map(s => {
            const arr = categories.filter(c => c.subjectId === s.id);
            const obj = { name: s.name };
            obj.categories = arr;
            return obj;
        });
        if (arr.length !== 0) {
            props.navigation.navigate('ThemeSelection', { categories: arr, updateCategories });
        } else {
            setShowAlert(true);
            setAlertMessage('Vui lòng chọn bộ môn trước');
        }
    }

    const updateAddress = (addr) => {
        setAddress(addr);
        setAddressText(`${addr.houseNumber} ${addr.street}, ${addr.commune}, ${addr.district}, ${addr.city}`);
    }

    const saveHandler = async () => {
        let arrIds = [];
        categories.forEach(c => {
            if (c.select) {
                arrIds.push(c.id);
            }
        });
        if (fullname.trim() === '' || phone.trim() === '' || job === '' || typeStudy === '' || addressText === '' || arrIds.length === 0 || tuition.trim() === '' || introduction.trim() === ''
            || (schedule.monday === 0 && schedule.tuesday === 0 && schedule.wednesday === 0 && schedule.thursday === 0 && schedule.friday === 0 && schedule.saturday === 0 && schedule.sunday === 0)) {
            setAlertMessage('Bạn vui lòng nhập đầy đủ thông tin');
            setShowAlert(true);
        } else {
            setIsLoading(true);
            Axios.put('http://hiringtutors.azurewebsites.net/api/Tutor', {
                updateInforTutorView: {
                    name: fullname,
                    phone,
                    job,
                    teachingType: typeStudy,
                    tuitionPerHour: Math.round(parseInt(tuition) / 1000),
                    introduction
                },
                hasUpdateInfo: true,
                updateScheduleView: {
                    typeUpdate: 2,
                    id: schedule.id,
                    monday: schedule.monday,
                    tuesday: schedule.tuesday,
                    wednesday: schedule.wednesday,
                    thursday: schedule.thursday,
                    friday: schedule.friday,
                    saturday: schedule.saturday,
                    sunday: schedule.sunday
                },
                hasUpdateSchedule: true,
                updateAddressView: {
                    id: address.id,
                    typeUpdate: 1,
                    street: address.street,
                    commune: address.commune,
                    houseNumber: address.houseNumber,
                    district: address.district,
                    city: address.city
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
                    setIsLoading(false);
                    props.navigation.navigate('UploadImage', { images: certificeImages });
                })
                .catch(err => console.log(err));
        }
    }

    return (
        isLoading ? <Splash /> :
            <View>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.topBG}></View>
                    <View style={styles.header}>
                        <Text>Thông tin cơ bản</Text>
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
                            <TextInput placeholder='Email' style={styles.inputText} value={email} editable={false} />
                        </View>
                        <View style={styles.input}>
                            <View style={styles.icon}>
                                <Entypo name='briefcase' color={mainColor} size={20} />
                            </View>
                            <Picker mode='dropdown' selectedValue={job} onValueChange={setJob} style={styles.picker}>
                                <Picker.Item label="Nghề nghiệp" value="" color={placeholderColor} />
                                {JOBS.map(j => <Picker.Item key={j.id} label={j.name} value={j.name} />)}
                            </Picker>
                        </View>
                        <View style={styles.input}>
                            <View style={styles.icon}>
                                <AntDesign name='database' color={mainColor} size={20} />
                            </View>
                            <Picker mode='dropdown' selectedValue={typeStudy} onValueChange={setTypeStudy} style={styles.picker}>
                                <Picker.Item label="Hình thức dạy" value="" color={placeholderColor} />
                                {STUDY_TYPE.map(s => <Picker.Item key={s.id} label={s.name} value={s.id} />)}
                            </Picker>
                        </View>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SubjectSelection', { subjects, setSubjects: updateSubjects })}>
                            <View style={styles.input}>
                                <View style={styles.iconScecial}>
                                    <Entypo name='book' color={mainColor} size={20} />
                                </View>
                                <MarqueeText
                                    style={subjectText !== '' ? styles.marqueeSpecial : { ...styles.marqueeSpecial, color: placeholderColor }}
                                    duration={3000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={1000}
                                    marqueeResetDelay={1000} >{subjectText !== '' ? subjectText : 'Môn học'}</MarqueeText>
                                <Ionicons name='ios-arrow-forward' style={styles.arrowIcon} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={selectCategoryHandler}>
                            <View style={styles.input}>
                                <View style={{ ...styles.iconSpecial, marginLeft: 4, marginRight: 12, marginTop: 3 }}>
                                    <Foundation name='clipboard-notes' color={mainColor} size={20} />
                                </View>
                                <MarqueeText
                                    style={categoryText !== '' ? styles.marqueeSpecial : { ...styles.marqueeSpecial, color: placeholderColor }}
                                    duration={3000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={1000}
                                    marqueeResetDelay={1000} >{categoryText !== '' ? categoryText : 'Chủ đề'}</MarqueeText>
                                <Ionicons name='ios-arrow-forward' style={styles.arrowIcon} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ChangeAddress', { addressData: address, updateAddress })}>
                            <View style={styles.input}>
                                <View style={{ ...styles.icon, marginTop: 3, marginRight: 4 }}>
                                    <Entypo name='home' color={mainColor} size={20} />
                                </View>
                                <MarqueeText
                                    style={addressText !== '' ? styles.marquee : { ...styles.marquee, color: placeholderColor }}
                                    duration={3000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={1000}
                                    marqueeResetDelay={1000} >{addressText !== '' ? addressText : 'Nhập địa chỉ'}</MarqueeText>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.input}>
                            <View style={styles.icon}>
                                <FontAwesome name='dollar' color={mainColor} size={20} style={{ marginLeft: 5 }} />
                            </View>
                            <TextInput placeholder='Học phí 1 giờ (VNĐ)' keyboardType='numeric' style={styles.inputText} value={tuition} onChangeText={setTuition} />
                        </View>
                        <Text style={styles.headerSize}>Giới thiệu bản thân</Text>
                        <TextInput
                            style={styles.introduction}
                            multiline={true}
                            numberOfLines={2}
                            value={introduction}
                            onChangeText={setIntroduction}
                            placeholder='Giới thiệu về bản thân (tối thiểu 100 từ)' />
                        <Text style={styles.headerSize}>Chọn thời gian dạy</Text>
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
                    <TouchableWithoutFeedback onPress={saveHandler}>
                        <View style={styles.continueBtn}>
                            <Text style={styles.continueText}>Tiếp theo</Text>
                            <Ionicons name='ios-arrow-forward' style={styles.continueArrow} />
                            <Ionicons name='ios-arrow-forward' style={styles.continueArrow} />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
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

export default BecomeTeacher;