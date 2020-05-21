import React from 'react';
import { ScrollView, TouchableWithoutFeedback, View, Image, Text, TouchableHighlight } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { mainColor } from '../constant/constant';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/Search';

function TeachersList(props) {
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: 70 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileTeacher')}>
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
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Mời dạy</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    );
}

export default TeachersList;