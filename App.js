import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameOverScreen from './screens/GameOverScreen';

// Importing custom screens
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

// Importing custom color constants
import Colors from './constants/colors';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {

  // State to store the number picked by the user
  const [userNumber, setUserNumber] = useState();

  // State to track if the game is over (Initially true, as the game hasn't started)
  const [gameIsOver, setGameIsOver] = useState(true);

  // State to count the number of rounds taken to guess
  const [guessedRounds, setGuessedRounds] = useState(0);

  // Loading custom fonts
  const [isFontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // If fonts are still loading, show the AppLoading screen
  if (!isFontLoaded) {
    return <AppLoading />;
  }

  /**
   * Function to handle the picked number from StartGameScreen
   * @param {number} pickedNumber - The number chosen by the user
   */
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber); // Update the state with the selected number
    setGameIsOver(false); // Set the game to be active
  }

  /**
   * Function to handle when the game is over
   * @param {number} numberOfRounds - Number of rounds taken to guess
   */
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true); // Mark the game as over
    setGuessedRounds(numberOfRounds); // Update the number of rounds
  }

  /**
   * Function to reset the game and start a new one
   */
  function handleStartNewGame() {
    setUserNumber(null); // Reset the user's chosen number
    setGuessedRounds(0); // Reset the round count
  }

  // Variable to determine which screen should be displayed initially
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // If the user has selected a number, show the GameScreen instead
  if (userNumber) {
    screen = <GameScreen userInput={userNumber} onGameOver={gameOverHandler} />;
  }

  // If the game is over and a number was picked, show the GameOverScreen
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen
      userNumber={userNumber}
      roundsNumber={guessedRounds}
      onStartNewGame={handleStartNewGame}
    />;
  }

  return (
    // Applying a gradient background to the entire app
    <LinearGradient colors={[Colors.red, Colors.dullYellow]} style={styles.rootScreen}>

      {/* Applying a background image with opacity styling */}
      <ImageBackground
        source={require('./assets/images/background.png')} // Setting background image
        resizeMode='cover' // Ensuring the image covers the entire screen
        style={styles.rootScreen} // Applying styles to cover full screen
        imageStyle={styles.backgroundImage} // Applying custom opacity style
      >

        {/* Using SafeAreaView to ensure content is properly displayed within safe screen areas */}
        <SafeAreaView style={styles.rootScreen}>
          {screen}
          {/* Rendering the appropriate screen based on game state */}
        </SafeAreaView>

      </ImageBackground>
    </LinearGradient>
  );
}

// Defining styles for the components
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // Ensures the screen takes up the full available space
  },
  backgroundImage: {
    opacity: 0.15, // Adjusting opacity for the background image
  }
});
