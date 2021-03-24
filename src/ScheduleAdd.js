import React, { useRef } from "react";
import styled from "styled-components";
// redux hook을 불러옵니다.
import { useDispatch } from "react-redux";
// 내가 만든 액션 생성 함수를 불러옵니다.
import { addScheduleFB } from "./redux/modules/schedule";

const ScheduleAdd = (props) => {
    const dispatch = useDispatch();

    const schedule_date = useRef();
    const schedule_time = useRef();
    const schedule_title = useRef();

    const addSchedule = () => {
        if(schedule_title.current.value === '' || schedule_date.current.value === '' || schedule_time.current.value === ''){
            alert('모든 내용을 입력하세요.');
            return;
        }
        let title = schedule_title.current.value;
        let time = schedule_date.current.value + ' ' + schedule_time.current.value;
        dispatch(addScheduleFB(title, time));
        props.history.goBack();
    };

    return (
        <ScheduleWrapper>
            <ScheduleAddContainer>
                <DatePick>
                    <input type="date" ref={schedule_date} pattern="\d{4}-\d{2}-\d{2}"/>
                </DatePick>
                <TimePick>
                    <input type="time" ref={schedule_time}/>
                </TimePick>
                <ContentBox>
                    <input type="text" ref={schedule_title} placeholder="할 일을 입력하세요"/>
                </ContentBox>
                <button onClick={addSchedule}>일정 추가</button>
            </ScheduleAddContainer>
        </ScheduleWrapper>
    );
};

const ScheduleWrapper = styled.section`
    width: 50%;
    margin: 0 auto;
`;

const ScheduleAddContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    & button {
        border: 1px solid #154c79;
        border-radius: 5px;
        background-color: #154c79;
        color: #fff;
        width: 70px;
        height: 30px;
    }

    & button:hover {
        cursor: pointer;
    }
`;

const DatePick = styled.div`
    & input {
        width: 300px;
        height: 30px;
        border: 1px solid #efefef;
        border-radius: 5px;
        outline: none;
        padding: 0.25rem 0.5rem;
        font-size: 1.1rem;
    }
`;

const TimePick = styled.div`
    margin: 15px 0;
    & input {
        width: 300px;
        height: 30px;
        border: 1px solid #efefef;
        border-radius: 5px;
        outline: none;
        padding: 0.25rem 0.5rem;
        font-size: 1.1rem;
    }
`;

const ContentBox = styled.div`
    margin-bottom: 15px;
    & input {
        width: 300px;
        height: 30px;
        border: 1px solid #efefef;
        border-radius: 5px;
        outline: none;
        padding: 0.25rem 0.5rem;
        font-size: 1.1rem;
    }
`;

export default ScheduleAdd;