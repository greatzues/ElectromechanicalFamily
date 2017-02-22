/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, DrawerLayoutAndroid, TouchableOpacity, Navigator, ScrollView, Modal } from 'react-native';
import PicBanner from './PicBanner';
import NormalToolbar from './NormalToolbar';
import {Icon } from 'react-native-elements';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            absence : '签到',
            buttonClick : null,
            modalVisible: false,
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
                    rightItemFunc={this._setModalVisible.bind(this, true)}/>
                <View><PicBanner bannerClick={this.props.bannerClick}/></View>
                <View style={styles.body}>
                    <TouchableOpacity onPress={this.props.toJDGround}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(30,144,255,0.5)'}]}>
                            <Icon reverse name='social-instagram' type='simple-line-icon' color='transparent'/>
                            <Text style={styles.text}>校友小广场</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toMyClass}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(0,139,69,0.5)'}]}>
                            <Icon reverse name='home' type='simple-line-icon' color='transparent'/>
                            <Text style={styles.text}>我的班级，我的家</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toBriefNews}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(255,106,106,0.5)'}]}>
                            <Icon reverse name='volume-2' type='simple-line-icon' color='transparent'/>
                            <Text style={styles.text}>机电简讯</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toJdInform}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(186,85,211,0.5)'}]}>
                            <Icon reverse name='bubble' type='simple-line-icon' color='transparent'/>
                            <Text style={styles.text}>机电通知</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.toXiaoYouIntro}>
                        <View style = {[styles.textStyle,{backgroundColor:'rgba(205,102,0,0.5)'}]}>
                            <Icon reverse name='trophy' type='simple-line-icon' color='transparent'/>
                            <Text style={styles.text}>校友风采</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this._setModalVisible(false)}}
                >
                    <View style={[styles.modalContainer, {backgroundColor:'rgba(0, 0, 0, 0.5)'}]}>
                        <View style={[styles.innerContainer, {backgroundColor: '#fff', padding: 20}]}>
                            <TouchableOpacity style={styles.modalText} onPress={this.ShareToClass.bind(this)}><Text>分享到班级</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modalText} onPress={this.ShareToGround.bind(this)}><Text>分享到广场</Text></TouchableOpacity>
                            <ModalButton
                                onPress={this._setModalVisible.bind(this, false)}
                                style={styles.modalButton}>
                                关闭
                            </ModalButton>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    ShareToClass(){
        this._setModalVisible(false);
        this.props.ShareToClass()
    }

    ShareToGround(){
        this._setModalVisible(false);
        this.props.ShareToGround()
    }
}

class ModalButton extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {active: false};
    }

    _onHighlight() {
        this.setState({active: true});
    }

    _onUnhighlight() {
        this.setState({active: false});
    }

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableOpacity
                onHideUnderlay={this._onUnhighlight.bind(this)}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight.bind(this)}
                style={[styles.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop:5,
        borderRadius: 5,
        height: 65,
        width: device.width-5,
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
    modalText: {
        paddingBottom:10
    },
});