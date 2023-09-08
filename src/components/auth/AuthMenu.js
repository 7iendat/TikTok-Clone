import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AuthMenu = ({ authPage, setAuthPage, setDetailPage }) => {
  // const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      {authPage == 0 ? (
        <>
          <View style={{ margin: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Log in to TikTok
            </Text>
            <Text style={{ color: "gray", textAlign: "center" }}>
              Manage your account, check notification, comment on video, and
              more.
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={{ margin: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Sign Up to TikTok
            </Text>
            <Text style={{ color: "gray", textAlign: "center" }}>
              Create a profile, follow other accounts, make your own videos, and
              more.
            </Text>
          </View>
        </>
      )}

      <TouchableOpacity
      onPress={() => setDetailPage(true)}
        style={{
          flexDirection: "row",
          padding: 12,
          marginHorizontal: 20,
          borderWidth: 0.3,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AntDesign name="user" size={24} color="black" />
        <Text style={{ marginRight: "auto", marginLeft: "auto" }}>
          Use phone/ Email/ Username
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => (authPage == 0 ? setAuthPage(1) : setAuthPage(0))}
        style={{ marginTop: "auto", backgroundColor: "#e9e9ef", padding: 15 }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {authPage == 0 ? (
            <>
              <Text>Don't have a account? </Text>
              <Text style={{ color: "red", fontWeight: "bold" }}>Sign Up</Text>
            </>
          ) : (
            <>
              <Text>Already have an account? </Text>
              <Text style={{ color: "red", fontWeight: "bold" }}> Sign In</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AuthMenu;

const styles = StyleSheet.create({});
