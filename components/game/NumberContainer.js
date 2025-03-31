import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";


/**
 * A reusable component to display a number inside a styled container.
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The number to be displayed inside the container.
 */
function NumberContainer({ children }) {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
}
export default NumberContainer;

const deviceWidth = Dimensions.get('window').width; // we are using Dimension API to get the width of the window and dynamically calculating and setting other values based on it.

const styles = StyleSheet.create({
    numberContainer: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.yellow,
        // padding: 24, //padding: deviceWidth/10, or
        padding: deviceWidth > 400 ? 12 : 6,
        margin: deviceWidth > 400 ? 12 : 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 32,
        fontFamily: 'open-sans-bold',
        // fontWeight: 'bold',
        color: Colors.yellow,
        textAlign: 'center',
    },
});