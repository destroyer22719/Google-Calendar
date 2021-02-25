import React from "react";
import {shallow} from "enzyme";
import ParticipantsForm from "../../components/ParticipantsForm";

let wrapper, setNewParticipant, dispatch, submitParticipant;

beforeEach(() => {
    setNewParticipant = jest.fn();
    dispatch = jest.fn();
    submitParticipant = jest.fn();

    wrapper = shallow(
        <ParticipantsForm 
            state={[]}
            setNewParticipant={setNewParticipant}
            dispatch={dispatch}
            submitParticipant={submitParticipant}
        />
    );
});

test("Should render ParticipantsForm component", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle input", () => {
    wrapper.find("#participant").simulate("change",{
        target: {value: "test@gmail.com"}
    });

    wrapper.find("form").simulate("submit");

    expect(submitParticipant).toBeCalled();
    expect(setNewParticipant).toBeCalledWith("test@gmail.com");
});