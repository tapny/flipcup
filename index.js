

$(document).ready(function() {
    
    var roundNumber = 1;

    var makeTeamElem = function(text) {
        return "<div class='team'>" + text + "</div>";
    };

    var makeCheckboxElem = function() {
        return "<input type='checkbox' value='winner'>   Winner?"
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

    $('.start').click( function(e) {
        // read all teams
        var teams = $('.team')

        // randomize
        teams.sort(function() {
            return Math.random() - 0.5;
        });
        // display
        $.each(teams, function(index, elem) {
            var item = $(elem)
            var extra = "<br>"
            if (index %2 == 0) {
                // odds 
               extra = "vs <br>" 
            }
            // TODO variablize round number 
            $('.round1').append(makeTeamElem(item.text()) + makeCheckboxElem() + extra);
        });

        $('.round1').append("<button>Advance Winners</button>");
    });
});
