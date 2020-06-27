import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../styles/Tutor';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { mainColor, BASE_URI, PAGE_SIZE } from '../constant/constant';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import MarqueeText from 'react-native-marquee';
import { formatMoney } from '../constant/function';

function News(props) {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadmore, setIsLoadmore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const email = await AsyncStorage.getItem('@email');
            Axios.get(`http://hiringtutors.azurewebsites.net/api/Tutor/List?pageNum=${page}&pageSize=${PAGE_SIZE}`, {
                headers: {
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
                }
            })
                .then(res => {
                    setIsLoading(false);
                    setTutors(res.data.filter(tutor => tutor.email !== email));
                    if (res.data.length < PAGE_SIZE) {
                        setIsLoadmore(false);
                    }
                })
                .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const loadMore = async () => {
        const email = await AsyncStorage.getItem('@email');
        Axios.get(`http://hiringtutors.azurewebsites.net/api/Tutor/List?pageNum=${page + 1}&pageSize=${PAGE_SIZE}`, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
            }
        })
            .then(res => {
                setPage(page + 1);
                setTutors(tutors.concat(res.data.filter(tutor => tutor.email !== email)));
                if (res.data.length < PAGE_SIZE) {
                    setIsLoadmore(false);
                }
            })
            .catch(err => console.log(err));
    }

    const getSubjectsText = (subjects) => {
        if (subjects) {
            const txt = subjects.reduce((str, item) => str + item.name + ', ', '');
            return txt.slice(0, txt.length - 2);
        }
        return 'null';
    }

    const getTutorWithId = (id) => tutors.find(tutor => tutor.id === id);

    const refreshHandler = async () => {
        setRefreshing(true);
        const email = await AsyncStorage.getItem('@email');
        console.log(email);
        Axios.get(`http://hiringtutors.azurewebsites.net/api/Tutor/List?pageNum=1&pageSize=${PAGE_SIZE}`, {
            headers: {
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
            }
        })
            .then(res => {
                setTutors(res.data.filter(tutor => tutor.email !== email));
                setRefreshing(false);
                if (res.data.length < PAGE_SIZE) {
                    setIsLoadmore(false);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <View>
            <View style={styles.top}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Search')}>
                    <View style={styles.searchLink}>
                        <Feather name='search' size={25} style={{ marginHorizontal: 20 }} />
                        <Text style={{ fontSize: 20 }}>Tìm gia sư</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('PostFindTeacher')}>
                    <View>
                        <Image source={require('../asset/images/edu.jpg')} style={styles.img} />
                        <View style={styles.imgText}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 25 }}>TÌM GIA SƯ GIỎI ?</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>Hãy để chúng tôi giúp bạn với nền tảng tìm gia sư theo công nghệ 4.0</Text>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Nhanh- Chủ động - Miễn phí</Text>
                            <View style={styles.requestBtn}><Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>ĐĂNG YÊU CẦU</Text></View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}>Gia sư nổi bật</Text>
            </View>

            {isLoading ? <ActivityIndicator size="large" color={mainColor} style={{ marginTop: 100 }} />
                : <FlatList
                    style={{ marginBottom: 300 }}
                    data={tutors}
                    keyExtractor={item => item.id + ''}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    onRefresh={refreshHandler}
                    refreshing={refreshing}
                    ListFooterComponent={() => isLoadmore ? <ActivityIndicator size="large" color={mainColor} /> : null}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ProfileTeacher', { tutorData: getTutorWithId(item.id) })}>
                            <View style={styles.teacherInfo}>
                                <View style={{ flex: 1, padding: 15 }}>
                                    <Image source={{ uri: BASE_URI + item.avatar }} style={styles.imgElem} />
                                </View>
                                <View style={styles.infoElem}>
                                    <Text style={{ color: mainColor, fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <AntDesign name='star' color='orange' style={{ marginRight: 10, marginTop: 3 }} />
                                        <Text>0</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='book' color={mainColor} style={{ marginRight: 10, marginTop: 3 }} />
                                        <MarqueeText
                                            style={styles.marquee}
                                            duration={3000}
                                            marqueeOnStart
                                            loop
                                            marqueeDelay={1000}
                                            marqueeResetDelay={1000} >{getSubjectsText(item.subjects)}</MarqueeText>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='location-pin' color={mainColor} style={{ marginRight: 10, marginTop: 3 }} />
                                        <Text>{item.address.city}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name='dollar' color={mainColor} style={{ marginRight: 12, marginTop: 3, marginLeft: 3 }} />
                                        <Text style={{ color: 'orange', fontWeight: 'bold' }}>{formatMoney(1000 * item.tuitionPerHour)} đ/h</Text>
                                    </View>
                                </View>
                                <View style={styles.widgets}>
                                    <AntDesign name='hearto' size={18} />
                                    <Ionicons name='ios-arrow-forward' size={18} style={{ marginRight: 5 }} />
                                    <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Mời dạy</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )} />
            }
        </View>
    );
}

export default News;