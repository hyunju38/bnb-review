import React from 'react';

import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';

import ProductItem from '../public/js/components/ProductItem';
import { ProductList } from '../public/js/containers/ProductList';

describe('ProductList contianer component', () => {

    const props = {
        fetchProducts: sinon.spy(),
        onProductClick: sinon.spy(),
        visibleProducts: [
            {
                _id: 1,
                name: '우리펜션',
                reviews: [1, 2]
            }
        ]
    };

    // mount: need a jsdom 
    const wrapper = mount(
        <ProductList {...props} />
    );

    // TODO: Renaming it title
    it('Should render elements correctly', () => {
        expect(wrapper.props().visibleProducts.length).to.equal(1);
        expect(props.fetchProducts.called).to.true;
    });

    // it('Should render elements correctly', () => {
    //
    //     const renderedComponent = TestUtils.renderIntoDocument(
    //         <ProductList {...props} />
    //     );
    //     const AnchorElement = TestUtils.findRenderedDOMComponentWithTag(
    //         renderedComponent,
    //         'a'
    //     );
    //
    //     /**
    //      *  Do not access .props of a DOM node;
    //      *  instead, recreate the props as `render` did originally
    //      *  or read the DOM properties/attributes directly from this node
    //      *  (e.g., this.refs.box.className). This DOM node was rendered by `ProductItem`
    //      */
    //     expect(AnchorElement.props.visibleProducts.length).to.equal(1);
    // });

    // it('Should call fetchProducts method if ProductList component mount', function(){
    //     expect(props.fetchProducts.called).to.true;
    // });

});

// refer
// http://stackoverflow.com/questions/32920213/mocha-jsdom-react-typeerror-cannot-read-property-addeventlistener-of-unde
describe('ProductItem component', () => {

    const props = {
        onClick: sinon.spy(),
        product: {
            _id: 1,
            name: '우리펜션',
            reviews: [1, 2]
        }
    };
    const wrapper = shallow(
        <ProductItem {...props} />
    );

    it('Should render elements correctly', () => {
        expect(wrapper.find('a').text())
            .to.equal('펜션 이름: 우리펜션, 리뷰 개수: 2');

    });

    it('Should call onClick method if an anchor element is clicked', function(){
        wrapper.find('a').simulate('click');
        expect(props.onClick.called).to.true;
    });

});
