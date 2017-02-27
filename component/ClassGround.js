import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions, ListView, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Navigator} from 'react-native';
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
import { Card } from 'react-native-elements';
import Net from '../Tool';
import commentDetail from './commentDetail';
import PicDetail from './PicDetail';
import NormalToolbar from './NormalToolbar';
import Toast from 'react-native-root-toast'

const MESSAGE = '/messages';
const IS_LOAD_MORE = 15;
const LENGTH = 30;
export default class LittleGround extends Component{
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
                <ScrollView>
                    <NormalToolbar
                        title='班级圈'
                        leftImageSource={require('./../img/back.png')}
                        leftItemFunc={this.back.bind(this)} />
                </ScrollView>
                <SwRefreshListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.mesData)}
                    ref="listView"
                    style={{marginBottom:45}}
                    renderRow={this._renderRow.bind(this)}
                    onRefresh={this._onListRefersh.bind(this)}
                    onLoadMore={this.state.isLoadMore>IS_LOAD_MORE?null:this._onLoadMore.bind(this)}
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
        // let d = new Net().dateToTime(rowData.date);
        return(
            <Card>
                <View style={styles.cardTop}>
                    {this.userAvatar[rowId] === null?<Image source={require('../img/UserDafault.png')}  style={styles.renderRowImg}/>:
                        <Image source={{uri:BASEURL+'/avatar/'+this.userAvatar[rowId]}}  style={styles.renderRowImg}/>
                    }
                    <View style={styles.avatarAndTime}>
                        <Text style={styles.cardavatar}>{this.userName[rowId]}</Text>
                        <Text style={styles.cardTime}>{rowData.date}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={this.toDetails.bind(this,rowData)}>
                        <Image source={require('../img/write.png')} style={styles.comment}/>
                    </TouchableWithoutFeedback>
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
                this.refs.listView.endLoadMore(this.state.dataLength<LENGTH?true:false);
            }catch (e){}
        },2000)
    }

    componentDidMount() {
        this.fetchData(this._page).then(r => {
            this.setState({
                mesData:r.messages,
                isLoadMore:r.messages.length
            })
            this.getAvatarAndName(r.messages)
        }).catch(e => {});
        this.refs.listView.beginRefresh() //刷新动画
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
        var params = {data:data, id:this.props.id, username:this.props.username};
        this.props.ifLogin === false?Toast.show('请登录后评论'):new Net().toOther(this.props.parent,'commentDetail',commentDetail,params);
    }

    toPicDetail(uri,index){
        var params = {uri:uri,index:index,path:BASEURL+'/message/'}
        new Net().toOther(this.props.parent,'PicDetail',PicDetail,params)
    }

    //获取原始数据
    fetchData(pages){
        var url = MESSAGE+'?page='+pages+'&filters={classNumber:"'+this.props.classNumber+'"}';
        return new Net().getMethod(url).catch(error => {});
    }
    //通过id来拿到student的所有基本信息
    getAvatarAndName(messages){
        for(x in messages){
            new Net().getStudentInfoById(messages[x].belong).then(r => {
                this.userName.push(r.realname);
                this.userAvatar.push(r.avatar)
            }).catch(e => {})
        }
    }

    back(){
        new Net().back(this.props);
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
        width:25,
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