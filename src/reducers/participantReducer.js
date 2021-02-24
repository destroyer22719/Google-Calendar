export const participantReducer = (state, action) => {
    switch(action.type) {
        case "ADD_PARTICIPANT":
            return [
                ...state,
                {email: action.participant}
            ];
        case "GET_PARTICIPANT":
            return state;
        case "DELETE_PARTICIPANT":
            return state.filter(({email}) => email !== action.email);
        default:
            return state;
    }
}