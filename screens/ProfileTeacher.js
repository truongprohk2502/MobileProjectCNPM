import React from 'react';
import { View, Image, Text, TouchableHighlight, ScrollView } from 'react-native';
import { styles } from '../styles/ProfileTeacher';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mainColor, BASE_URI } from '../constant/constant';
import MarqueeText from 'react-native-marquee';
import { formatMoney } from '../constant/function';

function ProfileTeacher(props) {
    const { tutorData } = props.route.params;

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

    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
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