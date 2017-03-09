/**
 * Created by zues on 2016/9/20.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, Dimensions, TouchableOpacity, AsyncStorage, DeviceEventEmitter } from 'react-native';
import Net from '../Tool';
import {Icon } from 'react-native-elements';
import myImagePicker from 'react-native-image-crop-picker';

const AVATAR = '/avatar/';
const UPLOAD = '/student/upload';
export default class DrawerView extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state ={
              myResponse:'请登录',
          }
      }

      render(){
          return(
              <View style={styles.container}>
                  <Image
                      source={require('../img/UserBackground.jpg')}
                      style={styles.userBackground}>
                      <View>
                          { this.props.avatar === null ?
                              <Image source={require('../img/UserDafault.png')} style={styles.avatar}></Image> :
                              <Image style={styles.avatar} source={{uri:this.props.avatar}} />
                          }
                      </View>
                      <Text style={{color:'white',backgroundColor: 'transparent'}}>你好，{this.props.username===null?this.state.myResponse:this.props.username}</Text>
                      {this.props.avatar === null?null:<Text style={{color:'gray',backgroundColor: 'transparent'}}>您已登录</Text>}
                  </Image>

                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.props.myShare}>
                          <Icon name='share' type='simple-line-icon' color='#0072f6' size={20}/>
                          <Text style={styles.itemText}>我的分享</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.pickSingle.bind(this)}>
                          <Icon name='camera' type='simple-line-icon' color='#0072f6' size={20}/>
                          <Text style={styles.itemText}>头像上传</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.props.changPassword}>
                          <Icon name='settings' type='simple-line-icon' color='#0072f6' size={20}/>
                          <Text style={styles.itemText}>修改密码</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.props.quitLogin}>
                          <Icon name='user-unfollow' type='simple-line-icon' color='#0072f6' size={20}/>
                          <Text style={styles.itemText}>退出登录</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.props.quitApp}>
                          <Icon name='logout' type='simple-line-icon' color='#0072f6' size={20}/>
                          <Text style={styles.itemText}>退出应用</Text>
                      </TouchableOpacity>
              </View>
          );
      }

    pickSingle(){
        myImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.props.avatar = image.path;
            this.forceUpdate();
            this.updateAvatar(image.path);
        }).catch(e => {
            console.log('Error:'+e);
        });
    }

    updateAvatar(path){
        new Net().postFile(UPLOAD,path)
            .then((data) => {
                this.props.refresh(true);
            }).catch(error => {
            Toast.show('网络出现小问题，请重试')
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatar:{
        borderRadius:40,
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        marginTop:30,
        marginBottom: 10,
    },
    userBackground:{
        height:180,
        width:250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemTouch:{
        borderColor:'gray',
        padding:5,
        marginLeft:3,
        flexDirection: 'row',
        borderBottomWidth:0.7,
        alignItems:'center',
        height:50,
    },
    itemText:{
        color:'gray',
        marginLeft:20,
    },
    itemImage:{
        height:30,
        width:30,
    },
});