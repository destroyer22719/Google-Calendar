import React from "react";
import {shallow} from "enzyme";
import EventForm from "../../components/EventForm";

let wrapper, summaryChange, descChange;

beforeEach(() => {
    summaryChange = jest.fn();
    descChange = jest.fn();

    wrapper = shallow(
        <EventForm 
            summaryChange={summaryChange}
            descChange={descChange}
            start={new Date("Thu Feb 25 2021 10:42:04 GMT-0500 (Eastern Standard Time)")}
        />
    );
});

test("Should render component", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle summary change", () => {
    wrapper.find("#summary").simulate("change", {
        target: {value: "Hello World"}
    });

    expect(summaryChange).toBeCalledWith("Hello World");
});

test("Should handle description change", () => {
    wrapper.find("#description").simulate("change", {
        target: {value: "Hello World! Visit us!"}
    });

    expect(descChange).toBeCalledWith("Hello World! Visit us!");
});

