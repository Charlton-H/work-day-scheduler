var todaysDate = moment().format("MMMM Do YYYY,h:mm a");
$("#currentDay").text(todaysDate);

var scheduleObj = {};

$(document).ready(function () {
  // when dom load, call timeCheck, then loadEvents
  timeCheck();
  loadEvents();

  // on click of saveBtn, use timeblock id as key and enter into obj
  $(".saveBtn").on("click", function (event) {
    var time = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();
    // console.log(time, description);

    scheduleObj[time] = description;

    localStorage.setItem("schedule", JSON.stringify(scheduleObj));
  });

  function timeCheck() {
    //set currentHour
    var currentHour = moment().hour();

    // loop over time blocks
    $(".time-block").each(function () {
      var blockTime = parseInt($(this).attr("id").split("hour")[1]);

      // To check the time and add the classes for background indicators
      if (blockTime < currentHour) {
        $(this).removeClass("future");
        $(this).removeClass("present");
        $(this).addClass("past");
      } else if (blockTime === currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
      }
    });
  }

  function loadEvents() {
    scheduleObj = JSON.parse(localStorage.getItem("schedule")) || {};

    // console.log(scheduleObj);

    // for (var time in scheduleObj) {
    // var scheduleKey = document.getElementById(time);
    // scheduleKey.querySelector(".description").textContent = scheduleObj[time];
    // console.log(scheduleKey);
    // }

    $.each(scheduleObj, function (time, description) {
      var scheduleKey = document.getElementById(time);
      scheduleKey.querySelector(".description").textContent = description;
    });
  }
});
