/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, DrawerLayoutAndroid, AsyncStorage, ToastAndroid, BackAndroid } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Users from '../Users';
import Home from '../Home';
import Login from './Login';
import EditUserInfo from './EditUserInfo';
import MyListView from './MyListView';
import Net from '../Net';
import DrawerView from './DrawerView';
import JDGround from './JDGround';
import DetailPage from './DetailPage';
import GetClassInfo from './GetClassInfo';
import NewsItem from '../NewsItem';
import XiaoYouIntroduce from './XiaoYouIntroduce';
import BanerWebview from './BanerWebview';
import RNCollapsible from './RNCollapsible';

var toolbarActions = [
    {title: 'Create', icon: require('./../img/write.png'), show: 'always'},
    {title: 'Filter', icon: require('./../img/write.png'), show: 'never'},
    {title: 'Settings', icon: require('./../img/fav.png'), show: 'never'},
];

export default class BottomTap extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectTab: 'home',
        };
    };

    componentDidMount() {
        this.autoLogin();
    }

    render(){
        var navigationView = (
            <View style={{ backgroundColor: '#eee'}}>
                <DrawerView quitLogin={this.quitLogin.bind(this)} quitApp={this.quitApp.bind(this)} ref="drawerView"/>
            </View>
        );

        return(
            <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
            <TabNavigator>
                <TabNavigator.Item
                    title = "主页"
                    selected = {this.state.selectTab === 'home'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/home.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/home_selected.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'home'})}>
                    <Home homeClick={this.click.bind(this)}
                          title= "机电E家人"
                          navIcon = {require('./../img/login.png')}
                          onActionSelected={this.onActionSelected.bind(this)}
                          actions={toolbarActions}
                          toBriefNews={this.toBriefNews.bind(this)}
                          toMyClass={this.toMyClass.bind(this)}
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
                    <RNCollapsible/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我"
                    selected = {this.state.selectTab === 'user'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/me_normal.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/me_hight.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'user'})}>
                    <Users toEdit={this.toEdit.bind(this)} ref="user"/>
                </TabNavigator.Item>
            </TabNavigator>
            </DrawerLayoutAndroid>
        );
    }
    //<MyListView Press={this.Press.bind(this)}/>

    bannerClick(uri){
        const { navigator } = this.props;
        if( navigator ) {
            navigator.push({
                name: 'BanerWebview',
                component: BanerWebview,
                params:{
                    uri:uri,
                }
            })
        }
    }

    toXiaoYouIntro(){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'XiaoYouIntroduce',
                component:XiaoYouIntroduce,
            })
        }
    }

    toJDGround(){
        const {navigator} = this.props;
        if (navigator){
            navigator.push({
                name:'JDGround',
                component:JDGround,
            })
        }
    }

    click(){
        // this.refs.toolbar.onIconClicked();
        var myResult = '';
        AsyncStorage.getItem('username',(error,result) => {
            myResult = result;
            if(myResult!==null){
                this.refs.drawer.openDrawer();
            }else{
                const { navigator } = this.props;
                if( navigator ) {
                    navigator.push({
                        name: 'Login',
                        component: Login,
                        params:{
                            callback:() => this.reRenderData(),
                        }
                    })
                }
            }
        });

    }

    toMyClass(){
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'GetClassInfo',
                component:GetClassInfo,
            });
        }
    }

    Press(id){
        console.log(id);
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'DetailPage',
                component:DetailPage,
                params:{
                    id:id,
                }
            });
        }
    }

    reRenderData(){
        this.setState({selectTab:'home'});
        this.refs.user.componentDidMount();
        this.refs.drawerView.componentDidMount();
    }

    toBriefNews(){
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name:'NewsItem',
                component:NewsItem,
            });
        }
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
        AsyncStorage.clear();
        const {navigator} = this.props;
        if(navigator){
            navigator.push({
                name: 'Login',
                component: Login,
            });
        }
        this.refs.drawer.closeDrawer();
    }

    autoLogin(){
        var URL = '/student/login';
        var username = '';
        var password = '';
        //分别拿到在AsyncStorage中储存的username和password，这里取的方式比较特别，是在数组里面取。
        AsyncStorage.multiGet(['username','password'],(error, result) => {
            username=result[0][1];
            password =result[1][1];
            new Net().postLoginMethod(URL,username,password).then((responseData) => {
                console.log(responseData.status);
            }).catch(error => {
                alert("网络出现错误");
                console.error(error);
            });
        });
    }

    toEdit(){
        var myResult = '';
        AsyncStorage.getItem('username',(error,result) => {
            myResult = result;
            if(myResult!==null){
                const { navigator } = this.props;
                if( navigator ) {
                    navigator.push({
                        name: 'EditUserInfo',
                        component: EditUserInfo,
                        params:{
                            callback:() => this.reRenderUserInfo(),
                        }
                    })
                }
            }else{
                alert('请先登录');
            }
        });

    }

    reRenderUserInfo(){
        this.refs.user.componentDidMount();
    }

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        switch (position){
            case 0:
                //此处编写消息发布
                alert('this is the '+ (position+1));


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