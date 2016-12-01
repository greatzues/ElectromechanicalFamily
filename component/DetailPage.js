/**
 * Created by zues on 2016/9/27.
 */
import React,{ Component } from 'react';
import {View, Text, StyleSheet, Navigator, ListView, Image, Dimensions, TouchableOpacity, WebView } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Toolbar from './Toolbar';
import NormalToolbar from './normalToolbar';
import Net from '../Tool';

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
const DETAIL = '/news/';
export default class DetailPage extends Component{
      constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            title:'',
            summary:'',
            detail:[],
            scalesPageToFit: true,
            startInLoadingState: true,
            dataSource:ds,
        };
      }

    render(){
        return (
            <ListView
                style={styles.container}
                enableEmptySections={true}
                dataSource={ this.state.dataSource.cloneWithRows(this.state.detail) }
                renderRow={(rowData) => (
                    <WebView
                        style={{flex:1, backgroundColor: 'rgba(255,255,255,0.8)', height: 350}}
                        source={{html:rowData}}
                        scalesPageToFit={this.state.scalesPageToFit}
                        startInLoadingState={this.state.startInLoadingState}
                    />
                )}
                renderScrollComponent={props => (
                    <ParallaxScrollView
                        style={{flex:1}}
                        backgroundColor="#eee"
                        contentBackgroundColor="white"
                        stickyHeaderHeight={STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT }
                        renderStickyHeader={this.renderStickyHeader.bind(this)}
                        renderBackground={this.renderBackground.bind(this)}
                        renderForeground = {this.renderForeground.bind(this)}
                        renderFixedHeader={this.renderFixedHeader.bind(this)}
                    >
                    </ParallaxScrollView>
                )}
            />
        );
    }

    renderForeground(){
        return (
            <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={{
                    uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={ styles.sectionSpeakerText }>
                    Talks by Rich Hickey
                </Text>
                <Text style={ styles.sectionTitleText }>
                    CTO of Cognitec, Creator of Clojure
                </Text>
            </View>
        );
    }

    renderBackground(){
        return (
            <View key="background">
                <Image source={{uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT}}/>
            </View>
        );
    }

    renderStickyHeader(){
        return(
            <Toolbar
                title= {this.state.title}
                navIcon = {require('./../img/back.png')}
                click = {this.back.bind(this)}/>
        );
    }

    renderFixedHeader(){
        return (
            <View key="fixed-header" style={styles.fixedSection}>
                <Text style={styles.fixedSectionText}
                      onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                    Scroll to top
                </Text>
            </View>
        );
    }

    renderParallaxScrollView(){
        return(
            <WebView
                style={{flex:1, backgroundColor: 'rgba(255,255,255,0.8)', height: 350}}
                source={{html:this.state.detail}}
                scalesPageToFit={this.state.scalesPageToFit}
                startInLoadingState={this.state.startInLoadingState}
            />
        );
    }

    fetchData(){
        new Net().getMethod(DETAIL+this.props.id).then(r => {
            var web = [r.detail];
            this.setState({
                title:r.title,
                summary:r.summary,
                detail:web,
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
        new Net().back(this.props);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
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
        width:window.width,
        justifyContent:'flex-end',
        flexDirection:'column'
    },
    headerBack:{
        position :'absolute',
        left:5,
        top:5,
    },


    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
});