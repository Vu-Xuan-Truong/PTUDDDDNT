import React from "react";
import HomeScreen from "./src/HomeScreen";
import DetailsScreen from "./src/DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from 'react-native-paper';
import CustomNavigationBar from "./src/CustomNavigationBar";
import CustomNDrawerBar from "./src/CustomDrawerBar2";
import { Drawer } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";


const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
  );
}

// const App=()=>{
//   return(
//     <NavigationContainer>
//       <Drawer.Navigator drawerContent={{(props)=> <CustomNDrawerBar{...props}/>, }}>
        
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }