import React from 'react';
import { View } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

function TeachersMap(props) {
    const clickHandler = () => {
        props.setShowProfile(true);
    }

    return (
        <View>
            <Text>Map</Text>
        </View>
        // <MapView
        //     provider={PROVIDER_GOOGLE}
        //     style={{ height: '100%' }}
        //     initialRegion={{
        //         latitude: 16.031944,
        //         longitude: 108.220556,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421,
        //     }}>
        //     <Marker coordinate={{ latitude: 16.0686215, longitude: 108.2173484 }} onPress={clickHandler} />
        // </MapView>
    );
}

export default TeachersMap;