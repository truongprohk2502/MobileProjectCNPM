import React, { useState } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/PostFindTeacher';
import { mainColor } from '../constant/constant';

function DaySelect(props) {
    const [morning, setMorning] = useState(props.morning);
    const [afternoon, setAfternoon] = useState(props.afternoon);
    const [evening, setEvening] = useState(props.evening);

    const getDayText = () => {
        switch (props.day) {
            case 'monday':
                return 'Thứ 2';
            case 'tuesday':
                return 'Thứ 3';
            case 'wendnesday':
                return 'Thứ 4';
            case 'thursday':
                return 'Thứ 5';
            case 'friday':
                return 'Thứ 6';
            case 'satturday':
                return 'Thứ 7';
            case 'sunday':
                return 'CN';
        }
    }

    return (
        <View style={styles.rowSelect}>
            <Text style={styles.dayCol}>{getDayText()}</Text>
            <View style={styles.chooseCol}>
                <TouchableNativeFeedback onPress={() => setMorning(!morning)}>
                    <View style={{ ...styles.morning, backgroundColor: morning ? mainColor : '#e4e3e3' }}>
                        <Text>Buổi sáng</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => setAfternoon(!afternoon)}>
                    <View style={{ ...styles.afternoon, backgroundColor: afternoon ? mainColor : '#e4e3e3' }}>
                        <Text>Buổi chiều</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => setEvening(!evening)}>
                    <View style={{ ...styles.evening, backgroundColor: evening ? mainColor : '#e4e3e3' }}>
                        <Text>Buổi tối</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View >
    );
}

export default DaySelect;