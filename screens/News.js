import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native';
import { styles } from '../styles/News';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { mainColor, PAGE_SIZE } from '../constant/constant';
import MarqueeText from 'react-native-marquee';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { formatMoney, getDate } from '../constant/function';

function Message(props) {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadmore, setIsLoadmore] = useState(true);
    const [newsArr, setNewsArr] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            Axios.get(`http://hiringtutors.azurewebsites.net/api/News/List?pageNum=${page}&pageSize=${PAGE_SIZE}`, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    setIsLoading(false);
                    setNewsArr(res.data);
                    if (res.data.length < PAGE_SIZE) {
                        setIsLoadmore(false);
                    }
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const loadMore = async () => {
        Axios.get(`http://hiringtutors.azurewebsites.net/api/News/List?pageNum=${page + 1}&pageSize=${PAGE_SIZE}`, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
            }
        })
            .then(res => {
                setPage(page + 1);
                setNewsArr(newsArr.concat(res.data));
                if (res.data.length < PAGE_SIZE) {
                    setIsLoadmore(false);
                }
            })
            .catch(err => console.log(err));
    }

    const getNewsWithId = (id) => newsArr.find(news => news.id === id);

    const refreshHandler = async () => {
        setRefreshing(true);
        Axios.get(`http://hiringtutors.azurewebsites.net/api/News/List?pageNum=1&pageSize=${PAGE_SIZE}`, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
            }
        })
            .then(res => {
                setRefreshing(false);
                setNewsArr(res.data);
                if (res.data.length < PAGE_SIZE) {
                    setIsLoadmore(false);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <View>
                        <Image source={require('../asset/images/edu.jpg')} style={styles.img} />
                        <View style={styles.imgText}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>TÌM HỌC VIÊN ?</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>Nền tảng kết nối gia sư với hàng nghìn học viên</Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Nhanh- Chủ động - Miễn phí</Text>
                            <View style={styles.requestBtn}><Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>NHẬN LỚP NGAY</Text></View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ marginTop: 25, marginBottom: 10, fontSize: 18 }}>Lớp mới mở</Text>
            </View>
            {isLoading ? <ActivityIndicator size="large" color={mainColor} style={{ marginTop: 100 }} />
                : <FlatList
                    data={newsArr}
                    keyExtractor={item => item.id + ''}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => isLoadmore ? <ActivityIndicator size="large" color={mainColor} /> : null}
                    onRefresh={refreshHandler}
                    refreshing={refreshing}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('NewsDetails', { newsData: getNewsWithId(item.id) })}>
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
                                        <MaterialIcons name='date-range' color={mainColor} style={{ ...styles.icon, paddingLeft: 0 }} />
                                        <Text>Đăng ngày {getDate(item.inforNewsView.activedOn)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='location-pin' color={mainColor} style={styles.icon} />
                                        <Text>{item.addressView.city}</Text>
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
                                <View style={styles.widgets}>
                                    <AntDesign name='hearto' size={18} />
                                    <Ionicons name='ios-arrow-forward' size={18} style={{ marginRight: 5 }} />
                                    <Text style={{ color: 'red', marginRight: 3 }}>{item.inforNewsView.tutorNewsViews.length} đề nghị dạy</Text>
                                    <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn2}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Nhận lớp</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )} />}
        </View>
    );
}

export default Message;