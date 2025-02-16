export type Cell = 0 | 1 | null;

type Grid = Cell[][];

type Player = "Player" | "Bot";

export type Game = {
  turn: number;
  grid: Grid;
  currentPlayer: Player;
  winner?: Player;
};

export function getNextMove(grid: Grid, turn: number, difficulty: string) {
  switch (difficulty) {
    case "easy":
      return getEasyBotMove(grid);
    case "medium":
      return getMediumBotMove(grid);
    case "hard":
      return getHardBotMove(grid, turn).choice;
    default:
      return grid;
  }
}

function getEasyBotMove(grid: Grid) {
  const nullCells: [number, number][] = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === null) nullCells.push([rowIndex, colIndex]);
    });
  });

  const [randomRow, randomCol] =
    nullCells[Math.floor(Math.random() * nullCells.length)];

  const new_grid = grid;
  new_grid[randomRow][randomCol] = 1;
  return new_grid;
}

function getMediumBotMove(grid: Grid) {
  const botMoves = getAllGridChilds(grid, true);
  const playerMoves = getAllGridChilds(grid, false);

  const index = playerMoves.findIndex((child) => isGameFinished(child, 0));
  if (index !== -1) return botMoves[index];

  return (
    botMoves.find((child) => isGameFinished(child, 0)) || getEasyBotMove(grid)
  );
}

// 0 => circle (player) / 1 => cross (bot)
// MiniMax algorithm
function getHardBotMove(grid: Grid, depth = 0, botTurn = true) {
  if (isGameFinished(grid, depth) || depth === 9)
    return { choice: grid, score: getScore(grid, depth) };
  const scores: Array<number> = [];
  const moves: Array<Grid> = [];

  getAllGridChilds(grid, botTurn).forEach((child) => {
    const result = getHardBotMove(child, depth + 1, !botTurn).score;
    scores.push(result);
    moves.push(child);
  });

  const index = scores.indexOf(
    botTurn ? Math.max(...scores) : Math.min(...scores)
  );
  const choice = moves[index];

  return { choice, score: scores[index] };
}

function checkCells(cell1: Cell, cell2: Cell, cell3: Cell) {
  return cell1 !== null && cell1 === cell2 && cell2 === cell3;
}

function getAllGridChilds(grid: Grid, botTurn: boolean) {
  const childs = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === null) {
        const child: Grid = JSON.parse(JSON.stringify(grid));
        child[i][j] = botTurn ? 1 : 0;
        childs.push(child);
      }
    }
  }
  return childs;
}

export function isGameFinished(grid: Grid, depth: number) {
  const score = getScore(grid, depth);
  if (score !== 0) {
    return true;
  }
  return !grid.some((row) => row.some((cell) => cell === null));
}

export function getWinner(grid: Grid): Player | undefined {
  const score = getScore(grid, 0);
  switch (score) {
    case 10:
      return "Bot";
    case -10:
      return "Player";
    default:
      return undefined;
  }
}

function getScore(grid: Grid, depth: number) {
  const botScore = 10 - depth;
  const playerScore = depth - 10;
  // rows
  for (const row of grid) {
    if (checkCells(row[0], row[1], row[2])) {
      return row[0] === 0 ? playerScore : botScore;
    }
  }

  // columns
  for (let i = 0; i < 3; i++) {
    if (checkCells(grid[0][i], grid[1][i], grid[2][i])) {
      return grid[0][i] === 0 ? playerScore : botScore;
    }
  }

  // diagonals
  if (checkCells(grid[0][0], grid[1][1], grid[2][2])) {
    return grid[0][0] === 0 ? playerScore : botScore;
  }

  if (checkCells(grid[0][2], grid[1][1], grid[2][0])) {
    return grid[0][2] === 0 ? playerScore : botScore;
  }

  // draw
  return 0;
}
