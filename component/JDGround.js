/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View ,  ListView, RefreshControl, TouchableOpacity, Navigator, Image, Dimensions} from 'react-native';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import DetailPage from './DetailPage';

const NEWS = '/news?page=';
export default class SchoolNews extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state={
            news: {},
            dataSource:ds,
            refreshing:false,
            page:'1',
        };
    }

    componentDidMount() {
        this.fetchData().then(r => {
            this.setState({
                news : r.newsList,
            });
        });
    }

    myRenderRow(rowData,sectionID,rowID){
        return (
            <TouchableOpacity  onPress={() => this.Press(rowData.id)}>
                <View style={styles.itemBody}>
                    <Text>{rowData.title}</Text>
                    <View style={styles.renderRowItem}>
                        <Text style={styles.itemTitle} ellipsizeMode="tail" numberOfLines={1}  >{rowData.summary}</Text>
                        <Text style={styles.itemTime}>1小时前</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <NormalToolbar
                    title='机电广场'
                    leftImageSource={require('../img/back.png')}
                    leftItemFunc={this.back.bind(this)} />
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.news)}
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
            </View>
        );
    }

    Press(id){
        var params = {id:id};
        new Net().toOther(this.props,'DetailPage',DetailPage,params);
    }

    back(){
        new Net().back(this.props);
    };

    fetchData(){
        return new Net().getMethod(NEWS+'1').catch(e => {
            console.log(e);
        })
    }

//拿到接口之后修改一下story
    onRefresh(){
        this.setState({refreshing: true});
        this.fetchData().then(r => {
            this.setState({
                news : r.newsList,
                refreshing:false,
            });
        });
    }
}
//{this.state.hideToolbar?<View/>:<Toolbar/>}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column'
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
    renderRowImg:{
        borderRadius:15,
        height:30,
        width:30,
        alignItems: 'center',
    },
    renderRowItem:{
        flexDirection:'column',
        marginLeft:10,
    },
    itemTitle:{
        fontSize:20,
        fontWeight:'200',
        width:window.width-30
    },
    itemTime:{
        color:'#a6acb1',
        fontSize:10
    },
    itemBody:{
        flex: 1,
        flexDirection:'row',
        height:60,
        marginTop:3,
        alignItems:'center',
    },
});