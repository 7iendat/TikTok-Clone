import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";


export default function App() {
  return (
    // <Provider store={store}>
    //   <View style={styles.container}>
    //     <AuthScreen />
    //   </View>
    // </Provider>

    // <Provider >

    //   <Navigation/>
    // </Provider>
    <Provider store={store}>

      <Navigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({});
