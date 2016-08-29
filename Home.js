/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, DrawerLayoutAndroid, TouchableOpacity, Navigator } from 'react-native';

import PicBanner from './PicBanner';
import Toolbar from './Toolbar';
import Login from './Login';

const deviceWidth = Dimensions.get('window').width;
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            absence : '签到',
            buttonClick : null,
        };
    }

    render() {
        var navigationView = (
            <View >
                <Text style={[styles.text,{marginTop: 20}]} onPress={this.absence.bind(this)}>{this.state.absence}</Text>
            </View>
        );

        return (
            <View>
                <Toolbar ref = "toolbar" click = {this.props.homeClick} />
                <View><PicBanner/></View>
                <TouchableOpacity>
                    <View style = {styles.textStyle} onPress={() => this.setState}>
                        <Text style={styles.text}>机电小广场</Text>
                    </View>
                </TouchableOpacity>
                <View style={{height: 65}}>
                    <DrawerLayoutAndroid
                        drawerWidth={100}
                        drawerPosition={DrawerLayoutAndroid.positions.Right}
                        renderNavigationView={() =>navigationView}>

                            <TouchableOpacity style={styles.drawerLayoutAndroidView} >
                                <View ><Text style={styles.drawerLayoutAndroidText}>我的班级我的家</Text></View>
                                <View style={{flexDirection: 'row',alignItems: 'center',marginLeft:5,marginRight:20}}>
                                    <Text>左划签到</Text>
                                    <Image source={require('./img/arrow_left.png')} style={{height: 12}}></Image>
                                </View>
                            </TouchableOpacity>

                    </DrawerLayoutAndroid>
                </View>

                <TouchableOpacity>
                    <View style = {styles.textStyle}><Text style={styles.text}>机电简讯</Text></View>
                </TouchableOpacity>

                 <TouchableOpacity>
                    <View style = {styles.textStyle}><Text style={styles.text}>校友风采</Text></View>
                </TouchableOpacity>
            </View>
        );
    }

    absence(){
        //此处编写签到逻辑
        this.setState({absence : '已签到'})
    }
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop:5,
        borderRadius: 5,
        height: 65,
        width: deviceWidth,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#c1c1c1',
        borderWidth:1,
    },

    text: {
        fontSize: 20,
        fontWeight:'200',
    },

    drawerTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    drawerLayoutAndroidView: {
        flexDirection:'row',
        flex: 1,
        width: deviceWidth,
        alignItems:'center',
        justifyContent:'flex-end',
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
});