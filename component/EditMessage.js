/**
 * Created by zues on 2016/10/23.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity,
    ActivityIndicator,Navigator, Dimensions, Alert } from 'react-native';
import Net from '../Net';
import Toolbar from './Toolbar';

//仿微信朋友圈
var toolbarActions = [
    {title: 'send', icon: require('./../img/share.png'), show: 'always'},
];
export default class EditMessage extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    render(){
        return(
            <View>
                <Toolbar
                    title="班级圈"
                    navIcon = {require('../img/back.png')}
                    click={this.click.bind(this)}
                    actions={toolbarActions}
                    onActionSelected={this.onActionSelected.bind(this)}
                />

            </View>
        );
    }

    onActionSelected(position){
        //当一个功能被选中的时候调用这个回调
        switch (position){
            case 0:
                //此处编写消息发布,如果消息为空弹出toast

                break;
        }
    }

    send(){
        return(
            <TouchableOpacity>
                <View style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>分享</Text>
                </View>
            </TouchableOpacity>
        );
    }
    //确认退出编辑
    click(){
        Alert.alert(
            '退出编辑',
            '确认退出编辑，退出后编辑的文字就不在保存',
            [
                {text:'取消', onPress: () => console.log("Cancel quit")},
                {text:'确定', onPress: () => this.back()}
            ]
        )
    }

    back(){
        const { navigator } = this.props;
        if (navigator){
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    sendButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#337ab7',
        borderRadius:10,
    },
    sendButtonText:{
        fontSize:15,
        color:'white',
    }

});