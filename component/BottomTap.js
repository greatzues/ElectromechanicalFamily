/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, DeviceEventEmitter, DrawerLayoutAndroid, AsyncStorage, ToastAndroid, BackAndroid } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Users from '../Users';
import Home from '../Home';
import Login from './Login';
import EditUserInfo from './EditUserInfo';
import Net from '../Tool';
import DrawerView from './DrawerView';
import JDGround from './JDGround';
import DetailPage from './DetailPage';
import GetClassInfo from './GetClassInfo';
import NewsItem from '../NewsItem';
import XiaoYouIntroduce from './XiaoYouIntroduce';
import BanerWebview from './BanerWebview';
import NewsGround from './NewsGround';
import EditMessage from './EditMessage';
import GetStudentInfo from './GetStudentInfo';

var toolbarActions = [
    {title: 'Create', icon: require('./../img/write.png'), show: 'always'},
    {title: 'Filter', icon: require('./../img/write.png'), show: 'never'},
    {title: 'Settings', icon: require('./../img/fav.png'), show: 'never'},
];
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

    componentWillUnmount(){
        this.subscription.remove();
    };

    render(){
        var navigationView = (
            <View style={{ backgroundColor: '#eee'}}>
                <DrawerView
                    quitLogin={this.quitLogin.bind(this)}
                    quitApp={this.quitApp.bind(this)}
                    avatar={this.state.avatar}
                    username={this.state.username}
                />
            </View>
        );

        return(
            <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
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
                    <Home homeClick={this.toLogin.bind(this)}
                          title= "机电E家人"
                          onActionSelected={this.onActionSelected.bind(this)}
                          actions={toolbarActions}
                          toBriefNews={this.toBriefNews.bind(this)}
                          toJDGround={this.toJDGround.bind(this)}
                          toXiaoYouIntro={this.toXiaoYouIntro.bind(this)}
                          bannerClick={this.bannerClick.bind(this)}
                    />
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "新闻广场"
                    selected = {this.state.selectTab === 'new'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/discover.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/discover_highlighted.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'new'})}>
                    <NewsGround/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我"
                    selected = {this.state.selectTab === 'user'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/me_normal.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/me_hight.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'user'})}>
                    <Users toEdit={this.toEdit.bind(this)} ref="user" userResponse={this.state.response}
                           avatar={this.state.avatar} username={this.state.username}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我的班级我的家"
                    selected = {this.state.selectTab === 'myClass'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/myClass.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/myClass_selected.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'myClass'})}>
                    <GetClassInfo getStudentInfo={this.getStudentInfo.bind(this)} getClass={this.state.classNumber}/>
                </TabNavigator.Item>
            </TabNavigator>
            </DrawerLayoutAndroid>
        );
    }

    //轮播图超链接
    bannerClick(uri){
        var params = {uri:uri};
        new Net().toOther(this.props,'BanerWebview',BanerWebview, params);
    }

    toXiaoYouIntro(){
        new Net().toOther(this.props,'XiaoYouIntroduce',XiaoYouIntroduce);
    }

    toJDGround(){
        new Net().toOther(this.props,'JDGround',JDGround);
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
            new Net().getMethod(INFO).then((r) => {
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
        return null;
    }

    toBriefNews(){
        new Net().toOther(this.props, 'NewsItem',NewsItem);
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
        new Net().toOther(this.props,'Login',Login,null);
        this.refs.drawer.closeDrawer();
    }

    autoLogin(){
        new Net().loadKey('loginState').then(r => {
            new Net().postLoginMethod(LOGIN,r.username,r.password).then((responseData) => {
                this.setState({refresh:true})
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
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            console.log(e);
        })
    }

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        switch (position){
            case 0:
                //此处编写消息发布
                new Net().toOther(this.props, 'EditMessage',EditMessage);
                break;
            case  1:
                //此处留下来扩展功能
                alert('this is the '+ (position+1));


                break;
            case  2:
                //此处留下来扩展功能
                alert('this is the '+ (position+1));


                break;
        }
    }

    getStudentInfo(id){
        var params ={id:id};
        new Net().toOther(this.props,'GetStudentInfo', GetStudentInfo,params);
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
});