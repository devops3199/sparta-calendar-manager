import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Calendar = (props) => {
    const [month, setMonth] = useState(moment());
    const today = month;
    const first_week = today.clone().startOf('month').week();
    const last_week = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    //console.log(today.clone().startOf('week').add(1, 'day').format('YYYY/MM/DD'));

    const makeCalendar = () => {
        let result = [];
        let week = first_week;
        for(week; week <= last_week; week++) {
            result = result.concat(
                <tr key={week}>
                    {
                        Array(7).fill(0).map((val, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); // Object
                            return(
                                <RowBox key={index}>
                                    <DayBox>
                                        <span>{ days.format('D') }</span>
                                    </DayBox>
                                </RowBox>
                            );
                        })
                    }
                </tr>
            );
        }
        return result;
    };

    const afterMonth = () => {
        setMonth(month.clone().add(1, 'month'));
    };

    const prevMonth = () => {
        setMonth(month.clone().subtract(1, 'month'));
    };

    return (
        <CalendarStyle>
            <caption>
                <button onClick={prevMonth}>&lt;</button>
                <span>{today.format('YYYY년 MM월')}</span>
                <button onClick={afterMonth}>&gt;</button>
            </caption>
            <Tablehead>
                <tr>
                    <th>일</th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                </tr>
            </Tablehead>
            <Tablebody>
                { makeCalendar() }
            </Tablebody>
        </CalendarStyle>
    );
};

const CalendarStyle = styled.table`
    border-collapse: collapse;
    width: 80vw;
    min-height: 60vh;
    margin: 0 auto;
    & > caption {
        font-size: 1.3rem;
        margin: 30px 0;
    }
    & button {
        border: 1px solid #154c79;
        border-radius: 20px;
        background-color: #154c79;
        color: #fff;
        font-weight: 800;
        width: 40px;
        height: 40px;
    }
    & > caption > span {
        margin: 0 1.5rem;
    }
`;

const Tablehead = styled.thead`
    height: 40px;
    color: #fff;
    & > tr {
        border: 1px solid #154c79;
        background-color: #154c79;
    }
    & th {
        font-size: 1.1rem;
    }
`;

const Tablebody = styled.tbody`
    & td {
        width: 9.5vw;
        border: 1px solid #154c79;
    }
`;
const RowBox = styled.td`
    height: 120px;
`;
const DayBox = styled.div`
    height: 100%;
    & > span {
        float: right;
        margin: 12px 12px 0 0;
        font-weight: 700;
    }
`;

export default Calendar;