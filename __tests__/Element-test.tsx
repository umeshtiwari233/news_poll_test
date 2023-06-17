import "react-native";
import React from "react";
import App from "../App";
import renderer from "react-test-renderer";

let findElement = function(tree, element){
    console.warn(tree.children)
    let result=undefined;
    for(node in tree.children){
        if(tree.children[node].props.testID==element){
            result=true;
        }
    }
    return result;
}
it('findElement', () => {
  let tree=renderer.create(
    <App/>
  ).toJSON();
  expect(findElement(tree,'flatlist1')).toBeDefined();
})
