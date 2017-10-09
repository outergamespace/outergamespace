/* eslint-env mocha */

import { expect } from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import React from 'react';
import Question from './../client/src/components/player/Question';
import Join from './../client/src/components/player/Join';


describe('Player', () => {
  describe('Join', () => {
    const wrapper = shallow(<Join />);

    it('asks users to join a room', () => {
      expect(wrapper.contains('Join')).to.equal(true);
    });
  });

  describe('Question', () => {
    const wrapper = shallow(<Question />);

    it('Question renders a Question', () => {
      wrapper.setProps({
        question: 'Is sleeping optional?',
        answers: ['lots', 'of', 'props', 'here'],
        setScreen: () => {},
      });
      expect(wrapper.contains('Is sleeping optional?')).to.equal(true);
    });
  });
});
