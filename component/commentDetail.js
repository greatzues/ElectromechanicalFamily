/**
 * Created by zues on 2017/1/13.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image,
    Dimensions, ListView, TextInput, Navigator, ScrollView, ToastAndroid} from 'react-native';
import Toast from 'react-native-root-toast';
import NormalToolbar from './NormalToolbar';
import Net from '../Tool';
import PicDetail from './PicDetail'

const COMMENT = '/comments';
export default class commentDetail extends Component{
    // 构造
      constructor(props) {
        super(props);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
              dataSource:ds,
              myComments:[],
              data:this.props.data,
              commentInfo:'',
              to:null,
              update:false,
              text:'',
              toId:null,
              toName:null,
        };
      }

    componentDidMount() {
        this.fetchComment(this.state.data.messageId);
    }

      render(){
          return(
              <ScrollView style={styles.container}>
                  <NormalToolbar title='详情' leftImageSource={require('../img/back.png')} leftItemFunc={this.back.bind(this)}/>
                  <View style={styles.cardTop}>
                      <Image source={require('../img/UserDafault.png')}  style={styles.renderRowImg}/>
                      <View style={styles.avatarAndTime}>
                          <Text style={styles.cardavatar}>{this.state.data.belong}</Text>
                          <Text style={styles.cardTime}>{this.state.data.date}</Text>
                      </View>
                  </View>
                  <View style={styles.cardContent}>
                      <Text style={styles.cardText} >{this.state.data.messageText}</Text>
                      <ListView
                          dataSource={this.state.dataSource.cloneWithRows(
                              [this.state.data.messagePic1,this.state.data.messagePic2,this.state.data.messagePic3,
                                  this.state.data.messagePic4,this.state.data.messagePic5,this.state.data.messagePic6,
                                    this.state.data.messagePic7,this.state.data.messagePic8,this.state.data.messagePic9])}
                          renderRow={this.picList.bind(this,[this.state.data.messagePic1,this.state.data.messagePic2,this.state.data.messagePic3,
                              this.state.data.messagePic4,this.state.data.messagePic5,this.state.data.messagePic6,
                                this.state.data.messagePic7,this.state.data.messagePic8,this.state.data.messagePic9])}
                          contentContainerStyle={styles.list}
                          enableEmptySections={true}
                      />
                  </View>

                  <View style={styles.cardTop}>
                      <TextInput
                          style={styles.commentTextInput}
                          ref='input'
                          placeholder='评论'
                          placeholderTextColor='gray'
                          underlineColorAndroid='gray'
                          defaultValue ={this.state.text}
                          multiline={true}
                          numberOfLines={3}
                          onEndEditing ={event => this.setState({commentInfo:event.nativeEvent.text.replace(/@(\W+) /g,'')})}/>

                      <TouchableOpacity onPress={this.postComment.bind(this)}>
                          <View style={styles.commentButton}>
                              <Text style={styles.commentButtonText}>评论</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <ListView
                      renderRow={this.renderCommentRow.bind(this)}
                      dataSource={this.state.dataSource.cloneWithRows(this.state.myComments)}
                      enableEmptySections={true}
                  />
              </ScrollView>
          );
      }

    //获取评论
    fetchComment(id){
        var url = COMMENT+"?filters={messageId:"+id+"}";
        return new Net().getMethod(url)
            .then(data => {
                this.setState({myComments:data.comments})
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * messageId    这条分享的id，也就是传递进来的messageId
     * from         客户端的id，也就是这里登陆之后要拿到的用户id
     * to           要评论给那个人的id，也就是这里的belong
     * commentInfo  评论详细内容
     */
    postComment(){
        if(this.state.commentInfo ===''){
            Toast.show('请输入评论内容');
            return ;
        }
        var postData = {
            'messageId':this.state.data.messageId,
            'from':this.props.id,
            'to':this.state.toId===null?null:this.state.toId,
            'commentInfo':this.state.commentInfo
        };
        new Net().postMethod(COMMENT,postData).then(r => {}).catch(e => console.log(e));
        this.refs.input.clear();
        this.state.myComments.push({
            id:null,
            messageId:this.state.data.messageId,
            from:this.props.id,
            fromName:this.props.username,
            to:this.state.toId===null?null:this.state.toId,
            toName:this.state.toId===null?null:this.state.toName,
            commentInfo:this.state.commentInfo}
        );
        Toast.show('评论成功');
        this.forceUpdate();
    }

    /**
     * @param rowData
     * @returns {XML}
     *
     * 获取的comments具体含义
     * id         是标记这条评论的id，保证评论是唯一的
     * messageId  是这条分享的id，可以直接传入
     * from       这条评论来自哪位用户的评论，可以是发这条分享的本身用户
     * fromName   是来自哪位用户的名字
     * to         这条评论对哪位用户说的，如果没传入，则表示对发送本条分享的用户
     * toName     这条推送对那位用户，多对应他的名字
     * commentInfo这条评论的内容
     */
    renderCommentRow(rowData){
        console.log(rowData);
        return(
            <TouchableOpacity style={styles.renderCommentRow} onPress={this.toSomeone.bind(this,rowData.fromName,rowData.from)}>
                <Image source={require('../img/UserDafault.png')} style={styles.avatar}/>
                <Text>{rowData.fromName}</Text>
                <Text>{rowData.toName?'@'+rowData.toName:''}</Text>
                <Text>{' : '+rowData.commentInfo}</Text>
            </TouchableOpacity>
        );
    }

    back(){
        new Net().back(this.props);
    }

    picList(rowData, sectionID, rowID){
        if(sectionID!==null){
            var picUri = BASEURL+'/message/'+sectionID;
            let str = sectionID.substring(sectionID.length-1); //拿到最后一个字符，传出去作为图片预览的index
            let index = parseInt(str); //解析一个字符串，并返回一个整数
            return (
                <View>
                    <TouchableOpacity style={styles.itemContainer} onPress={this.toPicDetail.bind(this,rowData,index)}>
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
    //万一@之后又删掉怎么办
    toSomeone(toName,toId){
        this.setState({
            text:'@'+toName+' ',
            toId:toId,
            toName:toName
        });
    }

    toPicDetail(uri,index){
        var params = {uri:uri,index:index}
        new Net().toOther(this.props,'PicDetail',PicDetail,params)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
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
        flexDirection: 'row',
        alignSelf:'flex-start',
        alignItems:'center',
        width:device.width,
    },
    cardContent: {
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
    commentButton:{
        justifyContent:'center',
        alignItems: 'center',
        width: 40,
        height: 30,
        backgroundColor: '#337ab7',
        borderRadius:5,
    },
    commentButtonText:{
        color:'white',
        fontSize:15
    },
    commentTextInput:{
        width:device.width-50,
        height:50,
    },
    imageItem:{
        width:device.width*0.3,
        height:80,
    },
    itemContainer:{
        padding:3,
    },
    renderCommentRow:{
        flexWrap: 'wrap',
        flexDirection:'row',
    },

});