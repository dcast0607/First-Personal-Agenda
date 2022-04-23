/*
Logic to add time to page header:
When user loads the page, we update the time every second. 
We can use document.ready to start the flow. 
*/
var displayDate = $('#currentDay');

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
//When the document loads, we display the current time and
//then we call a updateTime function to update our time.

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
                        <tr class="defaultTableStyling">
                            <th class="timeColumn">${i}:00 ${timeOfDay}</th>
                            <td class="userEventEntry"></td>
                            <td class="userEntrySaveButton">&#128190 Save</td>
                        </tr>
                        <tr class="defaultTableStyling">
                            <th class="timeColumn">${i}:30 ${timeOfDay}</th>
                            <td class="userEventEntry"></td>
                            <td class="userEntrySaveButton">&#128190 Save</td>
                        </tr>
                    </body>
                </table>
                `;
        }
        if (i === 12 ){
            timeOfDay = "pm";
            var tableElement = `
            <table class="agendaTable">
                <body class="tableBody">
                    <tr class="defaultTableStyling">
                        <th class="timeColumn">${i}:00 ${timeOfDay}</th>
                        <td class="userEventEntry"></td>
                        <td class="userEntrySaveButton">&#128190 Save</td>
                    </tr>
                    <tr class="defaultTableStyling">
                        <th class="timeColumn">${i}:30 ${timeOfDay}</th>
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
                    <tr class="defaultTableStyling">
                        <th class="timeColumn">${iConverted}:00 ${timeOfDay}</th>
                        <td class="userEventEntry"></td>
                        <td class="userEntrySaveButton">&#128190 Save</td>
                    </tr>
                    <tr class="defaultTableStyling">
                        <th class="timeColumn">${iConverted}:30 ${timeOfDay}</th>
                        <td class="userEventEntry"></td>
                        <td class="userEntrySaveButton">&#128190 Save</td>
                    </tr>
                </body>
            </table>
            `;
        }
        $('#agendaTable').append(tableElement);
    }
}

$(document).ready(function(){
    displayDate.text("Date: " + moment().format("MMMM D, YYYY"));
    updateTime();
    generateAgendaTable();
})
