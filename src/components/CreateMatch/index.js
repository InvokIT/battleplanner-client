import React from 'react';
import './CreateMatch.css';

const CreateMatch = ({name, buttonDisabled, roundCounts, selectedRoundCount, onNameChange, onSelectedRoundCountChange, onCreateMatch}) => {
    return (
        <form className="create-match" onSubmit={onCreateMatch}>
            <input type="hidden" placeholder="Match name" value={name} onChange={onNameChange}/>
            <div className="round-count-selector">
                <span className="round-count-selector__title">Number of rounds</span>
                <ul>
                    {roundCounts.map(roundCount => {
                        const selected = (roundCount === selectedRoundCount);

                        return (
                            <li key={roundCount} className={`round-count-selector__item ${selected ? "round-count-selector__item-selected" : ""}`}>
                                <label>
                                    <input type="radio" name="round-count" value={roundCount} onChange={e => onSelectedRoundCountChange(roundCount)} checked={selected} />
                                    <span>{roundCount}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <button type="submit" className="create-match__button" disabled={buttonDisabled}>Create new match</button>
        </form>
    );
};

CreateMatch.propTypes = {
    name: React.PropTypes.string,
    buttonDisabled: React.PropTypes.bool.isRequired,
    roundCounts: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    selectedRoundCount: React.PropTypes.number,
    onNameChange: React.PropTypes.func.isRequired,
    onSelectedRoundCountChange: React.PropTypes.func.isRequired,
    onCreateMatch: React.PropTypes.func.isRequired
};

export default CreateMatch;
