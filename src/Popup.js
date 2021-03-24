import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
// 내가 만든 액션 생성 함수를 불러옵니다.
import { updateScheduleFB, deleteScheduleFB } from "./redux/modules/schedule";

const Popup = (props) => {
    const dispatch = useDispatch();
    const temp = props.data.filter((val) => {
        if(val.id === props.id){
            return val;
        }
        return undefined;
    });

    let schedule_data = null;

    if (temp.length > 0){
        schedule_data = temp[0];
    }

    return(props.trigger) ? (
        <PopupContainer>
            <PopupContext>
                <CloseButton>
                    <Close style={{ color: "#154c79", fontSize: "2em" }} onClick={() => props.setTrigger(false)} />
                </CloseButton>
                <div>
                    <h3>일시: {schedule_data.date}</h3>
                    <div>
                        <p>
                            내용: {schedule_data.title}
                        </p>
                    </div>
                    <div>
                        <p>
                            상태: {(schedule_data.completed) ? "완료" : "미완료"}
                        </p>
                    </div>
                </div>
                <ActionButton>
                    <button onClick={() => {
                        dispatch(deleteScheduleFB(schedule_data.id));
                        props.setTrigger(false);
                    }}>삭제</button>
                    <button onClick={() => {
                        dispatch(updateScheduleFB(schedule_data.id));
                        props.setTrigger(false);
                    }}>완료</button>
                </ActionButton>
            </PopupContext>
        </PopupContainer>
    ) : "";
};

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    transform: translate3d(0, 0, 0);
`;

const PopupContext = styled.div`
    position: relative;
    padding: 32px;
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 400px;
    background-color: #fff;
`;


const CloseButton = styled.div`
    text-align: right;
    & > svg {
        cursor: pointer;
    }
`;

const ActionButton = styled.div`
    display: flex;
    justify-content: space-around;
    & button {
        border: 1px solid #154c79;
        border-radius: 5px;
        background-color: #fff;
        color: #154c79;
        padding: 0.25rem 1rem;
        outline: none;
    }

    & button:hover {
        background-color: #154c79;
        color: #fff;
    }
`;

export default Popup;