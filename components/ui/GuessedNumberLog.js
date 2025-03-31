import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

/**
 * Component to display a single guessed number along with the round number.
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.oppGuess - The guessed number by the opponent.
 * @param {number} props.roundNumber - The round number in which the guess was made.
 */
function GuessedNumberLog({ oppGuess, roundNumber }) {
    return (
        <View style={styles.listItem}>
            {/* Display round number */}
            <Text style={styles.itemText}>#{roundNumber}</Text>

            {/* Display opponent's guessed number */}
            <Text style={styles.itemText}>Opponent Guess: {oppGuess}</Text>
        </View>
    );
}

export default GuessedNumberLog;

const deviceWidth = Dimensions.get('window').width;

// Styles for the guessed number log item
const styles = StyleSheet.create({
    listItem: {
        borderWidth: 1,
        borderColor: Colors.maroon, // Border color
        backgroundColor: Colors.dullYellow, // Background color
        borderRadius: 40, // Rounded corners
        flexDirection: 'row', // Arrange text horizontally
        justifyContent: 'space-between', // Space between round number and guess
        width: '100%', // Full width of the container
        // marginVertical: 8, // Spacing between list items
        marginVertical: deviceWidth > 380 ? 4 : 8,
        padding: 13, // Padding for better UI
        elevation: 5, // Shadow effect for Android
        shadowColor: 'black', // Shadow color for iOS
        shadowOffset: { width: 0, height: 0 }, // No offset for shadow
        shadowRadius: 5, // Shadow blur radius
        shadowOpacity: 0.25, // Shadow opacity
    },
    itemText: {
        fontFamily: 'open-sans', // Custom font family
    },
});
