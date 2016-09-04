/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import SchoolNews from './SchoolNews';
import Users from './Users';
import Home from './Home';
import Login from './Login';
import MyImagePicker from './myImagePicker'
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
                    renderIcon = {() => <Image source={require('./img/home.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./img/home_selected.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'home'})}>
                    <Home homeClick={this.click.bind(this)}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "新闻广场"
                    selected = {this.state.selectTab === 'new'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./img/discover.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./img/discover_highlighted.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'new'})}>
                    <SchoolNews/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title = "我"
                    selected = {this.state.selectTab === 'user'}
                    selectedTitleStyle = {styles.seletedTextStyle}
                    titleStyle ={styles.textStyle}
                    renderIcon = {() => <Image source={require('./img/me_normal.png')} style={styles.iconStyle}/> }
                    renderSelectedIcon ={() => <Image source={require('./img/me_hight.png')} style={styles.iconStyle}/> }
                    onPress={() => this.setState({selectTab:'user'})}>
                    <MyImagePicker/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

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