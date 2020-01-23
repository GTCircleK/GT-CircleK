// $('#multiday').on('click', function () {
//     if ($(this).prop('checked')) {
//         document.getElementById('from').type = "date";
//         document.getElementById('to').type = "date";
//     }
//     else {
//         document.getElementById('from').type = "datetime-local";
//         document.getElementById('to').type = "datetime-local";
//     }
// });

$("#event_form").submit(() => {
    $("<input />").attr("type", "hidden")
        .attr("name", "event[from]")
        .attr("value", (new Date($('#from').val())).toJSON())
        .appendTo("#event_form");

    $("<input />").attr("type", "hidden")
        .attr("name", "event[to]")
        .attr("value", (new Date($('#to').val())).toJSON())
        .appendTo("#event_form");

    return true;
});