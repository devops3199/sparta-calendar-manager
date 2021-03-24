import { firestore } from "../../firebase";

// 액션 = 상태에 변화가 필요할 때, 가지고 있는 데이터를 변경할 때 발생하는 것
const LOAD = 'schedule/LOAD';
const CREATE = 'schedule/CREATE';
const DELETE = 'schedule/DELETE';
const UPDATE = 'schedule/UPDATE';
const LOADED = "schedule/LOADED";

const db = firestore.collection('schedule');

const initialState = {
    schedule : [
        {title: '점심 약속', date: '2021-03-16 12:20', completed: false},
    ],
    is_loaded: false,
};

// 액션 크리에이터 = 액션 리턴, 액션을 만들기 위해 사용
export const loadCalendar = (calendar) => {
    return { type: LOAD, calendar };
}

export const createCalendar = (calendar) => {
    return { type: CREATE, calendar };
}

export const updateCalendar = (calendar) => {
    return { type: UPDATE, calendar };
} 

export const deleteCalendar = (calendar) => {
    return { type: DELETE, calendar };
} 

export const isLoaded = (loaded) => {
    return { type: LOADED, loaded };
}

export const loadScheduleFB = () => {
    return function(dispatch){
        db.get().then((docs) => {
            let data = [];

            docs.forEach((val) => {
                if(val.exists) {
                    data = [...data, {id: val.id, ...val.data()}];
                }
            })

            dispatch(loadCalendar(data));
        });
    }
}

export const addScheduleFB = (t, d) => {
    return function(dispatch){
        let new_data = {title: t, date: d, completed: false};

        dispatch(isLoaded(false));

        db.add(new_data).then((docRef) => {
            new_data = {...new_data, id: docRef.id};
            dispatch(createCalendar(new_data));
            dispatch(isLoaded(true));
        });
    }
};

export const updateScheduleFB = (id) => {
    return function(dispatch, getState){
        const temp = getState().schedule.schedule;

        const data = temp.filter((val) => {
            if(val.id === id){
                return val;
            }
        });

        console.log(data[0].id);

        if(!data[0].id){
            return;
        }

        let updated = {...data, completed: true};

        db.doc(data[0].id).update(updated).then(() => {
            dispatch(updateCalendar(id));
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const deleteScheduleFB = (id) => {
    return function(dispatch, getState) {
        const temp = getState().schedule.schedule;

        const data = temp.filter((val) => {
            if(val.id === id){
                return val;
            }
        });

        if(!data[0].id){
            return;
        }

        db.doc(data[0].id).delete().then(() => {
            dispatch(deleteCalendar(id));
        }).catch((err) => {
            console.log(err);
        });
    }
};


//리듀서
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'schedule/LOAD':
            if(action.calendar.length > 0){
                return {schedule: action.calendar, is_loaded: true};
            }
            return state;
        case 'schedule/CREATE':
            const new_calendar_schedule = [...state.schedule, action.calendar];
            return { schedule: new_calendar_schedule };
        case 'schedule/UPDATE':
            const update_calendar_schedule = state.schedule.map((val) => {
                if(val.id === action.calendar){
                    return { ...val, completed:true };
                } else {
                    return val;
                }
            });
            return {schedule: update_calendar_schedule};
        case 'schedule/DELETE':
            const delet_calendar_schedule = state.schedule.filter((val) => {
                if(val.id !== action.calendar){
                    return val;
                }
            });
            return {schedule: delet_calendar_schedule};
        case 'schedule/LOADED':
            return {...state, is_loaded: action.loaded};
        default:
            return state;
    }
}