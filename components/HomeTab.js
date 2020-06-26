import React from 'react';
import { TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TutorScreen from '../screens/Tutor';
import NewsScreen from '../screens/News';
import SearchScreen from '../screens/Search';
import NotificationScreen from '../screens/Notification';
import SettingScreen from '../screens/Setting';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mainColor } from '../constant/constant';

const Tab = createBottomTabNavigator();

function HomeTab(props) {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: mainColor,
            inactiveTintColor: 'gray',
            showLabel: false
        }}>
            <Tab.Screen name="Tutor" component={TutorScreen} options={{
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <FontAwesome name='mortar-board' size={35} color={color} />
            }} />
            <Tab.Screen name="News" component={NewsScreen} options={{
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <FontAwesome name='universal-access' size={35} color={color} />
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <FontAwesome name='search' size={35} color={color} />
            }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <MaterialIcons name='notifications' size={35} color={color} />
            }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <Ionicons name='ios-settings' size={35} color={color} />
            }} />
        </Tab.Navigator >
    );
}

export default HomeTab;