import React from "react";

const FactionPlayer = ({displayName, faction, factionOnLeft = false}) => {
    const classNames = ["faction-player"];
    if (factionOnLeft) {
        classNames.push("faction-player--faction-on-left");
    }

    return (
        <div className={classNames.join(" ")}>
            <div className="faction-player__faction-image" title={faction.name} style={{backgroundImage:faction.imageUrl}}></div>
            <div className="faction-player__display-name">{displayName}</div>
        </div>
    );
};

FactionPlayer.propTypes = {
    displayName: React.PropTypes.string.isRequired,
    faction: React.PropTypes.shape({
        imageUrl: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }).isRequired,
    factionOnLeft: React.PropTypes.bool
};

export default FactionPlayer;