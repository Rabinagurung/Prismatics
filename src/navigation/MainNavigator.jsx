import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import FavoriteScreen from '../screens/Favorite/FavoriteScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import DetailScreen from '../screens/Home/DetailScreen';
import { GlobalStyles } from '../styles/structure';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { Text } from 'react-native';

/** Bottom Nav */
const PrismaticsOverView = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: GlobalStyles.colors.slateBlue,
        tabBarInactiveTintColor: GlobalStyles.colors.lightSlateBlue,
        tabBarStyle: {
          height: 70,
          backgroundColor: GlobalStyles.colors.lavender,
        },
        tabBarItemStyle: {
          height: 70,
        },
        headerShadowVisible: false,
        headerTintColor: GlobalStyles.colors.black,
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: 'Prismatics',
          headerTitle: 'Prismatics',
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Billabong',
            fontSize: 35,
          },

          // header: Header,
          tabBarIcon: ({ focused, color, size }) => {
            const name = focused ? 'home' : 'home-outline';
            return (
              <MaterialCommunityIcons name={name} color={color} size={size} />
            );
          },
          tabBarLabel: ({ color, children }) => (
            <Text style={{ marginBottom: 20, color }}>{children}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const name = focused ? 'favorite' : 'favorite-outline';
            return <MaterialIcons name={name} color={color} size={size} />;
          },
          tabBarLabel: ({ color, children }) => (
            <Text style={{ marginBottom: 20, color }}>{children}</Text>
          ),
          headerTitle: "Prismatics",
          headerTitleStyle: {
            fontFamily: 'Billabong',
            fontSize: 35,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const name = focused ? 'person' : 'person-outline';
            return <Ionicons name={name} color={color} size={size} />;
          },
          tabBarLabel: ({ color, children }) => (
            <Text style={{ marginBottom: 20, color }}>{children}</Text>
          ),
          headerTitle: "Prismatics",
          headerTitleStyle: {
            fontFamily: 'Billabong',
            fontSize: 35,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      {/** Bottom Nav added as first screen in Stack*/}
      <Stack.Screen
        name="PrismaticsOverView"
        options={{ headerShown: false }}
        component={PrismaticsOverView}
      />

      {/** Here, we will add all the screens */}
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
