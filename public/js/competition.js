// Function to generate the dashboard view
// Sample teams, challenges, and assignments data
var teams = [
    { id: 1, name: 'Thunderbolts', members: ["Max", "Max", "Leo","Ella","Jax"] },
    { id: 2, name: 'Phoenix Squad', members: ["Ava", "Ava", "Mia","Ivy","Ivy"] },
    { id: 3, name: 'Stealth Warriors', members: ["Kai", "Kai", "Kai","Luna","Rex"] }
];
/*
The whole team with the least played hero each.
Can only walk crouching
All heroes supports
Other team decide your comp (if there is only one team, random)
Every time you kill someone, emote (at least 3 times in the game) (this one can be tricky)
*/
var challenges = [
    { id: 1, name: 'Can only walk crouching', score: 20 },
    { id: 2, name: 'All heroes supports', score: 10 },
    { id: 3, name: 'Other team decide your comp', score: 30 },
    { id: 4, name: 'Every time you kill someone, emote (at least 3 times in the game)', score: 40 },
    { id: 5, name: 'Every time you been killed do a fart sound or qwack or something', score: 10 }
];

// Function to generate the dashboard view
var assignments = [];

// Function to generate the dashboard view
function generateDashboard() {
    var $dashboard = $('#dashboard');
    $dashboard.empty();

    teams.forEach(function (team) {
        var $teamSection = $('<div>').addClass('team-section');
        var $teamHeaderGroup = $('<div>').addClass('team-header-group');
        var $teamHeaderTop = $('<div>').addClass('team-header');
        var $teamHeaderBottom = $('<div>').addClass('team-header');
        var $teamName = $('<h3>').text(team.name);
        var $teamMembers = $('<h5>').text(team.members.join(", "));
        var $teamScore = $('<span>').attr('id', 'team' + team.id + '-score').text('Score: 0');

        $teamHeaderTop.append($teamName, $teamScore);
        $teamHeaderBottom.append($teamMembers);
        $teamHeaderGroup.append($teamHeaderTop, $teamHeaderBottom);
        $teamSection.append($teamHeaderGroup);

        var $challengesList = $('<ul>').addClass('collection');
        challenges.forEach(function (challenge) {
            var $challengeItem = $('<li>').addClass('collection-item');

            var $completedCheckbox = $('<input>')
                .attr('type', 'checkbox')
                .prop('id', 'team' + team.id + '-challenge' + challenge.id)
                .prop('checked', isChallengeCompleted(team.id, challenge.id))
                .on('change', function () {
                    var completed = $(this).is(':checked');
                    var completionText = prompt('Enter completion text for ' + team.name + ' - ' + challenge.name);

                    if (completionText !== null && completionText.trim().length > 0) {
                        updateChallengeCompletion(team.id, challenge.id, completed, completionText);
                        updateCompletionText(team.id, challenge.id, completionText);
                        updateScore();
                    } else {
                        // If no text provided, revert the checkbox to the previous state
                        $(this).prop('checked', !completed);
                    }
                });

            var $checkboxLabel = $('<label>').attr('for', 'team' + team.id + '-challenge' + challenge.id);
            $checkboxLabel.append($completedCheckbox);
            $checkboxLabel.append('<span>' + challenge.name + ' - Score: ' + challenge.score + '</span>');

            $challengeItem.append($checkboxLabel);
            $challengesList.append($challengeItem);
        });

        $teamSection.append($challengesList);
        $dashboard.append($teamSection);
    });
}

// Function to check if a challenge is completed for a team
function isChallengeCompleted(teamId, challengeId) {
    var assignment = assignments.find(function (a) {
        return a.teamId === teamId && a.challengeId === challengeId;
    });

    return assignment ? assignment.completed : false;
}

// Function to update the completion status of a challenge for a team
function updateChallengeCompletion(teamId, challengeId, completed, completionText) {
    var assignment = assignments.find(function (a) {
        return a.teamId === teamId && a.challengeId === challengeId;
    });

    if (assignment) {
        assignment.completed = completed;
        assignment.completionText = completionText;
    } else {
        assignments.push({
            teamId: teamId,
            challengeId: challengeId,
            completed: completed,
            completionText: completionText
        });
    }
}

// Function to update the completion text on the selected challenge
function updateCompletionText(teamId, challengeId, completionText) {
    var $challengeLabel = $('label[for="team' + teamId + '-challenge' + challengeId + '"] span');
    $challengeLabel.text(challenges[challengeId - 1].name + ' - Score: ' + challenges[challengeId - 1].score + ' - ' + completionText);
}

// Function to update the score of challenges completed by each team
function updateScore() {
    teams.forEach(function (team) {
        var completedChallenges = assignments.filter(function (a) {
            return a.teamId === team.id && a.completed;
        });

        var totalScore = completedChallenges.reduce(function (score, assignment) {
            return score + challenges[assignment.challengeId - 1].score;
        }, 0);

        $('#team' + team.id + '-score').text('Score: ' + totalScore);
    });
}


// Generate the initial dashboard view
generateDashboard();