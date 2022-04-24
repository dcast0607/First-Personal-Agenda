//Global Variables
var displayDate = $('#currentDay');

/*
Logic to add time to page header:
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
    //Using set interval to check the time every second, that way
    //if the user happens to be on the page between x:59 and x:00,
    //the page will update to indicate the correct availability of
    //the time slot. 
    setInterval(function(){
        //Using a for loop to iterate through our elements.
        for (var i = 8; i <= 17; i++) {
            //The declarations below are basically being used to retrieve
            //the "data-id" associated to each one of our "note" cell elements
            //when I created the table elements I added a "data-id" attribute
            //that updated as the loop iterated through the table elements.
            //the reason I did this was so that I could use it as a reference
            // and compare it to the current time using moment(). This
            //is what allows me to modify the color of each cell. 
            var rowSectionId = "rowSection" + i;
            var tableElement = document.getElementById(rowSectionId);
            var tableElementDataId = tableElement.getAttribute("data-id");
            tableElementDataId = parseInt(tableElementDataId);
            var currentHour = moment().format("H");
            currentHour = parseInt(currentHour);
            //I've added some if statements below that will check the current
            //time against the "data-id" value associated to the elements.
            //Depending on how the values compare, we designate a "future". "present",
            //and "past" class to modify the styling of the cell. We are also removing
            //a "defaultTableStyling" class that I created. 
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
            }
        }
    }, 1000)
}

//The updateNoteSection function is used to render items that are saved
//in local storage on to the page when the user reloads the page. 
//The function takes the argument passed when it was called and uses it.
function updateNoteSection (inputIndex) {
    var savedNoteInput = arguments[0];
    //We use the argument as an index ID so that we know what item
    //has to be rendered where. 
    var getItemId = "userNoteInput" + savedNoteInput.toString();
    //We need to convert our JSON data back to it's original format so that
    //it can be used. 
    var savedUserNote = JSON.parse(localStorage.getItem(getItemId));
    console.log(savedUserNote);
    console.log(typeof savedUserNote);
    //We clear any user input and update it instead with the data that's stored
    //in localStorage.
    var elementToUpdate = "#userNoteInput" + savedNoteInput.toString();
    $(elementToUpdate).attr("value", "");
    $(elementToUpdate).attr("value", savedUserNote);
}


//The function below if used to check if there are items being stored
//in local storage.
function checkLocalStorage () {
    //The for loop below iterates through the potential items that could
    //be stored in local storage and checks if there is anything currently
    //being stored in them.
    //If there is something being stored, we get the index id "i" of the item
    //that is being used to store our item and feed that into our updateNoteSection
    //function. 
    //The else statement below is for testing purposes. 
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

//We call this function to save the entry that is made by the user.
function saveUserEntry (event) {
    //It is a submit action so we have to prevent the default behavior.
    //This will stop the page from reloading.
    event.preventDefault();
    //The following variable declaration and definitions below are being used
    //to pull a number that can be used as an index so that we can save the entry
    //into the appropriate element. The theory behind the code below is that
    //when the user clicks on "Submit" we can parse through the data included in
    //that submit event to retrieve the index that is associated to the element
    //that the user clicked on.
    var rawSectionId = event.currentTarget.id;
    //Assigns the numerical value associated to rawSectionId;
    var noteSectionId = rawSectionId.replace(/[^0-9]/g,'');
    //Using "toString" to convert my numerical value to a string so that I can have
    //a string called "inputIndex" that will be used to retrieve the text entered
    //by the user.
    var inputIndex = noteSectionId.toString();
    var inputId = `input[id="userNoteInput${inputIndex}"]`;
    var userNote = ($(inputId).val());
    //The value has to be converted to JSON format so that we can store it in local
    //storage. 
    userNote = JSON.stringify(userNote);
    //Adding the user's input into local storage. The code below
    //'userNoteInput' + inputIndex ==> "userNoteInput[indexValueThatTriggeredEvent]"
    //for example: "userNoteInput8"
    localStorage.setItem('userNoteInput'+ inputIndex, userNote);
}

/*
Need to iterate through the template literal to create all of our elements.
Decided to use template literals to render our table. Since we are rendering
an agenda that let's users add items during business hours, I've created a loop
that will iterate between 8(8am)-17(5pm). This will also allow me to 
*/
function generateAgendaTable () {
    //Starts for loop
    for (var i=8; i <= 17; i++) {
        var timeOfDay = "am";
        var placeHolderText ="Enter your note here:";
        //Using our for loop we iterate through the template literal below to create
        //our table. I am using the variable "i" to keep track of what elements are
        //being created and to assign ids to the element so that it is easier for me
        //down the line when I need to reference them.
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
        //The main takeaway in this section and the next is that I am splitting up the for loop
        //so that I am able to render the time slots correctly. 
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
        //With each iteration of the loop I am appending the "tableElement" to our "agendaTable"
        //div. "tableElement" is defined as a template literal.
        $('#agendaTable').append(tableElement);
    }

    //Created a bunch of jQuery element selectors and eventListeners so that I could read the input
    //that is entered by the user. When they submit the form that is associated to the table we created
    //it will then make a call to our "saveUserEntry" function.
    //The main reason I decide to go this route is because it made it easier to trouble shoot issues
    //as they came up, if I had a little more time to refactor, now that I have the code working, I would
    //implement a for loop to generate these items so that they take up less space and look more formal.
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
    //Added a function call here, this will check whether the time slot is in the "past", "present". or "future".
    checkSlotsTime();
    //Added this function so that when the page loads, we check the localStorage. If there are items in localStorage
    //we render the table using those items instead of using our placeholder text.
    checkLocalStorage();
}



//When the document loads, we display the current time and
//then we call a updateTime function to update our time.
//We will also be calling the function that will create the data
//table that the user will be interacting with.
$(document).ready(function(){
    //I've defined "displayDate" as "$('#currentDay');", this will
    //allow me to update the date that is displayed to the end user.
    displayDate.text("Date: " + moment().format("MMMM D, YYYY"));
    //Calling updateTime function to update the date at the top of the
    //page every second, this will allow us to update the date if a user
    //happens to navigate to the page at midnight.
    updateTime();
    //Calling the function below to create the data table that the user 
    //will be interacting with.
    generateAgendaTable();
})


function resetEverything() {
    //Clears the local storage.
    localStorage.clear();
    //Reloads the webpage. So that the past elements are cleared and the user
    //can enter new data.
    window.location.reload();
}

//Adding an event listener that points to our "clear" button. I'm adding this
//so that the user can dump the local storage and so that the page renders again.
$("#clearHistoryButton").on("click", resetEverything);



