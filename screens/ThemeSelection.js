import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from '../styles/ThemeSelection';
import { mainColor } from '../constant/constant';
import Entypo from 'react-native-vector-icons/Entypo';

function ThemeSelection(props) {
    const [themes, setThemes] = useState([
        { label: 'Tiếng Anh chuyên ngành', value: 'professional', select: false },
        { label: 'Tiếng Anh cho trẻ em', value: 'kids', select: false },
        { label: 'Luyện thi Tiếng Anh đại học', value: 'university', select: false },
        { label: 'Luyện thi IELTS', value: 'ielts', select: false },
        { label: 'Luyện thi TOEIC', value: 'toeic', select: false },
        { label: 'Tiếng Anh dịch thuật', value: 'translation', select: false },
    ]);

    useEffect(() => {
        const themesTemp = [...themes];
        props.route.params.themeSelected.forEach(theme => {
            const found = themesTemp.find(temp => temp.value === theme.value);
            found.select = true;
        });
        setThemes(themesTemp);
    }, []);

    const selectionHandler = (val) => {
        const themesTemp = [...themes];
        const theme = themesTemp.find(theme => theme.value === val);
        theme.select = !theme.select;
        setThemes(themesTemp);
    }

    const completeHandler = () => {
        props.route.params.setThemeFunc(themes.filter(theme => theme.select));
        props.navigation.goBack();
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.top}></View>
                <View style={styles.form}>
                    <View style={styles.title}>
                        <Entypo name='book' color={mainColor} size={20} style={{ marginRight: 10, marginTop: 2 }} />
                        <Text style={{ fontSize: 18, color: mainColor }}>{props.route.params.subject.label}</Text>
                    </View>
                    <View style={styles.hr} />
                    <View style={{ paddingHorizontal: 10 }}>
                        {themes.map((theme, key) =>
                            <TouchableWithoutFeedback key={key} onPress={() => selectionHandler(theme.value)}>
                                <View style={{ ...styles.selection, backgroundColor: theme.select ? mainColor : '#b5b6b8' }}>
                                    <Text style={{ fontSize: 16, color: theme.select ? 'white' : '#4b4b4b' }}>{theme.label}</Text>
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
    );
}

export default ThemeSelection;