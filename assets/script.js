$(document).ready(function() {
    const test = false;
    const now = moment().format('LLLL');

    let nowHour24 = moment().format("H");
    let nowHour12 = moment().format("h");

    if (test) {
        nowHour24 = 13;
        nowHour12 = 1;
    }

    let $dateheading = $("#TimeStamp");
    $dateheading.text(now);

    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (test) { console.log(storedPlans); }

    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {

        planTextArr = new Array(9);
        planTextArr[0] = "Write plans here..";
    }

    if (test) { console.log("full array of planed text", planTextArr); }

    let $plannerDiv = $("#dailyPlanner");
    $plannerDiv.empty();

    if (test) { console.log("current time", nowHour12); }

    for (let hour = 9; hour <= 17; hour++) {
        let index = hour - 9;

        let $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.attr('hour-index', hour);

        let $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-md-2');

        const $timeBlockSpn = $('<span>');
        $timeBlockSpn.attr('class', 'TimeStamp');

        let displayHour = 0;
        let ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }

        $timeBlockSpn.text(`${displayHour} ${ampm}`);

        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBlockSpn);

        let $plannerTextSpn = $('<input>');

        $plannerTextSpn.attr('id', `input-${index}`);
        $plannerTextSpn.attr('hour-index', index);
        $plannerTextSpn.attr('type', 'text');
        $plannerTextSpn.attr('class', 'plannerText');

        $plannerTextSpn.val(planTextArr[index]);

        let $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9');

        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($plannerTextSpn);

        let $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-md-1');

        let $saveBtn = $('<i>');
        $saveBtn.attr('id', `saveid-${index}`);
        $saveBtn.attr('save-id', index);
        $saveBtn.attr('class', "fas fa-save");

        $rowDiv.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);

        updateRowColor($rowDiv, hour);

        $plannerDiv.append($rowDiv);
    };

    function updateRowColor($hourRow, hour) {

        if (test) { console.log("rowColor ", nowHour24, hour); }

        if (hour < nowHour24) {
            if (test) { console.log("lessThan"); }
            $hourRow.css("background-color", "lightgrey")
        } else if (hour > nowHour24) {
            if (test) { console.log("greaterthan"); }
            $hourRow.css("background-color", "#1BADD8")
        } else {
            if (test) { console.log("eqaul"); }
            $hourRow.css("background-color", "#e005c3a6")
        }
    };

    $(document).on('click', 'i', function(event) {
        event.preventDefault();

        if (test) { console.log('click pta before ' + planTextArr); }

        let $index = $(this).attr('save-id');

        let inputId = '#input-' + $index;
        let $value = $(inputId).val();

        planTextArr[$index] = $value;


        if (test) { console.log('value ', $value); }
        if (test) { console.log('index ', $index); }
        if (test) { console.log('click pta after ' + planTextArr); }

        $(`#saveid-${$index}`).removeClass('fa-saveClick');
        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });

    $(document).on('change', 'input', function(event) {
        event.preventDefault();
        if (test) { console.log('onChange'); }
        if (test) { console.log('id', $(this).attr('hour-index')); }


        let i = $(this).attr('hour-index');

        $(`#saveid-${i}`).addClass('fa-saveClick');
    });
});