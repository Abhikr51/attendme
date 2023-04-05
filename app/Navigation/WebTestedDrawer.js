import * as React from 'react';
import { View, Text ,TouchableOpacity,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
function Feed({navigation}) {
  const progress = useDrawerProgress();
const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const left = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, -200],
  });
  return (
    <Animated.View style={{backgroundColor :'red',borderRadius, left,transform: [{ scale }] }}>
      <TouchableOpacity  onPress={()=>navigation.toggleDrawer()} >
        <Text> HEllo</Text>
        <Text> HEllo</Text>
        <Text> HEllo</Text>
        <Text> HEllo</Text>
        <Text> HEllo</Text>
        <Text> HEllo</Text>
      </TouchableOpacity>
      <Text>Feed Screen</Text>
    </Animated.View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const progress = useDrawerProgress();

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{backgroundColor :"blue", transform: [{ scale }] }}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
       screenOptions={{
          drawerType: 'slide',
          overlayColor: 'trasparent',
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          drawerStyle: styles.drawerStyles,
          drawerContentContainerStyle: { flex: 1 },
          sceneContainerStyle : {backgroundColor : 'transparent'},
          
        }}
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen options={{ headerShown: false }} name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
