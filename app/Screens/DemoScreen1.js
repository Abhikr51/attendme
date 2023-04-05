import React, { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { Alert, Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableNativeFeedbackBase, TouchableOpacity, View } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DemoScreen1 = ({navigation}) => {


  
  return (
    <Screen style={styles.screen} >
      <LinearGradient 
        colors={['#B3377150', '#ffffff', '#ffffff']} 
        style={{
          flex: 1,
        }}
      >
        <TopBar user={{
          name: "Satyajit Kumar",
          avatar: {uri: 'https://astergo.in/avatar.png' }
        }}>
          <View style={{
            marginHorizontal: 10,
            marginVertical: 10
          }}>
            <SearchBox />
          </View>
        </TopBar>
        <View style={{
          // display: "flex",
          // flexDirection: "row",
          // justifyContent: "space-evenly",
          // alignContent: "center",
          // alignItems: "center",
          marginHorizontal: 15,
          marginVertical: 5,
        }}>
          <ScrollView horizontal 
            style={{
              flexDirection: "row",
            }}
            showsHorizontalScrollIndicator={false}
          >
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
            <IconBox onpress={()=> console.log("Pressed")} />
          </ScrollView>
        </View>
        <View style={{
          marginHorizontal: 20,
          marginVertical: 20,
        }}>
          <View><AppText style={{fontSize: 20, fontWeight: "bold", color: "#520227"}}>Trending Offers</AppText></View>
          <View style={{
            display: "flex",
            flexDirection: "row",
            marginVertical: 10,
          }}>
            <ScrollView horizontal 
            style={{
              flexDirection: "row",
              paddingVertical: 5, 
            }}
              showsHorizontalScrollIndicator={false}
            >
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Food</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Fashion</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Beauty</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Food</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Fashion</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Beauty</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Food</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Fashion</AppText></Chip>
              <Chip onpress={()=> Alert.alert("Pressed!", 'YouPressedThisButton')}><AppText style={{color: "#542239", fontSize: 14, fontWeight: "500"}}>Beauty</AppText></Chip>
            </ScrollView>
          </View>
        </View>
        <View style={{
          marginHorizontal: 20,
        }}>
          <View style={{
            display: "flex",
            flexDirection: "column",
          }}>
            <View style={{
              // backgroundColor: "#ddd",
              // borderRadius: 12,
              marginBottom: 10,
              overflow: 'hidden',
            }}>
              <ImageBackground 
                source={{uri: 'https://png.pngtree.com/thumb_back/fw800/background/20210205/pngtree-holiday-universal-coupon-background-image_543765.jpg'}}
                style={{
                  height: 140,
                }}
                resizeMode="stretch"
                >

              </ImageBackground>
            </View>
            <View style={{
              // backgroundColor: "#ddd",
              borderRadius: 12,
              marginBottom: 10,
              overflow: 'hidden',
            }}>
              <ImageBackground 
                source={{uri: 'https://png.pngtree.com/thumb_back/fw800/background/20210205/pngtree-holiday-universal-coupon-background-image_543765.jpg'}}
                style={{
                  height: 140,
                }}
                resizeMode="stretch"
                >

              </ImageBackground>
            </View>
          </View>
        </View>
        {/* <AppText style={{marginVertical : 30}} >Demo Screen 1</AppText>
        <Button color={'#B33771'} title='Go to screen 2' onPress={()=>navigation.navigate('Screen2')} /> */}
        
        {/* <View style={{
          
        }}>
          <TouchableNativeFeedback onPress={() => {}}>
            <View style={{
              borderRadius: 12,
              marginTop: 5,
              backgroundColor: "#B33771",
              overflow: "hidden",
              padding: 15
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight : "600",
                color: "#ffffff"
              }}>PRESS ME</Text>
            </View>
          </TouchableNativeFeedback>
        </View> */}

      </LinearGradient>

    </Screen>
  );
};

const Chip = ({onpress = () => {}, ...rest}) => {
  return <View style={{
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    borderRadius: 100,
    borderColor: "#00000015",
    borderWidth: 1,
  }}><TouchableOpacity style={{
    
  }} onPress={onpress}>{rest.children}</TouchableOpacity></View>
}

const TopBar = ({user = {}, ...rest}) => {
  return (
    <View style={{
      // backgroundColor: "#ffffff30",
      paddingHorizontal: 10,
      paddingVertical: 15,
      // height: 150,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,

    }}>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 20,
      }}>
        <View style={{flex: 1, marginTop: 20}}>
          <View style={{
            display: "flex",
            flexDirection: "row",
          }}>
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 100,
            }}>
              <Image source={{uri: 'https://astergo.in/avatar.png'}} resizeMode="cover" style={{
                width: 50,
                height: 50,
              }} />
            </View>
            <View>
              <AppText style={{fontSize: 22, fontWeight: "500", color: "#520227"}}>{ user.name ?? '' }</AppText>
              <AppText style={{fontSize: 16, fontWeight: "500", color: "#520227"}}>
                <Ionicons name='md-location-sharp' size={16} />
                {` Purulia\t`}
                <Ionicons name='chevron-down-sharp'/> 
              </AppText>
            </View>

          </View>
        </View>
        <View style={{marginTop: 20}}>
          <View style={{
            padding: 10,
            borderRadius: 100,
          }}>
            {/* <Image source={{uri: 'https://astergo.in/avatar.png'}} resizeMode="cover" style={{
              width: 50,
              height: 50,
            }} /> */}
            <Ionicons name='menu-outline' size={40} color={"#520227"} />
          </View>
        </View>
      </View>
      <View>
        {rest.children}
      </View>
    </View>
  )
}

const SearchBox = () => {
  return (
    <View style={{
      backgroundColor: "#ffffff99", 
      overflow: "hidden",
      height: 48,
      // margin: 8,
      borderRadius: 12, 
    }}>
      <TextInput 
        cursorColor={"#000000"}
        style={{
          paddingHorizontal: 10, 
          paddingVertical:5, 
          height: "100%",
          fontSize: 18,
        }} 
        placeholder="Search ..."
      />
    </View>
  )
}

const IconBox = ({onpress = () => {}, ...rest}) => {
  return (
    <View style={{
      borderRadius: 12,
      width: 80,
      // height: 80,
      overflow: "hidden",
      marginHorizontal: 4,
      marginBottom: 8,
      backgroundColor: "#ffffff",
      elevation: 2,
    }}>
      <TouchableNativeFeedback onPress={onpress}>
        <View style={{
          width: 80,
          // height: 80,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          borderRadius: 12,
        }}>
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/6866/6866679.png"}} resizeMode="cover" style={{
            width: 50,
            height: 50
          }} />
          <AppText style={{ fontSize: 12, fontWeight: "500", marginTop: 2, color: "#542239",}}>NAME</AppText>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default DemoScreen1;

const styles = StyleSheet.create({
  screen : {
    // justifyContent : 'center',
    // alignItems : 'center'
  }
});