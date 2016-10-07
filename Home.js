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
        var navigationView = (
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.text,{marginTop: 20,color:'grey'}]} onPress={this.absence.bind(this)}>{this.state.absence}</Text>
            </View>
        );

        return (
            <View>

                <Toolbar  click = {this.props.homeClick}
                          title= {this.props.title}
                          navIcon = {this.props.navIcon}
                          onIconClicked={this.props.click}
                          onActionSelected={this.props.onActionSelected}
                          actions={this.props.actions}/>

                <View><PicBanner/></View>
                <TouchableOpacity>
                    <View style = {styles.textStyle}>
                        <Text style={styles.text}>机电小广场</Text>
                    </View>
                </TouchableOpacity>
                <View style={{height: 65}}>
                    <DrawerLayoutAndroid
                        drawerWidth={100}
                        drawerPosition={DrawerLayoutAndroid.positions.Right}
                        renderNavigationView={() =>navigationView}>

                            <TouchableOpacity style={styles.drawerLayoutAndroidView} onPress={this.props.toMyClass}>
                                <View ><Text style={styles.drawerLayoutAndroidText}>我的班级我的家</Text></View>
                                <View style={{flexDirection: 'row',alignItems: 'center',alignSelf:'stretch',marginLeft:5,marginRight:20}}>
                                    <Text>左划签到</Text>
                                    <Image source={require('./img/arrow_left.png')} style={{height: 12}}></Image>
                                </View>
                            </TouchableOpacity>

                    </DrawerLayoutAndroid>
                </View>

                <TouchableOpacity onPress={this.props.toBriefNews}>
                    <View style = {styles.textStyle}><Text style={styles.text}>机电简讯</Text></View>
                </TouchableOpacity>

                 <TouchableOpacity>
                    <View style = {styles.textStyle}><Text style={styles.text}>校友风采</Text></View>
                </TouchableOpacity>
            </View>
        );
    }



    absence(){
        //此处编写签到逻辑
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
        justifyContent: 'center',
        borderColor:'#c1c1c1',
        borderWidth:1,
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
});