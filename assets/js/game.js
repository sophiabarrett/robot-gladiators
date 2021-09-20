/*
Game States
"Win" - Player robot has defeated all enemy robots
    * Fight all enemy robots
    * Defeat each enemy robot
"LOSE" - Player robot's health is zero or less
*/

// set player robot info
var playerName = window.prompt("What is your robot's name?", "Tony the Robot");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// set enemy robot info
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// define fight()
var fight = function(enemyName) {
    while(enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "fight" || promptFight === "FIGHT") {
            // update enemy health
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            // check enemy health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // update player health
            playerHealth = playerHealth - enemyAttack;
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 2;
                console.log(playerName + " skipped the fight for $2 and now has $" + playerMoney + " left.");
            }
            // if no (false), ask question again by running fight() again
            else {
                fight();
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    } // end while
} // end fight()

// call fight()
for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}