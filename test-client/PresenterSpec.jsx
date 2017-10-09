/* eslint-env mocha */

import { expect } from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import React from 'react';
//import AnsweredPlayerList from './../client/src/components/presenter/AnsweredPlayerList';
import AnsweredPlayerListEntry from './../client/src/components/presenter/AnsweredPlayerListEntry';


describe('Presenter', () => {

  describe('AnsweredPlayerListEntry', () => {
    const wrapper = shallow(<AnsweredPlayerListEntry player={{username: 'tester'}}/>);
    it('exists', () => {
      wrapper.setProps({
        player: {
          username: 'player1',
          score: 777,
          answered: false,
        },
      });
      console.log(wrapper.props);
      expect(wrapper.type().to.equal('div'));
    });


  });
});
