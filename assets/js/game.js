// define function to generate random whole number within declared max and min range
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

var fightOrRun = function() {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT this battle or RUN AWAY? Enter "FIGHT" or "RUN" to continue.');

    // call conditional recursive function
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrRun();
    }

    promptFight = promptFight.toUpperCase();

    // if player picks RUN confirm and then stop the loop
    if (promptFight === "RUN") {
        var confirmRun = window.confirm("Are you sure you'd like to run away?");
        if (confirmRun) {
            window.alert(playerInfo.name + " has decided to run away!");
            // subtract money from player for running
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }

    return false;
}

// define fight function
var fight = function (enemy) {
    console.log(enemy);

    // randomize who attacks first
    var isPlayerTurn = true;
    if (Math.random() > .5) {
        isPlayerTurn = false;
    }

    // repeat and execute as long as player and enemy are both alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they want to fight or run
            if (fightOrRun()) {
                break;
            };
   
            // subtract player's attack force from enemy's health
            var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
            // subtract enemy's attack force from player's health
            var damage = randomNumber(enemy.attack - 4, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop since player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    } // end while
}; // end fight()

//function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What's your robot's name?", "Tony the Robot");
    }

    console.log("Your robot's name is " + name);
    return name;
}

/* GAME INFORMATION / VARIABLES */
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }    
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

// set enemy stats
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(11, 15)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(12, 16)
    }
];

// define function to start new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick which enemy to fight
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(playerInfo.name + ": " + playerInfo.health + " Health, " + playerInfo.attack + " Attack Force, " + playerInfo.money + " Dollars");
            console.log(pickedEnemyObj.name + ": " + pickedEnemyObj.health + " Health, " + pickedEnemyObj.attack + " Attack Force");

            // pass the pickedEnemyObj to fight()
            fight(pickedEnemyObj);

            // if player is still alive and there are more enemies robots to fight, ask player if they want to shop before continuing
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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

// define function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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

// define function to enter and navigate the shop
var shop = function () {
    // ask player what they'd like to do in the shop
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Enter 1 to REFILL, 2 to UPGRADE, or 3 to LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out player's selection
    switch(shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
            
        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop again for player to enter a valid option
            shop();
            break;
    }

    window.alert("Thanks for visiting the shop! You have " + playerInfo.health + " health points and " + playerInfo.money + " dollars. Your attack force is " + playerInfo.attack + ".");
};

// start the game when the page loads
startGame();
