import {Modal, Text, View, StatusBar, ActivityIndicator} from "react-native";
import styles from "../../Assets/Styles";



const ProgressBar = ({progress, loading}) => (
    <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {
            console.log('close modal');
        }}>
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    animating={true}
                    style={styles.progress}
                    size="large"
                    color="#00000040"
                />
                <Text style={styles.progressText}>{progress.toFixed(2)} %</Text>
            </View>
        </View>
    </Modal>
)

export default ProgressBar;
