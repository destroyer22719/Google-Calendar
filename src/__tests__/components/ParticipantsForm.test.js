import React from "react";
import {shallow} from "enzyme";
import ParticipantsForm from "../../components/ParticipantsForm";

let wrapper, setNewParticipant;

beforeEach(() => {
    setNewParticipant = jest.fn();

    wrapper = shallow(
        <ParticipantsForm 
            state={[]}
            setNewParticipant={setNewParticipant}
        />
    );
});

test("Should render ParticipantsForm component", () => {
    expect(wrapper).toMatchSnapshot();
})