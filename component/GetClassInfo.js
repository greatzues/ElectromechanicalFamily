/**
 * Created by zues on 2016/9/29.
 */
import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, ListView, Image, TouchableOpacity, Navigator, AsyncStorage } from 'react-native';
import Net from '../Tool';
import NormalToolbar from './NormalToolbar';
import SignPage from './SignPage'
import {Tile, ListItem} from 'react-native-elements'
import Toast from 'react-native-root-toast'
import {SwRefreshScrollView, SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';

const IS_LOAD_MORE = 15;
const CLASS = '/students';
export default class GetClassInfo extends Component {
    _page=1;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    userAvatar=[];

      constructor(props) {
        super(props);
        this.state = {
            dataSource:this._dataSource,
            userData: [],
            absence:'请签到',
            isLoadMore:0,
            id:'',
        };
      }


    render(){
        return this.props.ifLogin === false? this.isNotLogin():this.isLogin();
    }

    isLogin(){
        return (
            <View >
                <ScrollView>
                    <NormalToolbar title="我的班级" rightItemFunc={this.toSign.bind(this,this.props.classNumber)} rightItemTitle={this.state.absence}/>
                </ScrollView>
                <SwRefreshListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    ref="listView"
                    style={{marginBottom:45}}
                    renderRow={this._renderRow.bind(this)}
                    onRefresh={this._onListRefersh.bind(this)}
                    onLoadMore={this._onLoadMore.bind(this)}
                    customRefreshView={this.state.isLoadMore>IS_LOAD_MORE?null:this.renderRefreshView.bind(this)}
                    pusuToLoadMoreTitle={this.state.isLoadMore>IS_LOAD_MORE?'上拉加载更多':''}
                    noMoreDataTitle="无更多数据！"
                />
            </View>

        );
    }

    isNotLogin(){
        return(
            <View style={{flex:1}}>
                <Tile
                    imageSrc={{uri:'http://pic1.win4000.com/mobile/3/53be3adb9585d.jpg'}}
                    title="欢迎来到我的班级!"
                    featured
                    caption="请登录之后查看班级信息"
                    imageContainerStyle={{resizeMode:'cover'}}
                    height={device.height-70}
                    activeOpacity={0.5}
                    width={device.width}
                    onPress={() => Toast.show('请先登录')}
                />
            </View>
        );
    }

    _renderRow(rowData,sectionID,rowID){
        return (
            <ListItem
                roundAvatar
                title={rowData.realname}
                subtitle={rowData.classNumber+'班'}
                avatar={this.userAvatar[rowID]===null?require('../img/UserDafault.png'):{uri:BASEURL+'/avatar/'+this.userAvatar[rowID]}}
                onPress={() => this.props.getStudentInfo(rowData.id)}
            />
        )
    }

    /**
     * @param end
     * @private
     */
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer);
            this.fetchData(this._page).then(r => {
                this.setState({
                    userData:r.students
                })
                this.getAvatarAndName(r.students)
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
                for(x in r.students){
                    this.state.userData.push(r.students[x]);
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

    componentDidMount() {
        this.fetchData(this._page).then(r => {
            this.setState({
                userData:r.students,
                isLoadMore:r.students.length
            })
            this.getAvatar(r.students)
        }).catch(e => {});
        this.refs.listView.beginRefresh() //刷新动画
    }
    //拿到学生的id传过去
    fetchData(pages){
        if(this.props.classNumber !== null){
            let url = CLASS+'?page='+pages+'&&classNumber'+this.props.classNumber;
            return new Net().getMethod(url).catch(e => {});
        }
    }

    //通过id来拿到student的所有基本信息
    getAvatar(studentData){
        for(x in studentData){
            new Net().getStudentInfoById(studentData[x].id).then(r => {
                this.userAvatar.push(r.avatar)
            }).catch(e => {})
        }
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


    toSign(classNumber){
        var params = {classNumber:classNumber}
        new Net().toOther(this.props.parent,'SignPage',SignPage, params);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    studentItem:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        marginRight:10,
        marginLeft:10,
        position: 'relative'
    },

    avatar:{
        borderRadius:25,
        width:50,
        height:50,
        borderWidth:2,
        borderColor:'white',
    },

    name:{
        fontSize:20
    },

    class:{
        alignSelf:'center'
    },




    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    notLogin:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});