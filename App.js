import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import { Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import HomeTabs from './components/HomeTab';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPassword';
import RegisterScreen from './screens/Register';
import TermOfServiceScreen from './screens/TermOfService';
import PostFindTeacherScreen from './screens/PostFindTeacher';
import ThemeSelectionScreen from './screens/ThemeSelection';
import ProfileTeacherScreen from './screens/ProfileTeacher';
import EvaluateScreen from './screens/Evaluate';
import FilterScreen from './screens/Filter';
import SplashScreen from './screens/Splash';
import BecomeTeacherScreen from './screens/BecomeTeacher';
import axios from 'axios';

const Stack = createStackNavigator();
export const AuthContext = createContext();

const App = (props) => {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return { ...prevState, token: action.token, isLoading: false }
        case 'SIGN_IN':
          return { ...prevState, token: action.token, isLoading: false };
        case 'SIGN_OUT':
          return { ...prevState, token: null, isLoading: false };
        case 'LOADING':
          return { ...prevState, isLoading: true };
        case 'LOADED':
          return { ...prevState, isLoading: false };
      }
    }, { token: null, isLoading: true }
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '540113132121-gf5alse2phghflv0de2agca43mnsl5st.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('@token');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token });
    }
    fetchToken();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async token => {
        dispatch({ type: 'SIGN_IN', token });
      },
      signInWithGoogle: async () => {
        try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const userInfo = await GoogleSignin.signIn();
          dispatch({ type: 'LOADING' });
          axios.post('http://hiringtutors.azurewebsites.net/api/Auth/login', { token: userInfo.idToken })
            .then(res => {
              AsyncStorage.setItem('@token', res.data.token);
              AsyncStorage.setItem('@name', res.data.fullName);
              AsyncStorage.setItem('@avatar', res.data.avatar);
              dispatch({ type: 'SIGN_IN', token: res.data.token });
            })
            .catch(err => {
              Alert.alert('', 'Đã xảy ra lỗi');
              dispatch({ type: 'LOADED' });
            });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      },
      signOut: async () => {
        dispatch({ type: 'LOADING' });
        axios.post('http://hiringtutors.azurewebsites.net/api/Auth/logout', {}, {
          headers: {
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('@token')
          }
        })
          .then(res => {
            AsyncStorage.removeItem('@token');
            AsyncStorage.removeItem('@name');
            AsyncStorage.removeItem('@avatar');
            dispatch({ type: 'SIGN_OUT' });
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: 'LOADED' });
          });
      },
      signUp: async token => {
        dispatch({ type: 'SIGN_IN', token });
      },
    }),
    []
  );

  const getTitle = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tin tức</Text>;
    switch (routeName) {
      case 'News':
        return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tin tức cho học viên</Text>;
      case 'Message':
        return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tin nhắn</Text>;
      case 'Search':
        return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tìm kiếm gia sư</Text>;
      case 'Notification':
        return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Thông báo</Text>;
      case 'Setting':
        return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Danh mục học viên</Text>;
      default:
        return <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tin tức cho học viên</Text>;
    }
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#29dbc0' },
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerBackImage: () => <Ionicons name='ios-arrow-back' size={20} color='white' style={{ paddingHorizontal: 20 }} />,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
          {state.isLoading ?
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            : state.token === null ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                  initialParams={{ isLoading: state.isLoading }}
                />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Quên mật khẩu' }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Đăng ký' }} />
                <Stack.Screen name="TermOfService" component={TermOfServiceScreen} options={{ title: 'Điều khoản sử dụng' }} />
              </>
            ) : (
                <>
                  <Stack.Screen name="Home" component={HomeTabs} options={({ route }) => ({
                    headerTitleAllowFontScaling: true,
                    headerTitle: getTitle(route)
                  })} />
                  <Stack.Screen name="PostFindTeacher" component={PostFindTeacherScreen} options={{ title: 'Đăng yêu cầu' }} />
                  <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} options={{ title: 'Lựa chọn chủ đề' }} />
                  <Stack.Screen name="ProfileTeacher" component={ProfileTeacherScreen} options={{ title: 'Hồ sơ gia sư' }} />
                  <Stack.Screen name="Evaluate" component={EvaluateScreen} options={{ title: 'Gửi đánh giá' }} />
                  <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Bộ lọc' }} />
                  <Stack.Screen name="BecomeTeacher" component={BecomeTeacherScreen} options={{ title: 'Hồ sơ gia sư' }} />
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
