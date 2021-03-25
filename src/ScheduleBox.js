import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import Popup from "./Popup";
import EditPopup from "./EditPopup";

const ScheduleBox = (props) => {
    const result = props.result;
    const original = props.val;
    const today_schedule = React.useRef(null);
    const [popup, setPopup] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const mouseRightClick = (e) => {
            if(e.button === 2){
                setEdit(true);
            }
        };

        today_schedule.current.addEventListener('mousedown', mouseRightClick);

        return () => {
            if(!today_schedule.current) {
                return;
            }
            today_schedule.current.removeEventListener('mousedown', mouseRightClick);
        };
    });

    return (
        <div>
            <TodaySchedule ref={today_schedule} onClick={() => { setPopup(true); }}>{result}</TodaySchedule>
            <Popup trigger={popup} setTrigger={setPopup} data={original} />
            <EditPopup trigger={edit} setTrigger={setEdit} data={original} />
        </div>
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


const TodaySchedule = styled.span`
    display: block;
    background-color: ${props => props.children.includes('미완료') ? '#F55A66': '#f9f1d2'};
    color: ${props => props.children.includes('미완료') ? '#fff': '#000'};
    margin: 5px 0;
    cursor: pointer;
    font-size: 1rem;
    animation: 1s ease-out 0s 1 ${SlideIn};
`;

export default ScheduleBox;