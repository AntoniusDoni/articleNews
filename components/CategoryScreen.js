import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import Axios from 'axios';
import Moment from 'moment';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lates: {},
      popular:{},
      isLoading: true,
      isError: false,
    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
  }

  // Mount  Method
  componentDidMount() {
    this.getNewsApi()
    this.getPopularNews()
  }

  //   Get Api 
  getNewsApi = async () => {
    var CurrentDate = Moment().format('Y-MM-DD');
    
    try {
      const response = await Axios.get('https://newsapi.org/v2/everything?domains=bbc.co.uk&from='+CurrentDate+'&to='+CurrentDate+'&pageSize=2&sortBy=popularity&apiKey=541617d4c68b46b89d9c7a2facac5cd0')
      // console.log(response);
      this.setState({ isError: false, isLoading: false, lates: response.data.articles })

    } catch (error) {
      this.setState({ isLoading: false, isError: true })
    }
  }
  getPopularNews=async()=>{
    var CurrentDate = Moment().format('Y-MM-DD');
    
    try {
      const response = await Axios.get('https://newsapi.org/v2/everything?domains=bbc.co.uk&from='+CurrentDate+'&to='+CurrentDate+'&pageSize=3&sortBy=popularity&apiKey=541617d4c68b46b89d9c7a2facac5cd0')
      // console.log(response);
      this.setState({ isError: false, isLoading: false, popular: response.data.articles })

    } catch (error) {
      this.setState({ isLoading: false, isError: true })
    }
  }
  goToDetailScreen(item) {
    this.props.navigation.navigate('Detail',{
      detailData:item
    });
  }
 

  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <ActivityIndicator size='large' color='red' />
        </View>
      )
    }

    // If data finish load
    return (
<ScrollView>

    <View >
    <Text style={{margin:30,fontSize:18,fontWeight: 'bold',
    textTransform: 'capitalize',}}>Latest News</Text>
      <FlatList
        data={this.state.lates}
        renderItem={({ item }) =>
          <View style={styles.viewList}>
            <View>
              <Text  style={styles.textTitle}> {item.title}</Text>
              <Text style={styles.textDate}> {Moment(item.publishedAt).format('LLLL')}</Text>
              <Image source={{ uri: `${item.urlToImage}` }} style={styles.Image} />
              <Text style={styles.textDescription}> {item.description}</Text>
              <TouchableOpacity
        style={styles.buttonRead}
        onPress={() => this.goToDetailScreen(item)}   
      >
        <Text style={{color:'#fff',fontSize:14}}>Read Post</Text>
      </TouchableOpacity>
            </View>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
      <View>
      <Text style={{margin:30,fontSize:18,fontWeight: 'bold',
    textTransform: 'capitalize',}}>Popular News</Text>

<FlatList 
        data={this.state.popular}
        renderItem={({ item }) =>
          <View style={styles.viewListCol}>
            <View>
              <Text  style={styles.textTitle}> {item.title}</Text>
              <Text style={styles.textDate}> {Moment(item.publishedAt).format('LLLL')}</Text>
              <Image source={{ uri: `${item.urlToImage}` }}  style={styles.Image}/>
              <Text style={styles.textDescription}> {item.description}</Text>
              <TouchableOpacity
        style={styles.buttonRead}
        onPress={() => this.goToDetailScreen(item)}   
      >
        <Text style={{color:'#fff',fontSize:14}}>Read Post</Text>
      </TouchableOpacity>
            </View>
          </View>
        }
        horizontal={true}
        
        keyExtractor={(item, index) => index.toString()}
      />
      </View>

</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewList: {
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    margin: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    display:'flex'
  },
  viewListCol: {
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    margin: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    width:Dimensions.get('window').width-120,
    height:Dimensions.get('window').height-150
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
    marginLeft: 20,
    fontSize: 16
  },
  textDate:{
    fontSize:12,
    marginLeft: 20,
    color:'#888',
    margin:5
  },
  textDescription:{
    fontSize:14,
    margin:20,
    marginBottom:0,
    color:'#333'
  },
  buttonRead:{
    backgroundColor:'#333',
    width:'50%',
    alignSelf:'flex-start',
    alignItems: "center",
    margin:20,
    padding:15,
    borderRadius:5
  }
})
export default CategoryScreen;