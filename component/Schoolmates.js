import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, PixelRatio, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewPager from 'react-native-viewpager';
import Net from '../Tool';
import SchoolmatesDatails from './SchoolmatesDatails';
import NormalToolbar from './NormalToolbar';

const BRIEF = '/schoolmates';
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 38;
export default class NewsItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({
            pageHasChange: (p1, p2) => p1 !== p2,
        });
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            dataSource:ds,
            userData: [],
            id:'',
            page:1
        };
    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <ListView
                ref="ListView"
                style={styles.container}
                enableEmptySections={true}
                dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                renderRow={this.myRenderRow.bind(this)}
                renderScrollComponent={props => (
                    <ParallaxScrollView
                        onScroll={onScroll}
                        headerBackgroundColor="#e9eaed"
                        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                        backgroundSpeed={10}
                        renderBackground={() => (
                            <View key="background">
                                <Image source={require('./../img/3.jpg')} style={styles.page}/>
                                <View style={{position: 'absolute',
                                    top: 0,
                                    width: device.width,
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                            </View>

                        )}

                        renderForeground={() => (
                            <View key="parallax-header" style={ styles.parallaxHeader }>
                                <Text style={ styles.sectionSpeakerText }>
                                    校友风采
                                </Text>
                                <Text style={ styles.sectionTitleText }>
                                    拳拳赤子之心，涌泉相报之情
                                </Text>
                                <TouchableOpacity style={styles.foreBack} onPress={this.back.bind(this)}>
                                    <Image source={require('../img/back.png')}/>
                                </TouchableOpacity>
                            </View>

                        )}

                        renderStickyHeader={() => (
                            <View>
                                <NormalToolbar
                                    title='校友风采'
                                    titleTextColor='white'
                                    barBGColor='black'
                                    leftImageSource={require('./../img/back.png')}
                                    leftItemFunc={this.back.bind(this)}
                                />

                                <View key="fixed-header" style={styles.fixedSection}>
                                    <TouchableOpacity onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                                        <Image source={require('./../img/toTop.png')} style={{height:20,width:20,}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            />
        );
    }

    back(){
        new Net().back(this.props);
    };

    myRenderRow(rowData,sectionID,rowID){
        return (
            <TouchableOpacity  onPress={() => this.Press(rowData.id)}>
                <View style={styles.itemBody}>
                    <Image source={require('../img/news.png')} style={styles.renderRowImg}/>
                    <View style={styles.renderRowItem}>
                        <Text style={styles.itemTitle} ellipsizeMode="tail" numberOfLines={1}  >{rowData.title}</Text>
                        <Text style={styles.itemTime}>1小时前</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    fetchData(){
        var url=BRIEF+'?page='+this.state.page;
        return new Net().getMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }

    Press(id){
        var params = {id:id};
        new Net().toOther(this.props, 'SchoolmatesDatails',SchoolmatesDatails,params);
    }

    componentWillMount() {
        this.fetchData().then(r => {
            this.setState({
                userData : r.notificationList,
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
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
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 60
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
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    renderRowImg:{
        borderRadius:15,
        height:30,
        width:30,
        alignItems: 'center',
    },
    renderRowItem:{
        flexDirection:'column',
        marginLeft:10,
    },
    itemTitle:{
        fontSize:15,
        fontWeight:'200',
        width:window.width-30
    },
    itemTime:{
        color:'#a6acb1',
        fontSize:10
    },
    itemBody:{
        flex: 1,
        flexDirection:'row',
        height:60,
        marginTop:3,
        alignItems:'center',
    },
    page: {
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT,
        resizeMode: 'stretch',
    },
    toolbar: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    foreBack:{
        position:'absolute',
        top:20,
        left:10,
    },
});