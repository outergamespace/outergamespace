import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  createRoom: PropTypes.func.isRequired,
};

const CreateRoom = ({ createRoom }) => (
  <div className="screen">
    <div className="screen-top" />

    <div className="screen-middle" >Welcome to Outer Game Space</div>

    <div className="screen-bottom">
      <button onClick={createRoom} >Create Room</button>
    </div>
  </div>
);

CreateRoom.propTypes = propTypes;

export default CreateRoom;
