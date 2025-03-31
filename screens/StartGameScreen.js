import { View, Text, TextInput, StyleSheet, Alert, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/Instruction";

function StartGameScreen({ onPickNumber }) {
    // State to store the user input
    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions();

    // Function to handle text input changes
    function handleEnteredNumber(enteredText) {
        setEnteredNumber(enteredText);
    }

    // Function to reset the entered number
    function handleResetNumber() {
        setEnteredNumber('');
    }

    // Function to validate and confirm user input
    function handleConfirmedInput() {
        let confirmNumber = parseInt(enteredNumber);

        // Validate the number (should be between 1 and 99)
        if (isNaN(confirmNumber) || confirmNumber <= 0 || confirmNumber > 99) {
            Alert.alert(
                'Invalid Number!',
                'Input should be a valid number and between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: handleResetNumber }]
            );
            return; // Exit function if validation fails
        }

        // If valid, pass the number to the parent component
        onPickNumber(confirmNumber);
    }

    const marginTopDistance = height < 400 ? 30 : 100;

    return (

        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    {/* Title Component for the Screen */}
                    <Title>Number Guess</Title>

                    {/* Input Container */}
                    <Card style={styles.inputContainer}>
                        {/* <Text>Enter Your Number</Text> */}
                        <InstructionText>Enter Your Number</InstructionText>

                        {/* Numeric Input Field */}
                        <TextInput
                            style={styles.numberInput}
                            keyboardType="numeric"
                            maxLength={2} // Limit input to 2 digits
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={handleEnteredNumber}
                            value={enteredNumber}
                        />

                        {/* Buttons Container */}
                        <View style={styles.buttonsContainer}>
                            {/* Reset Button */}
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={handleResetNumber}>Reset</PrimaryButton>
                            </View>
                            {/* Confirm Button */}
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={handleConfirmedInput}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    screen: {
        flex: 1,
    },

    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight > 400 ? 30 : 100,
        alignItems: 'center',
    },
    // inputContainer: {
    //     padding: 16,
    //     marginTop: 100,
    //     marginHorizontal: 24,
    //     backgroundColor: Colors.maroon, // Background color
    //     elevation: 5,  // Shadow for Android
    //     shadowColor: 'black', // Shadow for iOS
    //     shadowOpacity: 0.5,
    //     shadowOffset: { width: 0, height: 2 },
    //     borderRadius: 8,
    //     shadowRadius: 5,
    //     justifyContent: 'center', // Center content vertically
    //     alignItems: 'center'  // Center content horizontally
    // },

    buttonsContainer: {
        flexDirection: 'row', // Arrange buttons in a row
    },
    buttonContainer: {
        flex: 1, // Each button takes equal space
    },
    numberInput: {
        height: 55,
        width: 50,
        borderBottomColor: Colors.yellow, // Bottom border color
        borderBottomWidth: 2, // Bottom border thickness
        marginVertical: 4,
        fontSize: 32, // Font size for input
        color: Colors.yellow, // Text color
        textAlign: 'center', // Align text center
        fontWeight: 'bold' // Make text bold
    },
});

export default StartGameScreen;
