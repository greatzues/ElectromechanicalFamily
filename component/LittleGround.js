import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'
import Net from '../Tool';
import commentDetail from './commentDetail';
import PicDetail from './PicDetail'

const MESSAGE = '/messages';
export default class LittleGround extends Component{
    _page=1
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:this._dataSource,
            mesData:[],
            page:1
        };
    }

    render(){
        return this._renderListView() // ListView Demo
    }

    _renderListView(){
        return(
            <SwRefreshListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.mesData)}
                ref="listView"
                renderRow={this._renderRow.bind(this)}
                onRefresh={this._onListRefersh.bind(this)}
                onLoadMore={this._onLoadMore.bind(this)}
            />
        )
    }
    _renderRow(rowData) {
        return(
            <View>
                <View style={styles.cardTop}>
                    <Image source={require('../img/UserDafault.png')}  style={styles.renderRowImg}/>
                    <View style={styles.avatarAndTime}>
                        <Text style={styles.cardavatar}>{rowData.belong}</Text>
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
                        renderRow={this.picList.bind(this)}
                        contentContainerStyle={styles.list}
                        enableEmptySections={true}
                    />
                </View>
            </View>
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
            }).catch(e => {});
            this.refs.listView.resetStatus() //重置上拉加载的状态
            end()//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
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
                   mesData:this.state.mesData
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
                mesData:r.messages
            })
        }).catch(e => {});
        this.refs.listView.beginRefresh() //刷新动画
    }


    picList(rowData, sectionID, rowID){
        var picUri = BASEURL+'/message/'+rowData;
        if(rowData!==null){
            return (
                <View>
                    <TouchableOpacity style={styles.itemContainer} onPress={this.toPicDetail.bind(this,picUri)}>
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
        var params = {data:data,id:this.props.userId};
        new Net().toOther(this.props.parent,'commentDetail',commentDetail,params)
    }

    toPicDetail(uri){
        var params = {uri:uri}
        new Net().toOther(this.props.parent,'PicDetail',PicDetail,params)
    }

    //获取原始数据
    fetchData(pages){
        var url = MESSAGE+'?page='+pages;
        return new Net().getMethod(url).catch(error => {});
    }

}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
    },
    header: {
        backgroundColor: '#000',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderBottomWidth:0.5,
        borderColor:'orange'
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
        borderBottomWidth:0.5,
        borderColor:'orange'
    },
    contentInactive:{
        flex:1,
        backgroundColor: 'rgba(245,252,255,1)',
        borderBottomWidth:0.5,
        borderColor:'orange'
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    cardImage:{
        height:200,
        flex:1,
        margin:10,
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
        fontSize:20,
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
        width:device.width,
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
        width:device.width*0.3,
        height:80,
    },
    itemContainer:{
        padding:1,
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});