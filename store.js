import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// take pic
// send to google
// get response
// compare response to calendar
// if true, return calendar list
// else return error 'room not found'

// ACTION TYPES
// const IMAGE_REQUEST = 'IMAGE_REQUEST';
// const IMAGE_DENIED = 'IMAGE_DENIED';
// const IMAGE_SUCCESS = 'IMAGE_SUCCESS';

const CALENDAR_COMPARE = 'CALENDAR_COMPARE';
const CALENDAR_NO_MATCH = 'CALENDAR_NO_MATCH';
const CALENDAR_MATCH = 'CALENDAR_MATCH';
//ACTION CREATORS
// const imageRequest = Image => ({
// 	type: IMAGE_REQUEST,
// 	Image
// });

// const imageDenial = Image => ({
// 	type: IMAGE_DENIED,
// 	Image
// });

// const imageSuccess = Image => ({
// 	type: IMAGE_SUCCESS,
// 	Image
// });

const calendarCompare = calendar => ({
	type: CALENDAR_COMPARE,
	calendar
});

const calendarNoMatch = err => ({
	type: CALENDAR_NO_MATCH,
	err
});

const calendarMatch = calendar => ({
	type: CALENDAR_MATCH,
	calendar
});

export const getCalendarMatch = imageText => async dispatch => {
	return async dispatch => {
		dispatch(calendarCompare);
		try {
			// const {data} = await google calendar route
			dispatch(calendarMatch(data));
		} catch (err) {
			dispatch(calendarNoMatch(err));
		}
	};
};

const initialState = {
	isComparing: false,
	calendarMatch: [] //calendar obj/arr?
};

const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case CALENDAR_COMPARE: {
			return {
				...state,
				isComparing: true
			};
		}
		case CALENDAR_NO_MATCH: {
			return {
				...state,
				isComparing: false,
				calendarMatch: action.err
			};
		}
		case CALENDAR_MATCH: {
			return {
				...state,
				isComparing: false,
				calendarMatch: action.calendar
			};
		}
		default:
			return state;
	}
};

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(calendarReducer, middleware);
