import React from 'react';
import styled from "styled-components";
import Calendar from './Calendar';
import './App.css';
import { Add, Done } from "@material-ui/icons";


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  
  }

  render() {
    return(
      <div className="App">
        <Title>나만의 일정 매니저</Title>
        <Line></Line>
        <Calendar />
        <FloatBox>
          <button><Done style={{ color: "#fff", fontSize: "2em" }}/></button>
          <button><Add style={{ color: "#fff", fontSize: "2em" }}/></button>
        </FloatBox>
      </div>
    );
  }
}
const Title = styled.h1`
  color: #154c79;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

const FloatBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 3%;
  right: 3%;
  & button {
    border: 1px solid #154c79;
    border-radius: 25px;
    background-color: #154c79;
    color: #fff;
    margin: 10px 0;
    width: 50px;
    height: 50px;
  }
  & button:hover {
    cursor: pointer;
  }
`;

export default App;
