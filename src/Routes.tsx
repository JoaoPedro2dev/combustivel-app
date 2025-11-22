import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import { Stack } from "expo-router";
import Home from "./screens/Home";
import Result from "./screens/Result";

export type RootStackParamList = {
  Home: undefined;
  Result: {
    custoGasolina: number;
    custoEtanol: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 100,
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 100,
              },
            },
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Result"
          component={Result}
          options={{
            title: "Resultado",
            headerBackTitle: "voltar",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
