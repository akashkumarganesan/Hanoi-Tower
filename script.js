let towers = [
    [],
    [],
    []
];

let selectedTower = null;

let moves = 0;

let numberOfDisks = 4;


// Start Game

function startGame() {

    numberOfDisks =
        parseInt(
            document.getElementById("diskInput").value
        );


    if (
        numberOfDisks < 1 ||
        numberOfDisks > 7
    ) {

        alert("Enter disks between 1 and 7");

        return;
    }


    // Reset towers

    towers = [
        [],
        [],
        []
    ];


    // Add disks to Tower A

    for (
        let i = numberOfDisks;
        i >= 1;
        i--
    ) {

        towers[0].push(i);

    }


    selectedTower = null;

    moves = 0;


    document.getElementById("message").innerText =
        "Select a tower";


    displayGame();
}


// Display Game

function displayGame() {

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        let tower =
            document.getElementById(
                "tower" + i
            );


        tower.innerHTML = "";


        towers[i].forEach(
            function(disk) {

                let diskElement =
                    document.createElement("div");


                diskElement.classList.add(
                    "disk"
                );


                diskElement.classList.add(
                    "disk" + disk
                );


                tower.appendChild(
                    diskElement
                );

            }
        );

    }


    document.getElementById("moves").innerText =
        "Moves: " + moves;
}


// Tower Click

function towerClick(towerIndex) {


    // First click

    if (selectedTower === null) {


        // Cannot select empty tower

        if (
            towers[towerIndex].length === 0
        ) {

            return;
        }


        selectedTower = towerIndex;


        document.getElementById(
            "message"
        ).innerText =
            "Now select destination tower";


        return;
    }


    // Same tower

    if (
        selectedTower === towerIndex
    ) {

        selectedTower = null;

        document.getElementById(
            "message"
        ).innerText =
            "Selection cancelled";

        return;
    }


    let fromTower =
        towers[selectedTower];


    let toTower =
        towers[towerIndex];


    // Get top disk

    let disk =
        fromTower[
            fromTower.length - 1
        ];


    // Get destination top disk

    let topDisk =
        toTower[
            toTower.length - 1
        ];


    // Main Hanoi Rule

    if (
        topDisk === undefined ||
        disk < topDisk
    ) {

        // Remove disk from source

        fromTower.pop();


        // Add disk to destination

        toTower.push(disk);


        moves++;


        document.getElementById(
            "message"
        ).innerText =
            "Good Move!";


        displayGame();


        checkWin();

    }

    else {

        document.getElementById(
            "message"
        ).innerText =
            "❌ Big disk cannot go on small disk!";

    }


    selectedTower = null;
}


// Check Winner

function checkWin() {

    if (
        towers[2].length === numberOfDisks
    ) {

        document.getElementById(
            "message"
        ).innerText =
            "🎉 YOU WON! 🎉";

    }
}


// Tower of Hanoi Recursion

function hanoi(
    n,
    source,
    auxiliary,
    destination
) {

    // Base condition

    if (n === 1) {

        console.log(
            "Move disk 1 from " +
            source +
            " to " +
            destination
        );

        return;
    }


    // Move n-1 disks

    hanoi(
        n - 1,
        source,
        destination,
        auxiliary
    );


    // Move largest disk

    console.log(
        "Move disk " +
        n +
        " from " +
        source +
        " to " +
        destination
    );


    // Move remaining disks

    hanoi(
        n - 1,
        auxiliary,
        source,
        destination
    );
}


// Start default game

startGame();