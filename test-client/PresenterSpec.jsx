/* eslint-env mocha */

import { expect } from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import React from 'react';
//import AnsweredPlayerList from './../client/src/components/presenter/AnsweredPlayerList';
import Timer from './../client/src/components/presenter/Timer';


describe('Presenter', () => {

  describe('Timer', () => {
    const wrapper = shallow(<Timer />);

    it('exists', () => {
      expect(wrapper.type()).to.equal('div');
    });
  });
});
