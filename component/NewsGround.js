import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TouchableHighlight, ScrollView, RefreshControl,
    TouchableOpacity, Image, Dimensions, ListView, TextInput, Navigator} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Net from '../Tool';
import Toolbar from './Toolbar';
import Lightbox from 'react-native-lightbox';
import  Carousel from 'react-native-looped-carousel';

//下拉加载
const deviceWidth = Dimensions.get('window').width;
const MESSAGE = '/messages';
const COMMENT = '/comments';

//使用图片预览需要直接在页面内使用一个导航，于是有两个class
export default class NewsGround extends Component{
    renderScene(route, navigator) {
        var Component = route.component;

        return (
            <Component navigator={navigator} route={route} {...route.passProps} />
        );
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                style={{ flex: 1 }}
                renderScene={this.renderScene.bind(this)}
                initialRoute={{
                    component: Test,
                }}
            />
        );
    }
}


class Test extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            activeSection: false,
            collapsed: true,
            userData: [],
            refreshing: false,
            dataSource:ds,
            comment:[],
            text:'',
            disabled:true,
            page:1
        }
      }
    //传入评论区的id
    _setSection(section) {
        this.setState({ activeSection: section });
        if(section !== false){
            this.fetchComment(this.state.userData[section].messageId);
            this.setState({
                messageId:this.state.userData[section].messageId,
                from:this.state.userData[section].belong,
            })
        }
    }

    _renderHeader(section, i, isActive) {
        return (
            <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
                <View style={styles.cardTop}>
                    <Image source={require('../img/UserDafault.png')}  style={styles.renderRowImg}/>
                    <View style={styles.avatarAndTime}>
                        <Text style={styles.cardavatar}>{section.belong}</Text>
                        <Text style={styles.cardTime}>{section.date}</Text>
                    </View>
                    <Image source={require('../img/write.png')} style={styles.comment}/>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardText} >{section.messageText}</Text>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(
                            [section.messagePic1,section.messagePic2,section.messagePic3,
                                section.messagePic4,section.messagePic5,section.messagePic6,
                                    section.messagePic7,section.messagePic8,section.messagePic9])}
                        renderRow={this.renderRow.bind(this)}
                        contentContainerStyle={styles.list}
                        enableEmptySections={true}
                        initialListSize={1}
                    />
                </View>

            </Animatable.View>
        );
    }

    renderCarousel(uri) {
        return (
            <Carousel style={{ width: device.width, height: device.height }}>
                <Image
                    style={{flex: 1}}
                    resizeMode="contain"
                    source={{ uri: uri }}
                />
            </Carousel>
        );
    }

    //获取评论
    fetchComment(id){
        var url = COMMENT+"?filters={messageId:"+id+"}";
        return new Net().getMethod(url)
            .then(data => {
                this.setState({comment:data.comments})
            })
            .catch(error => {
            console.log(error);
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
                        onChangeText={ t => this.setState({text:t})}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={this.postComment.bind(this)}
                    />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.comment)}
                    renderRow={this.myRenderRow.bind(this)}
                    enableEmptySections={true}
                />
            </Animatable.View>
        );
    }
    //提交评论
    postComment(event){
        var postData = {
            'messageId':this.state.messageId,
            'from':this.props.id,
            'to':this.state.from,
            'commentInfo':event.nativeEvent.text
        };
        new Net().postMethod(COMMENT,postData).then(r => {
            console.log(r);
        })
    }

    //渲染评论的listview的每一条item的内容
    myRenderRow(rowData,sectionID,rowID){
        return (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../img/UserDafault.png')} style={styles.avatar}/>
                <Text>{rowData.fromName}@{rowData.toName}:{rowData.commentInfo}</Text>
            </View>
        );
    }
    //顶部下拉刷新
    onRefresh(){
        this.setState({refreshing: true});
        this.fetchData().then(r => {
            this.setState({
                userData : r.messages,
                refreshing:false,
            });
        });
    }

    //获取原始数据
    fetchData(){
        var url = '/messages?page='+this.state.page;
        return new Net().getMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }
    //在组件渲染完调用获取数据操作
    componentDidMount() {
        this.fetchData().then(r => {
            this.setState({
                userData : r.messages,
            });
        });
    }

    renderRow(rowData, sectionID, rowID){
        var picUri = BASEURL+'/message/'+rowData;
        if(rowData!==null){
            return (
                <View>
                    <View style={styles.itemContainer}>
                        <Lightbox navigator={this.props.navigator} springConfig={{tension: 15, friction: 7}} swipeToDismiss={false} renderContent={this.renderCarousel.bind(this,picUri)}>
                            <Image
                                style={styles.imageItem}
                                source={{uri:picUri}}
                                resizeMode='contain'
                            />
                        </Lightbox>
                    </View>
                </View>
            );
        }
        return null
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
                }>
                <View style={styles.container}>
                    <Toolbar title= "新闻广场"/>
                    <Accordion
                        activeSection={this.state.activeSection}
                        sections={this.state.userData}
                        renderHeader={this._renderHeader.bind(this)}
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
    },
    contentView:{
        flex:1,
        flexDirection:'row',
    },
    contentText:{
        fontSize:10,
    },
    imageItem:{
        width:device.width*0.3,
        height:80,
    },
    itemContainer:{
        padding:3,
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});