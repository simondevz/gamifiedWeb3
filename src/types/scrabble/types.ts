export type BoardType = SquareType[][];

export type SquareType = {
  row: number;
  col: number;
  occupied: boolean;
  premium?: "TW" | "DW" | "TL" | "DL";
  tile?: number;
};

export type TileType = {
  letter: string;
  value: number;
};

export type SquarePointsType = {
  x: number;
  y: number;
};

export type TilePlayedType = { tile: number; row: number; col: number };

export type MainAxisType = "vertical" | "horizontal";
