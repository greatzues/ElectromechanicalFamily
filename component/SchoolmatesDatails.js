/**
 * Created by zues on 2017/1/17.
 */
import React,{ Component } from 'react';
import {View, Text, StyleSheet, Navigator, ListView, Image, Dimensions, TouchableOpacity, WebView, ScrollView } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar'

const DETAIL = '/schoolmates/';
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
            <ScrollView style={styles.container}>
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
            </ScrollView>
        );
    }

    fetchData(){
        new Net().getMethod(DETAIL+this.props.id).then(r => {
            this.setState({
                title:r.title,
                cover:r.cover,
                detail:r.detail,
            })
        }).catch(error =>{
            alert('error is :'+error);
            console.error(error);
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
    },
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    }
});