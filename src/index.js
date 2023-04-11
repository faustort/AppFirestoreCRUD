import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import UsuarioCadastro from "./screens/UsuarioCadastro";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="MTB"
                    component={MBTNavigation}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MTB = createMaterialBottomTabNavigator();
export function MBTNavigation() {
    return (
        <MTB.Navigator>
            <MTB.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <MTB.Screen
                name="UsuarioCadastro"
                component={UsuarioCadastro}
                options={{
                    tabBarLabel: 'Cadastrar usuários',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account-plus" color={color} size={size} />
                    ),
                }}
            />
        </MTB.Navigator>
    )
}