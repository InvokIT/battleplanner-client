import "./player-selector.css"

import React from "react";
import PlayerList from "../PlayerList";
import {playerShape} from "../shapes";

class PlayerSelector extends React.Component {
    static propTypes = {
        players: React.PropTypes.arrayOf(playerShape),
        onPlayerSelect: React.PropTypes.func.isRequired,
        selectedPlayer: playerShape
    };

    constructor(props) {
        super(props);

        this.state = {
            showList: false
        };
    }

    onAssignButtonClicked(e) {
        this.setState({
            showList: !this.state.showList
        });
    }

    onPlayerClick(player) {
        this.setState({
            showList: false
        });

        this.props.onPlayerSelect(player);
    }

    render() {
        return (
            <div className="player-selector">
                <button onClick={this.onAssignButtonClicked.bind(this)} title="Select player">...</button>
                {this.state.showList ? <PlayerList players={this.props.players} onPlayerClick={(player) => this.onPlayerClick(player)}/> : null }
            </div>
        );
    }
}

export default PlayerSelector;