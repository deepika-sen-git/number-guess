import { View, Text, Image, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title.ios";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

/**
 * Component to display the game-over screen
 * @param {number} userNumber - The number picked by the user
 * @param {number} roundsNumber - The number of rounds the opponent took to guess
 * @param {function} onStartNewGame - Function to start a new game
 */
function GameOverScreen({ userNumber, roundsNumber, onStartNewGame }) {

    const { width, height } = useWindowDimensions();

    let contentInline = (
        <>
            {/* Display game-over title */}
            <Title>Game Over!</Title>
            {/* Container for displaying the success image */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/success.png')} // Game over image
                    style={styles.image}
                />
            </View>

            {/* Button to start a new game */}
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </>
    );

    if (width > 400) {
        contentInline = (
            <>
                <View style={styles.compressedView}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/images/success.png')} // Game over image
                            style={styles.image}
                        />
                    </View>

                    <View>
                        {/* Display game-over title */}
                        <Title>Game Over!</Title>
                        {/* Button to start a new game */}
                        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.screenContainer}>
            {/* Display game-over title */}
            {/* <Title>Game Over!</Title> */}
            {/* <Image source={require('../assets/images/success.png')} style={styles.image}/> // Game over image  */}
            {/* <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton> */}

            {contentInline}
            {/* Summary text displaying the result */}
            <Text style={styles.summaryText}>
                Opponent needed
                <Text style={styles.highlightText}> {roundsNumber} </Text>
                rounds to guess your number
                <Text style={styles.highlightText}> {userNumber} </Text>
            </Text>
        </View>
    );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

// Styles for the GameOverScreen component
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1, // Takes full available screen height
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding: 24, // Add padding around the container
    },

    compressedView: {
        flexDirection: 'row',
        marginTop: 12,
    },

    imageContainer: {
        // width: 300, // Set width for image container
        width: deviceWidth < 380 ? 300 : 150,
        // height: 300, // Set height for image container
        height: deviceWidth < 380 ? 300 : 150,
        // borderRadius: 150, // Circular shape
        borderRadius: deviceWidth < 380 ? 150 : 75,
        borderWidth: 3, // Border thickness
        borderColor: Colors.maroon, // Border color
        margin: 36, // Add spacing around image
        overflow: 'hidden', // Prevents image from exceeding boundaries
    },

    image: {
        maxWidth: '100%', // Ensure the image fits inside the container
        maxHeight: '100%',
    },

    summaryText: {
        fontFamily: 'open-sans', // Custom font
        fontSize: 24, // Set font size
        // marginVertical: 24, // Add vertical margin
        marginVertical: deviceWidth > 400 ? 6 : 12, // Add vertical margin
        textAlign: 'center', // Center text
    },

    highlightText: {
        color: Colors.maroon, // Highlight text color
        fontFamily: 'open-sans-bold', // Bold font
    },
});
