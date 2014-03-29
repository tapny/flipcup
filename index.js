

$(document).ready(function() {
    
    var roundNumber = 1;

    var createCookies = function(basename, arr) {
        $.each(arr, function(index, elem) {
            // what if embedd html dom elems in cookie?
            $.cookie(basename+index, $(elem).data("name"));
        });
    };

    var checkWinners = function( subroundElem ) {
        subroundElem = $(subroundElem);
        var numWinners = subroundElem.find(".winner").length;
        var numBrackets = subroundElem.find(".bracket").length;
        var round = subroundElem.data("round");
        if (numBrackets  == numWinners) {
            //advance
            var winners = $(".round" + round + " .winner").parent().clone().removeClass("closed");
            winners.find("a").removeClass("winner");

            randomizeAndDisplay(winners, round+1);
        }
    };

    var makeBracketElem = function(teamA, teamB) {
        var bracketElem = $("<div></div>").addClass("bracket");
        var teamAElem = $("<div></div>").addClass("team").data("name", teamA).html("<a href='#'>"+teamA+"</a>");
        var teamBElem = $("<div></div>").addClass("team").data("name", teamB).html("<a href='#'>"+teamB+"</a>");
        teamAElem.click( function() {
            $(this).find('a').toggleClass("winner").parent().toggleClass("closed");
            checkWinners( $(this).parent().parent());
        });
        teamBElem.click( function() {
            $(this).find('a').toggleClass("winner").parent().toggleClass("closed");
            checkWinners( $(this).parent().parent());
        });
        bracketElem.append(teamAElem).append(teamBElem)
        return bracketElem;
    };

    var makeTeamElem = function(text) {
        var teamElem = $("<div class='team' data-name='" + text + "'><a href='#'>" + text + "</a></div>");
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
            alert($(teams[0]).find('a').text() + " is the winner!");
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
            var teamAName = $(teams[i]).find('a').text()
            var teamBName = "";
            if (i+1 == teams.length){
                // at end of list
                teamBName = "DUMMY";
            } else {
                teamBName = $(teams[i+1]).find('a').text();
            }
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
