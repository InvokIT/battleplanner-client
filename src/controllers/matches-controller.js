import invokeCreateMatch from "../api/matches/create";
import invokeLoadMatches from "../api/matches";
import matchCreatingAction from "../actions/match-creating";
import matchCreatedAction from "../actions/match-created";
import matchesLoadingAction from "../actions/matches-loading";
import matchesLoadedAction from "../actions/matches-loaded";
import matchLoadedAction from "../actions/match-loaded";
import ControllerBase from "./controller-base";

export default class MatchesController extends ControllerBase {
    createMatch = (dispatch) => (title) => {
        dispatch(matchCreatingAction());

        return invokeCreateMatch({title})
            .then(
                match => {
                    dispatch(matchCreatedAction({match}));
                    dispatch(matchLoadedAction({match}));

                    this.pushLocation(dispatch, `/matches/${match.id}`);
                },
                error => {
                    dispatch(matchCreatedAction({error}));
                }
            );
    };

    loadMatches = (dispatch) => () => {
        dispatch(matchesLoadingAction());

        return invokeLoadMatches()
            .then(
                matches => {
                    dispatch(matchesLoadedAction({matches}));
                },
                error => {
                    dispatch(matchesLoadedAction({matches: []}));
                }
            );
    };
}