import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./stateSlices/userSlice";
import indexReducer from "./stateSlices/indexSlice";
import playReducer from "./stateSlices/playerSlice";

export default configureStore({
    reducer: {
        indexer: indexReducer,
        player: playReducer,
        user: userReducer
    }
});
