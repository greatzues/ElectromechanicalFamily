/**
 * Created by zues on 2016/9/27.
 */
import React,{ Component } from 'react';
import {View, Text, StyleSheet, Navigator, ListView, Image, Dimensions, TouchableOpacity, WebView } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Toolbar from './Toolbar';
import NormalToolbar from './normalToolbar';
import Net from '../Net';

var toolbarActions = [
    {title: '完成', icon: require('./../img/write.png'), show: 'always'},
];
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default class DetailPage extends Component{
    // 构造
      constructor(props) {
        super(props);
          console.log(this.props.id);
        // 初始状态
        this.state = {
            id :this.props.id,
            title:'',
            image:'0',
            share_url:'',
        };
      }

    render(){
        return (
            <ParallaxScrollView
                style={{flex:1}}
                backgroundColor="#eee"
                contentBackgroundColor="white"
                parallaxHeaderHeight={180}
                renderStickyHeader={() => this.renderStickyHeader()}
                stickyHeaderHeight={56}
                renderForeground = {() => this.renderForeground()}>
                {this.renderParallaxScrollView()}
            </ParallaxScrollView>
        );
    }

    renderForeground(){
        return (
            <View>
                <Image
                    source={{uri:this.state.image}}
                    style={styles.userBackground}>
                    <NormalToolbar click={this.back.bind(this)} otherStyle={styles.headerBack} color="white"/>
                    <View style={{backgroundColor:'rgba(0, 0, 0, 0.3)',width:deviceWidth,height:50}}>
                        <Text style={{color:'white', fontSize:20}}>{this.state.title}</Text>
                    </View>
                </Image>
            </View>
        );
    }

    renderStickyHeader(){
        return(
            <Toolbar
                title= "sticky"
                navIcon = {require('./../img/back.png')}
                click = {this.back.bind(this)}/>
        );
    }

    renderParallaxScrollView(){
        return(
            <WebView
                style={{
                    flex:1,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    height: deviceHeight - 56,
                }}
                source={{uri: this.state.share_url}}
                scalesPageToFit={true}
            />
        );
    }

    fetchData(){
        var URL = 'http://news-at.zhihu.com/api/4/news/'+this.props.id;
        new Net().getZhiHuMethod(URL).then((responseData) => {
            console.log(responseData);
            this.setState({
                title:responseData.title,
                image:responseData.image,
                share_url:responseData.share_url,
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
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    avatar:{
        borderRadius:75,
        width:80,
        height:80,
        borderWidth:2,
        borderColor:'white',
        marginTop:30,
        marginBottom: 10,
    },
    userBackground:{
        height:180,
        width:deviceWidth,
        justifyContent:'flex-end',
        flexDirection:'column'
    },
    headerBack:{
        position :'absolute',
        left:5,
        top:5,
    },
});