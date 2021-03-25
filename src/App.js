import React from 'react';
import styled from "styled-components";
import Calendar from './Calendar';
import ScheduleAdd from './ScheduleAdd';
import Spinner from './Spinner';
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
      topButtonName : '완료된 일정 보기',
      scheduleAdded : false,
      bottomButtonName : '일정 추가',
    };

  }

  componentDidMount(){
    this.props.load();
  }

  filterActivate = () => {
    if(this.state.filterCompleted){
      this.setState({filterCompleted : false, topButtonName : '완료된 일정 보기'});
    } else {
      this.setState({filterCompleted : true, topButtonName : '모든 일정 보기'});
    }
  };

  scheduleAddPage = () => {
    if(this.state.scheduleAdded){
      this.setState({scheduleAdded : false, bottomButtonName : '일정 추가'});
      this.props.history.push('/');
    } else {
      this.setState({scheduleAdded : true, bottomButtonName : '뒤로 가기'});
      this.props.history.push('/add');
    }
  };

  setScheduleAdded = () => {
    this.setState({scheduleAdded : false, bottomButtonName : '일정 추가'});
  };

  render() {
    return(
      <div className="App">
        {!this.props.is_loaded ? (<Spinner/>) : (
          <React.Fragment>
            <Title>나만의 일정 매니저</Title>
            <Line/>
            <Switch>
              <Route path="/" exact render={() => <Calendar schedule_list={!this.state.filterCompleted ? this.props.schedule_list : this.props.schedule_list.filter((val) => { return val.completed })} />} />
              <Route path="/add" exact render={() => <ScheduleAdd history={this.props.history} setScheduleAdded={this.setScheduleAdded} />} />
            </Switch>
            <FloatBox>
              <button onClick={this.filterActivate}>{this.state.topButtonName}</button>
              <button onClick={this.scheduleAddPage}>{this.state.bottomButtonName}</button>
            </FloatBox>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const Title = styled.h1`
  color: #154c79;
  text-align: center;
`;

const Line = styled.hr`
  width: 80vw;
  margin: 16px auto;
  border: 1px dotted #154c79;
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
    width: 110px;
    height: 40px;
    outline: none;
    -webkit-box-shadow: 1px 1px 8px -1px #154c79; 
    box-shadow: 1px 1px 8px -1px #154c79;
  }
  & button:hover {
    cursor: pointer;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
