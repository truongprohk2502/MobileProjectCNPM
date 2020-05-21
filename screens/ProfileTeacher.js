import React from 'react';
import { View, Image, Text, TouchableHighlight, ScrollView } from 'react-native';
import { styles } from '../styles/ProfileTeacher';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainColor } from '../constant/constant';

function ProfileTeacher(props) {
    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
            <ScrollView>
                <View style={styles.top}></View>
                <View style={styles.container}>
                    <View style={styles.head}>
                        <View>
                            <Image source={require('../asset/images/ronaldo.jpg')} style={styles.img} />
                            <View style={styles.star}>
                                <AntDesign name='star' color='orange' style={{ marginRight: 5, marginTop: 3 }} />
                                <Text>0</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Cristiano Ronaldo</Text>
                        <Text>0 người đánh giá</Text>
                        <TouchableHighlight onPress={() => props.navigation.navigate('Evaluate')} activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Đánh giá</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={{ ...styles.infoCol, marginRight: 15 }}>
                            <Entypo name='book' color={mainColor} size={18} style={{ marginRight: 5 }} />
                            <Text>Bóng đá, Thể hình</Text>
                        </View>
                        <View style={styles.infoCol}>
                            <FontAwesome name='dollar' color={mainColor} size={18} style={{ marginRight: 8, marginLeft: 4 }} />
                            <Text>500,000 đ/h</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={{ ...styles.infoCol, marginRight: 15 }}>
                            <Entypo name='location-pin' color={mainColor} size={18} style={{ marginRight: 5 }} />
                            <Text>Hồ Chí Minh</Text>
                        </View>
                        <View style={styles.infoCol}>
                            <AntDesign name='database' color={mainColor} size={18} style={{ marginRight: 5 }} />
                            <Text>Online, Offline</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>THÔNG TIN</Text></View>
                        <View style={styles.infoText}>
                            <Text>Hiện đang là giảng viên đại học Bôn Ba</Text>
                            <Text>Là tiến sĩ chuyên ngành bóng đá bên Italy</Text>
                            <Text>Tốt nghiệp chuyên ngành chém gió tại Đại học Juventus</Text>
                            <Text>Có thể nhận dạy Toán, Lý, Hóa và đặc biệt là bằng tiếng Anh và tiếng Pháp</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>CHỦ ĐỀ DẠY</Text></View>
                        <View style={styles.infoText}>
                            <View style={styles.theme}><Text>Toán ôn thi đại học</Text></View>
                            <View style={styles.theme}><Text>Toán ôn thi THPT</Text></View>
                            <View style={styles.theme}><Text>Tiếng Anh giao tiếp</Text></View>
                            <View style={styles.theme}><Text>Tiếng Anh ngữ pháp</Text></View>
                            <View style={styles.theme}><Text>Luyện thi IELTS</Text></View>
                        </View>
                    </View>
                    <View style={styles.info}>
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
            <View style={styles.pinBottom}>
                <Text style={{ flex: 1, fontSize: 16, marginTop: 5 }}>Gửi lời mời dạy ngay ngay</Text>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.pinBtn}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Mời dạy</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default ProfileTeacher;