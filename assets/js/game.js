//set player stats
var playerName = window.prompt("What is your robot's name?", "Tony the Robot");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// set enemy stats
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// fight function
var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT this battle or RUN? Enter 'FIGHT' or 'RUN' to choose.");

        // if player picks "RUN" confirm and then stop the loop
        if (promptFight === "run" || promptFight === "RUN") {
            // confirm player wants to run
            var confirmSkip = window.confirm("Are you sure you'd like to run away?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to run away!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // subtract player's attack force from enemy's health
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            // award player money for winning
            playerMoney = playerMoney + 20;
            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // subtract enemy's attack force from player's health
        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() loop since player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } // end while
}; // end fight()

// function to start new game
var startGame = function () {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick which enemy to fight based on the index of enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50;

            // pass the pickedEnemyName value to fight()
            fight(pickedEnemyName);

            // if player is still alive and there are more enemies robots to fight, ask player if they want to shop before continuing
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var shopConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (shopConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game over!");
            break;
        }
    }

    // when loop ends, player is either out of health or enemy's to fight, so end game
    endGame();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("Game over! You lost your robot in battle.");
    }

    // play again?
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// function to enter and navigate the shop
var shop = function () {
    // ask player what they'd like to do in the shop
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Enter 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out player's selection
    switch(shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                
            } else {
                window.alert("You don't have enough money!");
            }
            break;
            
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop again for player to enter a valid option
            shop();
            break;
    }

    window.alert("Thanks for visiting the shop! You have " + playerHealth + " health points and " + playerMoney + " dollars. Your attack force is " + playerAttack + ".");
};

// start the game when the page loads
startGame();
