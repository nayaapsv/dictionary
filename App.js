import * as React from 'react';
import { Text, View, StyleSheet ,TextInput ,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';

export default class App extends React.Component {
  getWord=(word)=>{
var searchKeyword=word.toLowerCase();
var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

return fetch(url)

.then((data)=>{
  if(data.status===200){
    return data.json();
  }
  else
  {
    return null
  }
})
.then((response)=>{
var responseObject = response

if (responseObject){
  var wordData  = responseObject.definitions[0]
  var definition = wordData.description
  var lexicalCategory = wordData.wordtype
  
  this.setState({
"word":this.state.text,
"definition":definition,
'lexicalCategory':lexicalCategory,
  })
}
else{
  this.setState({
"word":this.state.text,
"definition":"Not Found",

  })
}

})
  }
  constructor(){
    super();
    this.state={
      text:'',
     
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Header backgroundColor='#45839d' 
      centerComponent={{text:'Dictionary' , style:{color:'#f4ecf7' , fontSize:30 ,          fontWeight:900, fontFamily:'impact'}}}
      ></Header>

      <TextInput  style={styles.inputBox} onChangeText={text=>{this.setState({
      text:text,
      isSearchedPressed:false,
      word:'',
      lexicalCategory:'',
      examples:[],
      defenition:'',
        });
        }} 
      value={this.state.text} 
     />


    <TouchableOpacity 
    style={styles.go}
    onPress={()=>{this.setState({
     isSearchedPressed:true,
     word:this.state.text,
    });
    this.getWord(this.state.text);
    }}

    >

    <Text style={styles.goText}>SEARCH</Text>
</TouchableOpacity>
      
<View>
<Text style={styles.goText}>Word:{""}</Text>
<Text style={styles.content}>{this.state.word}</Text>
<Text style={styles.goText}> </Text>
</View>

<View>
<Text style={styles.goText}>Type:{""}</Text>
<Text style={styles.content}>{this.state.lexicalCategory}</Text>
<Text style={styles.goText}> </Text>
</View>

<View>
<Text style={styles.goText}>Meaning:{""}</Text>
<Text style={styles.content}>{this.state.definition}</Text>

</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#f5cba7',
  },

 inputBox:{
   fontFamily:'impact',
   fontSize:30,
   marginTop:20,
 backgroundColor: '#ffffff',
 width:'80%',
 alignSelf:"center",
 height:40,
 borderColor:'black',
 borderWidth:2,
 textAlign:"center",
  },
  go:{
    marginTop:20,
 backgroundColor: '#f1948a',
 width:'35%',
 alignSelf:"center",
 height:39,
 borderColor:'black',
 borderWidth:2,
 textAlign:"center",
 borderRadius:10,
  },
  goText:{
fontFamily:'impact',
 fontSize:30
},
content:{
  textTransform: 'uppercase',
  fontFamily:'impact',
 fontSize:20
}
});
