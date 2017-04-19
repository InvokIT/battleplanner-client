import "./match-lobby.css";

import React from "react";
import { Redirect } from "react-router";
import Loading from "../Loading";
import AssignPlayersToTeams from "./AssignPlayersToTeams";
import ChooseInitiator from "./ChooseInitiator";
import SelectMapOrFaction from "./SelectMapOrFaction";
import PlayGame from "./PlayGame";
// import PostResultAndReplays from "./PostResultAndReplays";

const MatchLobby = ({isAuthenticated, currentLocation, loading, matchId, matchStateName, matchStateDescription}) => {
    if (!isAuthenticated) {
        return <Redirect to={{
            pathname: "/login",
            state: {from: currentLocation}
        }} />;
    }

    if (loading) {
        return <Loading text={"Connecting..."}/>;
    }

    switch (matchStateName) {
        case "assign-players-to-teams":
            return (
                <AssignPlayersToTeams matchId={matchId} stateDescription={matchStateDescription} />
            );
        case "choose-initiator":
            return (
                <ChooseInitiator matchId={matchId} stateDescription={matchStateDescription} />
            );
        case "select-map-or-faction":
        case "select-map":
        case "select-faction":
            return (
                <SelectMapOrFaction matchId={matchId} stateDescription={matchStateDescription} />
            );
        case "play-game":
            return (
                <PlayGame matchId={matchId} stateDescription={matchStateDescription} />
            );
        // case "post-result-and-replays":
        //     return (
        //         <PostResultAndReplays matchId={matchId} stateDescription={matchStateDescription} />
        //     );
        default:
            console.warn("Unknown match state");
            return <div>Unknown match state</div>;
    }

    // return (
    //     <div className="match-lobby">
    //         <div className="match-lobby__title">{title}</div>
    //         <div className="match-lobby__state-description">{description}</div>
    //         {teams.map((t, i) => (
    //             <div key={i} className={`match-lobby__team match-lobby__team__${i}`}>
    //                 {t.map(p => <FactionPlayer player={p} faction={p.faction} />)}
    //             </div>
    //         ))}
    //         <div className="match-lobby__coin">
    //         </div>
    //         <div className="match-lobby__map">
    //             <div className="match-lobby__map-image" style={{backgroundImage:map.image}}></div>
    //             <div className="match-lobby__map-name"><span>{map.name}</span></div>
    //         </div>
    //         <div className="match-lobby__actions">
    //         </div>
    //         <div className="match-lobby__players">
    //         </div>
    //         <div className="match-lobby__rounds">
    //             <MatchRounds rounds={rounds} />
    //         </div>
    //     </div>
    // );
};

MatchLobby.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    currentLocation: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired,
    matchId: React.PropTypes.string.isRequired,
    matchStateName: React.PropTypes.string,
    matchStateDescription: React.PropTypes.string
};

export default MatchLobby;