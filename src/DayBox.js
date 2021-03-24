import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Popup from "./Popup";

const DayBox = (props) => {
    const [popup, setPopup] = useState(false);
    const [id, setId] = useState(null);

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

    useEffect(() => {

    });

    return (
        <DayStyle>
            <DateBox>
                <span>{days.format('D')}</span>
            </DateBox>
            <ScheduleBox>
                {schedule_result.map((val, index) => {
                    let time = val.date.split(' ')[1];
                    let complete = (val.completed) ? '(완료)' : '(미완료)';
                    let result = time + ' - ' + val.title + ' ' + complete;
                    
                    return (
                        <span id='mySchedule' key={index} onClick={() => {
                            setPopup(true);
                            setId(val.id);
                        }}>{result}</span>
                    );
                })}
            </ScheduleBox>
            <Popup trigger={popup} setTrigger={setPopup} data={schedule_result} id={id} />
        </DayStyle>
    );
};

const SlideIn = keyframes`
    0%{
        transform: translateX(-100%);
    }

    100%{
        transform: translateX(0%);
    }
`;

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

const ScheduleBox = styled.div`
    height: 20px;
    text-align: right;
    & span {
        display: block;
        background-color: #eee;
        margin: 5px 0;
        cursor: pointer;
        font-size: 1rem;
        animation: 1s ease-out 0s 1 ${SlideIn};
    }
`;

export default DayBox;