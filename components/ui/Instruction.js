import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function InstructionText({ children, style }) {
    return <Text style={[styles.instructionText, style]}>{children}</Text> //styles passed later will override earlier defined styles in array
}
export default InstructionText;
const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.yellow,
        fontSize: 24,
    },
});