import { Text, View, StyleSheet, Dimensions, Platform } from "react-native";
import Colors from "../../constants/colors";

function Title({ children }) {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.title}>{children}</Text>
        </View>
    );

}
export default Title;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    textContainer: {
        alignItems: 'center',
        // padding: 12,
        paddingVertical: deviceWidth > 380 ? 12 : 18,
        marginVertical: deviceWidth > 380 ? 12 : 18,
    },
    title: {
        // fontSize: 32,
        fontSize: deviceWidth > 380 ? 26 : 30,
        fontFamily: 'open-sans-bold',
        // fontWeight: 'bold',
        borderColor: 'white',
        borderWidth: 2, // we can also use Platform API for defining same properties different styled for different platforms like ios
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        // borderWidth: Platform.select({ android: 2, ios: 0 }),

        // or we can also do this thing by creating different files Title.android.js, Title.ios.js without using Platform API

        color: 'white',
        padding: 12,
        textAlign: 'center',
        maxWidth: '80%', // upto 80% 
        // alignSelf: 'center',  // Centering the text box
        // width: 300, //always 80%

    },
});