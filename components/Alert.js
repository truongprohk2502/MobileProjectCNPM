import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

function Alert(props) {
    const [showAlert, setShowAlert] = useState(props.showAlert);

    return (
        <AwesomeAlert
            show={showAlert}
            title="AwesomeAlert"
            message={props.msg}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="OK"
            onCancelPressed={() => setShowAlert(false)}
        />
    );
}

export default Alert;