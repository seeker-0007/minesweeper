function fillWithBombs(playGroundArr, bombCount, width, height) {
  let bombLocations = [];

  for (let i = 0; i < bombCount; i++) {
    let location;

    do {
      location = Math.floor(Math.random() * height * width);
    } while (bombLocations.includes(location));

    bombLocations.push(location);
  }

  for (const elem of bombLocations) {
    playGroundArr[Math.floor(elem / width)][elem % width] = "\u{1F4A3}";
  }
}

function calculateBombNear(i, j) {
  const positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let bombCount = 0;

  for (const [rowOffset, colOffset] of positions) {
    const newRow = i + rowOffset;
    const newCol = j + colOffset;

    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < vars.height &&
      newCol < vars.width
    ) {
      if (playGroundArr[newRow][newCol] === "\u{1F4A3}") bombCount++;
    }
  }

  return bombCount;
}

function fillWithNumbers(playGroundArr, width, height) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (playGroundArr[i][j] === "\u{1F4A3}") continue;

      playGroundArr[i][j] = calculateBombNear(i, j);
    }
  }
}

export default function playgroundSetup({ bombCount, width, height }) {
  const playGroundArr = Array.from({ length: height }, () =>
    Array(width).fill()
  );

  fillWithBombs(playGroundArr, bombCount, width, height);
  fillWithNumbers(playGroundArr, width, height);
}
