import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ReviewForm from '../../clients/src/components/ReviewForm';

describe('ReviewForm component', () => {
    let props, wrapper;
    before(() => {
        wrapper = shallow(<ReviewForm />);
    });
    
    it('should render element correctly', () => {
        expect(
            wrapper.find('input')
        ).to.have.length(2);
        
        expect(
            wrapper.find('button')
        ).to.have.length(1);
    });
});