import React, { useState } from "react";
import DayBox from "./DayBox";
import styled from "styled-components";
import moment from "moment";

const Calendar = (props) => {
    const [month, setMonth] = useState(moment());
    const today = month;
    const first_week = today.clone().startOf('month').week();
    const last_week = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    const schedule_list = props.schedule_list;

    const makeCalendar = () => {
        let result = [];
        let start_week = first_week;
        for(start_week; start_week <= last_week; start_week++) {
            result = result.concat(
                <tr key={start_week}>
                    {
                        Array(7).fill(0).map((val, index) => {
                            let days = today.clone().startOf('year').week(start_week).startOf('week').add(index, 'day'); // Object

                            const schedule_result = schedule_list.filter((v, i) => {
                                let full_date = v.date.split(' ')[0];
                                if(full_date === days.format('YYYY-MM-DD')) {
                                    return v;
                                }
                                return undefined;
                            });

                            return(
                                <RowBox key={index}>
                                    <DayBox days={days} schedule_result={schedule_result} />
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
        <main>
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
        </main>
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
    & > caption > button {
        outline: none;
        border: 1px solid #fff;
        background-color: #fff;
        color: #154c79;
        font-size: 2rem;
        font-weight: 800;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    & > caption > span {
        margin: 0 1.5rem;
    }
`;

const Tablehead = styled.thead`
    height: 40px;
    color: #fff;
    & > tr {
        border-top: 1px solid #154c79;
        background-color: #fff;
        color: #154c79;
    }
    & th {
        font-size: 1.1rem;
    }
`;

const Tablebody = styled.tbody`
    & td {
        width: 9.5vw;
        border-top: 1px solid #154c79;
        border-bottom: 1px solid #154c79;
    }
`;
const RowBox = styled.td`
    height: 120px;
`;

export default Calendar;