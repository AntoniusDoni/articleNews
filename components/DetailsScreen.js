import React, { Component } from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity,ScrollView,Linking} from 'react-native';
import Moment from 'moment';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
  }
    static navigationOption = {
        title: 'Article Mind',
    };
    goToDetailScreen(item) {
      Linking.canOpenURL(item).then(supported =>{
        if (supported) {
          Linking.openURL(item);
        } else {
          console.log("Don't know how to open URI: " + item);
        }
      })
    }
    render() {
  const { navigation } = this.props;
  const detailData = navigation.getParam('detailData', 'No matches found');
  console.log(detailData);
        return (
          <ScrollView>
            <View style={styles.viewList}>
              <Text  style={styles.textTitle}> {detailData.title}</Text>
              <Text style={styles.textDate}> {Moment(detailData.publishedAt).format('LLLL')}</Text>
              <Image source={{uri: detailData.urlToImage}} style={styles.Image} />
              <Text style={styles.textDescription}> {detailData.description} </Text>
              <TouchableOpacity
        style={styles.buttonRead}
        onPress={() => this.goToDetailScreen(detailData.url)}   
      >
        <Text style={{color:'#fff',fontSize:14}}>Read Detail</Text>
      </TouchableOpacity>
     
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
  viewList: {
    flexDirection:'column',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center'
  },
  Image: {
    alignSelf: 'center',
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20
  },
  textTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: 10,
    marginBottom:5,
    fontSize: 16,
    textAlign:'center'
  },
  textDate:{
    fontSize:12,
    margin: 20,
    textAlign:'center',
    color:'#888',
    margin:10,
    alignSelf:'flex-start',
  },
  textDescription:{
    fontSize:14,
    margin:20,
    marginBottom:5,
    color:'#333'
  },
  buttonRead:{
    backgroundColor:'#333',
    width:'50%',
    alignSelf:'flex-start',
    alignItems: "center",
    marginLeft:20,
    marginBottom:10,
    padding:15,
    borderRadius:5
  }
})
export default DetailsScreen;