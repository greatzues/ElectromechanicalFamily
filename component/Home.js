/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, DrawerLayoutAndroid, TouchableOpacity, Navigator, ScrollView } from 'react-native';
import PicBanner from './PicBanner';
import NormalToolbar from './NormalToolbar';

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
            <ScrollView>
                <NormalToolbar
                    title='机电E家人'
                    leftImageSource={require('./../img/login.png')}
                    rightItemTitle='分享'
                    rightTextColor='#3393F2'
                    leftItemFunc={this.props.toLogin}
                    rightItemFunc={this.props.toShare}/>
                <View><PicBanner bannerClick={this.props.bannerClick}/></View>
                <View style={styles.body}>
                    <TouchableOpacity onPress={this.props.toJDGround}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(30,144,255,0.5)'}]}>
                            <Image source={require('./../img/JDGround.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>校友小广场</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toMyClass}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(0,139,69,0.5)'}]}>
                            <Image source={require('./../img/JDMyClass.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>我的班级，我的家</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toBriefNews}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(255,106,106,0.5)'}]}>
                            <Image source={require('./../img/JDBriefNews.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>机电简讯</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toJdInform}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(186,85,211,0.5)'}]}>
                            <Image source={require('./../img/JDInform.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>机电通知</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toXiaoYouIntro}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(205,102,0,0.5)'}]}>
                            <Image source={require('./../img/JDXiaoYou.png')} style={styles.itemImage}/>
                            <Text style={styles.text}>校友风采</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop:5,
        borderRadius: 5,
        height: 65,
        width: device.width,
        backgroundColor: '#eee',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center'
    },

    text: {
        fontSize: 20,
        fontWeight:'200',
        color:'white',
    },

    drawerTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    drawerLayoutAndroidView: {
        flexDirection:'row',
        flex: 1,
        width: device.width,
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