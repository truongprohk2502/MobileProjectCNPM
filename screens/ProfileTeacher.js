import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableHighlight, ScrollView } from 'react-native';
import { styles } from '../styles/ProfileTeacher';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainColor, BASE_URI } from '../constant/constant';
import MarqueeText from 'react-native-marquee';
import { formatMoney, showToastWithGravity } from '../constant/function';
import Axios from 'axios';
import Splash from './Splash';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';

function ProfileTeacher(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [tutorData, setTutorData] = useState({ value: '' });
    const [newsArr, setNewsArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.route.params.id) {
                Axios.get('http://hiringtutors.azurewebsites.net/api/Tutor/GetById/' + props.route.params.id, {
                    headers: {
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                    }
                })
                    .then(res => {
                        setTutorData(res.data);
                        setIsLoading(false);
                    })
                    .catch(err => console.log(err));
            } else {
                setIsLoading(false);
                setTutorData(props.route.params.tutorData);
            }
            Axios.get(`http://hiringtutors.azurewebsites.net/api/News/GetNewsesByUser`, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    setNewsArr(res.data);
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const getSubjectsText = (subjects) => {
        if (subjects) {
            const txt = subjects.reduce((str, item) => str + item.name + ', ', '');
            return txt.slice(0, txt.length - 2);
        }
        return 'null';
    }

    const getStudyType = (type) => {
        switch (type) {
            case 1:
                return 'Online';
            case 2:
                return 'Offline';
            case 3:
                return 'Online, Offline';
            default:
                return '';
        }
    }

    const inviteHandler = async () => newsArr.length === 0 ? setShowAlert(true) : setShowModal(true);

    const createNews = () => {
        setShowAlert(false);
        props.navigation.navigate('PostFindTeacher');
    }

    const chooseNews = async (newsId) => {
        setIsLoading(true);
        Axios.put(`http://hiringtutors.azurewebsites.net/api/News/InviteCandicate`, {
            tutorId: tutorData.id,
            newsId
        }, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
            }
        })
            .then(res => {
                setIsLoading(false);
                setShowModal(false);
                showToastWithGravity('Bạn đã mời gia sư thành công');
            })
            .catch(err => {
                setIsLoading(false);
                setShowModal(false);
                showToastWithGravity('Gia sư đã được mời. Bạn không thể mời thêm lần nữa.');
            });
    }

    return (
        isLoading ? <Splash /> :
            <View style={{ flex: 1, paddingBottom: 0 }}>
                <View style={{ flex: 1, elevation: -1 }}>
                    <ScrollView>
                        <View style={styles.top}></View>
                        <View style={styles.container}>
                            <View style={styles.head}>
                                <View>
                                    <Image source={{ uri: BASE_URI + tutorData.avatar }} style={styles.img} />
                                    <View style={styles.star}>
                                        <AntDesign name='star' color='orange' style={{ marginRight: 5, marginTop: 3 }} />
                                        <Text>0</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{tutorData.name}</Text>
                                <Text>0 người đánh giá</Text>
                                <TouchableHighlight onPress={() => props.navigation.navigate('Evaluate')} activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Đánh giá</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={{ ...styles.infoCol, marginRight: 15 }}>
                                    <Entypo name='book' color={mainColor} size={18} style={{ marginRight: 5 }} />
                                    <MarqueeText
                                        style={styles.marquee}
                                        duration={3000}
                                        marqueeOnStart
                                        loop
                                        marqueeDelay={1000}
                                        marqueeResetDelay={1000} >{getSubjectsText(tutorData.subjects)}</MarqueeText>
                                </View>
                                <View style={styles.infoCol}>
                                    <FontAwesome name='dollar' color={mainColor} size={18} style={{ marginRight: 8, marginLeft: 4 }} />
                                    <Text>{formatMoney(1000 * tutorData.tuitionPerHour)} đ/h</Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View style={{ ...styles.infoCol, marginRight: 15 }}>
                                    <Entypo name='location-pin' color={mainColor} size={18} style={{ marginRight: 5 }} />
                                    <Text>{tutorData.address.city}</Text>
                                </View>
                                <View style={styles.infoCol}>
                                    <AntDesign name='database' color={mainColor} size={18} style={{ marginRight: 5 }} />
                                    <Text>{getStudyType(tutorData.teachingType)}</Text>
                                </View>
                            </View>
                            <View style={styles.info}>
                                <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>THÔNG TIN</Text></View>
                                <View style={styles.infoText}>
                                    <Text style={{ textAlign: 'justify' }}>{tutorData.introduction}</Text>
                                </View>
                            </View>
                            <View style={styles.info}>
                                <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>CHỦ ĐỀ DẠY</Text></View>
                                <View style={styles.infoText}>
                                    {tutorData.subjects && tutorData.subjects.map(s => <View key={s.id} style={styles.theme}><Text>{s.name}</Text></View>)}
                                </View>
                            </View>
                            <View style={{ ...styles.info, marginBottom: 50 }}>
                                <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>NHẬN XÉT</Text></View>
                                <View style={styles.infoText}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <MaterialCommunityIcons name='delete-empty' color={mainColor} size={18} style={{ marginRight: 5 }} />
                                        <Text>Không có nhận xét nào</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {props.route.params?.tutorData &&
                        <View style={styles.pinBottom}>
                            <Text style={{ flex: 1, fontSize: 16, marginTop: 5 }}>Gửi lời mời dạy ngay ngay</Text>
                            <TouchableHighlight onPress={inviteHandler} activeOpacity={0.6} underlayColor='#2bbba5' style={styles.pinBtn}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Mời dạy</Text>
                            </TouchableHighlight>
                        </View>}
                    <Modal
                        isVisible={showModal}
                        animationIn='zoomIn'
                        animationOut='zoomOut'
                        backdropTransitionInTiming={300}
                        backdropTransitionOutTiming={0}
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onBackdropPress={() => setShowModal(false)}>
                        <View style={styles.formNews}>
                            <Text style={styles.redTitle}>Chọn chủ đề bạn muốn mời gia sư</Text>
                            <View style={{ ...styles.hr, marginTop: 0 }}></View>
                            {newsArr.map(news => <View key={news.id}>
                                <Text key={news.id} style={styles.newsTitle} onPress={() => chooseNews(news.id)}>{news.inforNewsView.title}</Text>
                                <View style={styles.hr}></View>
                            </View>)}
                        </View>
                    </Modal>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    message='Bạn vui lòng tạo yêu cầu trước khi mời gia sư!'
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Tạo yêu cầu"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={createNews}
                    onDismiss={() => setShowAlert(false)}
                />
            </View>
    );
}

export default ProfileTeacher;