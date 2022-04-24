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
            if (currentHour < tableElementDataId) {
                $("#" + rowSectionId).addClass("future");
                $("#" + rowSectionId).removeClass("defaultTableStyling");
            }
            if (currentHour == tableElementDataId) {
                $("#" + rowSectionId).addClass("present");
                $("#" + rowSectionId).removeClass("defaultTableStyling");
            }
            if (currentHour > tableElementDataId) {
                $("#" + rowSectionId).addClass("past");
                $("#" + rowSectionId).removeClass("defaultTableStyling");
                $("#" + rowSectionId).prop("disabled", true);
            }
        }
    }, 1000)
}

function updateNoteSection (inputIndex) {
    var savedNoteInput = arguments[0];
    var getItemId = "userNoteInput" + savedNoteInput.toString();
    var savedUserNote = JSON.parse(localStorage.getItem(getItemId));
    console.log(savedUserNote);
    console.log(typeof savedUserNote);
    var elementToUpdate = "#userNoteInput" + savedNoteInput.toString();
    $(elementToUpdate).attr("value", "");
    $(elementToUpdate).attr("value", savedUserNote);
}

function checkLocalStorage () {
    for (i = 8; i <= 17; i++) {
        var getLocalStorageItem = "userNoteInput" + i.toString();
        if (localStorage.getItem(getLocalStorageItem)) {
            updateNoteSection(i);
        }
        else {
            console.log("Does not need to be updated.")
        }
    }
}

function saveUserEntry (event) {
    event.preventDefault();
    var rawSectionId = event.currentTarget.id;
    var noteSectionId = rawSectionId.replace(/[^0-9]/g,'');
    var inputIndex = noteSectionId.toString();
    var inputId = `input[id="userNoteInput${inputIndex}"]`;
    var userNote = ($(inputId).val());
    userNote = JSON.stringify(userNote);
    localStorage.setItem('userNoteInput'+ inputIndex, userNote);
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
            <form id="noteSection${i}">
                <table class="agendaTable">
                    <body class="tableBody">
                        <tr id="rowSection${i}" class="defaultTableStyling" data-id="${i}">
                            <th class="timeColumn">${i}:00 ${timeOfDay}</th>
                                <td class="userEventEntry">
                                    <input type="text" class="userInputContainer" placeholder="Enter note here: " id="userNoteInput${i}" value="">
                                </td>
                                <td class="userEntrySaveButtonContainer">
                                    <button type="submit">&#128190 Save</button>
                                </td>
                        </tr>
                </table>
            </form>
                `;
        }
        if (i === 12 ){
            timeOfDay = "pm";
            var tableElement = `
            <form id="noteSection${i}">
                <table class="agendaTable">
                    <body class="tableBody">
                        <tr id="rowSection${i}" class="defaultTableStyling" data-id="${i}">
                            <th class="timeColumn">${i}:00 ${timeOfDay}</th>
                                <td class="userEventEntry">
                                    <input type="text" class="userInputContainer" placeholder="Enter note here: " id="userNoteInput${i}">
                                </td>
                                <td class="userEntrySaveButtonContainer">
                                    <button type="submit">&#128190 Save</button>
                                </td>
                        </tr>
                    </body>
                </table>
            </form>
            `;
        }
        if (i > 12 ) {
            iConverted = i - 12;
            timeOfDay = "pm";
            var tableElement = `
            <form id="noteSection${i}">
                <table class="agendaTable">
                    <body class="tableBody">
                        <tr id="rowSection${i}" class="defaultTableStyling" data-id="${i}">
                            <th class="timeColumn">${iConverted}:00 ${timeOfDay}</th>
                                <td class="userEventEntry">
                                    <input type="text" class="userInputContainer" placeholder="Enter note here: " id="userNoteInput${i}">
                                </td>
                            <td class="userEntrySaveButtonContainer">
                                <button type="submit">&#128190 Save</button>
                            </td>
                        </tr>
                    </body>
                </table>
            </form>
            `;
        }
        $('#agendaTable').append(tableElement);
    }
    var noteSection8El = $('#noteSection8');
    var noteSection9El = $('#noteSection9');
    var noteSection10El = $('#noteSection10');
    var noteSection11El = $('#noteSection11');
    var noteSection12El = $('#noteSection12');
    var noteSection13El = $('#noteSection13');
    var noteSection14El = $('#noteSection14');
    var noteSection15El = $('#noteSection15');
    var noteSection16El = $('#noteSection16');
    var noteSection17El = $('#noteSection17');
    noteSection8El.on("submit", saveUserEntry);
    noteSection9El.on("submit", saveUserEntry);
    noteSection10El.on("submit", saveUserEntry);
    noteSection11El.on("submit", saveUserEntry);
    noteSection12El.on("submit", saveUserEntry);
    noteSection13El.on("submit", saveUserEntry);
    noteSection14El.on("submit", saveUserEntry);
    noteSection15El.on("submit", saveUserEntry);
    noteSection16El.on("submit", saveUserEntry);
    noteSection17El.on("submit", saveUserEntry);
    checkSlotsTime();
    checkLocalStorage();
}



//When the document loads, we display the current time and
//then we call a updateTime function to update our time.
$(document).ready(function(){
    displayDate.text("Date: " + moment().format("MMMM D, YYYY"));
    updateTime();
    generateAgendaTable();
})

function resetEverything() {
    localStorage.clear();
    window.location.reload();
}

$("#clearHistoryButton").on("click", resetEverything);



