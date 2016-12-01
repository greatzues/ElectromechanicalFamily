import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TouchableHighlight, ScrollView, RefreshControl, TouchableOpacity, Image, Dimensions, ListView, TextInput
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Net from '../Tool';
import Toolbar from './Toolbar';

//需要解决的问题是：在打开一个弹出式view之后打开另外一个将原来折叠回去过程中，由于comment数据还存在渲染的时间，导致数据会出现变化，这对用户体验不好，暂时我考虑使用进度圈圈来防止这个问题。
//刚刚突然想到解决办法，那就是另外新建一个类，然后再开始渲染的时候就把数据加载好，这样就不会出现这种情况了，给自己点个赞。
const deviceWidth = Dimensions.get('window').width;
export default class NewsGround extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          var ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          });
        this.state = {
            activeSection: false,
            collapsed: true,
            userData: [],
            refreshing: false,
            dataSource:ds,
            comment:[],
            text:'',
            disabled:true,
        }
      }
    //传入评论区的id
    _setSection(section) {
        this.setState({ activeSection: section });
        if(section !== false){
            this.fetchComment(this.state.userData[section].messageId);
        }
    }

    _renderHeader(section, i, isActive) {
        return (
            <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
                <View style={styles.cardTop}>
                    <Image source={{uri:section.images[0]}}  style={styles.renderRowImg}/>
                    <View style={styles.avatarAndTime}>
                        <Text style={styles.cardavatar}>{section.belong}</Text>
                        <Text style={styles.cardTime}>{section.date}</Text>
                    </View>
                    <Image source={require('../img/write.png')} style={styles.comment}/>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardText} >{section.title}</Text>
                    <ListView
                        ref="listView"
                        dataSource={this.state.dataSource.cloneWithRows(this.state.images)}
                        renderRow={this.renderRow.bind(this)}
                        contentContainerStyle={styles.list}
                        enableEmptySections={true}
                    />
                </View>
            </Animatable.View>
        );
    }
    //获取评论
    fetchComment(id){
        var url = 'http://news-at.zhihu.com/api/4/story/'+id+'/short-comments';
        return new Net().getZhiHuMethod(url)
            .then(data => {
                this.setState({comment:data.message})
            })
            .catch(error => {
            alert("error message:"+ error);
        });
    }
    //渲染每一个item的主体内容
    _renderContent(section, i, isActive) {
        return (
            <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">

                    <TextInput
                        placeholder="疯狂的评论吧！"
                        style={styles.contentTextInput}
                        value={this.state.value}
                        onChangeText={(text) => this.setState({text})}
                    />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.comment)}
                    renderRow={this.myRenderRow.bind(this)}
                    enableEmptySections={true}
                />
            </Animatable.View>
        );
    }

    //渲染评论的listview的每一条item的内容
    myRenderRow(rowData,sectionID,rowID){
        return (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri:rowData.avatar}} style={styles.avatar}/>
                <Text>{rowData.content}</Text>
            </View>
        );
    }
    //顶部下拉刷新
    onRefresh(){
        this.setState({refreshing: true});
        this.fetchData().then((responseData) => {
            this.setState({
                userData : responseData.messages,
                refreshing:false,
            });
        });
    }

    //获取原始数据
    fetchData(){
        var url = '/messages';
        return new Net().getMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }
    //在组件渲染完调用获取数据操作
    componentDidMount() {
        this.fetchData().then((responseData) => {
            this.setState({
                userData : responseData.messages,
            });
        });
    }

    renderRow(rowData, sectionID, rowID){
        return (
                <View>
                    <View style={styles.itemContainer}>
                        <Image
                            style={styles.imageItem}
                            source={{uri:rowData.uri}}
                            resizeMode='contain'
                        />
                    </View>
                </View>
        );
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor='rgba(255, 255, 255, 0.7)'
                    />
                }
            >
            <View style={styles.container}>
                <Toolbar title= "新闻广场"/>
                <Accordion
                    activeSection={this.state.activeSection}
                    sections={this.state.userData}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent.bind(this)}
                    duration={400}
                    onChange={this._setSection.bind(this)}
                />
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6',
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
        width:deviceWidth,
    },
    cardContent: {
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        marginRight:5,
    },
    avatar:{
        borderRadius:75,
        width:30,
        height:30,
        borderWidth:2,
        borderColor:'white',
    },
    avatarAndTime:{
        flexDirection: 'column',
        marginLeft:10,
    },
    contentTextInput:{
        height:40,
        borderColor:'gray',
        borderWidth:0.5,
    },
    contentView:{
        flex:1,
        flexDirection:'row',
    },
    contentText:{
        fontSize:10,
    },
    imageItem:{
        width:window.width*0.3,
        height:80,
    },
    itemContainer:{
        padding:3,
    },
});