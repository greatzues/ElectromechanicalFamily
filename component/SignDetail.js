/**
 * Created by zues on 2017/1/18.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, TouchableOpacity, TextInput, ScrollView, Navigator } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar'
import {Button, Card} from 'react-native-elements'

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
                  <Card title="不签到原因" titleStyle={styles.reason} wrapperStyle={{padding:1}}>
                      <TextInput
                          multiline={true}
                          underlineColorAndroid="transparent"
                          placeholder="如果出现特殊情况，请在此处填写不签到原因，点击不签到按钮，可再次回来签到详情修改签到状态"
                          placeholderTextColor='white'
                          maxLength={255}
                          numberOfLines={8}
                          style={styles.input}
                          onEndEditing ={event => this.setState({reason:event.nativeEvent.text})}
                      />
                  </Card>
                  <View style={styles.body}>
                      <Button backgroundColor="#337ab7" borderRadius={5}  buttonStyle={styles.Sign}
                              icon={{name: 'mood', size: 28}} title='签到' onPress={this.postSignInfo.bind(this,1)}/>
                      <Button backgroundColor="#393e42" borderRadius={5}  buttonStyle={styles.Sign}
                              icon={{name: 'sentiment-dissatisfied', size: 28}} title='不签到' onPress={this.postSignInfo.bind(this,0)}/>
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
        justifyContent:'space-around',
        alignItems:'flex-end',
        flexDirection:'row',
    },
    Sign:{
        justifyContent:'center',
        alignItems: 'center',
        height: 40,
        marginLeft:5,
        marginRight:5,
        marginTop:20,
        paddingLeft:40,
        paddingRight:40,
    },
    container:{
      flex:1,
        backgroundColor:'#ffffff'
    },
    input:{
        textAlignVertical: 'top', //这段代码可以让TextInput在多行的情况下，text位于最高，而不是居中。
        backgroundColor:'#393e42',
        margin:10,
        borderRadius:15,
        flex:1
    },
    logo:{
        width:device.width*0.8,
        alignSelf:'center',
        height:device.height*0.1
    },
    reason:{
      fontSize:18,
        marginLeft:10,
        marginTop:10,
    },
})