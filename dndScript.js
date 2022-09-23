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
    //what if the class has a subclass
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
            
            //if only one score mod found
            if(raceBonus.ability_bonuses.length < 2){
                //find the score mod name
                var abScore = raceBonus.ability_bonuses[0].ability_score.name;

                console.log(raceBonus.ability_bonuses[0].ability_score.name);
                console.log(abScore);
                console.log(raceBonus.ability_bonuses[0].bonus);
                var abScoreInt = parseInt(raceBonus.ability_bonuses[0].bonus);
                console.log("the score bonus is in"+abScore);
                console.log(raceBonus.ability_bonuses)
                //find the cell index of that score and selects the cell index number
                console.log($("td:contains("+abScore+")")[0].cellIndex);
                console.log($("td:contains('STR')"));
                console.log($("td:contains(6)"));
                console.log($("#scores"));
                console.log(parseInt( $("#scores")[0].cells[3].innerText)+abScoreInt);
                //store the cells index number as a value
                var abScoreIndex = $("td:contains("+abScore+")")[0].cellIndex;
                //show the abScoreIndex
                console.log("The abScoreIndex is " + abScoreIndex);
                console.log($("#scores")[0].cells[abScoreIndex].innerText);
                $("#scores")[0].cells[abScoreIndex].innerText = parseInt( $("#scores")[0].cells[abScoreIndex].innerText)+abScoreInt;
            }else if (raceBonus.ability_bonuses.length>1) {
                //console.log($("td:contains('"+abScore+"')"));
                console.log("more");
                console.log(raceBonus);
                //ability_bonuses[0].ability_score.name
               var scrNames =raceBonus.ability_bonuses ;
               scrNames.forEach(element => {
                //find the score mod name
                var abScore = element.ability_score.name;
                console.log(abScore);
                console.log(element.ability_score.name);
                console.log(abScore);
                console.log(element.bonus);
                var abScoreInt = parseInt(element.bonus);
                console.log("the score bonus is in"+abScore);
                console.log(raceBonus.ability_bonuses)
                //find the cell index of that score and selects the cell index number
                console.log($("td:contains("+abScore+")")[0].cellIndex);
                console.log($("td:contains('STR')"));
                console.log($("td:contains(6)"));
                console.log($("#scores"));
                console.log(parseInt( $("#scores")[0].cells[3].innerText)+abScoreInt);
                //store the cells index number as a value
                var abScoreIndex = $("td:contains("+abScore+")")[0].cellIndex;
                //show the abScoreIndex
                console.log("The abScoreIndex is " + abScoreIndex);
                console.log($("#scores")[0].cells[abScoreIndex].innerText);
                $("#scores")[0].cells[abScoreIndex].innerText = parseInt( $("#scores")[0].cells[abScoreIndex].innerText)+abScoreInt;
               })
            }
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


let DndRaceScoreBonus=()=>{
    //capture the ability score bonus
}
//select the optional bonus
//create a modifier for the scores
//apply bonuses to the scores
//create a list of skills
//random background
//add skills(maybe randomly)
//remove those skills from the list
//random personality
//add class
//roll tables where you can.
//Check if spellcaster
//random roll for cantrips
//random roll for spells
//check inventory list for character
//determine attack values
//determine armor class
//determine spellcasting attack
//determine spell saves
