import React from "react";
import ScheduleBox from "./ScheduleBox";
import styled from "styled-components";


const DayBox = (props) => {

    const days = props.days;
    const schedule_result = props.schedule_result;

    const compare = (a,b) => {
        if(a.date < b.date){
            return -1;
        }
        if(a.date > b.date){
            return 1;
        }
        return 0;
    };

    if(schedule_result.length > 1){
        schedule_result.sort( compare );
    }

    return (
        <DayStyle>
            <DateBox>
                <span>{days.format('D')}</span>
            </DateBox>
            <ScheduleContainer>
                {schedule_result.map((val, index) => {
                    let time = val.date.split(' ')[1];
                    let complete = (val.completed) ? '(완료)' : '(미완료)';
                    let result = time + ' - ' + val.title + ' ' + complete;
                    
                    return (
                        <ScheduleBox key={index} result={result} val={val} />
                    );
                })}
            </ScheduleContainer>
        </DayStyle>
    );
};

const DayStyle = styled.div`
    height: 100%;
    overflow-y: auto;
    &:scrollbar {
        appearance: none;
    }
`;

const DateBox = styled.div`
    text-align: right;
    & > span {
        margin: 12px 12px 0 0;
        font-weight: 700;
    }
`;

const ScheduleContainer = styled.div`
    height: 20px;
    text-align: right;
`;

export default DayBox;