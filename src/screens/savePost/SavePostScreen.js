import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase";
import uuid from "uuid-random";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const SavePostScreen = (pros) => {
  // console.log("pros :",pros.route.params.source.uri)
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const storage = getStorage();

  const uploadToStorage = async () => {
    const myUserUid = auth.currentUser.uid;
    const source = pros.route.params.source.uri;
    let storagePostId = uuid();
    const fileName = source.substring(source.lastIndexOf("/") + 1);
    const storageRef = ref(
      storage,
      `post/${auth.currentUser.uid}/${storagePostId}/video`,
      fileName
    );
    console.log("fileRef:", storageRef);
    await fetch(source)
      .then((res) => res.blob())
      .then((blob) => {
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Uploaded a blob or file!");
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.warn(error.message);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log("File available at", downloadURL);
              setDoc(doc(db, "posts", `${myUserUid}`), {
                creator: myUserUid,
                downloadURL: downloadURL,
                description,
                likesCount: 0,
                commentCount: 0,
                creation: Timestamp.fromDate(new Date()),
              });
            });
          }
          // () => {
          //   setDoc(doc(db, "posts", `${myUserUid}`), {
          //     creator: myUserUid,
          //     downloadURL: getDownloadURL(uploadTask.snapshot.ref),
          //     description,
          //     likesCount: 0,
          //     commentCount: 0,
          //     creation: Timestamp.fromDate(new Date())
          //   });
          // }
        );
      });
    // .then((task) => task.ref.getDownload());
    // .then((downloadURL) => resolve(downloadURL));
    // const blob = await response.blob()
    try {
      await storageRef;
    } catch (err) {
      console.log("err: ", err.message);
    }

    console.log("upload success");
  };
  return (
    <SafeAreaView
      style={{ paddingVertical: 26, paddingHorizontal: 12, flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="chevron-back" size={28} color="black" />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Post
        </Text>
        <View />
      </View>
      <View style={{ backgroundColor: "gray", width: "100%", height: 1 }} />

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          placeholder="Decribe your video"
          multiline
          maxLength={150}
          style={{ padding: 12, flex: 1 }}
        />
        <Image
          source={{ uri: pros.route.params.source.uri }}
          style={{ width: 60, aspectRatio: 9 / 16, backgroundColor: "black" }}
        />
      </View>

      <View style={{ flex: 1, borderTopWidth: 0.4, marginTop: 12 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderWidth: 0.4,
            borderColor: "gray",
            padding: 12,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="cancel" size={24} color="black" />
          <Text style={{ marginLeft: 6, fontSize: 16, fontWeight: "bold" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => uploadToStorage()}
          style={{
            flex: 1,
            flexDirection: "row",
            borderWidth: 0.4,
            borderColor: "gray",
            padding: 12,
            backgroundColor: "red",
            marginLeft: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="totop" size={24} color="white" />
          <Text
            style={{
              marginLeft: 6,
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SavePostScreen;

const styles = StyleSheet.create({});
