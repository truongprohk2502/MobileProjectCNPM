import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from '../styles/TermOfService';

function TermOfService(props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerTitle}>Quy định sử dụng ứng dụng Blacasa</Text>
            <Image source={require('../asset/images/term.jpg')} style={styles.image} />
            <Text style={styles.title}>QUY ĐỊNH & CHÍNH SÁCH BẢO MẬT</Text>
            <Text style={styles.content}>Blacasa là mạng xã hội thuộc quyền sở hữu của Công ty Cổ Phần Blacasa Việt Nam. Hệ thống bao gồm website và ứng dụng di dộng phục vụ việc kết nối, chia sẻ các thông tin về giáo dục và các hoạt động liên quan đến giáo dục. Thoả thuận cung cấp và sử dụng dịch vụ mạng xã hội này (hay còn gọi là “Thỏa Thuận”) quy định và kiểm soát chính sách truy cập và sử dụng các nội dung, dịch vụ, trang web, ứng dụng của Mạng xã hội Blacasa (hay còn gọi chung là “Dịch Vụ”) giữa Công ty Cổ Phần Blacasa Việt Nam (sau đây gọi chung là “Công Ty”), và người sử dụng Dịch Vụ thông qua việc thành viên và người sử dụng Dịch Vụ đồng ý với các điều kiện và quy định tại các điều khoản dưới đây. Người sử dụng Dịch Vụ cần kiểm tra lại Thỏa Thuận này trong suốt quá trình sử dụng Dịch Vụ bởi vì Công ty Cổ Phần Blacasa Việt Nam có quyền cập nhật, chỉnh sửa nội dung các điều khoản khi cần thiết mà không cần báo trước.</Text>
            <Text style={styles.title}>MỤC 1 – CÁC QUY ĐỊNH CHUNG</Text>
            <Text style={styles.sTitle}>Điều 1: Nội dung Dịch Vụ</Text>
            <View style={styles.element}>
                <Text style={styles.count}>1. </Text>
                <Text style={styles.elemContent}>Công Ty cung cấp cho người sử dụng Dịch Vụ thông tin về các chủ đề liên quan đến giáo dục trên Mạng xã hội Blacasa.</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.count}>2. </Text>
                <Text style={styles.elemContent}>Công Ty cung cấp dịch vụ cho phép người sử dụng có thể trao đổi các thông tin về giáo dục thông qua các công cụ như trang web, ứng dụng di động, công cụ chat bao gồm chat bằng kí tự, hình ảnh.</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.count}>3. </Text>
                <Text style={styles.elemContent}>Công Ty cho phép người sử dụng truy cập và sử dụng sản phẩm trên website hoặc/và trên các ứng dụng di động.</Text>
            </View>
            <Text style={styles.sTitle}>Điều 2: Điều khoản sử dụng</Text>
            <View style={styles.element}>
                <Text style={styles.count}>1. </Text>
                <Text style={styles.elemContent}>Để truy cập và sử dụng Dịch Vụ, người sử dụng phải đồng ý và tuân theo các điều khoản được quy định tại Thỏa Thuận này và quy định, quy chế mà Công Ty liên kết và tích hợp.</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.count}>2. </Text>
                <Text style={styles.elemContent}>Khi truy cập, sử dụng Mạng xã hội Blacasa bằng bất cứ phương tiện nào (máy tính, điện thoại, tivi, thiết bị kết nối internet) hoặc sử dụng ứng dụng di động Blacasa thì người sử dụng cũng phải tuân theo Thỏa Thuận này.</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.count}>3. </Text>
                <Text style={styles.elemContent}>Để đáp ứng nhu cầu sử dụng của người sử dụng, Công Ty không ngừng hoàn thiện và phát triển, vì vậy các điều khoản quy định tại thỏa thuận cung cấp và sử dụng dịch vụ của Mạng xã hội Blacasa có thể được cập nhật, chỉnh sửa bất cứ lúc nào mà không cần phải thông báo trước tới người sử dụng. Công Ty sẽ công bố rõ trên website, diễn đàn về những thay đổi, bổ sung đó.</Text>
            </View>
            <Text style={styles.title}>MỤC 2 – QUYỀN VÀ TRÁCH NHIỆM CÁC BÊN</Text>
            <Text style={styles.sTitle}>Điều 3: Quyền của người sử dụng Mạng xã hội Blacasa</Text>
            <View style={styles.element}>
                <Text style={styles.count}>1. </Text>
                <Text style={styles.elemContent}>Quyền được tự do tạo lập tài khoản tại Mạng xã hội Blacasa để chia sẻ trao đổi thông tin về lĩnh vực giáo dục, cũng như đăng tải những thông tin liên quan về giáo dục và các khóa đào tạo lên Mạng xã hội Blacasa để cùng nhau trao đổi, bình luận.</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.count}>2. </Text>
                <Text style={styles.elemContent}>Quyền được tự do khai thác thông tin, tự do trao đổi, bình luận miễn phí về các nội dung Mạng xã hội Blacasa cung cấp trong phạm vi nội dung quy định tại Thỏa Thuận này.</Text>
            </View>
            <Text style={styles.sTitle}>Điều 4: Trách nhiệm của người sử dụng Mạng xã hội Blacasa</Text>
            <View style={styles.element}>
                <Text style={styles.count}>1. </Text>
                <Text style={styles.elemContent}>Đăng ký đầy đủ các thông tin trung thực, chính xác. Nếu có sự thay đổi, bổ sung về thông tin, người sử dụng phải cập nhật ngay vào hệ thống. Người sử dụng đảm bảo rằng, thông tin hiện trạng là mới nhất, đầy đủ, trung thực và chính xác và người sử dụng phải chịu trách nhiệm toàn bộ các thông tin do mình cung cấp.</Text>
            </View>
            <View style={styles.element}>
                <Text style={styles.count}>2. </Text>
                <Text style={styles.elemContent}>Người sử dụng đồng ý sẽ thông báo ngay cho Công Ty về bất kỳ trường hợp nào sử dụng trái phép tài khoản và mật khẩu của bạn hoặc bất kỳ các hành động phá vỡ hệ thống bảo mật nào. Người sử dụng cũng bảo đảm rằng, bạn luôn thoát tài khoản của mình sau mỗi lần sử dụng.</Text>
            </View>
        </ScrollView>
    );
}

export default TermOfService;