/**
 * Created by zues on 2017/3/9.
 */
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions, ListView, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Navigator} from 'react-native';
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
import { Card, Icon } from 'react-native-elements';
import Net from '../Tool';
import PicDetail from './PicDetail';
import NormalToolbar from './NormalToolbar';
import commentDetail from './commentDetail';


const PERSON_MESSAGES = '/students/getPersonalMessages';
const IS_LOAD_MORE = 5;
const LENGTH = 30;
export default class GetPersonalMessages extends Component{
    _page=1
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    userName=[];
    userAvatar=[];
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:this._dataSource,
            mesData:[],
            isLoadMore:0,
            dataLength:0,
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <NormalToolbar
                    title='我的分享'
                    leftImageSource={require('./../img/back.png')}
                    leftItemFunc={this.back.bind(this)} />
                <SwRefreshListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.mesData)}
                    ref="listView"
                    style={{marginBottom:45}}
                    renderRow={this._renderRow.bind(this)}
                    onRefresh={this._onListRefersh.bind(this)}
                    onLoadMore={this.state.isLoadMore>IS_LOAD_MORE?this._onLoadMore.bind(this):null}
                    customRefreshView={this.state.isLoadMore>IS_LOAD_MORE?null:this.renderRefreshView.bind(this)}
                    pusuToLoadMoreTitle={this.state.isLoadMore>IS_LOAD_MORE?'上拉加载更多':''}
                    noMoreDataTitle="无更多数据！"
                />
            </View>
        )
    }

    /**
     * 当item数目不满一个屏,该组件会出现下拉刷新头部不能自动隐藏
     * 于是不足一个page的数量时，自定义下拉刷新视图
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

    _renderRow(rowData, sectionId, rowId) {
        let d = new Net().timeToDate(rowData.date);
        return(
            <Card>
                <View style={styles.cardTop}>
                    {this.userAvatar[rowId] === null?<Image source={require('../img/UserDafault.png')}  style={styles.renderRowImg}/>:
                        <Image source={{uri:BASEURL+'/avatar/'+this.userAvatar[rowId]}}  style={styles.renderRowImg}/>
                    }
                    <View style={styles.avatarAndTime}>
                        <Text style={styles.cardavatar}>{this.userName[rowId]}</Text>
                        <Text style={styles.cardTime}>{d}</Text>
                    </View>
                    <Icon name='pencil-square-o' type='font-awesome' color='#f5811f' containerStyle={styles.comment} onPress={this.toDetails.bind(this,rowData)}/>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardText} >{rowData.messageText}</Text>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(
                            [rowData.messagePic1,rowData.messagePic2,rowData.messagePic3,
                                rowData.messagePic4,rowData.messagePic5,rowData.messagePic6,
                                rowData.messagePic7,rowData.messagePic8,rowData.messagePic9])}
                        renderRow={this.picList.bind(this,[rowData.messagePic1,rowData.messagePic2,rowData.messagePic3,
                            rowData.messagePic4,rowData.messagePic5,rowData.messagePic6,
                            rowData.messagePic7,rowData.messagePic8,rowData.messagePic9])}
                        contentContainerStyle={styles.list}
                        enableEmptySections={true}
                    />
                </View>
            </Card>
        );
    }

    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this._page = 1;
            this.fetchData(this._page).then(r => {
                this.setState({
                    mesData:r.messages
                })
                this.getAvatarAndName(r.messages)
            }).catch(e => {});
            try {
                this.refs.listView.resetStatus() //重置上拉加载的状态
                end()//刷新成功后需要调用end结束刷新
            }catch (e){};
        },1500)
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
                for(x in r.messages){
                    this.state.mesData.push(r.messages[x]);
                }
                this.setState({
                    mesData:this.state.mesData,
                    dataLength:r.messages.length,
                })
            }).catch(e =>{});
            try {
                this.refs.listView.resetStatus();
                this.refs.listView.endLoadMore(this.state.dataLength < LENGTH);
            }catch (e){}
        },2000)
    }

    componentDidMount() {
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this.fetchData(this._page).then(r => {
                this.setState({
                    mesData:r.messages,
                    isLoadMore:r.messages.length
                })
                this.getAvatarAndName(r.messages)
            }).catch(e => {});
            this.refs.listView.beginRefresh() //刷新动画
        },500)
    }

    picList(rowData, sectionID, rowID){
        if(sectionID!==null){
            var picUri = BASEURL+'/message/'+sectionID;
            let str = sectionID.substring(sectionID.length-1); //拿到最后一个字符，传出去作为图片预览的index
            let index = parseInt(str); //解析一个字符串，并返回一个整数
            return (
                <View>
                    <TouchableOpacity style={styles.itemContainer} onPress={this.toPicDetail.bind(this,rowData,index)}>
                        <Image
                            style={styles.imageItem}
                            source={{uri:picUri}}
                            resizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        return null
    }

    toDetails(data){
        var params = {data:data, id:this.props.id, username:this.props.username, ifRefresh:(boo) => this.reRender(boo)};
        new Net().toOther(this.props,'commentDetail',commentDetail,params);
    }

    toPicDetail(uri,index){
        var params = {uri:uri,index:index,path:BASEURL+'/message/'}
        new Net().toOther(this.props,'PicDetail',PicDetail,params)
    }

    //获取原始数据
    fetchData(pages){
        var url = PERSON_MESSAGES+'?page='+pages;
        return new Net().getMethod(url).catch(error => {});
    }
    //通过id来拿到student的所有基本信息
    getAvatarAndName(messages){
        for(let x in messages){
            new Net().getStudentInfoById(messages[x].belong).then(r => {
                this.userName[x] = r.realname;
                this.userAvatar[x] = r.avatar;
            }).catch(e => {})
        }
    }

    back(){
        new Net().back(this.props);
    }

    reRender(boo){
        if(boo === true){
            this.componentDidMount();
        }
    }

}
const styles=StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    cardavatar:{
        color:'#f5811f',
        fontSize:15
    },
    cardTime:{
        color:'#a6acb1',
        fontSize:10
    },
    cardText:{
        fontSize:16,
        fontWeight:'200'
    },
    comment:{
        height:25,
        width:60,
        position:'absolute',
        top:1,
        right:20,

    },
    renderRowImg:{
        borderRadius:15,
        height:30,
        width:30,
        alignItems: 'center',
    },
    cardTop: {
        flex:1,
        flexDirection: 'row',
        alignSelf:'flex-start',
        alignItems:'center',
        margin:5,
        width:device.width-50,
    },
    cardContent: {
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        marginRight:5,
    },
    avatarAndTime:{
        flexDirection: 'column',
        marginLeft:10,
    },

    imageItem:{
        width:device.width*0.2,
        height:60,
    },
    itemContainer:{
        padding:1,
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop:5
    },
});