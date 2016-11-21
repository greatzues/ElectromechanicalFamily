/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, DrawerLayoutAndroid, TouchableOpacity, Navigator } from 'react-native';

import PicBanner from './component/PicBanner';
import Toolbar from './component/Toolbar';
import Net from './Net';
const deviceWidth = Dimensions.get('window').width;

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            absence : '签到',
            buttonClick : null,
        };
    }

    render() {
        return (
            <View>
                <Toolbar  click = {this.props.homeClick}
                          title= {this.props.title}
                          navIcon = {require('./img/homeTop1.png')}
                          onIconClicked={this.props.click}
                          onActionSelected={this.props.onActionSelected}
                          actions={this.props.actions}
                          logo={require('./img/homeTop2.png')}
                />

                <View><PicBanner bannerClick={this.props.bannerClick}/></View>
                <View style={styles.body}>
                    <TouchableOpacity onPress={this.props.toJDGround}>
                        <View style = {[styles.textStyle,{backgroundColor:'#bcd3eb'}]}>
                            <Image source={require('./img/JDGround.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>机电广场</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toBriefNews}>
                        <View style = {[styles.textStyle,{backgroundColor:'#ebd3bc'}]}>
                            <Image source={require('./img/JDJianXun.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>机电简讯</Text>
                        </View>
                    </TouchableOpacity>

                     <TouchableOpacity onPress={this.props.toXiaoYouIntro}>
                        <View style = {[styles.textStyle,{backgroundColor:'#ebeabc'}]}>
                            <Image source={require('./img/JDXiaoYou.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>校友风采</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderTop(){
        return(
            <View style={{height:30}}>
                <Image source={require('./../img/homeTop2.png')} style={{height:10,width:60}}></Image>
            </View>
        );
    }
//此处编写签到逻辑
    absence(){
        var URL = '/student/sign';
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        if(day<10){
            day = "0"+date.getDate();
        }
        if(month<10){
            month = "0"+ date.getMonth();
        }
        var post = date.getFullYear()+''+month+''+day;
        var postData = {date:post};
        console.log(postData);
        new Net().postMethod(URL,postData).then((responseData) => {
            console.log(responseData.status);
        }).catch(error => {
            alert("网络出现错误");
            console.error(error);
        });
        return this.setState({absence : '已签到'});
    }
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop:5,
        borderRadius: 5,
        height: 65,
        width: deviceWidth,
        backgroundColor: '#eee',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center'
    },

    text: {
        fontSize: 20,
        fontWeight:'200',
    },

    drawerTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    drawerLayoutAndroidView: {
        flexDirection:'row',
        flex: 1,
        width: deviceWidth,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#eee',
        borderRadius: 5,
        marginTop:5,
        borderColor:'#c1c1c1',
        borderWidth:1,

    },

    drawerLayoutAndroidText: {
        margin: 10,
        textAlign: 'left',
        fontSize: 20,
        fontWeight:'200',
        justifyContent:'center'
    },
    body:{
        flex:1,
    },
    itemImage:{
      height:50,
        width:50,
    },
    toLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'flex-end',
        marginLeft:5,
        marginRight:20,
    },
});