/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, TouchableOpacity, AsyncStorage, BackAndroid, Platform, StatusBar } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import DrawerLayout from 'react-native-drawer-layout';
import {Icon } from 'react-native-elements'
import Users from './Users';
import Home from './Home';
import Login from './Login';
import EditInfo from './EditInfo';
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
import ClassGround from './ClassGround';
import Toast from 'react-native-root-toast';
import ChangePassword from './ChangePassword';
import GetPersonalMessages from './GetPersonalMessages'

const LOGIN = '/students/login';
const INFO = '/students/getinfo';
const AVATAR = '/avatar/';
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
                    changPassword={this.changPassword.bind(this)}
                    avatar={BASEURL+AVATAR+this.state.avatar}
                    username={this.state.username}
                    refresh={this.reRenderData.bind(this)}
                    myShare={this.myShare.bind(this)}
                />
            </View>
        );

        return(
            <DrawerLayout
                ref="drawer"
                drawerWidth={250}
                renderNavigationView={() => navigationView}
                drawerLockMode={this.state.refresh===false?'locked-closed':'unlocked'}>
                <StatusBar
                    backgroundColor="#0072f6"
                    barStyle="light-content"
                />
            <TabNavigator>
                <TabNavigator.Item
                    title = "主页"
                    selected = {this.state.selectTab === 'home'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Icon name='home' color="grey"/> }
                    renderSelectedIcon ={() => <Icon name='home' color='#0072f6' /> }
                    onPress={() => this.setState({selectTab:'home'})}>
                    <Home toLogin={this.toLogin.bind(this)}
                          title= "机电E家人"
                          toXiaoYouIntro={this.toSchoolmates.bind(this)}
                          bannerClick={this.bannerClick.bind(this)}
                          toBriefNews={this.toBriefNews.bind(this)}
                          toJdInform={this.toJdInform.bind(this)}
                          ShareToClass={this.toShare.bind(this,this.state.classNumber)}
                          ShareToGround={this.toShare.bind(this,0)}
                          toMyClass={this.toMyClass.bind(this,this.state.classNumber)}
                          toJDGround={() => this.setState({selectTab:'new'})}
                    />
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "小广场"
                    selected = {this.state.selectTab === 'new'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Icon name='toys' color="grey"/> }
                    renderSelectedIcon ={() => <Icon name='toys' color='#0072f6' /> }
                    onPress={() => this.setState({selectTab:'new'})}>
                    <LittleGround id={this.state.id} parent={this.props} username={this.state.username}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我的班级"
                    selected = {this.state.selectTab === 'myClass'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Icon name='class' color="grey"/> }
                    renderSelectedIcon ={() => <Icon name='class' color='#0072f6' /> }
                    onPress={() => this.setState({selectTab:'myClass'})}>
                    <GetClassInfo getStudentInfo={this.getStudentInfo.bind(this)} classNumber={this.state.classNumber}
                                  parent={this.props} ifLogin={this.state.refresh}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我"
                    selected = {this.state.selectTab === 'user'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Icon name='user-circle' color="grey" type='font-awesome'/> }
                    renderSelectedIcon ={() => <Icon name='user-circle' color="#0072f6" type='font-awesome'/> }
                    onPress={() => this.setState({selectTab:'user'})}>
                    <Users toEdit={this.toEdit.bind(this)}
                           user={this.state.refresh===false?null:this.state.response}
                           avatar={this.state.refresh===false?null:this.state.avatar}
                           username={this.state.refresh===false?null:this.state.username}
                           parent={this.props}
                           ifLogin={this.state.refresh}/>
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
        this.refs.drawer.openDrawer();
    }

    //重新渲染更新之后的getInfo数据和自动登录之后的getInfo数据
    reRenderData(ifRefresh){
        if(ifRefresh === true){
           return new Net().getMethod(INFO).then((r) => {
               console.log(r)
                this.setState({
                    username:r.response.realname,
                    avatar:r.response.avatar,
                    classNumber:r.response.classNumber,
                    id:r.response.id,
                    response:r.response,
                    refresh:true
                });
            }).catch(error => {
                console.log(error);
            });
        }else {
            this.autoLogin();
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
        Toast.show('再按一次确认退出应用');
        return true;
    }

    quitLogin(){
        storage.remove({key: 'loginState'});
        // new Net().toOther(this.props,'Login',Login);
        // new Net().toOther(this.props,'Login',Login);
        // this.refs.drawer.closeDrawer();

        const { navigator } = this.props;
        navigator.resetTo({name:'Login',component:Login});
    }

    autoLogin(){
        new Net().loadKey('loginState').then(r => {
            if(r.username){
                new Net().postLoginMethod(LOGIN,r.username,r.password).then((responseData) => {
                    this.setState({refresh:true});
                    this.reRenderData(true);
                }).catch(error => {
                    Toast.show("网络出现错误");
                });
            }
        }).catch(e => {
            this.setState({refresh:false});
        })
    }

    toEdit(){
        var params = {id:this.state.id,update:(ifRefresh) => this.reRenderData(ifRefresh),user:this.state.response};
        new Net().toOther(this.props,'EditInfo',EditInfo,params);

    }

    toShare(classNumber){
        var params = {id:this.state.id,update:(ifRefresh) => this.reRenderData(ifRefresh),classNumber:classNumber};
        new Net().toOther(this.props, 'EditMessage',EditMessage,params);
    }

    getStudentInfo(id){
        var params ={id:id};
        new Net().toOther(this.props,'GetStudentInfo', GetStudentInfo,params);
    }

    toMyClass(classNumber){
        var params = {classNumber:classNumber,parent:this.props, ifLogin:this.state.refresh, username:this.state.username};
        new Net().toOther(this.props,'ClassGround', ClassGround, params);
    }

    changPassword(){
        var params = {update:(ifRefresh) => this.reRenderData(ifRefresh)};
        new Net().toOther(this.props,'ChangePassword', ChangePassword, params);
    }

    myShare(){
        new Net().toOther(this.props, 'GetPersonalMessages',GetPersonalMessages);
        this.refs.drawer.closeDrawer();
    }
}

const styles = StyleSheet.create({
    seletedTextStyle:{
        color: '#0072f6',
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