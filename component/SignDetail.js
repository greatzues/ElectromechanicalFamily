/**
 * Created by zues on 2017/1/18.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, TouchableOpacity, TextInput, ScrollView, Navigator } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar'


const SIGN = '/sign';
export default class SignDetail extends  Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            classNumber:null,
            idOfTable:null,
            reason:'',
        };
      }

      render(){
          return(
              <ScrollView style={styles.container}>
                  <NormalToolbar title='签到详情' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>
                  <Image source={require('../img/homeTop1.png')} style={styles.logo} resizeMode={'contain'}/>
                  <Image source={require('../img/homeTop2.png')} style={styles.logo} resizeMode={'contain'}/>
                  <Text style={styles.reason}>不签到原因：</Text>
                  <TextInput
                      multiline={true}
                      underlineColorAndroid="transparent"
                      placeholder="如果出现特殊情况，请在此处填写不签到原因"
                      maxLength={255}
                      numberOfLines={8}
                      style={styles.input}
                      onEndEditing ={event => this.setState({reason:event.nativeEvent.text})}
                  />
                  <View style={styles.body}>
                      <TouchableOpacity style={styles.Sign} onPress={this.postSignInfo.bind(this,0)}>
                          <Text style={{margin: 30,color:'white', fontSize:20}}>不签到</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.Sign} onPress={this.postSignInfo.bind(this,1)}>
                          <Text style={{margin: 30,color:'white', fontSize:20}}>签到</Text>
                      </TouchableOpacity>
                  </View>
              </ScrollView>
          );
      }

      postSignInfo(isSign){
          var url = SIGN+"?classNumber="+this.props.classNumber+"&idOfTable="+this.props.id;
          var postData = {
              'classNumber':this.props.classNumber,
              'idOfTable':this.props.id,
              'isSign':isSign,
              'reason':this.state.reason
          }
          new Net().postMethod(url,postData).then(r => {
                console.log(r);
          }).catch(e => {})
          //判断是否点击的是签到，如果确认到校了就只有一次签到机会，不可儿戏，若有急事赶不及则可以选择未签到，未签到可以修改
          if(isSign === 1){
              const { navigator } = this.props;
              if(this.props.update){
                  this.props.update(true);
              }
              navigator.pop();
          }else {
              this.back();
          }
      }

    back(){
        new Net().back(this.props)
    }
}

const styles=StyleSheet.create({
    body:{
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center'
    },
    Sign:{
        justifyContent:'center',
        alignItems: 'center',
        width: device.width - 10,
        height: 40,
        backgroundColor: '#337ab7',
        borderRadius:5,
        marginLeft:5,
        marginRight:5,
        marginTop:20,
    },
    container:{
      flex:1,
        backgroundColor:'#ffffff'
    },
    input:{
        textAlignVertical: 'top', //这段代码可以让TextInput在多行的情况下，text位于最高，而不是居中。
        backgroundColor:'#f8f8f8',
        margin:10,
        borderRadius:15,
    },
    logo:{
        width:device.width*0.8,
        alignSelf:'center',
        height:device.height*0.1
    },
    reason:{
      fontSize:15,
        marginLeft:10,
        marginTop:10,
    },
})