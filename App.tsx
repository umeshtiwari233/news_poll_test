import { Text, View , FlatList } from 'react-native'
import React, { Component } from 'react'
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import CardComponent from './components/Card';


type MyProps = {
};

type post = {
  author : string , 
  created_at : string , 
  objectId : string  , 
  title : string , 
  url : string , 
  _tags : string[]
}

type MyState = {
  posts : post[]  , 
  pageNo : number , 
  searchText : string ,
  isLoading : boolean,
};


export default class App extends Component<MyProps , MyState> {

    constructor(props : MyProps ){
        super(props)
        this.state = {
              posts : [] ,
              pageNo : 0 , 
              searchText : '',
              isLoading: true,
        }
      }
 
       
  componentDidMount(): void {
    this.getPosts()
    setInterval(()=> this.getPosts() , 10000) 
   }

    renderItems = ({item} : any)=>(
      <CardComponent key={item.objectId} title={item.title} author={item.author} url={item.url} />
    ) 


  render() {
    return (
      <View>
         <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          value={this.state.searchText}
          />
        <FlatList 
        testID={'flatlist1'}
          data={this.state.posts}
          keyExtractor={(item)=> item.objectId}
          renderItem={this.renderItems}
          onEndReached={this.getPosts}
          onEndReachedThreshold={0}
        />
      </View>
    )
  }

  onChangeSearch = (query : string)=>{
     this.setState({
        searchText : query
     })

     this.setState({
        posts : this.state.posts.filter(post => {
            if (this.state.searchText === "") {
              return post;
            } else if (post.title.toLowerCase().includes(this.state.searchText.toLowerCase()) || post.author.toLowerCase().includes(this.state.searchText.toLowerCase())) {
              return post;
            }
          })
     })
  }

  async getPosts() {
    try {
      const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0');
      const json = await response.json();
      this.setState({posts: [...this.state.posts, ...json.hits]});
    } catch (error) {
      console.warn(error);
    } finally {
      this.setState({isLoading: false});
      
    }
  }
//   getPosts = ()=>{
//     if(this.state.pageNo < 51){
//       fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageNo}`)
//      .then(res => res.json())            
//      .then(data=> this.setState({posts : [...this.state.posts, ...data.hits]} , ()=> {console.log(this.state.posts.length)}))
    
      
//      this.setState({pageNo : this.state.pageNo + 1})
//     }
//  }

}