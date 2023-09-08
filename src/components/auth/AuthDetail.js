import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { login, logout } from "../../redux/reducers/AuthReducer";

const AuthDetail = ({ setDetailPage, authPage }) => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  console.log("Userr", authUser);
  const Login = () => {
    signInWithEmailAndPassword(auth, email, passWord)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("userCredentiaL:", user);
      })
      .catch((err) => {
        console.log("err mess: ", err.message);
      });
  };


  const register = () => {
    if(email == "" || passWord==""){
      Alert.alert("Invaild Details", "Please Fill all Details", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],

      {cancelable:false});
    }
  }
  createUserWithEmailAndPassword(auth, email, passWord).then((userCredential) => {
    const user  = userCredential.user
    const myUserUid = auth.currentUser.uid

    setDoc(doc(db, "users", `${myUserUid}`), {
      email:email,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoURL,
      displayName:user.displayName
    })

    dispatch(
      login({
        phoneNumber: user.phoneNumber,
        email: user.email,
        photoUrl: user.photoURL,
        displaceName: user.displayName,
      })
    );

  }).catch((err) => {
    console.log(" mess err", err.message)
  })

  return (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 18 }}>
        <Ionicons
          onPress={() => setDetailPage(false)}
          style={{ marginLeft: 12 }}
          name="arrow-back-outline"
          size={24}
          color="black"
        />
        {authPage == 0 ? (
          <Text
            style={{
              fontSize: 22,
              fontWeight: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Log In
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 22,
              fontWeight: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Sign Up
          </Text>
        )}
      </View>

      <View style={{ marginHorizontal: 18, marginBottom: 28 }}>
        <TextInput
          placeholder="Email or TikTok ID"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ borderBottomWidth: 0.3, margin: 12 }}
        />
        <TextInput
          placeholder="PassWord"
          value={passWord}
          onChangeText={(text) => setPassWord(text)}
          secureTextEntry={true}
          style={{ borderBottomWidth: 0.3, margin: 12 }}
        />
      </View>

      <TouchableOpacity
        onPress={() => (authPage == 0 ? Login() : register())}
        style={{ backgroundColor: "red", padding: 8, marginHorizontal: 24 }}
      >
        {authPage == 0 ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              color: "white",
            }}
          >
            Sign In
          </Text>
        ) : (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              color: "white",
            }}
          >
            Log Up
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AuthDetail;

const styles = StyleSheet.create({});
