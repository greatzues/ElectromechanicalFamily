/**
 * Created by zues on 2016/9/13.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView, Dimensions, TextInput, Image, RefreshControl, ToastAndroid,
    Navigator } from 'react-native';
import Net from '../Net';
import DetailPage from './DetailPage';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

/**
 * 实现下拉刷新列表，取知乎日报api做的测试
 */
const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';
const deviceWidth = Dimensions.get('window').width;
export default class MyListView extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            userData: {},
            dataSource:ds,
            updateInfo:'',
            refreshing:false,
        };
    }

    toggleExpanded = (key) => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    componentDidMount() {
        this.fetchData().then((responseData) => {
            let story = responseData;
            this.setState({
                userData : story.stories,
            });
        });
    }

    myRenderRow(rowData,sectionID,rowID){

        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.cardTop}>
                        <Image source={{uri:rowData.images[0]}}  style={styles.renderRowImg}/>
                        <View style={{flexDirection: 'column',marginLeft:10}}>
                            <Text style={styles.cardavatar}>{rowData.ga_prefix}</Text>
                            <Text style={styles.cardTime}>1小时前</Text>
                        </View>
                        <Image source={require('../img/write.png')} style={styles.comment}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.props.Press(rowData.id)}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText} >{rowData.title}</Text>
                        <Image source={{uri:rowData.images[0]}} style={styles.cardImage}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    Press(id){
        const {navigator} = this.props;
        if(navigator){
           navigator.push({
                name:'DetailPage',
                component:DetailPage,
                params:{
                    id:id,
                }
            });
        }
    }

    fetchData(){
        var url = 'http://news-at.zhihu.com/api/4/news/latest';
        return new Net().getZhiHuMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }

    renderSectionHeader(sectionData, sectionID){
        console.log(sectionData);
        return(
            <View style={styles.rowTite}>
                <Text>{sectionID}</Text>
            </View>
        );
    }

    onRefresh(){
        this.setState({refreshing: true});
        this.fetchData().then((responseData) => {
            let story = responseData;
            this.setState({
                userData : story.stories,
                refreshing:false,
            });
        });
    }

    render(){
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                renderRow={this.myRenderRow.bind(this)}
                enableEmptySections={true}
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
            </ListView>
        );
    }
}

class CardBottom extends Component {
    render(){
        const {src,styles,content} = this.props;
        return(
            <View style={[this.props.styles,{flexDirection: 'row',justifyContent : 'center'}]}>
                <Image source={this.props.src} style={{height:15,width:15}}></Image>
                <Text style={{color:'#a6acb1',fontSize:10,marginLeft:5}} onPress={this.props.press}>{this.props.content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F5FCFF',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#a6acb1',
        marginTop:10
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
        flex:1,
        alignSelf:'flex-start',
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        marginRight:5,
    },

    cardBottom: {
        flexDirection: 'row',
        borderColor:'#a6acb1',
        borderTopWidth:1,
        marginTop:3,
        marginBottom:3,
        justifyContent:'space-between',
    },

    cardBottomItem: {
        flex:0.5,
        alignItems: 'center',
        marginTop:5,
    },

    rowTite:{
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ccc',
    },

    renderRowImg:{
        borderRadius:15,
        height:30,
        width:30,
        alignItems: 'center',
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
        right:10,
    },
});