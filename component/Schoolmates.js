import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Net from '../Tool';
import SchoolmatesDatails from './SchoolmatesDatails';
import NormalToolbar from './NormalToolbar';
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
import { Card, Button } from 'react-native-elements';

const BRIEF = '/schoolmates';
const IS_LOAD_MORE = 15;
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
            isLoadMore:0
        };
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <NormalToolbar title='校友风采' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>
                </ScrollView>
                <SwRefreshListView
                    ref="listView"
                    style={{margin:10}}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    renderRow={this.renderRow.bind(this)}
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                    onRefresh={this._onListRefersh.bind(this)}
                    onLoadMore={this._onLoadMore.bind(this)}
                    customRefreshView={this.state.isLoadMore>IS_LOAD_MORE?null:this.renderRefreshView.bind(this)}
                    pusuToLoadMoreTitle={this.state.isLoadMore>IS_LOAD_MORE?'上拉加载更多':''}
                    noMoreDataTitle="无更多数据！"
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
        },1500)
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
                    userData:this.state.userData
                })
            }).catch(e =>{});
            //end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕
            this.refs.listView.resetStatus();
            this.refs.listView.endLoadMore(this._page>2) //为true的时候表示已经加载完全部数据，这里为了暂时给老师演示，先保存为true，后面再fix
        },2000)
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

    Press(id){
        var params = {id:id};
        new Net().toOther(this.props, 'SchoolmatesDatails',SchoolmatesDatails,params);
    }

    componentWillMount() {
        this.fetchData(this._page).then(r => {
            this.setState({
                userData : r.notificationList,
            });
        });
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