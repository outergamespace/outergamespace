/* eslint-env mocha */

import { expect } from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import React from 'react';
import AnswerListEntry from './../client/src/components/player/AnswerListEntry';
import Join from './../client/src/components/player/Join';
import Question from './../client/src/components/player/Question';
import TextScreen from './../client/src/components/player/TextScreen';
import Timer from './../client/src/components/player/Timer';

describe('Player', () => {

  describe('AnswerListEntry', () => {
    const wrapper = shallow(<AnswerListEntry />);
    it('renders an answer', () => {
      wrapper.setProps({ answer: 42 });
      expect(wrapper.contains(42)).to.equal(true);
    });
  });

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

  describe('TextScreen', () => {
    const wrapper = shallow(<TextScreen />);

    it('exists', () => {
      expect(wrapper.type()).to.equal('div');
    });
  });

  describe('Timer', () => {
    const wrapper = shallow(<Timer />);

    it('exists', () => {
      expect(wrapper.type()).to.equal('span');
    });
  });
});
