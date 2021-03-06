/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View ,  ListView, ScrollView, TouchableOpacity, Navigator, Image, Dimensions, ActivityIndicator} from 'react-native';
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar';
import NotificationsDetail from './NotificationsDetail';
import { ListItem } from 'react-native-elements'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const BRIEF = '/notifications';
const DETAIL = '/notifications/';
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 55;
const IS_LOAD_MORE = 15;
const LENGTH = 30;
const TIME = 400;
export default class Notifications extends Component {
    _page=1
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource,
            notification: [],
            id:'',
            isLoadMore:0,
            dataLength:0,
        };
    }

    render() {
        return (
            <ParallaxScrollView
                ref="myListView"
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
                            机电通知
                        </Text>
                        <Text style={ styles.sectionTitleText }>
                            生活不止眼前的苟且 还有诗和远方的田野
                        </Text>
                        <TouchableOpacity style={styles.foreBack} onPress={this.back.bind(this)}>
                            <Image source={require('../img/back.png')}/>
                        </TouchableOpacity>
                    </View>

                )}

                renderStickyHeader={() => (
                    <ScrollView>
                        <NormalToolbar
                            title='机电通知'
                            titleTextColor='white'
                            barBGColor='black'
                            leftItemTitle='返回'
                            leftTextColor='white'
                            leftItemFunc={this.back.bind(this)}
                        />

                        <View key="fixed-header" style={styles.fixedSection}>
                            <TouchableOpacity onPress={() => this.refs.myListView.scrollTo({ x: 0, y: 0 })}>
                                <Image source={require('./../img/toTop.png')} style={{height:20,width:20,}}/>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}>
                <SwRefreshListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.notification)}
                    ref="listView"
                    renderRow={this._renderRow.bind(this)}
                    onRefresh={this._onListRefresh.bind(this)}
                    onLoadMore={this.state.isLoadMore>IS_LOAD_MORE?this._onLoadMore.bind(this):null}
                    customRefreshView={this.renderRefreshView.bind(this)}
                    noMoreDataTitle="无更多数据！"
                    pusuToLoadMoreTitle={this.state.isLoadMore>IS_LOAD_MORE?'上拉加载更多':''}
                />
            </ParallaxScrollView>
        );
    }

    /**
     * 自定义下拉刷新视图
     * @param refreshStatus
     * @param offsetY
     * @returns {XML}
     */
    renderRefreshView(refreshStatus, offsetY){
        switch (refreshStatus) {
            case 0:
                return(<View></View>);
                break;
            case 1:
                return(<View></View>);
                break;
            case 2:
                return(<View></View>);
                break;
            default:
                break;
        }
    }

    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onListRefresh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this.fetchData(this._page).then(r => {
                this.setState({
                    notification:r.notificationList,
                });

            }).catch(e => {});
            try {
                this.refs.listView.resetStatus();
                end();
            }catch (e){};
        },TIME)
    }

    /**
     * 模拟加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page++;
            this.fetchData(this._page).then(r => {
                for(x in r.notificationList){
                    this.state.notification.push(r.notificationList[x]);
                }
                this.setState({
                    notification : this.state.notification,
                    dataLength: r.notificationList.length,
                })
            }).catch(e =>{});
            try {
                this.refs.listView.resetStatus();
                this.refs.listView.endLoadMore(this.state.dataLength<LENGTH?true:false);
            }catch (e){};
        },TIME)
    }

    componentDidMount() {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.fetchData(this._page).then(r => {
                console.log(r);
                this.setState({
                    notification : r.notificationList,
                    isLoadMore:r.notificationList.length
                });
            });
            try {this.refs.listView.beginRefresh()}catch (e){};
        },TIME)
    }

    _renderRow(rowData,sectionID,rowID){
        return (
            <ListItem
                key={sectionID}
                title={rowData.title}
                subtitle={rowData.summary}
                avatar={rowData.cover===null?require('../img/news.png'):{uri:BASEURL+'/u/'+rowData.cover}}
                onPress={() => this.Press(rowData.id)}
            />
        );
    }

    Press(id){
        var params = {url:DETAIL+id};
        new Net().toOther(this.props, 'NotificationsDetail',NotificationsDetail,params);
    }

    back(){
        let timer = setTimeout(() => {
            clearTimeout(timer);
            new Net().back(this.props);
        },1000)
    };

    //获取原始数据
    fetchData(pages){
        var url = BRIEF+'?page='+pages;
        return new Net().getMethod(url).catch(error => {});
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom:100
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 60
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
    page: {
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT,
        resizeMode: 'stretch',
    },
    foreBack:{
        position:'absolute',
        top:40,
        left:10,
    },
});