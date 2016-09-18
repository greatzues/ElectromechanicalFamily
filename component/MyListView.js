/**
 * Created by zues on 2016/9/13.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView, Dimensions, TextInput, Image, RefreshControl } from 'react-native';
import Net from '../Net';
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
        };
    }

    componentDidMount() {
        this.fetchData().then((responseData) => {
            let story = responseData;
            console.log(story);
            this.setState({
                userData : story.stories,
            });
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
                refreshing:false
            });
        });
    }

    render(){
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                renderRow={(rowData,sectionID,rowID) => {return (
                    <View style={styles.container}>
                        <View style={styles.cardTop}>
                            <Image source={{uri:rowData.images[0]}}  style={{borderRadius:15, height:30, width:30,alignItems: 'center'}}/>
                            <View style={{flexDirection: 'column',marginLeft:10}}>
                                <Text style={{color:'#f5811f',fontSize:15}}>zues</Text>
                                <Text style={{color:'#a6acb1', fontSize:10}}>1小时前</Text>
                            </View>
                        </View>

                        <View style={styles.cardContent}>
                            <Text style={{fontSize:20, fontWeight:'200'}}>{rowData.title}</Text>
                        </View>

                        <View style={styles.cardBottom}>
                            <CardBottom src = {require('../img/share.png')} content="转发" styles={styles.cardBottomItem}/>
                            <CardBottom src = {require('../img/messages.png')} content="66" styles={[styles.cardBottomItem,{borderColor:'#a6acb1',borderLeftWidth:0.5,borderRightWidth:0.5}]}/>
                            <CardBottom src = {require('../img/good.png')} content="666" styles={styles.cardBottomItem}/>
                        </View>
                    </View>
                    )}}
                enableEmptySections={true}

                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }
            ></ListView>
        );
    }

    fetchData(){
        var url = 'http://news-at.zhihu.com/api/4/news/latest';
        // new Net().getMethod(url)
        //     .then((responseData) => {
        //         let baseInfo = responseData.response.name;
        //         this.state.userData.baseInfo = baseInfo;
        //         console.log('console baseInfo = '+ responseData.response);
        //     }).catch((error) => {
        //         alert('出现未知错误');
        //         console.error('error'+ error);
        // });

        var myHeader = new Headers();
        myHeader.append('Accept', 'application/json');
        myHeader.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) =>{
            fetch(url,{
                method: 'get',
                headers:myHeader,
            }).then(response =>{
                console.log(response.status);
                resolve(response.json());
            })
                .catch(error => {
                console.log('网络不够给力啊，兄弟！');
                reject(error);
            });
        } )
    }

}

class CardBottom extends Component {
    render(){
        const {src,styles,content} = this.props;
        return(
            <View style={[this.props.styles,{flexDirection: 'row',justifyContent : 'center'}]}>
                <Image source={this.props.src} style={{height:15,width:15}}></Image>
                <Text style={{color:'#a6acb1',fontSize:10,marginLeft:5}} >{this.props.content}</Text>
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