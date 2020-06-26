import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { styles } from '../styles/ThemeSelection';
import { mainColor } from '../constant/constant';
import Entypo from 'react-native-vector-icons/Entypo';
import { showToastWithGravity } from '../constant/function';
import AwesomeAlert from 'react-native-awesome-alerts';

function ThemeSelection(props) {
    const [categories, setCategories] = useState([]);
    const [selectedNum, setSelectedNum] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const arr = props.route.params.categories;
        let tempArr = [];
        arr.forEach(c => tempArr = tempArr.concat(c.categories));
        setSelectedNum(tempArr.reduce((accommulator, item) => item.select ? accommulator + 1 : accommulator, 0));
        setCategories(arr);
    }, []);

    const selectionHandler = (id, subject) => {
        const temp = [...categories];
        const category = temp.find(c => c.name === subject).categories.find(c => c.id === id);
        if (!category.select) {
            if (selectedNum < 4) {
                setSelectedNum(selectedNum + 1);
                category.select = true;
                setCategories(temp);
            } else {
                setAlertMessage('Bạn không được chọn quá 4 chủ đề');
                setShowAlert(true);
            }
        } else {
            setSelectedNum(selectedNum - 1);
            category.select = false;
            setCategories(temp);
        }
    }

    const completeHandler = () => {
        props.route.params.updateCategories(categories);
        props.navigation.goBack();
        showToastWithGravity('Chọn chủ đề thành công');
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, elevation: -1 }}>
                <ScrollView>
                    <View style={styles.top}></View>
                    {categories.map((c, i) =>
                        <View key={i} style={styles.form}>
                            <View style={styles.title}>
                                <Entypo name='book' color={mainColor} size={20} style={{ marginRight: 10, marginTop: 2 }} />
                                <Text style={{ fontSize: 18, color: mainColor }}>{c.name}</Text>
                            </View>
                            <View style={styles.hr} />
                            <View style={{ paddingHorizontal: 10 }}>
                                {c.categories.map(cat =>
                                    <TouchableWithoutFeedback key={cat.id} onPress={() => selectionHandler(cat.id, c.name)}>
                                        <View style={{ ...styles.selection, backgroundColor: cat.select ? mainColor : '#b5b6b8' }}>
                                            <Text style={{ fontSize: 16, color: cat.select ? 'white' : '#4b4b4b' }}>{cat.name}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>)}
                            </View>
                        </View>)}
                </ScrollView>
                <View style={styles.pinBtn}>
                    <Text style={{ flex: 1, fontSize: 16, marginTop: 5 }}>Hoàn thành lựa chọn</Text>
                    <TouchableHighlight onPress={completeHandler} activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Xong</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <AwesomeAlert
                show={showAlert}
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelText="Đã hiểu"
                cancelButtonColor="#DD6B55"
                onCancelPressed={() => setShowAlert(false)}
                onDismiss={() => setShowAlert(false)}
            />
        </View>
    );
}

export default ThemeSelection;