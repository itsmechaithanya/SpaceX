// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    // Handler for the "Get Started" button
    const handleGetStarted = () => {
        navigation.navigate('MainTabs');
    };

    return (
        <ImageBackground
            source={require('../assets/planet-bg.png')} 
            // Use any space/planet image you have
            style={styles.background}
            resizeMode="cover"
        >
            {/* Top Text: "EDGE OF SPACE" */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    EDGE OF SPACE
                </Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Discover relevant and approachable science news, 
                    feature articles, photos, and more.
                </Text>
            </View>

            {/* "Get Started" button */}
            <TouchableOpacity
                onPress={handleGetStarted}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'end',
        padding: 24,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        color: 'white',
        fontSize: 16,
        width: '75%',
    },
    button: {
        backgroundColor: '#F97316',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
