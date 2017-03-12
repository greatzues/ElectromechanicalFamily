/**
 * Created by zues on 2017/1/17.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar'
import SignDetail from './SignDetail'
import { ListItem } from 'react-native-elements'
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';

const TIME_TABLE = '/signTable/student';
const IS_LOAD_MORE = 5;
const LENGTH = 30;
const TIME = 400;
export default class SignPage extends Component{
    _page=1;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    // 构造
      constructor(props) {
        super(props);
          this.state = {
              dataSource:this._dataSource,
              isLoadMore:0,
              dataLength:0,
              mesData:[],
        };
      }

    componentDidMount() {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.fetchData(this._page).then(r => {
                console.log(r);
                this.setState({
                    mesData:r.messages,
                    isLoadMore:r.messages.length
                })
                this.getAvatarAndName(r.messages)
            }).catch(e => {});
            try {this.refs.listView.beginRefresh()}catch (e){}; //刷新动画
        },TIME)
    }

      render(){
          return (
              <View style={styles.container}>
                  <NormalToolbar title='签到页面' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>
                  <SwRefreshListView
                      dataSource={this.state.dataSource.cloneWithRows(this.state.mesData)}
                      ref="listView"
                      renderRow={this._renderRow.bind(this)}
                      onRefresh={this._onListRefersh.bind(this)}
                      onLoadMore={this._onLoadMore.bind(this)}
                      customRefreshView={this.state.isLoadMore>IS_LOAD_MORE?null:this.renderRefreshView.bind(this)}
                      pusuToLoadMoreTitle={this.state.isLoadMore>IS_LOAD_MORE?'上拉加载更多':''}
                      noMoreDataTitle="无更多数据！"
                  />
              </View>
          )
      }

    _renderRow(rowData){
        let startTime = new Net().timeToDate(rowData.startTime);
        let endTime = new Net().timeToDate(rowData.endTime);
        let  signAble = this.ifSignAble(rowData.startTime,rowData.endTime,rowData.isOverdue);
        return(
            <ListItem
                roundAvatar
                title={'签到时间：'+startTime+'~'+endTime}
                titleStyle={signAble?{color:'#4a6ca6'}:{color:'#828282'}}
                subtitle={signAble?'可签到时间':'不可签到'}
                subtitleStyle={signAble?{color:'#4a6ca6'}:{color:'#828282'}}
                leftIcon={signAble?{name:'flight-takeoff',color:'#4a6ca6'}:{name:'av-timer',color:'#828282'}}
                rightIcon={signAble?{name:'chevron-right',color:'#4a6ca6'}:{name:'chevron-right',color:'#828282'}}
                onPress={signAble === true?this.toSignDetail.bind(this, rowData.id):this.cantSign.bind(this)}
            />
        );
    }

    toSignDetail(id){
        var params = {id:id, classNumber:this.props.classNumber,update:(ifRefresh) => this.reRender(ifRefresh)}
        new Net().toOther(this.props,'SignDetail', SignDetail, params)
    }

      fetchData(pages){
          var url = TIME_TABLE+'?page='+ pages;
          return new Net().getMethod(url).catch(e => {})
      }
    //只有符合在开始时间和结束时间之间以及isOverdue等于0，也就是这个时间段还未签到过才能才能进行签到操作
      ifSignAble(startTime, endTime, isOverdue){
          var timeStamp = new Date().getTime();
          if(timeStamp > startTime && timeStamp < endTime && isOverdue === null){
              return true;
          }else {
              return false; //记得改回来false
          }
      }

    back(){
        new Net().back(this.props)
    }

    cantSign(){
        Toast.show('无效签到时间')
    }

    reRender(ifRefresh){
        Toast.show('您已成功签到，签到功能已锁');
        if(ifRefresh){
            this.componentDidMount();
        }
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
                    mesData:r.signTables
                })
                this.getAvatarAndName(r.signTables)
            }).catch(e => {});
            try {
                this.refs.listView.resetStatus() //重置上拉加载的状态
                end()//刷新成功后需要调用end结束刷新
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
                for(x in r.signTables){
                    this.state.mesData.push(r.signTables[x]);
                }
                this.setState({
                    mesData:this.state.mesData,
                    dataLength:r.signTables.length,
                })
            }).catch(e =>{});
            try {
                this.refs.listView.resetStatus();
                this.refs.listView.endLoadMore(this.state.dataLength<LENGTH?true:false);
            }catch (e){}
        },TIME)
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        flex:1
    },
    canSign:{
        width:device.width,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        borderBottomWidth:1,
        borderBottomColor:'#1296db',
    },
    cantSign:{
        width:device.width,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        borderBottomWidth:1,
        borderBottomColor:'#828282',
    },
    canSignText:{
        color:'#1296db',
        margin:2,
        fontSize:15
    },
    cantSignText:{
        color:'#828282',
        margin:2,
        fontSize:15
    },
    BottomLine:{
        height:1,
        marginTop:5,
        alignSelf:'flex-end'
    },
    text:{
        color:'#1296db',
    },
    rightArrow:{
        position:'absolute',
        right:25,
        top:10
    }
})