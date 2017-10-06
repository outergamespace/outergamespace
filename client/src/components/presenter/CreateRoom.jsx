import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  createRoom: PropTypes.func.isRequired,
};

const CreateRoom = ({ createRoom }) => (
  <div>
    <button onClick={createRoom} >Create New Room</button>
  </div>
);

CreateRoom.propTypes = propTypes;

export default CreateRoom;
