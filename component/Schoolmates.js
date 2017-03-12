import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Net from '../Tool';
import SchoolmatesDetails from './NotificationsDetail';
import NormalToolbar from './NormalToolbar';
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
import { Card, Button } from 'react-native-elements';

const BRIEF = '/schoolmates';
const DETAIL = '/schoolmates/';
const IS_LOAD_MORE = 5;
const LENGTH = 30;
const TIME = 400;
export default class NewsItem extends Component {
    // 构造
    _page=1
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource,
            userData: [],
            id:'',
            isLoadMore:0,
            dataLength:0,
        };
    }

    render() {
        return (
            <View style={{backgroundColor:'#eff0f3',flex:1}}>
                <NormalToolbar title='校友风采' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>

                <SwRefreshListView
                    ref="listView"
                    style={{marginBottom:50,marginLeft:10,marginTop:10,marginRight:10}}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    renderRow={this.renderRow.bind(this)}
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                    onRefresh={this._onListRefersh.bind(this)}
                    onLoadMore={this._onLoadMore.bind(this)}
                    customRefreshView={this.state.isLoadMore>IS_LOAD_MORE?null:this.renderRefreshView.bind(this)}
                    pusuToLoadMoreTitle={this.state.isLoadMore>IS_LOAD_MORE?'上拉加载更多':''}
                    noMoreDataTitle="无更多数据！"
                    initialListSize={30}
                />
            </View>
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

    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this.fetchData(this._page).then(r => {
                this.setState({
                    userData:r.notificationList
                })
            }).catch(e => {});
            this.refs.listView.resetStatus() //重置上拉加载的状态
            end()//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
        },TIME)
    }

    /**
     * @param end
     * @private
     */
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page++;
            this.fetchData(this._page).then(r => {
                for(x in r.notificationList){
                    this.state.userData.push(r.notificationList[x]);
                }
                this.setState({
                    userData:this.state.userData,
                    dataLength:r.notificationList.length,
                })
            }).catch(e =>{});
            try{
                this.refs.listView.resetStatus();
                this.refs.listView.endLoadMore(this.state.dataLength<LENGTH?true:false)
            }catch (e){};
        },TIME)
    }

    renderRow(rowData, sectionID, rowID){
        return (
            <Card containerStyle={{margin:3,padding:1}}>
                <TouchableOpacity onPress={() => this.Press(rowData.id)} style={styles.itemContainer}>
                    <Image
                        style={styles.imageItem}
                        source={rowData.cover === null? require('../img/UserDafault.png'):{uri:BASEURL+'/upload/'+rowData.cover}}
                        resizeMode='cover'/>
                    <Text style={styles.itemText}>{rowData.title}</Text>
                </TouchableOpacity>
            </Card>
        );
    }

    fetchData(page){
        var url=BRIEF+'?page='+page;
        return new Net().getMethod(url);
    }

    //这里的SchoolmatesDetails是和Notifications共用一个NotificationsDetail的，详情看上面的import
    Press(id){
        var params = {url:DETAIL+id};
        new Net().toOther(this.props, 'SchoolmatesDetails',SchoolmatesDetails,params);
    }

    componentWillMount() {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.fetchData(this._page).then(r => {
                this.setState({
                    userData : r.notificationList,
                });
            });
        },TIME)
    }

    back(){
        new Net().back(this.props);
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    itemContainer:{
        width:device.width*0.205,
        height:device.height*0.17,
        flex:1,
    },
    imageItem:{
        width:device.width*0.18,
        height:device.height*0.1,
        alignSelf:'center',
    },
    itemText:{
        alignSelf:'center',
        fontSize:13,
        marginTop:5
    },
});