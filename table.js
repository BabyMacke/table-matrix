console.log(
  "please pick width and height of the table \nand the x and y coordinate of the object: example 4,4,2,2"
);

// skapa en dynamisk grid med hjälp av 2d array
const grid = [];
const createGrid = (rows, columns) => {
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      addCell(i, j);
    }
  }
};

//skapa visuella celler som visar värdet av sina koordinater
const addCell = (x, y) => {
  grid[x][y] = cell(x, y);
};

const cell = (x, y) => {
  return y + ":" + x;
};

//skapa ett object som tar en plats i griden som valts av användaren
const object = cell("@", "@");
const createObject = (chosenX, chosenY) => {
  grid[chosenY][chosenX] = object;
};

//en funktion som loopar igenom griden och hittar vilka koordinater objectet har för tillfället
const getCoords = (rows, columns, cell) => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (grid[y][x] === cell) {
        return { x, y };
      }
    }
  }
};
// resetta den gammla koordinaten som innehöll objectet
const resetOldCoord = (xCoord, yCoord) => {
  grid[yCoord][xCoord] = cell(yCoord, xCoord);
};
// rör object framåt beroende på villen rikting det står i
const moveForward = (xCoord, yCoord, direction) => {
  try {
    switch (direction) {
      case "n":
        grid[yCoord - 1][xCoord] = object;
        break;
      case "e": //kasta error ifall object går utanför på x axeln
        if (xCoord + 1 === width) {
          throw error;
        }
        grid[yCoord][xCoord + 1] = object;
        break;
      case "w":
        if (xCoord - 1 === -1) {
          throw error;
        }
        grid[yCoord][xCoord - 1] = object;
        break;
      case "s":
        grid[yCoord + 1][xCoord] = object;
        break;
    }
  } catch (error) {
    console.log("failed");
    failed = true;
  }
};
// rör object bakåt beroende på vilken rikting det står i
const moveBackward = (xCoord, yCoord, direction) => {
  try {
    switch (direction) {
      case "n":
        grid[yCoord + 1][xCoord] = object;
        break;
      case "e":
        if (xCoord - 1 === -1) {
          throw error;
        }
        grid[yCoord][xCoord - 1] = object;
        break;
      case "w":
        if (xCoord + 1 === width) {
          throw error;
        }
        grid[yCoord][xCoord + 1] = object;
        break;
      case "s":
        grid[yCoord - 1][xCoord] = object;
        break;
    }
  } catch (error) {
    console.log("failed");
    failed = true;
  }
};

//********** globala variablar **********
let [width, height, x, y] = [false, false, false, false];

// initiera variable för idex av directions
let directionIndex = 0;
// boolean som kollar om programmet har failat
let failed = false;
// resultatet
let result = [];

process.stdin.on("data", function (data) {
  const firstInput = Buffer.from(data).toString();
  if (!width) {
    // om width inte har en value splitta inputen
    const inputs = firstInput.split(",");
    width = parseInt(inputs[0]);
    height = parseInt(inputs[1]);
    x = parseInt(inputs[2]);
    y = parseInt(inputs[3]);

    createGrid(width, height);
    createObject(x, y);
    console.log(grid);

    return;
  }
  const command = parseInt(data);
  if (!failed) {
    // hämta och spara varje nuvarande koordinat i 2 variablar

    const currentXcoord = getCoords(width, height, object).x;
    const currentYcoord = getCoords(width, height, object).y;

    // array med alla riktningar
    const directions = ["n", "e", "s", "w"];

    // en switch som jämför användarens input command med sina cases
    switch (command) {
      case 0:
        result.push(currentXcoord, currentYcoord);
        process.exit();
        break;
      case 1:
        console.log("du tryckte på 1");

        resetOldCoord(currentXcoord, currentYcoord);
        moveForward(currentXcoord, currentYcoord, directions[directionIndex]);

        console.log(grid);
        break;
      case 2:
        console.log("du tryckte på 2");

        resetOldCoord(currentXcoord, currentYcoord);
        moveBackward(currentXcoord, currentYcoord, directions[directionIndex]);

        console.log(grid);
        break;
      case 3:
        console.log("rotate clockwise");
        // varje gång case 3 körs öka index med 1 och börja om från 0 om
        if (directionIndex >= 3) {
          directionIndex = 0;
        } else {
          directionIndex++;
        }
        break;
      case 4:
        console.log("rotate counter-clockwise");
        if (directionIndex <= 0) {
          directionIndex = 3;
        } else {
          directionIndex--;
        }
        break;
    }
  } else {
    if (command === 0) {
      result.push(-1, -1);
      process.exit();
    }
  }
});

// printa resultatet
process.on("exit", function () {
  process.stdout.write(`${result}`);
});
