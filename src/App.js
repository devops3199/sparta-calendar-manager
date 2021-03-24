import React from 'react';
import styled from "styled-components";
import Calendar from './Calendar';
import ScheduleAdd from './ScheduleAdd';
import './App.css';
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import {connect} from "react-redux";
import { loadScheduleFB } from "./redux/modules/schedule";

const mapStateToProps = (state) => {
  return {schedule_list: state.schedule.schedule, is_loaded: state.schedule.is_loaded};
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(loadScheduleFB());
    },
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterCompleted : false,
      buttonName : '완료된 일정 보기',
    };

  }

  componentDidMount(){
    this.props.load();
  }

  filterActivate = () => {
    if(this.state.filterCompleted){
      this.setState({filterCompleted : false, buttonName : '완료된 일정 보기'});
    } else {
      this.setState({filterCompleted : true, buttonName : '모든 일정 보기'});
    }
    console.log(this.state.filterCompleted, this.state.buttonName);
  };

  render() {
    return(
      <div className="App">
        <Title>나만의 일정 매니저</Title>
        <Line/>
        <Switch>
          <Route path="/" exact render={() => <Calendar schedule_list={!this.state.filterCompleted ? this.props.schedule_list : this.props.schedule_list.filter((val) => { if(val.completed) { return val; } })} />} />
          <Route path="/add" exact component={ScheduleAdd} />
        </Switch>
        <FloatBox>
          <button onClick={this.filterActivate}>{this.state.buttonName}</button>
          <button onClick={() => {this.props.history.push('/add');}}>일정 추가</button>
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
    border-radius: 0.25rem;
    background-color: #154c79;
    color: #fff;
    margin: 10px 0;
    width: 150px;
    height: 40px;
    outline: none;
  }
  & button:hover {
    cursor: pointer;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
