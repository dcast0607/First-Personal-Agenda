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
$(document).ready(function(){
    displayDate.text(moment().format("MMMM D, YYYY"));
    updateTime();
})
