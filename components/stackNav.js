import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';

import { createStackNavigator } from  'react-navigation-stack';
import IOSIcon from "react-native-vector-icons/Ionicons";
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import DetailsScreen from './DetailsScreen';
// import DetailsScreen from './DetailsScreen';

const stackNav = createStackNavigator({
  Home : {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: "Article News",
      headerRight:()=>(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <View style={{
                      paddingLeft: 15
                    }}>
                      <IOSIcon
                        name="ios-menu"
                        size={30}
                      />
                    </View>
                  </TouchableOpacity>
      ),
    })
  },
Category: {
    screen: CategoryScreen,
    navigationOptions: ({navigation}) => ({
      title: "Article News",
    })     
  },
  Detail:{
    screen:DetailsScreen,
    navigationOptions: ({navigation}) => ({
        title: "Detail",
      })
}
});

export default stackNav;