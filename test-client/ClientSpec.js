/* eslint-env mocha */

import React from 'react';
import Wait from './../client/src/components/player/Wait';
import Join from './../client/src/components/player/Join';


describe('Player', () => {

  describe ('Join', () => {
    const wrapper = shallow(<Join />);

    it('asks users to join a room', () => {
      expect(wrapper.contains('Room Code')).to.equal(true);
    });
  });

  describe ('Wait', () => {
    const wrapper = shallow(<Wait />);

    it('Instructs player to wait', () => {

      expect(wrapper.contains(<div className="center">
        Wait for all players to join.
      </div>)).to.equal(true);
    });
  });
});
