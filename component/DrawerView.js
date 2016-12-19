/**
 * Created by zues on 2016/9/20.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, Dimensions, TouchableOpacity, AsyncStorage, DeviceEventEmitter } from 'react-native';
import Net from '../Tool';
import ImagePicker from 'react-native-image-picker';
import Login from './Login';

const AVATAR = 'http://119.29.184.235:8080/jd/avatar/';
const LISTENERKEY = 'reRender';
export default class DrawerView extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state ={
              myResponse:'请登录',
              avatarSource:null,
              imgUrl: null,
              filename: null,
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
                              <Image style={styles.avatar} source={{uri:AVATAR+this.props.avatar}} />
                          }
                      </View>
                      <Text style={{color:'white'}}>你好，{this.props.username===null?this.state.myResponse:this.props.username}</Text>
                      {this.props.avatar === null?null:<Text style={{color:'gray'}}>您已登录</Text>}
                  </Image>

                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.avatarUpload.bind(this)}>
                          <Image source={require('../img/pic.png')} style={styles.itemImage}></Image>
                          <Text style={styles.itemText}>头像上传</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.props.quitLogin}>
                          <Image source={require('../img/me_hight.png')} style={styles.itemImage}></Image>
                          <Text style={styles.itemText}>退出登录</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.itemTouch}
                          onPress={this.props.quitApp}>
                          <Image source={require('../img/back.png')} style={styles.itemImage}></Image>
                          <Text style={styles.itemText}>退出应用</Text>
                      </TouchableOpacity>
              </View>
          );
      }

    avatarUpload(){
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title:'选择图片',
            chooseFromLibraryButtonTitle: '相册',
            takePhotoButtonTitle:'拍照',
            cancelButtonTitle:'取消',
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            this.setState({
                imgUrl:response.uri,
                fileName:response.fileName,
            });

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                // Or:
                // if (Platform.OS === 'android') {
                //   source = {uri: response.uri, isStatic: true};
                // } else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                this.setState({
                    avatarSource: source
                });

                new Net().postFile('/students/upload',this.state.imgUrl,this.state.filename)
                    .then((data) => {

                    });
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatar:{
        borderRadius:75,
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
        marginRight:10,
        marginLeft:10,
    },
    itemImage:{
        height:30,
        width:30,
    },
});