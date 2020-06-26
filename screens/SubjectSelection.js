import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableWithoutFeedback, Text, TouchableHighlight } from 'react-native';
import { styles } from '../styles/SubjectSelection';
import Entypo from 'react-native-vector-icons/Entypo';
import { mainColor } from '../constant/constant';
import { showToastWithGravity } from '../constant/function';
import AwesomeAlert from 'react-native-awesome-alerts';

function SubjectSelection(props) {
    const [selectNum, setSelectNum] = useState(0);
    const [subjects, setSubjects] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const arr = props.route.params.subjects;
        const num = arr.reduce((accommulator, item) => item.select ? accommulator++ : accommulator, 0);
        setSelectNum(num);
        setSubjects(arr);
    }, []);

    const selectionHandler = (val) => {
        const temp = [...subjects];
        const subject = temp.find(s => s.name === val);
        if (!subject.select) {
            if (selectNum < 2) {
                setSelectNum(selectNum + 1);
                subject.select = true;
                setSubjects(temp);
            } else {
                setAlertMessage('Bạn không được chọn quá 2 bộ môn');
                setShowAlert(true);
            }
        } else {
            setSelectNum(selectNum - 1);
            subject.select = false;
            setSubjects(temp);
        }
    }

    const completeHandler = () => {
        props.navigation.goBack();
        props.route.params.setSubjects(subjects);
        showToastWithGravity('Chọn bộ môn thành công');
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, elevation: -1 }}>
                <ScrollView>
                    <View style={styles.top}></View>
                    <View style={styles.form}>
                        <View style={styles.title}>
                            <Entypo name='book' color={mainColor} size={20} style={{ marginRight: 10, marginTop: 2 }} />
                            <Text style={{ fontSize: 18, color: mainColor }}>Lựa chọn chủ đề môn học</Text>
                        </View>
                        <View style={styles.hr} />
                        <View style={{ paddingHorizontal: 10 }}>
                            {subjects.map(s =>
                                <TouchableWithoutFeedback key={s.id} onPress={() => selectionHandler(s.name)}>
                                    <View style={{ ...styles.selection, backgroundColor: s.select ? mainColor : '#b5b6b8' }}>
                                        <Text style={{ fontSize: 16, color: s.select ? 'white' : '#4b4b4b' }}>{s.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>)}
                        </View>
                    </View>
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

export default SubjectSelection;