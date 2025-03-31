// Importing required components from React Native
import { View, Text, StyleSheet, Pressable } from "react-native";

// Importing custom color constants from the colors file
import Colors from "../../constants/colors";

/**
 * PrimaryButton Component
 * A reusable button component with custom styling and press effects.
 * 
 * @param {Object} props - Props passed to the component
 * @param {ReactNode} props.children - The content inside the button (e.g., text)
 * @param {Function} props.onPress - Function to be executed when the button is pressed
 */
function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.outerContainer}>

            {/* Pressable is used for handling button presses with a ripple effect */}
            <Pressable
                onPress={onPress} // Trigger the passed function when pressed
                style={({ pressed }) =>
                    pressed
                        ? [styles.pressed, styles.innerContainer] // Apply pressed style
                        : styles.innerContainer // Default button style
                }
                android_ripple={{ color: Colors.maroon }} // Ripple effect color for Android
            >
                {/* Displaying the button text passed as children */}
                <Text style={styles.text}>{children}</Text>
            </Pressable>

        </View>
    );
}

// Exporting the PrimaryButton component to be used in other files
export default PrimaryButton;

// Defining styles for the button
const styles = StyleSheet.create({

    /** 
     * Outer container to wrap the button.
     * Used to add margins and prevent content overflow.
     */
    outerContainer: {
        margin: 8, // Adds spacing around the button
        borderRadius: 28, // Rounded edges
        overflow: 'hidden', // Ensures ripple effect stays within the rounded border
    },

    /**
     * Inner container for the button appearance.
     * This controls the padding, background, and layout.
     */
    innerContainer: {
        paddingVertical: 8, // Vertical padding for better spacing
        paddingHorizontal: 16, // Horizontal padding for button width
        backgroundColor: Colors.red, // Background color from the Colors file
        elevation: 2, // Shadow effect on Android
        // alignItems: 'center',  // Uncomment to center text horizontally
        // justifyContent: 'center',  // Uncomment to center text vertically
        minWidth: 50, // Ensures a minimum button width
    },

    /**
     * Style applied when the button is pressed.
     * Reduces opacity to give a pressed effect.
     */
    pressed: {
        opacity: 0.75,
    },

    /**
     * Text style for the button label.
     * Ensures proper alignment and color contrast.
     */
    text: {
        textAlign: 'center', // Centers text inside the button
        color: 'white', // White text color for contrast
    }

});
