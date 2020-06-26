import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from '../styles/NewsDetails';
import MarqueeText from 'react-native-marquee';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { mainColor } from '../constant/constant';
import DaySelect from '../components/DaySelect';
import { getSubjectsText, getStudyTypeText, getAddressText, formatMoney } from '../constant/function';

function NewsDetails(props) {
    const [schedule, setSchedule] = useState({
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
    });

    const { newsData } = props.route.params;

    useEffect(() => {
        if (newsData.scheduleView) {
            setSchedule(newsData.scheduleView);
        }
    }, []);

    const saveHandler = () => {

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topBG}></View>
                <View style={styles.title}>
                    <MarqueeText
                        style={styles.marqueeTitle}
                        duration={3000}
                        marqueeOnStart
                        loop
                        marqueeDelay={1000}
                        marqueeResetDelay={1000} >{newsData.inforNewsView.title}</MarqueeText>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={styles.form}>
                        <View style={styles.row}>
                            <FontAwesome5 name='artstation' style={styles.icon} />
                            <Text style={styles.name}>Trạng thái: Đang tìm giáo viên</Text>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.row}>
                            <Entypo name='book' style={styles.icon} />
                            <Text style={styles.name}>Môn học: {getSubjectsText(newsData.subjectViews)}</Text>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.row}>
                            <AntDesign name='database' style={styles.icon} />
                            <Text style={styles.name}>Hình thức học: {getStudyTypeText(newsData.inforNewsView.teachingType)}</Text>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.row}>
                            <Entypo name='home' style={styles.icon} />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16 }}>Địa chỉ: </Text>
                                <MarqueeText
                                    style={styles.marqueeAddress}
                                    duration={3000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={1000}
                                    marqueeResetDelay={1000} >{getAddressText(newsData.addressView)}</MarqueeText>
                            </View>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.row}>
                            <Foundation name='clock' style={styles.icon} />
                            <Text style={styles.name}>Thời gian học: {newsData.inforNewsView.amountOfTeachingTimePerLesson}h/buổi</Text>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.row}>
                            <FontAwesome name='dollar' style={styles.icon} />
                            <Text style={{ ...styles.name, color: 'orange', fontWeight: 'bold' }}>Học phí: {formatMoney(1000 * newsData.inforNewsView.amountOfTeachingTimePerLesson * newsData.inforNewsView.tuitionPerHour)} đ/buổi</Text>
                        </View>
                        <View style={styles.hr}></View>
                        <View style={styles.row}>
                            <AntDesign name='form' style={styles.icon} />
                            <Text style={{ ...styles.name, color: mainColor, fontWeight: 'bold' }}>Phí nhận lớp: {formatMoney(1000 * newsData.inforNewsView.admissionFee)} VNĐ</Text>
                        </View>
                    </View>
                    <Text style={styles.headerText}>Chi tiết nội dung yêu cầu</Text>
                    <View style={{ ...styles.form, marginTop: 0 }}><Text style={styles.content}>{newsData.inforNewsView.content}</Text></View>
                    <Text style={styles.headerText}>Các buổi có thể học</Text>
                    <View style={styles.timeWeekView}>
                        <DaySelect day='monday' status={schedule.monday} />
                        <DaySelect day='tuesday' status={schedule.tuesday} />
                        <DaySelect day='wednesday' status={schedule.wednesday} />
                        <DaySelect day='thursday' status={schedule.thursday} />
                        <DaySelect day='friday' status={schedule.friday} />
                        <DaySelect day='saturday' status={schedule.saturday} />
                        <DaySelect day='sunday' status={schedule.sunday} />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.pinBtn}>
                <Text style={{ flex: 1, fontSize: 14, marginTop: 5 }}>Hiện có {newsData.inforNewsView.tutorCandicateIds.length} gia sư đã gửi đề nghị dạy</Text>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn} onPress={saveHandler}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Đề nghị dạy</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default NewsDetails;