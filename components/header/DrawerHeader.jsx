import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { useState, useEffect, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

// constant
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// component
import HeaderTitle from "./HeaderTitle";

// axios
import axios from "axios";

// context
import { useAuth } from "../../context/authContext";

export default function DrawerHeader(props) {
  // state for fetching user
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  // fetch the user from database
  const fetchUser = async () => {
    // identify who logged in
    if (user) {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/api/user/${user.email}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.log("Error fetching user info", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Re-fetch user data when drawer gains focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Set loading before fetch
      fetchUser();
    }, [user])
  );

  // get the email and password and set a fall back
  const displayEmail = userInfo ? userInfo.email : "null";
  const address = userInfo ? userInfo.address : "null";

  // loading state for user info...
  if (loading) {
    return <ActivityIndicator color={Color.purpleColor} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <HeaderTitle style={styles.text} />
      <View style={styles.user}>
        {userInfo && userInfo.image && (
          <Image
            style={styles.userIcon}
            source={{
              uri:
                userInfo.image ||
                require("../../assets/others/user-avatar.png"),
            }}
          />
        )}
        <Text style={styles.userEmail}>{displayEmail}</Text>
        <Text style={styles.userAddress}>{address}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 10,
  },
  text: {
    paddingLeft: 12,
  },
  user: {
    marginTop: 12,
    padding: 16,
  },
  userIcon: {
    width: 65,
    height: 65,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Color.textInput,
  },
  userEmail: {
    color: "white",
    fontFamily: Fonts.main,
    marginBottom: 2,
  },
  userAddress: {
    fontFamily: Fonts.main,
    fontSize: 12,
    color: Color.tagLine,
  },
});
