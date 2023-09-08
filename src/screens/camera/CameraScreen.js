import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = () => {
  const navigation = useNavigation()
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [hasGalleryPermission, setGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const isFocused = useIsFocused();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [video, setVideo] = useState("");
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermission(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  if (!hasCameraPermission || !hasAudioPermission || !hasGalleryPermission) {
    return <View></View>;
  }

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    
    const source = {uri: result.assets[0].uri}
    console.log("source: ", source)
    setVideo(source)
    if (!result.canceled) {
      navigation.navigate("SavePost", {source})
    }
  };
  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        // console.log("videoRecordPromise", videoRecordPromise)
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          // console.log("data: ", data)
          const source = data.uri;
          // console.log("source:", source)
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  // console.log("galleryItems: ", galleryItems)

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      {isFocused ? (
        <Camera
          style={{ backgroundColor: "black", aspectRatio: 9 / 16, flex: 1 }}
          ref={(ref) => setCameraRef(ref)}
          ratio="16:9"
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <View
        style={{ position: "absolute", top: 60, right: 0, marginRight: 10 }}
      >
        <TouchableOpacity onPress={() => setCameraType(cameraType == Camera.Constants.Type.back ? Camera.Constants.Type.front: Camera.Constants.Type.back)}>
          <MaterialIcons name="flip-camera-android" size={30} color="white" />
          <Text style={{ color: "white", marginBottom: 16 }}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCameraFlash(cameraFlash == Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch: Camera.Constants.FlashMode.off)}>
          {cameraFlash ? (
            <Ionicons name="flash-outline" size={30} color="white" />
          ) : (
            <Ionicons name="flash-off-outline" size={30} color="white" />
          )}

          <Text style={{ color: "white" }}>Flash</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          bottom: 0,
          marginBottom: 40,
          position: "absolute",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, marginHorizontal: 30 }}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={{
              borderWidth: 8,
              borderColor: "#ff404087",
              backgroundColor: "#ff4040",
              borderRadius: 100,
              height: 80,
              width: 80,
              alignSelf: "center",
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={{
              width: 60,
              height: 60,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 10,
            }}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={{ width: 60, height: 60 }}
                source={{ uri: galleryItems[0].uri }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({});
