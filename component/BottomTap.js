/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, TouchableOpacity, AsyncStorage, ToastAndroid, BackAndroid, Platform } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import DrawerLayout from 'react-native-drawer-layout';

import Users from '../Users';
import Home from '../Home';
import Login from './Login';
import EditUserInfo from './EditUserInfo';
import Net from '../Tool';
import DrawerView from './DrawerView';
import BriefNews from './BriefNews';
import GetClassInfo from './GetClassInfo';
import Notifications from './Notifications';
import Schoolmates from './Schoolmates';
import BanerWebview from './BanerWebview';
import EditMessage from './EditMessage';
import GetStudentInfo from './GetStudentInfo';
import LittleGround from './LittleGround';
import ClassGround from './ClassGround'

const LOGIN = '/students/login';
const INFO = '/students/getinfo';
export default class BottomTap extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectTab: 'home',
            avatar:null,
            username:null,
            refresh:false,
            response:null,
            classNumber:null,
        };
    };

    componentDidMount() {
        this.autoLogin();
    }

    render(){
        var navigationView = (
            <View style={{ backgroundColor: '#eee',flex:1}}>
                <DrawerView
                    quitLogin={this.quitLogin.bind(this)}
                    quitApp={this.quitApp.bind(this)}
                    avatar={this.state.avatar}
                    username={this.state.username}
                />
            </View>
        );

        return(
            <DrawerLayout
                ref="drawer"
                drawerWidth={250}
                renderNavigationView={() => navigationView}
                drawerLockMode={this.state.refresh===false?'locked-closed':'unlocked'}>
            <TabNavigator>
                <TabNavigator.Item
                    title = "主页"
                    selected = {this.state.selectTab === 'home'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/home.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/home_selected.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'home'})}>
                    <Home toLogin={this.toLogin.bind(this)}
                          title= "机电E家人"
                          toXiaoYouIntro={this.toSchoolmates.bind(this)}
                          bannerClick={this.bannerClick.bind(this)}
                          toBriefNews={this.toBriefNews.bind(this)}
                          toJdInform={this.toJdInform.bind(this)}
                          toShare={this.toShare.bind(this)}
                          toMyClass={this.toMyClass.bind(this,this.state.classNumber)}
                          toJDGround={() => this.setState({selectTab:'new'})}
                    />
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "小广场"
                    selected = {this.state.selectTab === 'new'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/discover.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/discover_highlighted.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'new'})}>
                    <LittleGround id={this.state.id} parent={this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我的班级"
                    selected = {this.state.selectTab === 'myClass'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/myClass.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/myClass_selected.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'myClass'})}>
                    <GetClassInfo getStudentInfo={this.getStudentInfo.bind(this)} classNumber={this.state.classNumber} parent={this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我"
                    selected = {this.state.selectTab === 'user'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/me_normal.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/me_hight.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'user'})}>
                    <Users toEdit={this.toEdit.bind(this)} userResponse={this.state.response}
                           avatar={this.state.avatar} username={this.state.username}/>
                </TabNavigator.Item>
            </TabNavigator>
            </DrawerLayout>
        );
    }

    //轮播图超链接
    bannerClick(uri){
        var params = {uri:uri};
        new Net().toOther(this.props,'BanerWebview',BanerWebview, params);
    }

    toSchoolmates(){
        new Net().toOther(this.props,'Schoolmates',Schoolmates);
    }

    toBriefNews(){
        new Net().toOther(this.props,'BriefNews',BriefNews);
    }

    toLogin(){
        storage.load({key:'loginState'}).then(r =>{
            this.refs.drawer.openDrawer();
        }).catch(e => {
            var params = {update:(ifRefresh) => this.reRenderData(ifRefresh)};
            new Net().toOther(this.props,'Login',Login,params);
            console.log(e);
        })
    }

    //重新渲染更新之后的getInfo数据和自动登录之后的getInfo数据
    reRenderData(ifRefresh){
        if(ifRefresh === true){
           return new Net().getMethod(INFO).then((r) => {
                this.setState({
                    username:r.response.realname,
                    avatar:r.response.avatar,
                    classNumber:r.response.classNumber,
                    id:r.response.id,
                    response:r.response
                });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    toJdInform(){
        new Net().toOther(this.props, 'Notifications',Notifications);
    }

    quitApp(){
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackAndroid.exitApp();
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次确认退出应用',ToastAndroid.SHORT);
        return true;
    }

    quitLogin(){
        storage.remove({key: 'loginState'});
        var params = {update:(ifRefresh) => this.reRenderData(ifRefresh)};
        new Net().toOther(this.props,'Login',Login,params);
        this.refs.drawer.closeDrawer();
    }

    autoLogin(){
        new Net().loadKey('loginState').then(r => {
            new Net().postLoginMethod(LOGIN,r.username,r.password).then((responseData) => {
                this.setState({refresh:true});
                this.reRenderData(true);
            }).catch(error => {
                alert("网络出现错误");
                console.error(error);
            });
        }).catch(e => {
            console.log(e);
        })
    }

    toEdit(){
        new Net().loadKey('loginState').then(r => {
            if(r.username){
                var params = {id:this.state.id,update:(ifRefresh) => this.reRenderData(ifRefresh)};
                new Net().toOther(this.props,'EditUserInfo',EditUserInfo,params);
            }
        }).catch(e => {
            if(Platform.OS === 'ios'){
                alert('请先登录');
            }
            if(Platform.OS === 'android'){
                ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            }
            console.log(e);
        });
        // var params = {id:this.state.id,update:(ifRefresh) => this.reRenderData(ifRefresh)};
        // new Net().toOther(this.props,'EditUserInfo',EditUserInfo,params);
    }

    toShare(){
        new Net().loadKey('loginState').then(r => {
            if(r.username){
                var params = {id:this.state.id,update:(ifRefresh) => this.reRenderData(ifRefresh)};
                new Net().toOther(this.props, 'EditMessage',EditMessage,params);
            }
        }).catch(e => {
            if(Platform.OS === 'ios'){
                alert('请先登录');
            }
            if(Platform.OS === 'android'){
                ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            }
            console.log(e);
        });
    }

    getStudentInfo(id){
        var params ={id:id};
        new Net().toOther(this.props,'GetStudentInfo', GetStudentInfo,params);
    }

    toMyClass(classNumber){
        var params = {classNumber:classNumber,parent:this.props}
        new Net().toOther(this.props,'ClassGround', ClassGround, params);
    }
}

const styles = StyleSheet.create({
    seletedTextStyle:{
        color: 'black',
    },
    textStyle: {
        color:'#999',
    },
    iconStyle: {
        width:26,
        height:26,
    },

    navContainer: {
        backgroundColor: '#81c04d',
        paddingTop: 12,
        paddingBottom: 8,
    },
    // 导航栏文字
    headText: {
        color: '#ffffff',
        fontSize: 22
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginLeft: 13
    },
    // 右面导航按钮
    rightNavButtonText: {
        color: '#ffffff',
        fontSize: 18,
        marginRight: 13
    },
    // 标题
    title: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        flex: 1                //Step 3
    }
});