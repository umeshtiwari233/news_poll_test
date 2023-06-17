import "react-native";
import "isomorphic-fetch";
import React from "react";
import App from "../App";
import renderer from "react-test-renderer";

const mockData={
  "hits":[
    {
        "created_at": "2023-06-16T15:46:48.000Z",
        "title": "We are all AI's free data workers",
        "url": "https://www.technologyreview.com/2023/06/13/1074560/we-are-all-ais-free-data-workers/",
        "author": "headalgorithm"
    }
  ]
}

it("Api- test cases", async ()=> {
  global.fetch=jest.fn().mockImplementation(()=>{
    return new Promise((resolve,reject)=>{
      resolve({
        json:function(){
          return{
            hits: mockData,
          }
        }
      })
    })
  })

  const res=await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0');
  const data=await res.json();

  console.log(data.hits.hits[0].author);
  expect(data.hits.hits[0].author).toEqual("headalgorithm");


  // let Homed: App = renderer.create(<App />).getInstance();
  // await Homed.getPosts();
  // console.warn(Homed.state.posts);
  // expect(Homed.state.posts[0].points).toEqual(1);
});
