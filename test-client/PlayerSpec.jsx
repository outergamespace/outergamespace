/* eslint-env mocha */

import { expect } from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import React from 'react';
import AnswerList from './../client/src/components/player/AnswerList';
import AnswerListEntry from './../client/src/components/player/AnswerListEntry';
import App from './../client/src/components/player/App';
// TODO solve 'app is not a DOM element error'
// import Index from './../client/src/components/player/index';
import Join from './../client/src/components/player/Join';
import Question from './../client/src/components/player/Question';
import TextScreen from './../client/src/components/player/TextScreen';
import Timer from './../client/src/components/player/Timer';

describe('Player', () => {

/*  cannot read TypeError: Cannot read property 'map' of undefined

describe('AnswerList', () => {
    const wrapper = shallow(<AnswerList />);

    xit('has three false answers', () => {
      wrapper.setProps({
        answers: ['apple', 'b', 'c'],
        currentAnswer: 'a',
        updateAnswer: () => {},
      });
      //expect(wrapper.find('AnswerListEntry')).to.have.length(3);
      expect.wrapper.contains('apple').to.equal(true);
    });
  });*/

  describe('AnswerListEntry', () => {
    const wrapper = shallow(<AnswerListEntry />);
    it('renders an answer', () => {
      wrapper.setProps({ answer: 42 });
      expect(wrapper.contains(42)).to.equal(true);
    });
  });

  describe('App', () => {
    //const wrapper = shallow(<App />);

    /* it('exists', () => {
      expect(wrapper.type()).to.equal(function);
    }); */
  });

  describe ('Index', () => {
    /* const wrapper = shallow(<Index />);

    it('exists', () => {
      expect(wrapper.contains('App')).to.equal(true);
    }); */

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

