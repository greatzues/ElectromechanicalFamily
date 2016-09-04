/**
 * Created by zues on 2016/8/31.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, DrawerLayoutAndroid, TouchableOpacity, Navigator } from 'react-native';

export default class NewsItem extends Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.itemImage}>
                    <Image source={require('./img/logo.jpg')}  style={{borderRadius:15, height:60, width:60}}/>
                    <Text style={styles.itemText}>AP08335常胜涛</Text>

                    <Text style={[styles.itemText, {marginLeft:20}]}>AP08335常胜涛</Text>
                </View>
                <View><Text style={{fontSize:20, fontWeight:'200'}}>邑大要和东湖打通了，大家怎么看</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderRadius:5,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth:5,
        borderColor:'black',
    },
    itemImage: {

        flexDirection: 'row',
        marginTop:40,
        marginLeft:20,
        marginRight:20,
    },
    itemText:{
        backgroundColor:'#337ab7',
        borderWidth:2,
        borderRadius:2,
        borderColor: 'blue',
        padding:3
    },
});