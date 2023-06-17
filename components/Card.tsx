import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import OpenUrlButton from './OpenUrlButton';

type MyProps = {
    author ?: string , 
    created_at ?: string , 
    objectId ?: string  , 
    title ?: string , 
    url ?: string , 
    _tags ?: string[]
};

type MyState = {
}

export default class CardComponent extends Component<MyProps , MyState> {
  render() {
    const {title , author , created_at , objectId , url , _tags}  = this.props
   
    return (
    <Card>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{author}</Paragraph>
        </Card.Content>
        <Card.Actions>
          {/* <OpenUrlButton url={url} >Details</OpenUrlButton> */}
        </Card.Actions>
    </Card>
    ) 
  }

}