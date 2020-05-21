import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { mainColor } from '../constant/constant';

function Splash(props) {
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainColor} />
        </View>
    );
}

export default Splash;