/**
 * Created by zues on 2016/9/27.
 */
import React,{ Component } from 'react';
import {View, Text, StyleSheet, Navigator, ListView, Image, Dimensions, TouchableOpacity, WebView } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar'

const AVATAR_SIZE = 120;
const DETAIL = '/news/';
export default class DetailPage extends Component{
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
            <View>
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
        new Net().getMethod(DETAIL+this.props.id).then(r => {
            this.setState({
                title:r.title,
                summary:r.summary,
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
        marginBottom:5
    },
});