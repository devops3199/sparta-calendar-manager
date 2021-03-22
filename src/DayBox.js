import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DayBox = (props) => {
    const days = props.days;

    const schedule = () => {
        console.log(days.format('YYYY-MM-DD'));
    };

    return (
        <DayStyle onClick={schedule}>
            <span>{days.format('D')}</span>
        </DayStyle>
    );
};

const DayStyle = styled.div`
    height: 100%;
    & > span {
        float: right;
        margin: 12px 12px 0 0;
        font-weight: 700;
    }
`;

export default DayBox;