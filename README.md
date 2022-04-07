# React Native Typescript Template
A React Native Typescript Template which included necessary lib and configurations for a mobile app:
- **State Management**: Redux / Redux Persist / Redux Toolkit
- **Animation**: Reanimated 2 / Moti / Lottie
- **Infrastructure**: React Native Config
- Form

## Prerequisites
- NodeJS >= 14.x
- Android Studio 2020.3.1 Patch 4
- xCode 13.0

## Project Structure
[TBD]

## Dependencies Configuration
### Icon & SplashScreen
#### react-native-bootsplash
- Dependencies
    - `$ npm install -g app-icon`
    - `ImageMagick` version `7.1.0-27-Q16-HDRI-x64-dll`
      - Remember to tick `Install lagecy tools (e.g convert)`
    - Icon file size 1024x1024
- Generates new icon
```
$ app-icon generate -i assets/icon-android.png -p android --background-icon assets/icon-android-background.png --foreground-icon assets/icon-android-foreground.png --adaptive-icons
$ app-icon generate -i assets/icon-ios.png -p ios
```
- Generates new splash screen
```
$ yarn react-native generate-bootsplash assets/splashscreen.png --background-color=FFFFFF --logo-width=200
```
#### react-native-splash-screen
- Icon & Splash generator: https://appicon.co
- Tutorial: check `react-native-splash-screen-tutor.png` in `guides` folder for setup guide
- Notes:
    - Create new `Image Set` named `launch_screen` inside `Images.xcassets` and drag and drop images into 3 blocks
    - To create `Image View`, select `View` layer then click `+` button on the top right of the xCode, find the `Image View` then drag into the `View`
    - Android: Add following to prevent the white/black splash before splashscreen
```
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:windowDisablePreview">true</item>
</style>
```
- IMPORTANT: If this plugin installed along with `rn-firebase` (notification), the iOS will crash when reopen app. To fix this, add new `View` to iOS name `LaunchScreen` then copy configuration of existing `LaunchScreen` to new one

## Data Service

