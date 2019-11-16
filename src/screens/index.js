import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SplashScreen from "react-native-splash-screen";

// RCTRootView cancelTouches 오류를 해결해준다고 함...
import "react-native-gesture-handler";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["`-[RCTRootView cancelTouches]`"]);

import CameraTest from "./CameraTest";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RateScreen from "./RateScreen";
import SummaryScreen from "./SummaryScreen";
import SettingsScreen from "./SettingsScreen";
import UploadScreen from "./UploadScreen";
import CameraScreen from "./CameraScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    CameraTest: CameraTest,
    Rate: RateScreen,
    Summary: SummaryScreen,
    Settings: SettingsScreen,
    Upload: UploadScreen,
    Camera: CameraScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
