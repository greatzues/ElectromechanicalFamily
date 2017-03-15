/**
 * Created by zues on 2017/3/11.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View ,  ListView, ScrollView, TouchableOpacity, Navigator, Image, Dimensions, ActivityIndicator} from 'react-native';
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar';
import { ListItem } from 'react-native-elements'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import BriefNewsDetail from './NotificationsDetail';


const NEWS = '/alunmniAssocation';
const DETAIL = '/alunmniAssocation/';
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 55;
const IS_LOAD_MORE = 15;
const LENGTH = 30;
const TIME = 400;
export default class AlumniAssociation extends Component {
    _page=1
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource,
            news: [],
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
                            校友会
                        </Text>
                        <Text style={ styles.sectionTitleText }>
                            校友英雄会，人才集汇
                        </Text>
                        <TouchableOpacity style={styles.foreBack} onPress={this.back.bind(this)}>
                            <Image source={require('../img/back.png')}/>
                        </TouchableOpacity>
                    </View>

                )}

                renderStickyHeader={() => (
                    <View>
                        <NormalToolbar
                            title='机电简讯'
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
                    </View>
                )}>
                <SwRefreshListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.news)}
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
     * 当item数目不满一个屏，不足一个page的数量时，自定义下拉刷新视图
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
                    news:r.notificationList,
                    isRefreshing: false,
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
            clearTimeout(timer);
            this._page++;
            this.fetchData(this._page).then(r => {
                for(x in r.notificationList){
                    this.state.news.push(r.notificationList[x]);
                }
                this.setState({
                    news : this.state.news,
                    dataLength:r.notificationList.length
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
                    news : r.notificationList,
                    isLoadMore:r.notificationList.length
                });
            });
            try {this.refs.listView.beginRefresh()}catch (e){};
        },TIME)
    }

    _renderRow(rowData,sectionID,rowID){
        return (
            <ListItem
                roundAvatar
                key={sectionID}
                title={rowData.title}
                subtitle={rowData.summary}
                avatar={require('../img/news.png')}
                onPress={() => this.Press(rowData.id)}
            />
        );
    }
    //这里的BriefNewsDetail是和Notifications共用一个NotificationsDetail的，详情看上面的import
    Press(id){
        var params = {url:DETAIL+id};
        new Net().toOther(this.props,'BriefNewsDetail',BriefNewsDetail,params);
    }

    back(){
        let timer = setTimeout(() => {
            clearTimeout(timer);
            new Net().back(this.props);
        },1000)
    };

    //获取原始数据
    fetchData(pages){
        var url = NEWS+'?page='+pages;
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