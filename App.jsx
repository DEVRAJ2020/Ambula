import React from 'react';
import {
  ScrollView,
  StatusBar,
} from 'react-native';

import { Card, Card2, CardData1, CardData2, Footer, Header, HeaderText, } from './src/Components';
const App = () => {
  return (<>
    <StatusBar
      backgroundColor={'blue'}
    />


    <Header />
    <ScrollView style={{ backgroundColor: '#dbd7d2', }}>
      <HeaderText txt={'ABHA Services'}/>
      <Card CardData={CardData1} />
      <HeaderText txt={'Our Services'}/>
      <Card CardData={CardData2} />
      <Card2/>  
    </ScrollView>
    <Footer />


  </>)
}

export default App;
