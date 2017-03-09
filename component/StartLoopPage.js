/**
 * Created by zues on 2017/2/27.
 * 第一次启动应用时的滑动广告页
 */
import React, { Component } from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { Button  } from 'react-native-elements';
import Login from './Login';
import Net from '../Tool';

const { width, height } = Dimensions.get('window');

export default class StartLoopPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            size: { width, height },
        };
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
                <Carousel
                    delay={3000}
                    style={this.state.size}
                    autoplay
                    pageInfo
                    onAnimateNextPage={(p) => console.log(p)}>
                    <Image source={{uri:'http://pic1.win4000.com/mobile/3/53be3adb9585d.jpg'}} style={styles.imageBox}>
                        <View style={styles.box}>
                            <Text style={styles.title}>机电E家人可以做什么？</Text>
                            <Text style={styles.subtitle}>签到，分享，了解机电资讯...</Text>
                        </View>
                    </Image>

                    <Image source={{uri:'https://a-ssl.duitang.com/uploads/item/201605/21/20160521233005_uKHBX.thumb.700_0.jpeg'}} style={styles.imageBox}>
                        <View style={styles.box}>
                            <Text style={styles.title}>分享生活点滴到班级圈,分享有趣的事情到小广场</Text>
                            <Text style={styles.subtitle}>班级圈只对自己班级可见哦！</Text>
                        </View>
                    </Image>

                    <Image source={{uri:'https://a-ssl.duitang.com/uploads/item/201605/21/20160521232935_UBtdS.thumb.700_0.jpeg'}} style={styles.imageBox}>
                        <View style={styles.box}>
                            <Text style={styles.title}>一睹校友昔日风采，鼓励自己奋斗前行</Text>
                            <Text style={styles.subtitle}>致我们可爱的校友们</Text>
                        </View>
                        <Button
                            onPress={this.toLogin.bind(this)}
                            backgroundColor="#337ab7"
                            borderRadius={5}
                            title='进入机电E家人'
                            icon={{name:'bubble-chart'}}
                            buttonStyle={styles.toLogin}/>
                    </Image>

                </Carousel>
            </View>
        );
    }

    toLogin(){
        storage.save({
            key: 'firstOpen',  // 注意:请不要在key中使用_下划线符号!
            rawData: {
                first:'false'
            },
            // 如果设为null，则永不过期,暂时先设置为15分钟，用来测试，后面再设置为null
            expires: 1000 * 60 * 15
        });
        new Net().toOther(this.props,'Login',Login);
    }
}

const styles = StyleSheet.create({
    imageBox:{
        flex:1
    },
    box:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.2)',
    },
    title:{
        color:'white',
        fontSize:22,
        marginLeft:30,
        marginRight:30
    },
    subtitle:{
        color:'white',
        fontSize:14,
        marginTop:18,
    },
    toLogin:{
        position:'absolute',
        bottom:device.height*0.2,
        width:160,
        left:device.width*0.5-95,
    },
});