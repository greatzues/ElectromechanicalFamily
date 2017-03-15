/**
 * Created by zues on 2016/9/30.
 */
import React, { Component } from 'react';
import { WebView, View, Text, StyleSheet, ListView, Image, Dimensions, ScrollView, findNodeHandle, TouchableOpacity } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Net from '../Tool';
import BaseInfo from '../component/BaseInfo';

const AVATAR = '/avatar/';
export default class GetStudentInfo extends Component{
    constructor(props){
        super(props);
        this.state ={
            response:{},
            avatarSource:null,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Image
                    source={this.state.avatarSource===null?require('../img/UserBackground.jpg'):{uri:BASEURL+AVATAR+this.state.avatarSource}}
                    style={styles.userBackground}>
                        <View>
                            <Image style={styles.avatar}
                               source={this.state.avatarSource===null?require('../img/UserBackground.jpg'):{uri:BASEURL+AVATAR+this.state.avatarSource}}
                            />
                        </View>
                        <TouchableOpacity onPress={this.back.bind(this)}  style={styles.back}>
                            <Image source={require('../img/back.png')}/>
                        </TouchableOpacity>
                </Image>

                <View style={styles.container}>
                    <ScrollableTabView
                        style={{height:40}}
                        renderTabBar={()=><DefaultTabBar backgroundColor='#eee' />}
                        tabBarPosition='overlayTop'
                    >
                        <ScrollView tabLabel='基本信息'>
                            <BaseInfo name = '基本信息' ref="baseInfo" baseResponse={this.state.response}/>
                        </ScrollView>
                        <ScrollView tabLabel='工作信息'>
                            <BaseInfo name = '工作信息' ref="baseInfo" baseResponse={this.state.response}/>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        var URL='/students/'+this.props.id;
        new Net().getMethod(URL).then((r) => {
            this.setState({
                response:r,
                avatarSource:r.avatar,
            });
        })
    }

    back(){
        new Net().back(this.props);
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
        marginTop:50,
        marginBottom: 10,
    },
    userBackground:{
        height:180,
        width:device.width,
        alignItems: 'center',
    },

    input:{
        flexDirection: 'row',
        width:device.width,
        alignItems:'center',
        margin:10,
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },

    blurView: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },
    back:{
        position:'absolute',
        left: 10,
        top: 15,
        bottom: 0,
        right: 0
    },
});
