import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker"
require('dotenv').config()


function App() {

	const gapi = window.gapi;
	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
	const API_KEY = process.env.REACT_APP_API_KEY;

	const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
	const SCOPES = "https://www.googleapis.com/auth/calendar.events";

	const [summary, summaryChange] = useState("");
	const [desc, descChange] = useState(""); 
	const [start, onStartChange] = useState(new Date()); 
	const [end, onEndChange] = useState(start); 

	var eventExample = {
		'summary': 'Google I/O 2015',
		'location': '800 Howard St., San Francisco, CA 94103',
		'description': 'A chance to hear more about Google\'s developer products.',
		'start': {
		  'dateTime': '2015-05-28T09:00:00-07:00',
		  'timeZone': 'America/Los_Angeles'
		},
		'end': {
		  'dateTime': '2015-05-28T17:00:00-07:00',
		  'timeZone': 'America/Los_Angeles'
		},
		'recurrence': [
		  'RRULE:FREQ=DAILY;COUNT=2'
		],
		'attendees': [
		  {'email': 'lpage@example.com'},
		  {'email': 'sbrin@example.com'}
		],
		'reminders': {
		  'useDefault': false,
		  'overrides': [
			{'method': 'email', 'minutes': 24 * 60},
			{'method': 'popup', 'minutes': 10}
		  ]
		}
	};

	const event = {
		"summary": summary,
		"description": desc,
		"start": {
			"dateTime": start.toISOString(),
			"timeZone": "America/Toronto"
		},
		"end": {
			"dateTime": end.toISOString(),
			"timeZone": "America/Toronto"
		}
	}

	const addEvent = () => {
		console.log(event);
		gapi.load("client:auth2", async () => {
			gapi.client.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			});
			gapi.client.load("calendar", "v3", () => console.log("loaded"));
			gapi.auth2.getAuthInstance().signIn()
				.then(() => {
					console.log("Signed in")
					const request = gapi.client.calendar.events.insert({
						"calendarId": "primary",
						"resource": event,
					});

					request.execute(event => {
						console.log(event.htmlLink)
						window.open(event.htmlLink);
					});
				});
		});
	};

	return (
		<div>
			<h2>Start</h2>
			<DateTimePicker
				onChange={onStartChange}
				value={start}
			/>
			<br/><h2>End</h2>
			<DateTimePicker
				onChange={onEndChange}
				value={end}
			/><br/><h2>Summary</h2>
			<input type="text" onChange={e => summaryChange(e.target.value)}/>
			<br/><h2>Description</h2>
			<input type="text" onChange={e => descChange(e.target.value)}/>
			<button onClick={addEvent}>Add Event</button>
		</div>
	);
}

export default App;
