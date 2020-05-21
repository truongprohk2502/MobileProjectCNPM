import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import { Text } from 'react-native';
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

const Stack = createStackNavigator();
export const AuthContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return { ...prevState, token: action.token, isLoading: false }
        case 'SIGN_IN':
          return { ...prevState, token: action.token };
        case 'SIGN_OUT':
          return { ...prevState, token: null };
      }
    }, { token: null, isLoading: true }
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '907211104537-pk3c4rhdqielftq1qk1amngna1nm9c4a.apps.googleusercontent.com',
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
      signIn: async data => {
        const { username, password } = data;
        if (username === 'admin' && password === '123456') {
          try {
            await AsyncStorage.setItem('@token', 'dummy-auth-token');
          } catch (e) {
            console.log(e);
          }

          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        } else {
          Alert.alert('', 'Username hoặc mật khẩu không đúng');
        }
      },
      signInWithGoogle: async () => {
        try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo.user);
          await AsyncStorage.setItem('@token', userInfo.idToken);
          await AsyncStorage.setItem('@name', userInfo.user.name);
          await AsyncStorage.setItem('@photo', userInfo.user.photo);
          dispatch({ type: 'SIGN_IN', token: userInfo.idToken });
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
      signOut: () => {
        AsyncStorage.removeItem('@token');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
            <Stack.Screen name="Login" component={SplashScreen} options={{ headerShown: false }} />
            : state.token === null ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
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
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
