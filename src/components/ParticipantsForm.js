import React, { useState } from "react";
import ParticipantItem from "./ParticipantItem";

const ParticipantsForm = ({state, dispatch}) => {
    const [newParticipant, setNewParticipant] = useState("");

    const submitParticipant = e => {
        e.preventDefault();
        dispatch({
            type: "ADD_PARTICIPANT",
            participant: newParticipant,
        });
        setNewParticipant("");
    }

    return (
        <div>
            <form onSubmit={submitParticipant}>
                <label htmlFor="participant">Add Participant</label>
                <input type="email" id="participant" value={newParticipant} onChange={e => setNewParticipant(e.target.value)}/>
                <button>Add Participant</button>
            </form>
            {state.map(({email: participant}) => <ParticipantItem key={participant} email={participant} dispatch={dispatch}/>)}
        </div>
    );
};

export default ParticipantsForm;