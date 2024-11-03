import { StatusBar } from "expo-status-bar"; // react-native
import { useState, useEffect } from "react"; // react
import { View, ActivityIndicator } from "react-native";

// react-navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import * as Font from "expo-font"; // custom-fonts
import * as SplashScreen from "expo-splash-screen"; // splash screen

// icons
import {
  Fontisto,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";

// constants
import { Color } from "./constants/Color";

// screens - ReminderxPolicyStack
import PolicyScreen from "./screens/reminderxpolicy/PolicyScreen";
import TermOfUse from "./screens/reminderxpolicy/TermOfUse";
import PrivacyPolicyScreen from "./screens/reminderxpolicy/PrivacyPolicyScreen";

// screens - ReminderAuthStack
import AuthSelect from "./screens/reminderxauth/AuthSelect";
import AuthLogin from "./screens/reminderxauth/AuthLogin";
import AuthSignUp from "./screens/reminderxauth/AuthSignUp";
import ForgotPassword from "./screens/reminderxauth/ForgotPassword";
import ResetPassword from "./screens/reminderxauth/ResetPassword";
// import SetPassword from "./screens/reminderxauth/SetPassword";
import CreatingAccount from "./screens/reminderxauth/CreatingAccount";

// screens - ReminderFeaturesStack
import RealTimeScreen from "./screens/reminderfeatures/RealTimeScreen";
import ReminderFallDetectScreen from "./screens/reminderfeatures/ReminderFallDetectScreen";
import ReminderMedScreen from "./screens/reminderfeatures/ReminderMedScreen";

// screens - ReminderAuthenticated
import DashboardScreen from "./screens/reminderauthenticated/DashboardScreen";
import InventoryScreen from "./screens/reminderauthenticated/InventoryScreen";
import ReminderScreen from "./screens/reminderauthenticated/ReminderScreen";
import ContactScreen from "./screens/reminderauthenticated/ContactScreen";
import EventLogScreen from "./screens/reminderauthenticated/EventLogScreen";
import ProfileScreen from "./screens/reminderauthenticated/ProfileScreen";

// screen - sub profile
import Aboutus from "./screens/reminderauthenticated/subprofile/Aboutus";
import Aboutreminderx from "./screens/reminderauthenticated/subprofile/Aboutreminderx";
import HelpSupport from "./screens/reminderauthenticated/subprofile/HelpSupport";
import EditProfile from "./screens/reminderauthenticated/edit/EditProfile";

// components
import HeaderTitle from "./components/header/HeaderTitle";
import DrawerHeader from "./components/header/DrawerHeader";
import ChatbotScreen from "./components/dashboard/ChatbotScreen";

// crud - screen
import AddContact from "./screens/reminderauthenticated/add/AddContact";
import AddMedicine from "./screens/reminderauthenticated/add/AddMedicine";
import EditContact from "./screens/reminderauthenticated/edit/EditContact";
import EditInventory from "./screens/reminderauthenticated/edit/EditInventory";

// context
import AuthContextProvider from "./context/authContext";

const Stack = createNativeStackNavigator(); // stack navigator
const Drawer = createDrawerNavigator(); // drawer navigator
SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

// this fn component will only rendered once if the user install the application. privacy policy
function ReminderxPolicyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen name=" " component={PolicyScreen} />
      <Stack.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={{
          headerTintColor: "white",
          title: "Terms of Use",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerTintColor: "white",
          title: "Privacy Policy",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

// this fn component will rendered if session expires or newly user. signIn/signUp
function ReminderAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen
        name="ReminderxPolicyStack"
        component={ReminderxPolicyStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthSelect"
        component={AuthSelect}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Signin"
        component={AuthLogin}
        options={{
          headerTintColor: "white",
          title: " ",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={AuthSignUp}
        options={{
          headerTintColor: "white",
          title: " ",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTintColor: "white",
          title: "",
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTintColor: "white",
          title: "",
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          headerTintColor: "white",
          title: "",
        }}
      /> */}

      <Stack.Screen
        name="CreatingAccount"
        component={CreatingAccount}
        options={{
          headerTintColor: "white",
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// this fn component will only rendered once if the user install the application. features section
function ReminderFeaturesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen
        name="ReminderAuthStack"
        component={ReminderAuthStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RealTime"
        component={RealTimeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FallDetection"
        component={ReminderFallDetectScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicineReminder"
        component={ReminderMedScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// this fn component will show if the user is authenticated. main screen/component
function ReminderAuthenticated() {
  return (
    <Drawer.Navigator
      drawerContentStyle={{ backgroundColor: Color.bgColor }}
      drawerContent={(props) => <DrawerHeader {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Color.bgColor },
        headerTintColor: "#fff",
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: "center",
        drawerStyle: { backgroundColor: Color.bgColor },
        drawerLabelStyle: { color: "white" },
        drawerActiveBackgroundColor: Color.container,
        gestureEnabled: true,
        swipeEnabled: true,
      })}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: "Medicine Storage",
        }}
      />
      <Drawer.Screen
        name="EventSchedule"
        component={ReminderScreen}
        options={{
          title: "Medication Reminder",
        }}
      />
      <Drawer.Screen
        name="FallAlert"
        component={EventLogScreen}
        options={{
          title: "Fall Alert History",
        }}
      />

      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: "Contact Details",
        }}
      />

      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// main function
export default function App() {
  // state for font
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any other resources
        await Font.loadAsync({
          "work-sans": require("./assets/fonts/WorkSans-Bold.ttf"),
          "work-light": require("./assets/fonts/WorkSans-Light.ttf"),
          "merri-weather": require("./assets/fonts/Merriweather-Regular.ttf"),
          ...Fontisto.font,
          ...Feather.font,
          ...Entypo.font,
          ...MaterialCommunityIcons.font,
          ...MaterialIcons.font,
          ...FontAwesome6.font,
        });
      } catch (err) {
        console.warn(err);
      } finally {
        // Once everything is ready, set the state and hide the splash screen
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    // Show the splash screen or a loading spinner while fonts are loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Color.purpleColor} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AuthContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Color.bgColor },
              contentStyle: { backgroundColor: Color.bgColor },
            }}
          >
            <Stack.Screen
              name="ReminderFeaturesStack"
              component={ReminderFeaturesStack}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ReminderAuthenticated"
              component={ReminderAuthenticated}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Chatbot"
              component={ChatbotScreen}
              options={{
                title: "ReminderxAI",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="AddContact"
              component={AddContact}
              options={{
                title: "Contact Information",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="EditContact"
              component={EditContact}
              options={{
                title: "Edit Contact",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="AddMedicine"
              component={AddMedicine}
              options={{
                title: "Medicine Inventory",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="EditInventory"
              component={EditInventory}
              options={{
                title: "Edit Inventory",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                title: "Edit Profile",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="AboutUs"
              component={Aboutus}
              options={{
                title: "About Us",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="AboutReminderx"
              component={Aboutreminderx}
              options={{
                title: "About Reminderx",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="HelpnSupport"
              component={HelpSupport}
              options={{
                title: "Help & Support",
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="TermOfUse"
              component={TermOfUse}
              options={{
                headerTintColor: "white",
                title: "Terms of Use",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicyScreen}
              options={{
                headerTintColor: "white",
                title: "Privacy Policy",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </AuthContextProvider>
      </NavigationContainer>
    </>
  );
}
