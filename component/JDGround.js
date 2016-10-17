/**
 * Created by zues on 2016/8/26.
 */
import React, { Component } from 'react';
import {
    StyleSheet, Text, View ,  ListView, RefreshControl, TouchableOpacity, Navigator, Image, Dimensions
} from 'react-native';
import Toolbar from './Toolbar';
import Net from '../Net';
import DetailPage from './DetailPage';

const deviceWidth = Dimensions.get('window').width;
export default class SchoolNews extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state={
            userData: {},
            dataSource:ds,
            refreshing:false,
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

    myRenderRow(rowData,sectionID,rowID){
        return (
            <TouchableOpacity  onPress={() => this.Press(rowData.id)}>
                <View style={styles.itemBody}>
                    <Image source={{uri:rowData.images[0]}} style={styles.renderRowImg}/>
                    <View style={styles.renderRowItem}>
                        <Text style={styles.itemTitle} ellipsizeMode="tail" numberOfLines={1}  >{rowData.title}</Text>
                        <Text style={styles.itemTime}>1小时前</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar style={{position: 'absolute',top: 0, left: 0}}
                         click = {this.back.bind(this)}
                         title= "机电广场"
                         navIcon = {require('../img/back.png')}
                />
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
            </View>
        );
    }


    Press(id){
        console.log(id);
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

    back(){
        const{navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    };

    fetchData(){
        var url = 'http://news-at.zhihu.com/api/4/news/latest';
        return new Net().getZhiHuMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }

//拿到接口之后修改一下story
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
        width:deviceWidth-30
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