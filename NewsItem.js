/**
 * Created by zues on 2016/8/31.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, DrawerLayoutAndroid, TouchableOpacity } from 'react-native';

export default class NewsItem extends Component {
    render(){
        return (
                <View style={styles.container}>
                    <View style={styles.cardTop}>
                        <Image source={require('./img/logo.jpg')}  style={{borderRadius:15, height:30, width:30,alignItems: 'center'}}/>
                        <View style={{flexDirection: 'column',marginLeft:10}}>
                            <Text style={{color:'#f5811f',fontSize:15}}>zues</Text>
                            <Text style={{color:'#a6acb1', fontSize:10}}>1小时前</Text>
                        </View>
                    </View>

                    <View style={styles.cardContent}>
                        <Text style={{fontSize:20, fontWeight:'200'}}>邑大要和东湖打通了，大家怎么看
                            邑大要和东湖打通了，大家怎么看邑大要和东湖打通了，大家怎么看邑大要和东湖打通了，大家怎么看</Text>
                    </View>

                    <View style={styles.cardBottom}>
                        <CardBottom src = {require('./img/share.png')} content="转发" styles={styles.cardBottomItem}/>
                        <CardBottom src = {require('./img/messages.png')} content="66" styles={[styles.cardBottomItem,{borderColor:'#a6acb1',borderLeftWidth:0.5,borderRightWidth:0.5}]}/>
                        <CardBottom src = {require('./img/good.png')} content="666" styles={styles.cardBottomItem}/>
                    </View>
                </View>
        );
    }
}

class CardBottom extends Component {
    render(){
        const {src,styles,content} = this.props;
        return(
            <View style={[this.props.styles,{flexDirection: 'row',justifyContent : 'center'}]}>
                <Image source={this.props.src} style={{height:15,width:15}}></Image>
                <Text style={{color:'#a6acb1',fontSize:10,marginLeft:5}} >{this.props.content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#a6acb1',
        flexWrap:'wrap',
        marginTop:10
    },

    cardTop: {
        flexDirection: 'row',
        alignSelf:'flex-start',
        alignItems:'center',
        margin:5,

    },

    cardContent: {
        alignSelf:'flex-start',
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        marginRight:5,
    },

    cardBottom: {
        flexDirection: 'row',
        borderColor:'#a6acb1',
        borderTopWidth:1,
        marginTop:3,
        marginBottom:3,
        justifyContent:'space-between',
    },

    cardBottomItem: {
        flex:0.5,
        alignItems: 'center',
        marginTop:5,
    },
});