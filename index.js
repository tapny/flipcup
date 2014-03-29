

$(document).ready(function() {
    
    var roundNumber = 1;

    var createCookies = function(basename, arr) {
        $.each(arr, function(index, elem) {
            // what if embedd html dom elems in cookie?
            $.cookie(basename+index, $(elem).attr("value"));
        });
    };

    var makeTeamElem = function(text) {
        var teamElem = $("<div class='team' value='" + text + "'>" + text + "</div>");
        teamElem.draggable();
        return teamElem
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

        if (teams.length == 1) {
            alert($(teams[0]).attr("value") + " is the winner!");
            return
        }

        // randomize
        teams.sort(function() {
            return Math.random() - 0.5;
        });

        // display
        var roundSection = $("<div class=round" +round + "></div>");
        roundSection.append("<br><hr><h3>Round " + round + "</h3><div>Check the winners</div><br>");

        $.each(teams, function(index, elem) {
            var item = $(elem)
            var extra = "<br>"
            if (index %2 == 0) {
                // odds 
               extra = "vs <br>" 
            }

            var teamName = item.attr("value");
            var teamElem = $(makeTeamElem(teamName));
            teamElem.prepend(makeCheckboxElem(teamName));

            roundSection.append(teamElem.get(0));
            roundSection.append(extra);
        });
        
        // winners button, attach click action
        var winnerButton = $("<button>Advance Winners</button><br>");
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
        createCookies('team', teams);
        randomizeAndDisplay(teams, 1);
    });
    
    // if cookies are present 
    (function() {
        // populate teams        
        // populate rounds

    }())


});




    var relayout = function() {
        $(".subround").each(function() {
            var $brackets = $(this).find(".bracket");
            $brackets.css("height",(100 / $brackets.length) + "%");
            var $winners = $brackets.find(".team");
            if($winners.length == 1) {
                $winners.css("height","100%");
            }
        });
    }
