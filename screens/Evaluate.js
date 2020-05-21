import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles/Evaluate';
import { mainColor } from '../constant/constant';
import RadioForm, { RadioButtonInput, RadioButtonLabel, RadioButton } from 'react-native-simple-radio-button';

function Evaluate(props) {
    const [title, setTitle] = useState('');
    const [advantage, setAdvantage] = useState('');
    const [defect, setDefect] = useState('');
    const [studyingMethod, setStudyingMethod] = useState(0);
    const [softSkill, setSoftSkill] = useState(0);
    const [enthusiasm, setEnthusiasm] = useState(0);
    const [onTime, setOnTime] = useState(0);
    const [pedagogic, setPedagogic] = useState(0);
    const [recommend, setRecommend] = useState(true);

    const radioOptions = [
        { label: 'Có', value: 'yes' },
        { label: 'Không', value: 'no' }
    ];

    const radioHandler = (val) => {
        if (val === 'yes') {
            setRecommend(true);
        } else {
            setRecommend(false);
        }
    }

    return (
        <ScrollView>
            <View style={styles.top}>
                <View style={styles.title}>
                    <TextInput value={title} onChangeText={setTitle} style={{ fontSize: 15 }} placeholder='Nhập tiêu đề đánh giá tại đây' />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.formView}>
                    <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>Ưu điểm</Text></View>
                    <View style={styles.form}>
                        <TextInput
                            value={advantage}
                            onChangeText={setAdvantage}
                            style={styles.textarea}
                            multiline={true}
                            numberOfLines={2}
                            placeholder='Nhập ưu điểm của giáo viên tại đây' />
                    </View>
                </View>
                <View style={styles.formView}>
                    <View style={styles.headerForm}><Text style={{ fontSize: 18, color: 'white' }}>Nhược điểm</Text></View>
                    <View style={styles.form}>
                        <TextInput
                            value={defect}
                            onChangeText={setDefect}
                            style={styles.textarea}
                            multiline={true}
                            numberOfLines={2}
                            placeholder='Nhập nhược điểm của giáo viên tại đây' />
                    </View>
                </View>
                <Text style={{ marginVertical: 10 }}>TIÊU CHÍ ĐÁNH GIÁ</Text>
                <View style={styles.criteria}>
                    <Text>Phương pháp dạy học</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Slider
                            style={{ flex: 12 }}
                            value={studyingMethod}
                            onValueChange={setStudyingMethod}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            thumbTintColor={mainColor}
                            minimumTrackTintColor={mainColor}
                        />
                        <Text style={styles.sliderNum}>{studyingMethod}</Text>
                    </View>
                    <Text>Kỹ năng mềm</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Slider
                            style={{ flex: 12 }}
                            value={softSkill}
                            onValueChange={setSoftSkill}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            thumbTintColor={mainColor}
                            minimumTrackTintColor={mainColor}
                        />
                        <Text style={styles.sliderNum}>{softSkill}</Text>
                    </View>
                    <Text>Nhiệt tình</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Slider
                            style={{ flex: 12 }}
                            value={enthusiasm}
                            onValueChange={setEnthusiasm}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            thumbTintColor={mainColor}
                            minimumTrackTintColor={mainColor}
                        />
                        <Text style={styles.sliderNum}>{enthusiasm}</Text>
                    </View>
                    <Text>Đúng giờ</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Slider
                            style={{ flex: 12 }}
                            value={onTime}
                            onValueChange={setOnTime}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            thumbTintColor={mainColor}
                            minimumTrackTintColor={mainColor}
                        />
                        <Text style={styles.sliderNum}>{onTime}</Text>
                    </View>
                    <Text>Nghiệp vụ sư phạm</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Slider
                            style={{ flex: 12 }}
                            value={pedagogic}
                            onValueChange={setPedagogic}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            thumbTintColor={mainColor}
                            minimumTrackTintColor={mainColor}
                        />
                        <Text style={styles.sliderNum}>{pedagogic}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 16, marginVertical: 10 }}>Bạn có muốn giới thiệu giáo viên này cho người khác không?</Text>
                <View style={{ alignItems: 'center', marginLeft: 30 }}>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                        style={{ marginBottom: 10 }}
                    >
                        {
                            radioOptions.map((obj, i) => (
                                <RadioButton labelHorizontal={true} key={i} >
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={obj.value === 'yes' ? recommend : !recommend}
                                        onPress={() => radioHandler(obj.value)}
                                        borderWidth={2}
                                        buttonInnerColor={mainColor}
                                        buttonOuterColor={obj.value === 'yes' ? (recommend ? mainColor : 'black') : (!recommend ? mainColor : 'black')}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        labelHorizontal={true}
                                        onPress={() => radioHandler(obj.value)}
                                        labelStyle={{ fontSize: 15 }}
                                        labelWrapStyle={{ marginRight: 30 }}
                                    />
                                </RadioButton>
                            ))
                        }
                    </RadioForm>
                </View>
                <TouchableHighlight activeOpacity={0.6} underlayColor='#2bbba5' style={styles.btn}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Gửi đánh giá</Text>
                </TouchableHighlight>
            </View>
        </ScrollView >
    );
}

export default Evaluate;