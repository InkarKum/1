let rollCount = 0;

document.getElementById("rollButton").addEventListener("click", function() {
    let dice1Value = Math.floor(Math.random() * 6) + 1;
    let dice2Value = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice1").src = "dice" + dice1Value + ".png";
    document.getElementById("dice2").src = "dice" + dice2Value + ".png";

    document.getElementById("dice1Value").textContent = dice1Value;
    document.getElementById("dice2Value").textContent = dice2Value;

    let resultMessage;
    if (dice1Value === dice2Value) {
        resultMessage = "Вы выиграли!";
    } else {
        resultMessage = "Вы проиграли!";
    }

    document.getElementById("result").textContent = resultMessage;

    rollCount++;
    document.getElementById("rollCount").textContent = "Бросков: " + rollCount;
});