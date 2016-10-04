/**
 * Created by zues on 2016/9/20.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import Net from '../Net';
import ImagePicker from 'react-native-image-picker';
import Login from './Login';

const BASEURL = 'http://119.29.184.235:8080/jd/avatar/';
const deviceWidth = Dimensions.get('window').width;
export default class DrawerView extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state ={
              myResponse:'',
              avatarSource: null,
              videoSource: null,
              imgUrl: null,
              filename: null,
              isLogin:false,
          }
      }

    componentDidMount() {
            var myResult = '';
            AsyncStorage.getItem('username',(error,result) => {
                myResult = result;
                myResult!==null?this.fetchData():this.setState({myResponse:'请登录'});
            });
    }

      render(){
          var myResponse = this.state.myResponse;
          return(
              <View>
                  <Image
                      source={require('../img/UserBackground.jpg')}
                      style={styles.userBackground}>
                      <View>
                          { this.state.avatarSource === null ?
                              <Image source={require('../img/UserDafault.png')} style={styles.avatar}></Image> :
                              <Image style={styles.avatar} source={{uri:BASEURL+this.state.avatarSource}} />
                          }
                      </View>
                      <Text style={{color:'white'}}>你好，{myResponse}</Text>
                      {this.state.isLogin?<Text style={{color:'gray'}}>您已登录</Text>:null}
                  </Image>

                      <TouchableOpacity
                          style={{borderRadius:10,borderWidth:1,borderColor:'gray',padding:5,marginRight:3}}
                          onPress={this.avatarUpload.bind(this)}>
                          <Text style={{color:'gray',marginRight:10,marginLeft:10}}>头像上传</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={{borderRadius:10,borderWidth:1,borderColor:'gray',padding:5,marginLeft:3}}
                          onPress={this.props.quitLogin}>
                          <Text style={{color:'gray',marginRight:10,marginLeft:10}}>切换账号</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={{borderRadius:10,borderWidth:1,borderColor:'gray',padding:5,marginLeft:3}}
                          onPress={this.props.quitApp}>
                          <Text style={{color:'gray',marginRight:10,marginLeft:10}}>退出应用</Text>
                      </TouchableOpacity>
              </View>
          );
      }


    fetchData(){
        var URl = '/student/getinfo';
        var response;
        return new Net().getMethod(URl).then((responseData) => {
            response = responseData.response;
            this.setState({
                myResponse:response.name,
                avatarSource:response.avatar,
                isLogin:true,
            });
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
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

                new Net().postFile('/student/upload2',this.state.imgUrl,this.state.filename)
                    .then((data) => {

                    });
            }
        });

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
    }
});