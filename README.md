# First-Personal-Agenda

## Objective: 
Create a simple calendar application that allows a user to save events for each hour of the day by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.
You'll need to use the Moment.js library to work with date and time. Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.

## Requirements

- Display the current date when the planner is launched
- Present the user with hour blocks that represent a business day (8am - 5pm)
- If the timeblock has passed, block the user from entering new data (block it out). 
- Current timeslot should be highlighted red. Anything in the future should be highlighted green.
- When you click on the event, allow user to enter data. 
- Entered data should be saved to local data and persist. 
- Give user option to clear or clear on new day. 

## Strategy

1) Build functionality to display current date. (COMPLETED)

Create HTML components first and then use javascript to add current time. 

2) Build out the HTML document so that timeblocks are displayed. (COMPLETED)

We can use template literals to create a table that has the information that
we want to display to the user, we can iterate through the template literal to
render the table.

3) Work on logic to modify the table "event notes" row to change color depend on time
of day. (COMPLETED)

- If time has passed, element should be gray
- If time slot is current, we should modify the color to indicate so
- If the time slot is in the future we should display an appropriate color. 

4) Allow user to enter data in timeslot if the timeslot has not passed. (COMPLETE)

- Add options to table to enter data. 

5) Entered data should be saved to local storage. (COMPLETED)

- Going to do this a bit weird. I'll need to create multiple event listeners so that I know what button the user clicked on. I can use the form's ID and parse the number associated to that ID to determine what button was clicked by the user. 

6) Local storage data should replace placeholder data. 

7) User should have option to clear calendar. 