/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Navigator, findNodeHandle ,AsyncStorage, ToastAndroid } from 'react-native';
import Net from './Tool';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import BaseInfo from './component/BaseInfo';
import myImagePicker from 'react-native-image-crop-picker';
import NormalToolbar from './component/NormalToolbar';

// import ImagePicker from 'react-native-image-picker';

var BlurView = require('react-native-blur').BlurView;

const AVATAR = 'http://119.29.184.235:8080/jd/avatar/';
const INFO = '/students/getinfo';
const UPLOAD = '/students/upload';
export default class Users extends Component {
    constructor(props){
        super(props);
        this.state ={
            pleaseLogin: '',
            myResponse:'请登录',
            avatarSource: null,
            viewRef:0,
            image:null,
        }
    }

    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={this.props.avatar === null?require('./img/UserBackground.jpg'):{uri:AVATAR+this.props.avatar}}
                    style={styles.userBackground}
                    ref={'backgroundImage'}
                    onLoadEnd={this.imageLoaded.bind(this)}>
                        <BlurView
                            blurType="dark"
                            blurRadius={2}
                            downsampleFactor={5}
                            overlayColor={'rgba(0, 0, 0, 0.3)'}
                            style={styles.blurView}
                            viewRef={this.state.viewRef}
                        />
                        <View>
                            { this.props.avatar === null ?
                                <Image source={require('./img/UserDafault.png')} style={styles.avatar}></Image> :
                                <Image style={styles.avatar} source={{uri:AVATAR+this.props.avatar}} />
                            }
                        </View>
                        <Text style={{color:'white',backgroundColor: 'transparent'}}>你好，{this.props.username===null?this.state.myResponse:this.props.username}</Text>
                        <View style={{flexDirection: 'row',}}>
                            <TouchableOpacity
                                style={styles.bottomAvatar}
                                onPress={this.pickSingle.bind(this)}>
                                <Text style={styles.bottomAvatarText}>头像上传</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomAvatar}
                                onPress={this.props.toEdit}>
                                <Text style={styles.bottomAvatarText}>编辑信息</Text>
                            </TouchableOpacity>
                        </View>
                </Image>

                <View style={styles.container}>
                    <ScrollableTabView
                        style={{height:50}}
                        renderTabBar={()=><DefaultTabBar backgroundColor='#eee' />}
                        tabBarPosition='top'
                    >
                        <ScrollView tabLabel='基本信息'>
                            <BaseInfo name = '基本信息' ref="baseInfo" baseResponse={this.props.userResponse}/>
                        </ScrollView>
                        <ScrollView tabLabel='工作信息'>
                            <BaseInfo name = '工作信息' ref="baseInfo" baseResponse={this.props.userResponse}/>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
    //backgroundColor='rgba(255, 255, 255, 0.7)'这个是原来的tabBar,透明色，透明度为0.7。
    fetchData(){
        var response;
        return new Net().getMethod(INFO).then((responseData) => {
            response = responseData.response;
            console.log(response);
            return this.setState({
                myResponse:response,
                avatarSource:response.avatar,
                pleaseLogin:response.name,
            });

        })
            .catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
    }

    pickSingle(){
        if(this.props.avatar === null){
            ToastAndroid.show('请先登录', ToastAndroid.SHORT)
        }else {
            myImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                this.setState({
                    image:image.path,
                });
                this.updateAvatar(image.path);
            }).catch(e => {
                console.log('Error:'+e);
            });
        }
    }

    updateAvatar(url){
        new Net().postFile(UPLOAD,url)
            .then((data) => {
                this.fetchData();
            }).catch(error => {
            alert("error message:"+ error);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    avatar:{
        borderRadius:40,
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        marginTop:30,
        marginBottom: 5,
    },
    userBackground:{
        height:180,
        width:device.width,
        alignItems: 'center',
    },

    blurView: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },
    bottomAvatar:{
        borderRadius:10,
        borderWidth:1,
        borderColor:'white',
        padding:5,
        marginRight:3,
    },
    bottomAvatarText:{
        color:'white',
        marginRight:10,
        marginLeft:10,
        backgroundColor: 'transparent',
    },
});