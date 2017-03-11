/**
 * Created by zues on 2017/2/21.
 */
import React, { Component } from 'react';
import {Modal, StyleSheet, Switch, Text, TouchableOpacity, View, ScrollView, Picker} from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import Toast from 'react-native-root-toast';
import { Button, FormLabel, FormInput} from 'react-native-elements'

const STUDENT_INFO = '/students/';
export  default class EditDeatils extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:null
        };
      }

      render(){
          return (
              <View style={styles.container}>
                  <NormalToolbar title={this.props.title} leftItemFunc={this.back.bind(this)} leftImageSource={require('../img/back.png')}/>
                  <FormLabel>{this.props.title}</FormLabel>
                  <FormInput
                      inputStyle={{padding:5}}
                      placeholder={this.props.info === null?'请输入您的'+this.props.title:this.props.info}
                      onChangeText={this.onChangeText.bind(this)}
                  />

                  <Button title="确定" backgroundColor="#337ab7" borderRadius={5} onPress={this.postData.bind(this)} />
              </View>
          );
      }

    back(){
        new Net().back(this.props);
    }

    onChangeText(text){
        this.setState({
            data:text
        })
    }

    postData(){
        let params = new Object();
        params[this.props.k] = this.state.data;
        let url = STUDENT_INFO+this.props.id;
        new Net().putMethod(url,params).then((r) => {}).catch(e => {Toast.show("网络出现错误");});
        this.props.callBack(this.state.data);
        this.back();
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#eff0f3'
    },
});