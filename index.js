

$(document).ready(function() {
    
    var roundNumber = 1;

    var createCookies = function(basename, arr) {
        $.each(arr, function(index, elem) {
            // what if embedd html dom elems in cookie?
            $.cookie(basename+index, $(elem).data("name"));
        });
    };

    var checkWinners = function( subroundElem ) {
        console.log(subroundElem);
        var numWinners = subroundElem.find("winner").length;
        var numBrackets = subroundElem.find("bracket").length;
        var round = subroundElem.data("round");
        if (numBrackets / 2 == numWinners) {
            //advance
            var winners = $(".round" + round + " .winner");
            randomizeAndDisplay(winners, round+1);
        }
    };

    var makeBracketElem = function(teamA, teamB) {
        console.log("her");
        var bracketElem = $("<div></div>").addClass("bracket");
        var teamAElem = $("<div></div>").addClass("team").html("<a href='#'>"+teamA+"</a>");
        var teamBElem = $("<div></div>").addClass("team").html("<a href='#'>"+teamB+"</a>");
        teamAElem.click( function() {
            $(this).find('a').toggleClass("winner").parent().toggleClass("closed");
            checkWinners( $(this).parent().parent());
        });
        teamBElem.click( function() {
            $(this).find('a').toggleClass("winner").parent().toggleClass("closed");
            checkWinners( $(this).parent().parent());
        });
        console.log("vjw");
        bracketElem.append(teamAElem).append(teamBElem)
        console.log(bracketElem.get(0));
        return bracketElem;
    };

    var makeTeamElem = function(text) {
        var teamElem = $("<div class='team' data-name='" + text + "'>" + text + "</div>");
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
            alert($(teams[0]).data("name") + " is the winner!");
            return
        }

        // randomize
        teams.sort(function() {
            return Math.random() - 0.5;
        });

        // display
        var subroundElem = $("<section></section>").addClass("subround").addClass("round" + round).data("round", round);

        // subround
        for ( var i = 0; i < teams.length; i+=2 ) {
            console.log(i);
            var teamAName = $(teams[i]).data("name");
            var teamBName = "";
            console.log(teamAName);
            if (i+1 == teams.length){
                // at end of list
                console.log("in dumny");
                teamBName = "DUMMY";
            } else {
                teamBName = $(teams[i+1]).data("name");
            }
            console.log(teamBName);
            var bracketElem = makeBracketElem(teamAName, teamBName, round);
            subroundElem.append(bracketElem);
        }
        
        // add finished section
        $('.rounds').append(subroundElem)
        relayout();
    };
    

    $('.start').click( function(e) {
        // read all teams
        var teams = $('.team');
        $(".rounds").show();
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
