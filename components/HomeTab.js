import React from 'react';
import { TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from '../screens/News';
import MessageScreen from '../screens/Message';
import SearchScreen from '../screens/Search';
import NotificationScreen from '../screens/Notification';
import SettingScreen from '../screens/Setting';
import Entypo from 'react-native-vector-icons/Entypo';
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
            <Tab.Screen name="News" component={NewsScreen} options={{
                title: 'Search Student',
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <Entypo name='newsletter' size={35} color={color} />
            }} />
            <Tab.Screen name="Message" component={MessageScreen} options={{
                title: 'Search Student',
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <Entypo name='message' size={35} color={color} />
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                title: 'Search Student',
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <FontAwesome name='search' size={35} color={color} />
            }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{
                title: 'Search Student',
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <MaterialIcons name='notifications' size={35} color={color} />
            }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{
                title: 'Search Student',
                tabBarButton: props => <TouchableHighlight activeOpacity={0.2} underlayColor='#d5d5d5' {...props} />,
                tabBarIcon: ({ color }) => <Ionicons name='ios-settings' size={35} color={color} />
            }} />
        </Tab.Navigator >
    );
}

export default HomeTab;