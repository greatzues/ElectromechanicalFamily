/**
 * Created by zues on 2016/9/13.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView, Dimensions, TextInput, Image, RefreshControl, ToastAndroid,
    Navigator } from 'react-native';
import Net from '../Net';
import DetailPage from './DetailPage';
const deviceWidth = Dimensions.get('window').width;
/**
 * 实现下拉刷新列表，取知乎日报api做的测试
 */
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
            id:'',
        };
    }

    componentDidMount() {
        this.fetchData().then((responseData) => {
            let story = responseData;
            this.setState({
                userData : story.stories,
            });
        });
    }

    getExtra(id){
        var URl = 'http://news-at.zhihu.com/api/4/story-extra/'+id;
        new Net().getZhiHuMethod(URl).then((responseData) => {
            return responseData.comments;
        })
            .catch(error => {
                alert("error message:"+ error);
            });
    }

    myRenderRow(rowData,sectionID,rowID){
        return (
            <View style={styles.container}>
                <TouchableOpacity  onPress={() => this.props.Press(rowData.id)}>
                    <View style={styles.cardTop}>
                        <Image source={{uri:rowData.images[0]}}  style={{borderRadius:15, height:30, width:30,alignItems: 'center'}}/>
                        <View style={{flexDirection: 'column',marginLeft:10}}>
                            <Text style={{color:'#f5811f',fontSize:15}}>{rowData.ga_prefix}</Text>
                            <Text style={{color:'#a6acb1', fontSize:10}}>1小时前</Text>
                        </View>
                    </View>

                    <View style={styles.cardContent}>
                        <Text style={{fontSize:20, fontWeight:'200'}}>{rowData.title}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.cardBottom}>
                    <CardBottom src = {require('../img/good.png')} content={rowData.id} styles={styles.cardBottomItem}/>
                </View>
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
                id:story.id,
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
        backgroundColor: '#F5FCFF',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#a6acb1',
        flexWrap:'wrap',
        marginTop:10
    },

    cardTop: {
        flexDirection: 'row',
        alignSelf:'flex-start',
        alignItems:'center',
        margin:5,

    },

    cardContent: {
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
});