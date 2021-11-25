//axios get to get initial list

export const initialState = [];

const SET = 'SET';
const ADD = 'ADD';
const DELETE = 'DELETE';

export function roomsReducer(state, action) {
  // console.log('state :>> ', state);
  // console.log('action :>> ', action);
  switch (action.type) {
    case ADD:
      return [action.payload.room, ...state];
    case DELETE:
      return state.filter((_room) => action.payload.roomId !== _room.id);
    case SET:
      return action.payload.rooms;
    default:
      return state;
  }
}

export function addRoom(room) {
  return {
    type: ADD,
    payload: {
      room,
    },
  };
}

export function deleteRoom(roomId) {
  return {
    type: DELETE,
    payload: {
      roomId,
    },
  };
}
export function setRoom(rooms) {
  return {
    type: SET,
    payload: {
      rooms,
    },
  };
}
