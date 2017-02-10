import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Net from '../Tool';
import SchoolmatesDatails from './SchoolmatesDatails';
import NormalToolbar from './NormalToolbar';

const BRIEF = '/schoolmates';
export default class NewsItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            dataSource:ds,
            userData: [],
            id:'',
            page:1
        };
    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <View style={styles.container}>
                <NormalToolbar title='校友风采' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.userData)}
                    renderRow={this.renderRow.bind(this)}
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID){
        return (
            <View>
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => this.Press(rowData.id)}>
                        <Image
                            style={styles.imageItem}
                            source={require('../img/errorPage.png')}
                            resizeMode='contain'/>
                    </TouchableOpacity>
                    <Text style={styles.itemText}>{rowData.title}</Text>
                </View>
            </View>
        );
    }

    fetchData(){
        var url=BRIEF+'?page='+this.state.page;
        return new Net().getMethod(url).catch(error => {
            alert("error message:"+ error);
        });
    }

    Press(id){
        var params = {id:id};
        new Net().toOther(this.props, 'SchoolmatesDatails',SchoolmatesDatails,params);
    }

    componentWillMount() {
        this.fetchData().then(r => {
            this.setState({
                userData : r.notificationList,
            });
        });
    }

    back(){
        new Net().back(this.props);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    itemContainer:{
        padding:8,
        width:device.width*0.2+16,
    },
    imageItem:{
        width:device.width*0.2,
        height:80,
    },
    itemText:{
        alignSelf:'center',
    },
});