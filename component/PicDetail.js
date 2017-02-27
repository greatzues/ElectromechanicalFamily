/**
 * Created by zues on 2016/11/17.
 * 接受三个属性，分别是uri，图片所在数组的index和图片的uri path
 */
import React,{ Component } from 'react';
import { View, Image, Navigator, Dimensions, StyleSheet, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'

export default class PicDetail extends Component{
    // 构造
      constructor(props) {
        super(props);
          this.state={
              testData:this.props.uri
          }
      }

      render(){
          let source = [];
          for(x in this.state.testData){
              this.state.testData[x]===null?null:source.push(this.state.testData[x]);
          }
          return(
              <ScrollView style={styles.container}>
                  <NormalToolbar
                      leftItemFunc={this.back.bind(this)}
                      leftItemTitle='返回'
                      leftTextColor='white'
                      barBGColor='transparent'
                      title='图片详情'
                      titleTextColor='white'
                  />
                  <Swiper
                      index={this.props.index-1}
                      style={styles.wrapper}
                      renderPagination={renderPagination}
                      showsButtons={true}
                      loop={false}
                  >
                      {
                          source.map((item, i) => <View key={i} style={styles.slide}>
                              <TouchableWithoutFeedback>
                                  <PhotoView
                                      source={{uri: this.props.path+item}}
                                      resizeMode='contain'
                                      minimumZoomScale={1}
                                      maximumZoomScale={5}
                                      androidScaleType='fitCenter'
                                      style={styles.photo} />
                              </TouchableWithoutFeedback>
                          </View>)
                      }
                  </Swiper>
              </ScrollView>
          );
      }

    back(){
        new Net().back(this.props)
    }
}

const renderPagination = (index, total, context) => {
    return (
        <View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 15,
            left: 0,
            right: 0
        }}>
            <View style={{borderRadius: 7, backgroundColor: 'rgba(255,255,255,.15)', padding: 3, paddingHorizontal: 7}}>
                <Text style={{color: '#fff', fontSize: 14}}>{index + 1} / {total}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    image:{
        width: device.width*0.9,
        height: device.height,
        marginLeft: device.width*0.05,
    },
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        flex: 1,
        width:device.width,
        height:device.height,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
});