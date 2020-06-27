export const mainColor = '#29dbc0';
export const placeholderColor = '#a5a4a4';
export const BASE_URI = 'http://hiringtutors.azurewebsites.net/';

export const PAGE_SIZE = 4;

export const subjectsData = [
    { id: 1, label: 'Toán', value: 'math' },
    { id: 2, label: 'Vật lý', value: 'phisics' },
    { id: 3, label: 'Hóa học', value: 'chemistry' },
    { id: 4, label: 'Văn học', value: 'literature' },
    { id: 5, label: 'Tiếng Việt', value: 'vietnamese' },
    { id: 6, label: 'Lịch sử', value: 'history' },
    { id: 7, label: 'Địa lý', value: 'geography' },
    { id: 8, label: 'Sinh học', value: 'biological' },
    { id: 9, label: 'Tiếng Anh', value: 'english' },
    { id: 10, label: 'Tiếng Nhật', value: 'japanese' },
    { id: 11, label: 'Tiếng Hàn', value: 'korean' },
    { id: 12, label: 'Tiếng Pháp', value: 'french' },
    { id: 13, label: 'Tiếng Trung', value: 'chinese' },
    { id: 14, label: 'Guitar', value: 'guitar' },
    { id: 15, label: 'Piano', value: 'piano' },
    { id: 16, label: 'Hội họa', value: 'arts' }
];

export const PROVINCES = [
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Đà Nẵng' },
];

export const DISTRICTS = [
    { id: 1, provinceId: 1, name: 'Cầu Giấy' },
    { id: 2, provinceId: 1, name: 'Hai Bà Trưng' },
    { id: 3, provinceId: 1, name: 'Ba Đình' },
    { id: 4, provinceId: 1, name: 'Hoàn Kiếm' },
    { id: 5, provinceId: 2, name: 'Liên Chiểu' },
    { id: 6, provinceId: 2, name: 'Thanh Khê' },
    { id: 7, provinceId: 2, name: 'Hải Châu' },
    { id: 8, provinceId: 2, name: 'Cầm Lệ' },
];

export const COMMUNES = [
    { id: 1, districtId: 1, name: 'Mai Dịch' },
    { id: 2, districtId: 1, name: 'Dịch Vọng' },
    { id: 3, districtId: 1, name: 'Nghĩa Tân' },
    { id: 4, districtId: 1, name: 'Trung Hòa' },
    { id: 5, districtId: 2, name: 'Quỳnh Lôi' },
    { id: 6, districtId: 2, name: 'Bạch Mai' },
    { id: 7, districtId: 2, name: 'Vĩnh Tuy' },
    { id: 8, districtId: 2, name: 'Trương Định' },
    { id: 9, districtId: 3, name: 'Giảng Võ' },
    { id: 10, districtId: 3, name: 'Kim Mã' },
    { id: 11, districtId: 3, name: 'Ngọc Hà' },
    { id: 12, districtId: 3, name: 'Phúc Xá' },
    { id: 13, districtId: 4, name: 'Đồng Xuân' },
    { id: 14, districtId: 4, name: 'Hàng Bài' },
    { id: 15, districtId: 4, name: 'Hàng Bông' },
    { id: 16, districtId: 4, name: 'Tràng Tiền' },
    { id: 17, districtId: 5, name: 'Hòa Hiệp Bắc' },
    { id: 18, districtId: 5, name: 'Hòa Hiệp Nam' },
    { id: 19, districtId: 5, name: 'Hòa Khánh Bắc' },
    { id: 20, districtId: 5, name: 'Hòa Khánh Nam' },
    { id: 21, districtId: 5, name: 'Hòa Minh' },
    { id: 22, districtId: 6, name: 'An Khê' },
    { id: 23, districtId: 6, name: 'Hòa Khê' },
    { id: 24, districtId: 6, name: 'Tam Thuận' },
    { id: 25, districtId: 6, name: 'Tân Chính' },
    { id: 26, districtId: 7, name: 'Phước Ninh' },
    { id: 27, districtId: 7, name: 'Thanh Bình' },
    { id: 28, districtId: 7, name: 'Thuận Phước' },
    { id: 29, districtId: 7, name: 'Nam Dương' },
    { id: 30, districtId: 8, name: 'Hòa An' },
    { id: 31, districtId: 8, name: 'Hòa Phát' },
    { id: 32, districtId: 8, name: 'Hòa Xuân' },
    { id: 33, districtId: 8, name: 'Khê Trung' },
];

export const themes = [
    { id: 1, label: 'Tiếng Anh giao tiếp', value: 'conversation' },
    { id: 2, label: 'Tiếng Anh ngữ pháp', value: 'grammar' },
    { id: 3, label: 'Tiếng Anh cho trẻ em', value: 'kids' },
    { id: 4, label: 'Tiếng Anh cho người đi làm', value: 'adults' },
    { id: 5, label: 'Luyên thi IELTS', value: 'ielts' },
    { id: 6, label: 'Luyên thi TOEIC', value: 'toeic' },
];

export const jobs = [
    { id: 1, label: 'Sinh viên', value: 'student' },
    { id: 2, label: 'Người đi làm', value: 'adults' },
    { id: 3, label: 'Giáo viên mầm non', value: 'kids-teacher' },
    { id: 4, label: 'Giảng viên đại học', value: 'university-teacher' },
    { id: 5, label: 'Chuyên gia', value: 'best' },
    { id: 6, label: 'Người nước ngoài', value: 'foreign' },
];

export const JOBS = [
    { id: 1, name: 'Sinh viên' },
    { id: 2, name: 'Người đi làm' },
    { id: 3, name: 'Giáo viên mầm non' },
    { id: 4, name: 'Giảng viên đại học' },
    { id: 5, name: 'Chuyên gia' },
    { id: 6, name: 'Người nước ngoài' },
];

export const STUDY_TYPE = [
    { id: 1, name: 'Online' },
    { id: 2, name: 'Offline' },
    { id: 3, name: 'Online, Offline' },
];

export const TUTOR_STATUS = [
    { id: 1, name: 'NEW' },
    { id: 2, name: 'WAIT_TO_VERIFY' },
    { id: 3, name: 'INVALID' },
    { id: 4, name: 'ACTIVE' },
    { id: 5, name: 'DISABLE' },
];

export const TIME_IN_DAY = [
    { id: 0, name: 'NONE', morning: false, afternoon: false, evening: false },
    { id: 1, name: 'ALL_DAY', morning: true, afternoon: true, evening: true },
    { id: 2, name: 'MORNING', morning: true, afternoon: false, evening: false },
    { id: 3, name: 'AFTERNOON', morning: false, afternoon: true, evening: false },
    { id: 4, name: 'NIGHT', morning: false, afternoon: false, evening: true },
    { id: 5, name: 'MOR_AFTER', morning: true, afternoon: true, evening: false },
    { id: 6, name: 'MOR_NIGHT', morning: true, afternoon: false, evening: true },
    { id: 7, name: 'AFTER_NIGHT', morning: false, afternoon: true, evening: true },
];