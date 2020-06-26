import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles/UploadImage';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Splash from './Splash';
import RNFetchBlob from 'rn-fetch-blob'
import { BASE_URI } from '../constant/constant';
import AwesomeAlert from 'react-native-awesome-alerts';
import { showToastWithGravity } from '../constant/function';

function UploadImage(props) {
    const [avatar, setAvatar] = useState('null');
    const [certificate, setCertificate] = useState('');
    const [cmnd, setCmnd] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchAvatar = async () => {
            setAvatar(await AsyncStorage.getItem('@avatar'));
            const { images } = props.route.params;
            if (images) {
                images.forEach(img => {
                    if (img.imageType === 'Certificate') {
                        setCertificate(BASE_URI + img.imagePath);
                    } else if (img.imageType === 'IdentityCard') {
                        setCmnd(BASE_URI + img.imagePath);
                    }
                });
            }
            setIsLoading(false);
        }
        fetchAvatar();
    }, []);

    const chooseFile = async (type) => {
        const token = await AsyncStorage.getItem('@token');
        var options = {
            title: 'Tải ảnh đại diện',
            cancelButtonTitle: 'Thoát',
            takePhotoButtonTitle: 'Mở máy ảnh',
            chooseFromLibraryButtonTitle: 'Mở thư viện ảnh',
            mediaType: 'photo',
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
                setIsLoading(true);
                RNFetchBlob.fetch('POST', 'http://hiringtutors.azurewebsites.net/api/Image/uploadimage', {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'multipart/form-data',
                }, [
                    { name: 'File', filename: response.fileName, type: response.type, data: response.data },
                    { name: 'Path', data: type },
                ]).then((res) => {
                    switch (type) {
                        case 'UserAvatar':
                            const urlImage = BASE_URI + 'Resources/Images/UserAvatar/' + res.data;
                            AsyncStorage.setItem('@avatar', urlImage);
                            setAvatar(urlImage);
                            showToastWithGravity('Tải ảnh đại diện thành công');
                            break;
                        case 'Tutor\\Certificate':
                            setCertificate(BASE_URI + 'Resources/Images/Tutor/Certificate/' + res.data);
                            showToastWithGravity('Tải ảnh bằng cấp thành công');
                            break;
                        case 'Tutor\\IdentityCard':
                            setCmnd(BASE_URI + 'Resources/Images/Tutor/IdentityCard/' + res.data);
                            showToastWithGravity('Tải ảnh chứng minh nhân dân thành công');
                            break;
                        default:
                            break;
                    }
                    setIsLoading(false);
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
    };

    return (
        isLoading ? <Splash /> :
            <View style={styles.container}>
                <View style={{ elevation: -1 }}>
                    <View style={styles.topBG}></View>
                    <View style={styles.header}>
                        <Text>Thông tin hình ảnh</Text>
                        <View style={styles.progress}>
                            <View style={styles.circle}></View>
                            <View style={styles.pipe}></View>
                            <View style={styles.circle}></View>
                            <View style={styles.pipe}></View>
                            <View style={styles.circle}></View>
                        </View>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.title}>Ảnh xác thực</Text>
                        <View style={{ ...styles.row, marginTop: 0 }}>
                            <Image source={{ uri: avatar }} style={styles.img} />
                            <View style={styles.txt}>
                                <Text style={styles.link} onPress={() => chooseFile('UserAvatar')}>Ảnh đại diện</Text>
                                <Text style={styles.tip}>Để thể hiện sự chuyên nghiệp của mình với học viên và phụ huynh, bạn hãy chọn ảnh đại diện đẹp, một mình và nhìn rõ khuôn mặt.</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            {certificate === '' ? <Image source={require('../asset/images/blank.png')} style={styles.img} />
                                : <Image source={{ uri: certificate }} style={styles.img} />}
                            <View style={styles.txt}>
                                <Text style={styles.link} onPress={() => chooseFile('Tutor\\Certificate')}>Thẻ sinh viên hoặc bằng cấp</Text>
                                <Text style={styles.tip}>Thẻ sinh viên/ bằng cấp của bạn sẽ được sử dụng để chứng thực. Thông tin này sẽ được bảo mật an toàn và bạn chỉ cần cung cấp 1 lần duy nhất.</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            {cmnd === '' ? <Image source={require('../asset/images/blank.png')} style={styles.img} />
                                : <Image source={{ uri: cmnd }} style={styles.img} />}
                            <View style={styles.txt}>
                                <Text style={styles.link} onPress={() => chooseFile('Tutor\\IdentityCard')}>Chứng minh thư mặt trước</Text>
                                <Text style={styles.tip}>Chứng minh thư của bạn sẽ được sử dụng để chứng thực. Thông tin này sẽ được bảo mật an toàn và bạn chỉ cần cung cấp 1 lần duy nhất.</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setShowAlert(true)}>
                        <View style={styles.continueBtn}>
                            <Text style={styles.continueText}>Hoàn thành</Text>
                            <Ionicons name='ios-arrow-forward' style={styles.continueArrow} />
                            <Ionicons name='ios-arrow-forward' style={styles.continueArrow} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    message="Cảm ơn bạn đã cung câp thông tin. Tài khoản của bạn đang chờ được xác nhận để trở thành gia sư."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Về trang chủ"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => props.navigation.pop(2)}
                />
            </View>
    );
}

export default UploadImage;