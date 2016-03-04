import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import ProductInfo from '../../clients/src/components/ProductInfo';

describe('ProductInfo component', () => {
    let props, wrapper;
    before(() => {
        props = {
            name: '룰루랄라',
            desc: '아이후헤호하히하후호힝라두팓'
        };
        wrapper = shallow(<ProductInfo {...props} />);
    });
    it('should render element with product info data', () => {
        expect(
            wrapper.find('h1').text()
        ).to.be.equal(props.name);

        expect(
            wrapper.find('p').text()
        ).to.be.equal(props.desc);
    });
});
