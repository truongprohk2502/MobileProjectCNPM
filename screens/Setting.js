import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/Setting';
import { mainColor } from '../constant/constant';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../App';
import ImagePicker from 'react-native-image-picker';

function Setting(props) {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('none');
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            setName(await AsyncStorage.getItem('@name'));
            setAvatar(await AsyncStorage.getItem('@avatar'));
        }
        fetchUser();
    }, []);

    const chooseFile = () => {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log(response);
                setAvatar({ filePath: response });
            }
        });
    };

    return (
        <View>
            <View style={styles.top}>
                {/* <Image source={{ uri: 'data:image/jpeg;base64,' + avatar.filePath?.data }} style={styles.img} /> */}
                <Image source={{ uri: avatar }} style={styles.img} />
                <TouchableWithoutFeedback onPress={chooseFile}>
                    <View style={styles.photo}>
                        <Entypo name='camera' color='white' size={16} />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{ fontSize: 16, color: 'white' }}>{name}</Text>
                <Text style={{ color: 'white' }}>Bpoint : 0</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.widgets}>
                    <TouchableWithoutFeedback>
                        <View style={styles.row}>
                            <View style={{ ...styles.icon, marginLeft: 3 }}>
                                <MaterialCommunityIcons name='notebook' color={mainColor} size={18} />
                            </View>
                            <Text style={styles.text}>Quản lý yêu cầu</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.hr}></View>
                    <TouchableWithoutFeedback>
                        <View style={styles.row}>
                            <View style={{ ...styles.icon, marginLeft: 5 }}>
                                <FontAwesome name='bitcoin' color={mainColor} size={18} />
                            </View>
                            <Text style={styles.text}>Quản lý Bpoint</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.hr}></View>
                    <TouchableWithoutFeedback>
                        <View style={styles.row}>
                            <View style={{ ...styles.icon, marginLeft: 3 }}>
                                <Entypo name='heart' color={mainColor} size={18} />
                            </View>
                            <Text style={styles.text}>Giáo viên đã lưu</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.hr}></View>
                    <TouchableWithoutFeedback>
                        <View style={styles.row}>
                            <View style={{ ...styles.icon, marginLeft: 5 }}>
                                <FontAwesome name='user' color={mainColor} size={18} />
                            </View>
                            <Text style={styles.text}>Thông tin cá nhân</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.hr}></View>
                    <TouchableWithoutFeedback>
                        <View style={styles.row}>
                            <View style={{ ...styles.icon, marginLeft: 5 }}>
                                <Ionicons name='ios-settings' color={mainColor} size={18} />
                            </View>
                            <Text style={styles.text}>Trợ giúp & cài đặt</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.hr}></View>
                    <TouchableWithoutFeedback onPress={signOut}>
                        <View style={styles.row}>
                            <View style={{ ...styles.icon, marginLeft: 3 }}>
                                <MaterialCommunityIcons name='logout' color={mainColor} size={18} />
                            </View>
                            <Text style={styles.text}>Đăng xuất</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.hr}></View>
                </View>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}
                    onPress={() => props.navigation.navigate('BecomeTeacher')} >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Trở thành gia sư</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default Setting;