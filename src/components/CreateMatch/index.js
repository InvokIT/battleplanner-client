import React from 'react';
import './CreateMatch.css';

const CreateMatch = ({name, buttonDisabled, onNameChange, onCreateMatch}) => {
    return (
        <form className="create-match" onSubmit={onCreateMatch}>
            <input type="hidden" placeholder="Match name" value={name} onChange={onNameChange} />
            <button type="submit" className="create-match__button" disabled={buttonDisabled}>Create new match</button>
        </form>
    );
};

CreateMatch.propTypes = {
    name: React.PropTypes.string,
    buttonDisabled: React.PropTypes.bool.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
    onCreateMatch: React.PropTypes.func.isRequired
};

export default CreateMatch;
