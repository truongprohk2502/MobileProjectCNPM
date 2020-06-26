import { ToastAndroid } from "react-native";

export const showToastWithGravity = (msg) => ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);

export const formatMoney = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const getAddressText = (addr) => `${addr.houseNumber} ${addr.street}, ${addr.commune}, ${addr.district}, ${addr.city}`;

export const getSubjectsText = (sbjs) => sbjs && sbjs.length !== 0 ? sbjs.map(s => s.name).join(', ') : 'null';

export const getStudyTypeText = (num) => num === 1 ? 'Online' : num === 2 ? 'Offline' : num === 3 ? 'Online, Offline' : '';

export const getNewsStatus = (n) => (n === 1 || n === 2) ? 'Đang chờ duyệt' : n === 3 ? 'Không hợp lệ' : n === 4 ? 'Đã đăng'
    : n === 5 ? 'Đã bị khóa' : n === 6 ? 'Đã hoàn thành' : '';

export const getNewsStatusColor = (n) => {
    switch(n) {
        case 1:
            return 'gold';
        case 2:
            return 'gold';
        case 3:
            return 'red';
        case 4:
            return 'lime';
        case 5:
            return 'red';
        case 6:
            return 'lime';
        default:
            return 'black';
    }
}

export const getDate = (str) => {
    let arr = str.slice(0, 10).split('-');
    return arr[2] + '-' + arr[1] + '-' + arr[0];
}