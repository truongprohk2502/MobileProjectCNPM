import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableWithoutFeedback, Text } from 'react-native';
import { styles } from '../styles/ManageNews';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MarqueeText from 'react-native-marquee';
import { mainColor } from '../constant/constant';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Splash from './Splash';
import { formatMoney, getAddressText, getSubjectsText, getNewsStatus, getNewsStatusColor } from '../constant/function';

function ManageRequest(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [newsArr, setNewsArr] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            Axios.get(`http://hiringtutors.azurewebsites.net/api/News/GetNewsesByUser`, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    setIsLoading(false);
                    setNewsArr(res.data);
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, [reload]);

    const reloadNews = () => setReload(!reload);

    return (
        isLoading ? <Splash /> :
            <View style={styles.container}>
                <FlatList
                    data={newsArr}
                    keyExtractor={item => item.id + ''}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('PostFindTeacher', { data: item, reloadNews })}>
                            <View style={styles.newsInfo}>
                                <View style={styles.info}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='book' color={mainColor} style={styles.icon} />
                                        <MarqueeText
                                            style={styles.marquee}
                                            duration={3000}
                                            marqueeOnStart
                                            loop
                                            marqueeDelay={1000}
                                            marqueeResetDelay={1000} >{item.inforNewsView.title}</MarqueeText>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='location-pin' color={mainColor} style={styles.icon} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'grey', fontWeight: 'bold' }}>Trạng thái: </Text>
                                            <Text style={{ color: getNewsStatusColor(item.inforNewsView.status), fontWeight: 'bold' }}>{getNewsStatus(item.inforNewsView.status)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='location-pin' color={mainColor} style={styles.icon} />
                                        <MarqueeText
                                            style={{ ...styles.marquee, fontSize: 14 }}
                                            duration={3000}
                                            marqueeOnStart
                                            loop
                                            marqueeDelay={1000}
                                            marqueeResetDelay={1000} >{getAddressText(item.addressView)}</MarqueeText>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='open-book' color={mainColor} style={styles.icon} />
                                        <MarqueeText
                                            style={{ ...styles.marquee, fontSize: 14 }}
                                            duration={3000}
                                            marqueeOnStart
                                            loop
                                            marqueeDelay={1000}
                                            marqueeResetDelay={1000} >{getSubjectsText(item.subjectViews)}</MarqueeText>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name='dollar' color={mainColor} style={{ ...styles.icon, paddingLeft: 4 }} />
                                        <Text style={styles.price}>
                                            {(item.inforNewsView.tuitionPerHour && item.inforNewsView.amountOfTeachingTimePerLesson)
                                                ? formatMoney(1000 * item.inforNewsView.tuitionPerHour * item.inforNewsView.amountOfTeachingTimePerLesson) + ' đ/buổi'
                                                : 'null'}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <AntDesign name='form' color={mainColor} style={{ ...styles.icon, paddingLeft: 1 }} />
                                        <Text style={styles.fee}>Phí nhân lớp: {formatMoney(1000 * item.inforNewsView.admissionFee)} VNĐ</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )} />
            </View>
    );
}

export default ManageRequest;