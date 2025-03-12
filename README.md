# Project Name

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Features Implemented](#features-implemented)
- [Technologies Used](#technologies-used)
- [Challenges Faced and Solutions](#challenges-faced-and-solutions)
- [Future Improvements](#future-improvements)

---

## Setup Instructions

### Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (Latest stable version)
- **React Native CLI**
- **Xcode** (For iOS development)
- **Android Studio** (For Android development)
- **CocoaPods** (For managing iOS dependencies)

### Steps to Set Up the Project

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/itsmechaithanya/SpaceX
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set up iOS Project (MacOS only):**
   ```sh
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro Bundler:**
   ```sh
   npx react-native start --reset-cache
   ```

5. **Run the App:**
   - For iOS:
     ```sh
     npx react-native run-ios
     ```
   - For Android:
     ```sh
     npx react-native run-android
     ```

---

## Features Implemented

- **User Authentication** (Login/Signup using Firebase or custom API)
- **State Management** (Using Redux or React Context API)
- **Real-time Data Fetching** (REST API integration)
- **Animated UI Elements** (Using GSAP or Reanimated)
- **Dark Mode Toggle** (Switch between light and dark themes)
- **Offline Mode Handling** (Local storage using AsyncStorage)
- **Push Notifications** (Firebase Cloud Messaging integration)
- **Multi-language Support** (i18n localization setup)

---

## Technologies Used

- **Frontend:** React Native, React Navigation, Redux
- **Backend (if applicable):** Node.js, Express.js, Firebase
- **Database:** MongoDB / Firestore
- **UI/UX:** Tailwind CSS, GSAP, Reanimated
- **Testing:** Jest, React Native Testing Library
- **Deployment:** Firebase Hosting, Vercel, Expo EAS

---

## Challenges Faced and Solutions

### 1. Xcode Not Finding iPhoneOS SDK
- **Problem:** Xcode was unable to locate the iPhoneOS SDK, causing iOS builds to fail.
- **Solution:**
  - Set the active developer directory:
    ```sh
    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    ```
  - Accepted the Xcode license:
    ```sh
    sudo xcodebuild -license
    ```
  - Reinstalled dependencies and cleaned cache:
    ```sh
    rm -rf node_modules ios/Pods package-lock.json
    npm install
    cd ios && pod install && cd ..
    npx react-native start --reset-cache
    ```

### 2. Android Emulator Not Starting
- **Problem:** The Android emulator was not booting up when running `npx react-native run-android`.
- **Solution:**
  - Made sure an Android Virtual Device (AVD) was configured.
  - Started the emulator manually via Android Studio before running the app.
  - Used:
    ```sh
    adb devices
    ```
    to ensure the emulator was recognized.

### 3. State Management Complexity
- **Problem:** Managing global state with Redux became overly complex.
- **Solution:**
  - Refactored state management to use React Context API for lightweight state handling where Redux was unnecessary.

---

## Future Improvements

### 1. **Better Performance Optimization**
- Implement lazy loading for images and large components.
- Optimize API calls with better caching strategies.

### 2. **PWA Support**
- Convert the app into a Progressive Web App for better accessibility across devices.

### 3. **Advanced Animations**
- Implement more complex animations using Three.js for better UI interactions.

### 4. **More Authentication Options**
- Add Google, Facebook, and Apple sign-in for easier user access.

### 5. **Enhanced Accessibility**
- Improve screen reader compatibility and add better contrast modes.

---

## Conclusion
This project showcases a well-structured React Native application with essential features. With more time, additional improvements such as performance optimizations, PWA support, and enhanced accessibility can be implemented to make the app more scalable and user-friendly.

