//************* */
//AJAX Begins
//************* */
$(document).ready(function () {

    //var d6 = Math.floor((Math.random() * 3)+1);
    let d6 = () => {
        var a = Math.floor((Math.random() * 3) + 1);
        var b = Math.floor((Math.random() * 3) + 1);
        var c = Math.floor((Math.random() * 3) + 1);

        return (a + b + c);
    }

    //************* */
    //Fast Calulate
    //************* */
    let fastCalculate = () => {

        for (let index = 0; index < 6; index++) {
            //const element = array[index];

            //$("#score > tbody").append("<tr>5</tr>");
            console.log(d6());
            $("#scores").append("<td>" + d6() + "</td>");
        }

    };

    fastCalculate();

    $("#calculate").click(function () {
        $("#scores > td").each(function (i, e) {
            $(e).text(d6());
        })
    });

    $.get("https://www.dnd5eapi.co/api/classes", function (r) {
        response = r;
        console.log(r);
    });

    //************* */
    //Class Selection
    //************* */
    $.ajax({
        url: "https://www.dnd5eapi.co/api/classes",
        type: "GET",
        dataType: "json",
    }).done(function (x) {
        console.log(x.results[0].name);
        /*x.results.forEach(y => {
         $("#cSel")
        });*/
        classes = x.results;
        $.each(classes, function (i, classes) {
            $('#cSel').append($('<option>', {
                value: i,
                text: classes.name
            }));
        });
    });

    //************* */
    //Race Selection
    //************* */
    $.ajax({
        url: "https://www.dnd5eapi.co/api/races",
        type: "GET",
        dataType: "json",
    }).done(function (x) {
        console.log(x.results[0].name);
        /*x.results.forEach(y => {
         $("#cSel")
        });*/
        races = x.results;

        console.log(races);
        $.each(races, function (i, races) {
            $("#rSel").append($('<option>', {
                value: i,
                text: races.name
            }))
        })
    });


});

$("#cSel").change(function () {
    //console.log($("#rSel :selected").text());
    hitDice();
});

$("#rSel").change(function () {
    scoreIncrease();
})

//************* */
//Add The Racial Bonuses
//************* */
let scoreIncrease = () => {
    var raceSel = $("#rSel :selected").val();
    $.ajax({
        url: "https://www.dnd5eapi.co/api/races",
        type: "GET",
        dataType: "json",
    }).done(function (race) {
        console.log(race.results[raceSel]);
        $.ajax({
            url: "https://www.dnd5eapi.co" + race.results[raceSel].url,
            type: "GET",
            dataType: "json",
        }).done(function (raceBonus) {
            console.log(raceBonus);
        })

    })
}

//************* */
//Add the Hit dice
//************* */

let hitDice = () => {
    var classSel = $("#cSel :selected").val();
    $.ajax({
        url: "https://www.dnd5eapi.co/api/classes",
        type: "GET",
        dataType: "json",
    }).done(function (x) {
        console.log(x.results);
        console.log(x.results[classSel]);

        console.log(classSel);

        $.ajax({
            url: "https://www.dnd5eapi.co" + x.results[classSel].url,
            type: "GET",
            dataType: "json",
        }).done(function (hitDie) {
            console.log(hitDie.hit_die);
            var HP = Math.floor((Math.random() * hitDie.hit_die) + 1);
            $("#cSelHp").text(HP);
        });
        /*x.results.forEach(y => {
         $("#cSel")
        });*/

    });
}