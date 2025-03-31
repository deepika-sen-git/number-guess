import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/Instruction";
import Colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import GuessedNumberLog from "../components/ui/GuessedNumberLog";

/**
 * Function to generate a random number between min and max, excluding a specific number.
 * If the generated number is the same as the excluded number, the function calls itself recursively.
 * @param {number} min - The minimum boundary for random number generation.
 * @param {number} max - The maximum boundary for random number generation.
 * @param {number} exclude - The number to be excluded from the generated result.
 * @returns {number} - A randomly generated number within the specified range.
 */
function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

// Define the initial min and max boundaries for random number generation
let minBoundary = 1;
let maxBoundary = 100;

/**
 * GameScreen component where the opponent tries to guess the user's number.
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.userInput - The number picked by the user.
 * @param {Function} props.onGameOver - Callback function triggered when the game ends.
 */
function GameScreen({ userInput, onGameOver }) {
    // Generate the initial random guess
    let initialGuess = generateRandomBetween(1, 100, userInput); // Hardcoded to prevent function execution when minBoundary == maxBoundary

    const [currentGuess, setCurrentGuess] = useState(initialGuess); // Stores the current guess made by the opponent
    const [guessedNumbers, setGuessedNumbers] = useState([initialGuess]); // Stores the history of guessed numbers

    const { width, height } = useWindowDimensions();

    let content = <>
        {/* Display the current guessed number */}
        <NumberContainer>{currentGuess}</NumberContainer>

        <Card>
            {/* Instruction text */}
            <InstructionText style={styles.instructionText}>Your number is Higher or Lower than this Guess?</InstructionText>

            {/* Buttons for user to indicate whether their number is higher or lower */}
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={handleNextGuess.bind(this, 'lower')}>
                        {/* "-" Icon */}
                        <Ionicons name="remove-sharp" size={24} color='white' />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={handleNextGuess.bind(this, 'higher')}>
                        {/* "+" Icon */}
                        <Ionicons name="add-sharp" size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </Card>

    </>

    let guessedNumberArrLen = guessedNumbers.length; // Length of guessed numbers array

    // useEffect to check if the guessed number matches the user's input
    useEffect(() => {
        if (currentGuess === userInput) {
            onGameOver(guessedNumberArrLen);
        }
    }, [currentGuess, userInput, onGameOver]);

    // useEffect to reset boundaries when the component first mounts
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    /**
     * Handles the next guess based on the user's hint.
     * @param {string} direction - 'lower' or 'higher' based on the user's input.
     */
    function handleNextGuess(direction) {
        // Prevent incorrect hints from the user
        if ((direction === 'lower' && userInput > currentGuess) || (direction === 'higher' && userInput < currentGuess)) {
            Alert.alert(
                "Don't lie",
                "You know you have given the wrong direction",
                [{ text: 'Okay!', style: 'cancel' }]
            );
            return;
        }

        // Adjust boundaries based on the user's hint
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        // Generate a new guess based on updated boundaries
        let nextRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(nextRndNum);
        setGuessedNumbers(prevGuessedNumbers => [nextRndNum, ...prevGuessedNumbers]);
    }

    // if (height < 400) {
    if (width > 500) {

        content = (
            <>
                {/* <InstructionText style={styles.instructionText}>Your number is Higher or Lower than this Guess?</InstructionText> */}
                {/* Buttons for user to indicate whether their number is higher or lower */}
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={handleNextGuess.bind(this, 'lower')}>
                            {/* "-" Icon */}
                            <Ionicons name="remove-sharp" size={24} color='white' />
                        </PrimaryButton>
                    </View>

                    {/* Display the current guessed number */}
                    <NumberContainer>{currentGuess}</NumberContainer>


                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={handleNextGuess.bind(this, 'higher')}>
                            {/* "+" Icon */}
                            <Ionicons name="add-sharp" size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>


            </>
        )
    }

    return (
        <View style={styles.screen}>
            {/* Display the opponent's guess title */}
            <Title>Opponent's Guess</Title>

            {/* content */}
            {content}

            {/* Displaying guessed numbers history */}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessedNumbers}
                    renderItem={(guessedNumber) => (
                        <GuessedNumberLog
                            roundNumber={guessedNumberArrLen - guessedNumber.index}
                            oppGuess={guessedNumber.item}
                        />
                    )}
                    keyExtractor={(item) => item.toString()} // Ensuring unique keys
                />
            </View>
        </View>
    );
}

export default GameScreen;

// Styles for the GameScreen component
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    instructionText: {
        marginBottom: 5,
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
});
