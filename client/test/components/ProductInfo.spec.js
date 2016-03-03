import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import ProductInfo from '../../src/components/ProductInfo';

describe('ProductInfo component', () => {

    const props = {
        selectedProduct: {
            _id: 1,
            name: "샘플 펜션",
            desc: "산 좋고, 물 좋고, 공기 좋고~"
        }
    };

    const wrapper = shallow(
        <ProductInfo { ...props } />
    );

    it('should render elements correctly', () => {
        // h1 text check
        expect(wrapper.find('h1').text())
            .to.equal(props.selectedProduct.name);

        // p text check
        expect(wrapper.find('p').text())
            .to.equal(props.selectedProduct.desc);
    });
});
