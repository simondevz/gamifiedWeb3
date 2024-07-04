import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  BoardType,
  SquarePointsType,
  SquareType,
  TilePlayedType,
  TileType,
} from "../types/scrabble/types";
import _ from "lodash";

export interface AppState {
  dictionaryApi: string; // for checking words
  firstMove: boolean; //tells us if it is the first game move or not
  squarePoints: SquarePointsType[];
  snapRadius: number;
  board: BoardType;
  tiles: TileType[];
  currentTilelocations: Record<number, { row: number; col: number }>;
  toExchange: number[];
  tilesOnBoardLast: number; // The number of tiles on board at last game play
  tilesOnBoardNow: number; // The number of tiles on board now
  tilesPlayed: TilePlayedType[]; //Tiles played during the current turn
  defaultLoaderText: "Loading";
  showLoader: boolean;
  loaderText: string;
  score: number;
  refillRack: boolean;
  bag: number[];
  rackTiles: (number | undefined)[];
  pauseTimer: boolean;
  addTime: number;
  deductTime: number;
  gameEnded: boolean;
  gameSettings: { gameType: string; playingTime: string };
  needEndTime: boolean;
  endTimeLeft: string;
  connectWallet: boolean;
  nftbaseurl: string;
}

const initialState: AppState = {
  squarePoints: [],
  snapRadius: 0,
  board: [],
  tiles: [],
  currentTilelocations: {},
  toExchange: [],
  tilesOnBoardLast: 0,
  tilesOnBoardNow: 0,
  tilesPlayed: [],
  firstMove: true,
  defaultLoaderText: "Loading",
  showLoader: false,
  loaderText: "",
  dictionaryApi: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  score: 0,
  refillRack: false,
  bag: [],
  rackTiles: [],
  pauseTimer: false,
  addTime: 0,
  deductTime: 0,
  gameEnded: false,
  gameSettings: {
    gameType: "",
    playingTime: "",
  },
  needEndTime: false,
  endTimeLeft: "",
  connectWallet: false,
  nftbaseurl: "https://gamifiedweb3api.onrender.com/nft-metadata",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    markFirstMove: (state) => {
      state.firstMove = false;
    },
    endgame: (state, action: PayloadAction<boolean>) => {
      state.gameEnded = action.payload;
    },
    endTimeNeeded: (state, action: PayloadAction<boolean>) => {
      state.needEndTime = action.payload;
    },
    updateConnectWallet: (state, action: PayloadAction<boolean>) => {
      state.connectWallet = action.payload;
    },
    updateEndTimeLeft: (state, action: PayloadAction<string>) => {
      state.endTimeLeft = action.payload;
    },
    updateShowLoader: (state, action: PayloadAction<boolean>) => {
      state.showLoader = action.payload;
    },
    updateLoaderText: (state, action: PayloadAction<string>) => {
      state.loaderText = action.payload;
    },
    updateSquarePoints: (state, action: PayloadAction<SquarePointsType>) => {
      state.squarePoints = [...state.squarePoints, action.payload];
    },
    updateSnapRadius: (state, action: PayloadAction<number>) => {
      state.snapRadius = action.payload;
    },
    updateBoard: (state, action: PayloadAction<SquareType>) => {
      state.board[action.payload.col][action.payload.row] = action.payload;
    },
    updateTiles: (state, action: PayloadAction<TileType[]>) => {
      state.tiles = action.payload;
    },
    uploadBoard: (state, action: PayloadAction<BoardType>) => {
      state.board = action.payload;
    },
    updateTilesOnBoardLast: (state, action: PayloadAction<number>) => {
      state.tilesOnBoardLast = action.payload;
    },
    updateTilesOnBoardNow: (state, action: PayloadAction<number>) => {
      state.tilesOnBoardNow = action.payload;
    },
    updateTilesPlayed: (state, action: PayloadAction<TilePlayedType[]>) => {
      state.tilesPlayed = action.payload;
    },
    updateToExchange: (
      state,
      action: PayloadAction<[number, "add" | "remove"]>
    ) => {
      if (action.payload[1] === "add")
        state.toExchange = [...state.toExchange, action.payload[0]];

      if (action.payload[1] === "remove") {
        _.remove(state.toExchange, (n) => n === action.payload[0]);
      }
    },
    updateTileLocations: (
      state,
      action: PayloadAction<{ tileNumber: number; row: number; col: number }>
    ) => {
      state.currentTilelocations = {
        ...state.currentTilelocations,
        [action.payload.tileNumber]: {
          row: action.payload.row,
          col: action.payload.col,
        },
      };
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    updateRefillRack: (state, action: PayloadAction<boolean>) => {
      state.refillRack = action.payload;
    },
    updateBag: (state, action: PayloadAction<number[]>) => {
      state.bag = action.payload;
    },
    updateRackTiles: (state, action: PayloadAction<(number | undefined)[]>) => {
      state.rackTiles = action.payload;
    },
    updatePauseTimer: (state, action: PayloadAction<boolean>) => {
      state.pauseTimer = action.payload;
    },
    increaseTime: (state, action: PayloadAction<number>) => {
      state.addTime = action.payload;
    },
    decreaseTime: (state, action: PayloadAction<number>) => {
      state.deductTime = action.payload;
    },
    updateGameSettings: (
      state,
      action: PayloadAction<{ gameType: string; playingTime: string }>
    ) => {
      state.gameSettings = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSquarePoints,
  updateSnapRadius,
  updateBoard,
  uploadBoard,
  updateTileLocations,
  updateToExchange,
  updateTilesOnBoardLast,
  updateTilesOnBoardNow,
  updateTilesPlayed,
  markFirstMove,
  updateShowLoader,
  updateLoaderText,
  updateTiles,
  updateScore,
  updateRefillRack,
  updateBag,
  updateRackTiles,
  increaseTime,
  decreaseTime,
  updatePauseTimer,
  endgame,
  updateGameSettings,
  endTimeNeeded,
  updateEndTimeLeft,
  updateConnectWallet,
} = appSlice.actions;

export default appSlice.reducer;
