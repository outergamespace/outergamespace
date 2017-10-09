/* eslint-env mocha */
//const expect = require('chai').expect;
//import { expect } from 'chai';
import React from 'react';
import Join from './../client/src/components/player/Join';

describe('Client', () => {
  describe('[REPLACE ME] test template', () => {
    it('[REPLACE ME] should return true for matching "test template" text', () => {
      expect('test template').to.equal('test template');
    });
  });
});

describe ('Join - player', () => {
  const wrapper = shallow(<Join />);

  it ('asks users to join a room', () => {
    expect (wrapper.contains('Join')).to.equal(true);
  });
});