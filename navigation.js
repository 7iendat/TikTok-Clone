import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/screens/auth/AuthScreen";

import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./src/screens/home/HomeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { login, logout } from "./src/redux/reducers/AuthReducer";

import { Feather } from "@expo/vector-icons";

import ProfileScreen from "./src/screens/profile/ProfileScreen";

import SearchScreen from "./src/screens/search/SearchScreen";
import ChatScreen from "./src/screens/chat/ChatScreen";
import CameraScreen from "./src/screens/camera/CameraScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SavePostScreen from "./src/screens/savePost/SavePostScreen";

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "black" }}
      activeColor="#e91e63"
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Add"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerShown: false,
        }}
        // initialParams={{ initialUserId: firebase.auth().currentUser.uid }}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            phoneNumber: user.phoneNumber,
            email: user.email,
            photoUrl: user.photoURL,
            displaceName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser.user == null ? (
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Bottom"
              component={BottomTab}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SavePost"
              component={SavePostScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
