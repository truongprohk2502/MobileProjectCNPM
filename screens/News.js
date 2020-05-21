import React from 'react';
import { View, Text, Image, TouchableHighlight, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles/News';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { mainColor } from '../constant/constant';

function News(props) {
    return (
        <View style={{ flex: 1 }}>
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
                <Text style={{ marginTop: 25, marginBottom: 10, fontSize: 18 }}>Gia sư nổi bật</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ProfileTeacher')}>
                    <View style={styles.teacherInfo}>
                        <View style={{ flex: 1, padding: 15 }}>
                            <Image source={require('../asset/images/ronaldo.jpg')} style={styles.imgElem} />
                        </View>
                        <View style={styles.infoElem}>
                            <Text style={{ color: mainColor, fontWeight: 'bold', fontSize: 18 }}>Cristiano Ronaldo</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name='star' color='orange' style={{ marginRight: 10, marginTop: 3 }} />
                                <Text>0</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name='book' color={mainColor} style={{ marginRight: 10, marginTop: 3 }} />
                                <Text>Bóng đá, Thể hình</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name='location-pin' color={mainColor} style={{ marginRight: 10, marginTop: 3 }} />
                                <Text>Hồ Chí Minh</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome name='dollar' color={mainColor} style={{ marginRight: 12, marginTop: 3, marginLeft: 3 }} />
                                <Text style={{ color: 'orange', fontWeight: 'bold' }}>500,000 đ/h</Text>
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
            </ScrollView>
        </View>
    );
}

export default News;