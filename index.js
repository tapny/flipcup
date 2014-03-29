

$(document).ready(function() {
    
    var roundNumber = 1;

    var makeTeamElem = function(text) {
        return "<div class='team' value='" + text + "'>" + text + "</div>";
    };

    var makeCheckboxElem = function(text) {
        return "<input type='checkbox' value='" + text + "'/>"
    };
    $('.enter-team').keyup( function(e) {
        var that = $(this);
        if (e.keyCode == 13) {
            // add to teams section
            $('.team-names').append( makeTeamElem(that.val()));

            // clear textbox
            that.val("");
        }
    });

    var randomizeAndDisplay = function(teams, round) {

        if (teams.length == 1)
            return

        // randomize
        teams.sort(function() {
            return Math.random() - 0.5;
        });

        // display
        var roundSection = $("<div class=round" +round + "></div>");
        $.each(teams, function(index, elem) {
            var item = $(elem)
            var extra = "<br>"
            if (index %2 == 0) {
                // odds 
               extra = "vs <br>" 
            }

            // TODO variablize round number 
            var teamName = item.attr("value");
            var teamElem = $(makeTeamElem(teamName));
            teamElem.prepend(makeCheckboxElem(teamName));

            roundSection.append(teamElem.get(0));
            roundSection.append(extra);
        });
        
        // winners button, attach click action
        var winnerButton = $("<button>Advance Winners</button>");
        winnerButton.click( function() {
            var winners = $(".round" + round + " input:checked");
            randomizeAndDisplay(winners, round+1);
        });
        roundSection.append(winnerButton);
        
        // add finished section
        $('.rounds').append(roundSection)
    };

    $('.start').click( function(e) {
        // read all teams
        var teams = $('.team');
        randomizeAndDisplay(teams, 1);
    });
});
