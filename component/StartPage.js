/**
 * Created by zues on 2016/8/25.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

var WINDOW_WIDTH = Dimensions.get('window').width;
export default class StartPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            bounceValue : new Animated.Value(1),
        };
    }

    componentDidMount() {
        this.startAnimtion();
    }

    startAnimtion() {
        this.state.bounceValue.setValue(1);
        Animated.timing(this.state.bounceValue, {
            toValue : 1.2,
            duration : 3000,
        }).start();
    }

    render(){
        return(
            <View style = {styles.container}>
                <Animated.Image
                    source={require('./../img/startPage.jpg')}  //以后如果有api之后就可以将json数据解析好之后传入对应的imgURl进去了
                    style = {{
                        flex:1,
                        width:WINDOW_WIDTH,
                        height:1,
                        transform: [
                            {scale: this.state.bounceValue}
                        ]
                    }}
                ></Animated.Image>
                <Text style = {styles.text}>机电E家人</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection: 'column',
    },

    text : {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        backgroundColor: 'transparent',
    },
});