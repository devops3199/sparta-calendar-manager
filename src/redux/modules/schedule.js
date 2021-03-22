// 액션 = 상태에 변화가 필요할 때, 가지고 있는 데이터를 변경할 때 발생하는 것
const LOAD = 'schedule/LOAD';
const CREATE = 'schedule/CREATE';

const initialState = {
    schedule : [
        {title: '점심 약속', date: new Date(2021, 3, 23), completed: false},
        {title: '영화 보기', date: new Date(2021, 3, 21), completed: false},
        {title: '책 읽기', date: new Date(2021, 3, 12), completed: false},
    ],
};

// 액션 크리에이터 = 액션 리턴, 액션을 만들기 위해 사용
export const loadCalendar = (calendar) => {
    return { type: LOAD, calendar };
}

export const createCalendar = (calendar) => {
    return { type: CREATE, calendar };
} 

//리듀서
export default function render(state = initialState, action = {}) {
    switch (action.type) {
        case 'schedule/LOAD':
            return state;
        case 'schedule/CREATE':
            const new_calendar_schedule = [...state.schedule, action.calendar];
            return { schedule: new_calendar_schedule };
        default:
            return state;
    }
}