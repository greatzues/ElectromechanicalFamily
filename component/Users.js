/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, Navigator, findNodeHandle ,AsyncStorage, ToastAndroid } from 'react-native';
import Net from '../Tool';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import BaseInfo from './BaseInfo';
import PicDetail from './PicDetail'
import { Icon } from 'react-native-elements';


var BlurView = require('react-native-blur').BlurView;

const AVATAR = '/avatar/';
export default class Users extends Component {
    constructor(props){
        super(props);
        this.state ={
            pleaseLogin: '',
            myResponse:'请登录',
            viewRef:0,
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={this.props.ifLogin === false?require('./../img/UserBackground.jpg'): {uri:BASEURL+AVATAR+this.props.avatar}}
                    style={styles.userBackground}>
                        <View>
                            { this.props.ifLogin === false ?
                                <Image source={require('./../img/UserDafault.png')} style={styles.avatar}></Image> :
                                <TouchableOpacity onPress={this.toPicDetail.bind(this,this.props.avatar)}>
                                    <Image style={styles.avatar} source={{uri:BASEURL+AVATAR+this.props.avatar}} />
                                </TouchableOpacity>
                            }
                        </View>
                        <Text style={{color:'white',backgroundColor: 'transparent'}}>你好，{this.props.username===null?this.state.myResponse:this.props.username}</Text>
                        <View style={{marginTop:10}}>
                            <Text style={{color:'white'}}>个性签名：{this.props.ifLogin === false?'请登录':this.props.user.others === null?'我就是我，不一样的烟火':this.props.user.others}</Text>
                        </View>
                    <TouchableOpacity style={styles.set} onPress={this.props.toEdit}>
                        <Icon name='settings' color="white"/>
                    </TouchableOpacity>
                </Image>

                <View style={styles.container}>
                    <ScrollableTabView
                        style={{height:50}}
                        renderTabBar={()=><DefaultTabBar backgroundColor='#eee' />}
                        tabBarPosition='top'>
                        <ScrollView tabLabel='基本信息'>
                            <BaseInfo name = '基本信息' ref="baseInfo" baseResponse={this.props.user}/>
                        </ScrollView>
                        <ScrollView tabLabel='工作信息'>
                            <BaseInfo name = '工作信息' ref="baseInfo" baseResponse={this.props.user}/>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }

    //放在首页去，然后一个地方数据更新之后其它的都修改过来
    // toEdit(user){
    //     let params = {user:user}
    //     new Net().toOther(this.props.parent,'EditInfo',EditInfo,params);
    // }

    toPicDetail(uri){
        let source = []
        source.push(uri);
        var params = {uri:source,index:1,path:BASEURL+'/avatar/'}
        new Net().toOther(this.props.parent,'PicDetail',PicDetail,params)
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
    set:{
        position: "absolute",
        top: 5,
        right: 5
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