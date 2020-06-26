import React, { useState, useEffect } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/PostFindTeacher';
import { mainColor, TIME_IN_DAY } from '../constant/constant';

function DaySelect(props) {
    const [morning, setMorning] = useState(false);
    const [afternoon, setAfternoon] = useState(false);
    const [evening, setEvening] = useState(false);

    useEffect(() => {
        const day = TIME_IN_DAY.find(t => t.id === props.status);
        if (day) {
            setMorning(day.morning);
            setAfternoon(day.afternoon);
            setEvening(day.evening);
        }
    }, [props.status]);

    const pressHandler = (type) => {
        if (props.setSchedule) {
            switch (type) {
                case 'MORNING':
                    props.setSchedule(props.day, !morning, afternoon, evening);
                    break;
                case 'AFTERNOON':
                    props.setSchedule(props.day, morning, !afternoon, evening);
                    break;
                case 'EVENING':
                    props.setSchedule(props.day, morning, afternoon, !evening);
                    break;
                default:
                    break;
            }
        }
    }

    const getDayText = () => {
        switch (props.day) {
            case 'monday':
                return 'Thứ 2';
            case 'tuesday':
                return 'Thứ 3';
            case 'wednesday':
                return 'Thứ 4';
            case 'thursday':
                return 'Thứ 5';
            case 'friday':
                return 'Thứ 6';
            case 'saturday':
                return 'Thứ 7';
            case 'sunday':
                return 'CN';
        }
    }

    return (
        <View style={styles.rowSelect}>
            <Text style={styles.dayCol}>{getDayText()}</Text>
            <View style={styles.chooseCol}>
                <TouchableNativeFeedback onPress={() => pressHandler('MORNING')}>
                    <View style={{ ...styles.morning, backgroundColor: morning ? mainColor : '#e4e3e3' }}>
                        <Text>Buổi sáng</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => pressHandler('AFTERNOON')}>
                    <View style={{ ...styles.afternoon, backgroundColor: afternoon ? mainColor : '#e4e3e3' }}>
                        <Text>Buổi chiều</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => pressHandler('EVENING')}>
                    <View style={{ ...styles.evening, backgroundColor: evening ? mainColor : '#e4e3e3' }}>
                        <Text>Buổi tối</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View >
    );
}

export default DaySelect;