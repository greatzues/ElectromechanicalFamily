/**
 * Created by zues on 2016/10/19.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Navigator, TouchableOpacity, WebView, TextInput } from 'react-native';

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
            <View style={[styles.container]}>
                <View style={[styles.addressBarRow]}>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <View style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Text>
                                {'<'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goForward.bind(this)}>
                        <View style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Text>
                                {'>'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        ref={TEXT_INPUT_REF}
                        autoCapitalize="none"
                        value={this.state.url}
                        onSubmitEditing={this.onSubmitEditing.bind(this)}
                        onChange={this.handleTextInputChange.bind(this)}
                        clearButtonMode="while-editing"
                        style={styles.addressBarTextInput}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity onPress={this.toHome.bind(this)}>
                        <View style={styles.goButton}>
                            <Text>
                                返回
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

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
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.status}</Text>
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

    toHome(){
        const { navigator } = this.props;
        if (navigator){
            navigator.popToTop();
        }
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HEADER,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
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
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
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