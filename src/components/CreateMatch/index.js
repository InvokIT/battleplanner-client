import React from 'react';
import './CreateMatch.css';

const CreateMatch = ({title, onTitleInput, onCreateMatch}) => {
    return (
        <form onSubmit={onCreateMatch}>
            <input type="text" placeholder="Match title" value={title} onChange={onTitleInput} />
            <button type="submit" className="create-match-button">Create new match</button>
        </form>
    );
};

CreateMatch.propTypes = {
    title: React.PropTypes.string,
    onTitleInput: React.PropTypes.func.isRequired,
    onCreateMatch: React.PropTypes.func.isRequired
};

export default CreateMatch;
