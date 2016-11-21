/**
 * Created by zues on 2016/11/17.
 */
import React,{ Component } from 'react';
import { View, Image, Navigator, Dimensions, StyleSheet } from 'react-native';
import NormalToolbar from './normalToolbar';

var window = Dimensions.get('window');
export default class PicDetail extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            uri:this.props.uri
        };
      }

      render(){
          return(
              <View style={styles.container}>
                  <NormalToolbar click={this.backToHome.bind(this)}/>
                  <Image source={{uri:this.props.uri}} style={styles.image} resizeMode='contain'/>
              </View>
          );
      }

    backToHome(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image:{
        width: window.width*0.9,
        height: window.height,
        marginLeft: window.width*0.05,
    },
});