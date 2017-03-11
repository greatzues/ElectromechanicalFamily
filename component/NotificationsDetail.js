/**
 * Created by zues on 2017/1/17.
 */
import React,{ Component } from 'react';
import {View, Text, StyleSheet, ScrollView, ListView, Image, Dimensions, TouchableOpacity, WebView } from 'react-native';
import Net from '../Tool';
import Toast from 'react-native-root-toast';
import NormalToolbar from './NormalToolbar'

const DETAIL = '/notifications/';
export default class BriefNewsDetailPage extends Component{
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            title:'',
            summary:'',
            detail:'',
            scalesPageToFit: true,
            startInLoadingState: true,
        };
    }

    render(){
        return (
            <View style={{flex:1}}>
                <NormalToolbar
                    title={this.state.title}
                    leftImageSource={require('../img/back.png')}
                    leftItemFunc={this.back.bind(this)}/>

                <WebView
                    style={styles.webView}
                    source={{html:this.state.detail}}
                    scalesPageToFit={this.state.scalesPageToFit}
                    startInLoadingState={this.state.startInLoadingState}
                />
            </View>
        );
    }

    fetchData(){
        new Net().getMethod(this.props.url).then(r => {
            this.setState({
                title:r.title,
                cover:r.cover,
                detail:r.detail,
            })
        }).catch(error =>{
            Toast.show('网络出现异常');
        });
    }

    componentWillMount() {
        this.fetchData();
    }

    back(){
        new Net().back(this.props);
    }
}

const styles = StyleSheet.create({
    webView:{
        flex:1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: device.height-50,
        marginBottom:5
    },
});