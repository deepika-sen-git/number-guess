import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

// A reusable Card component that wraps child components with a styled container
function Card({ children }) {
    return <View style={styles.inputContainer}>{children}</View>
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
        // marginTop: 100,
        marginTop: deviceWidth > 380 ? 18 : 36,
        marginHorizontal: 24,
        backgroundColor: Colors.maroon, // Background color
        elevation: 5,  // Shadow for Android
        shadowColor: 'black', // Shadow for iOS
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 8,
        shadowRadius: 5,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center'  // Center content horizontally
    },
});
