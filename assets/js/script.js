//Global Variables
var displayDate = $('#currentDay');

/*
Logic to add time to page header:
When user loads the page, we update the time every second. 
We can use document.ready to start the flow. 
*/
//The update time function will update the current date
//every second. This will allow us to update the date if
//the user happens to be on the page as the clock jumps
//to a new day. 
function updateTime() {
    setInterval(function(){
        var currentDate = moment().format("MMMM D, YYYY");
        displayDate.text("Date: " + currentDate);
    }, 1000);
}


//We call the function below to check our current time and decide
//what elements we need to make available to the user. 
function checkSlotsTime () {
    setInterval(function(){
        for (var i = 8; i <= 17; i++) {
            var rowSectionId = "rowSection" + i;
            var tableElement = document.getElementById(rowSectionId);
            var tableElementDataId = tableElement.getAttribute("data-id");
            tableElementDataId = parseInt(tableElementDataId);
            var currentHour = moment().format("H");
            currentHour = parseInt(currentHour);
            console.log(tableElementDataId);
            console.log(currentHour);
            console.log(typeof tableElementDataId);
            console.log(typeof currentHour);
            if (currentHour < tableElementDataId) {
                $("#" + rowSectionId).addClass("future");
                $("#" + rowSectionId).removeClass("defaultTableStyling");
                console.log("Hello");
            }
            if (currentHour == tableElementDataId) {
                $("#" + rowSectionId).addClass("present");
                $("#" + rowSectionId).removeClass("defaultTableStyling");
                console.log("Hello");
            }
            if (currentHour > tableElementDataId) {
                $("#" + rowSectionId).addClass("past");
                $("#" + rowSectionId).removeClass("defaultTableStyling");
                console.log("Hello");
            }
        }
    }, 1000)
}

/*
Need to iterate through the template literal to create all of our elements.
*/

function generateAgendaTable () {
    for (var i=8; i <= 17; i++) {
        var timeOfDay = "am";
        var placeHolderText ="Enter your note here:";
        if (i < 12 ) {
            var tableElement = `
                <table class="agendaTable">
                    <body class="tableBody">
                        <tr id="rowSection${i}" class="defaultTableStyling" data-id="${i}">
                            <th class="timeColumn">${i}:00 ${timeOfDay}</th>
                            <td class="userEventEntry"></td>
                            <td class="userEntrySaveButton">&#128190 Save</td>
                        </tr>
                </table>
                `;
        }
        if (i === 12 ){
            timeOfDay = "pm";
            var tableElement = `
            <table class="agendaTable">
                <body class="tableBody">
                    <tr id="rowSection${i}" class="defaultTableStyling" data-id="${i}">
                        <th class="timeColumn">${i}:00 ${timeOfDay}</th>
                        <td class="userEventEntry"></td>
                        <td class="userEntrySaveButton">&#128190 Save</td>
                    </tr>
                </body>
            </table>
            `;
        }
        if (i > 12 ) {
            iConverted = i - 12;
            timeOfDay = "pm";
            var tableElement = `
            <table class="agendaTable">
                <body class="tableBody">
                    <tr id="rowSection${i}" class="defaultTableStyling" data-id="${i}">
                        <th class="timeColumn">${iConverted}:00 ${timeOfDay}</th>
                        <td class="userEventEntry"></td>
                        <td class="userEntrySaveButton">&#128190 Save</td>
                    </tr>
                </body>
            </table>
            `;
        }
        $('#agendaTable').append(tableElement);
    }
    checkSlotsTime();
}


//When the document loads, we display the current time and
//then we call a updateTime function to update our time.
$(document).ready(function(){
    displayDate.text("Date: " + moment().format("MMMM D, YYYY"));
    updateTime();
    generateAgendaTable();
})
