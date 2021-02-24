import React from "react";

const ParticipantItem = ({email: participant, dispatch}) => {
    const deleteParticipant = () => {
        dispatch({
            type: "DELETE_PARTICIPANT",
            email: participant,
        });
    };

    return (
        <div>
            <p>{participant}</p>
            <button onClick={deleteParticipant}>X</button>
        </div>
    );
};

export default ParticipantItem;