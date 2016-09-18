/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import SchoolNews from './SchoolNews';
import Users from '../Users';
import Home from '../Home';
import Login from './Login';
import EditUserInfo from './EditUserInfo';
import MyListView from './MyListView'

var toolbarActions = [
    {title: 'Create', icon: require('./../img/fav.png'), show: 'always'},
    {title: 'Filter', icon: require('./../img/write.png'), show: 'never'},
    {title: 'Settings', icon: require('./../img/fav.png'), show: 'never'},
];
export default class BottomTap extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectTab: 'home',
        }
    };

    render(){
        return(
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
                    <MyListView
                    />
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我"
                    selected = {this.state.selectTab === 'user'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./../img/me_normal.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./../img/me_hight.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'user'})}>
                    <Users toEdit={this.toEdit.bind(this)}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
//<Users toEdit={this.toEdit.bind(this)}/> 先放在这里测试一下listview
    click(){
        // this.refs.toolbar.onIconClicked();
        const { navigator } = this.props;
        if( navigator ) {
            navigator.push({
                name: 'Login',
                component: Login,
            })
        }
    }

    toEdit(){
        const { navigator } = this.props;
        if( navigator ) {
            navigator.push({
                name: 'EditUserInfo',
                component: EditUserInfo,
            })
        }
    }

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        alert('this is the '+ (position+1));
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