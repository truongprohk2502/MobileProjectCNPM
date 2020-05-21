import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableHighlight, Image } from 'react-native';
import { styles } from '../styles/Search';
import TeachersList from '../components/TeachersList';
import TeachersMap from '../components/TeachersMap.js';
import { mainColor } from '../constant/constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Search(props) {
    const [showList, setShowList] = useState(true);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <View style={styles.container}>
            {showList ? <TeachersList /> : <TeachersMap setShowProfile={setShowProfile} />}
            {!showList && showProfile &&
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ProfileTeacher')}>
                    <View style={styles.profile}>
                        <View style={{ flex: 1, padding: 10 }}>
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
            }
            <View style={styles.topBtn}>
                <TouchableWithoutFeedback onPress={() => setShowList(!showList)}>
                    <View style={styles.leftBtn}>
                        <View style={styles.round}>
                            {showList ? <FontAwesome name='map-marker' color='white' size={20} style={{ marginTop: 4, marginLeft: 8 }} />
                                : <FontAwesome name='th-list' color='white' size={20} style={{ marginTop: 4, marginLeft: 2 }} />}
                        </View>
                        <Text style={{ fontSize: 18, color: 'white', marginLeft: 5, marginTop: 2 }}>
                            {showList ? 'Bản đồ' : 'Danh sách'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Filter')}>
                    <View style={styles.rightBtn}>
                        <Text style={{ fontSize: 18, color: 'white', marginRight: 5, marginTop: 2 }}>Bộ lọc</Text>
                        <View style={styles.round}>
                            <FontAwesome name='filter' color='white' size={20} style={{ marginTop: 4, marginLeft: 6 }} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View >
    );
}

export default Search;