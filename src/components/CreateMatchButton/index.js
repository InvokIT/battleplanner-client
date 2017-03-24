import React from 'react';
import './CreateMatchButton.css';

const CreateMatchButton = ({onClick}) => {
    return (
        <button className="create-match-button" onClick={onClick}>Create new match</button>
    );
};

CreateMatchButton.propTypes = {
    onClick: React.PropTypes.func.isRequired
};

export default CreateMatchButton;
