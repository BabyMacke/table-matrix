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
  console.log(chosenX, chosenY, object);
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
  return null;
};
// resetta den gammla koordinaten som innehöll objectet
const resetOldCoord = (xCoord, yCoord) => {
  grid[yCoord][xCoord] = cell(xCoord, yCoord);
};
// rör object framåt beroende på villen rikting det står i
const moveForward = (xCoord, yCoord, direction) => {
  switch (direction) {
    case "n":
      grid[yCoord - 1][xCoord] = object;
      console.log("it works");
      break;
    case "e":
      grid[yCoord][xCoord + 1] = object;
      break;
    case "w":
      grid[yCoord][xCoord - 1] = object;
      break;
    case "s":
      grid[yCoord + 1][xCoord] = object;
      break;
  }
};
// rör object bakåt beroende på vilken rikting det står i
const moveBackward = (xCoord, yCoord, direction) => {
  switch (direction) {
    case "n":
      grid[yCoord + 1][xCoord] = object;
      console.log("it works");
      break;
    case "e":
      grid[yCoord][xCoord - 1] = object;
      break;
    case "w":
      grid[yCoord][xCoord + 1] = object;
      break;
    case "s":
      grid[yCoord - 1][xCoord] = object;
      break;
  }
};

let [width, height, x, y] = [false, false, false, false];
// initiera variable för idex av directions
let directionIndex = 0;

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
  // hämta och spara varje nuvarande koordinat i 2 variablar
  const currentXcoord = getCoords(width, height, object).x;
  const currentYcoord = getCoords(width, height, object).y;

  // array med alla riktningar
  const directions = ["n", "e", "s", "w"];

  // en switch som jämför användarens input command med sina cases
  switch (command) {
    case 0:
      console.log("du tryckte på 0");
      console.log(`final position: ${currentXcoord}, ${currentYcoord} `);
      process.exit();
      break;
    case 1:
      console.log("du tryckte på 1");
      console.log(getCoords(width, height, object));

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
      if (directionIndex > 2) {
        directionIndex = 0;
        console.log("reset");
      } else {
        directionIndex++;
        console.log("plus");
      }

      /* console.log(directionIndex);
      console.log(directions[directionIndex]); */
      break;
    case 4:
      console.log("rotate counter-clockwise");

      if (directionIndex < 1) {
        directionIndex = 3;
        console.log("reset");
      } else {
        directionIndex--;
        console.log("minus");
      }

      /* console.log(directionIndex);
      console.log(directions[directionIndex]); */
      break;
  }
});
