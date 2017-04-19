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

        this.onDocumentClicked = this.onDocumentClicked.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.onDocumentClicked, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onDocumentClicked, false);
    }

    onDocumentClicked(e) {
        if (!this.domElement.contains(e.target)) {
            this.setState({
                showList: false
            });
        }
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
            <div className="player-selector" ref={el => this.domElement = el}>
                <button className="player-selector__button" onClick={this.onAssignButtonClicked.bind(this)} title="Select player"><span className="icon"/></button>
                {this.state.showList ? <PlayerList players={this.props.players}
                                                   onPlayerClick={(player) => this.onPlayerClick(player)}/> : null }
            </div>
        );
    }
}

export default PlayerSelector;