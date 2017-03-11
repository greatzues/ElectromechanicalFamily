/**
 * Created by zues on 2016/10/19.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Navigator, TouchableOpacity, WebView, TextInput, Linking } from 'react-native';
import NormalToolbar from './NormalToolbar';
import { Icon } from 'react-native-elements'
import Net from '../Tool';

var HEADER = '#e9eaed';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var startInLoadingState = true;


export default class BanerWebview extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            url: this.props.uri,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
            inputText: '',
        };
      }

    handleTextInputChange(event) {
        this.setState({
            inputText : event.nativeEvent.text
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NormalToolbar title={this.state.status} leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>

                <WebView
                    ref="webview"
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.props.uri}}
                    javaScriptEnabledAndroid={true}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    startInLoadingState={startInLoadingState}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
                <View style={[styles.addressBarRow]}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <View style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Icon
                                name='keyboard-arrow-left'
                                color='white' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.goForward.bind(this)}>
                        <View style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Icon
                                name='keyboard-arrow-right'
                                color='white' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.reload.bind(this)}>
                        <View style={styles.refreshButton}>
                            <Icon
                                name='refresh'
                                color='white' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.openWithOther.bind(this,this.state.url)}>
                        <View style={styles.refreshButton}>
                            <Icon
                                name='open-in-browser'
                                color='white' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    goBack() {
        this.refs.webview.goBack();
    }

    goForward() {
        this.refs.webview.goForward();
    }

    reload() {
        this.refs.webview.reload();
    }

    onNavigationStateChange(navState) {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    }

    onSubmitEditing(event) {
        this.pressGoButton();
    }

    pressGoButton() {
        var url = this.inputText.toLowerCase();
        if (url === this.state.url) {
            this.reload();
        } else {
            this.setState({
                url: url,
            });
        }
        // dismiss keyoard
        this.refs.TEXT_INPUT_REF.blur();
    }

    back(){
        new Net().back(this.props);
    }

    openWithOther(url){
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HEADER,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 5,
        alignItems:'center',
        backgroundColor:'#0072f6',
        justifyContent:'space-between',
        width:device.width,
    },
    webView: {
        backgroundColor: BGWASH,
        height: 350,
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: device.width*0.2,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: device.width*0.2,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 3,
    },
    refreshButton: {
        width: device.width*0.2,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 3,
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'black',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
});