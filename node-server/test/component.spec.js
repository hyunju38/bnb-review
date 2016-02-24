import React from 'react';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';

import rootReducer from '../public/js/reducers/reviews';

import App from '../public/js/containers/App';
import { ProductList } from '../public/js/containers/ProductList';
import ConnectedProductSearch, { ProductSearch } from '../public/js/containers/ProductSearch';
import { Side } from '../public/js/containers/Side';

import ReviewInput from '../public/js/components/ReviewInput';
import ReviewList from '../public/js/components/ReviewList';
import ProductItem from '../public/js/components/ProductItem';
import ProductInfo from '../public/js/components/ProductInfo';
import ReviewItem from '../public/js/components/ReviewItem';

/**
 *  Component Test list:
 *  1. check the element or text related to properties
 *  2. check if the event is called when the event trigger
 */

describe('App container component', () => {
    let wrapper;
    before(() => {
        wrapper = mount(
            <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
                <App />
            </Provider>
        );
    });

    it('should render elements correctly', () => {
        expect(wrapper.find(ConnectedProductSearch))
            .to.have.length(1);

        expect(wrapper.find(ProductList))
            .to.have.length(1);

        expect(wrapper.find(Side))
            .to.have.length(1);
    });
});

describe('Side container component', () => {
    let props, wrapper;
    before(() => {
        props = {
            selectedProduct: {
                _id: 1,
                name: "샘플 펜션",
                desc: "산 좋고, 물 좋고, 공기 좋고~",
                reviews: [
                    {
                        _id: 1,
                        comment: '여긴 별로에요',
                        score: 2,
                        user_id: 1,
                        product_id: 1
                    },
                    {
                        _id: 2,
                        comment: '그럭저럭',
                        score: 3,
                        user_id: 2,
                        product_id: 1
                    },
                ]
            },
            onAddReviewButtonClick: sinon.spy(() => () => {}),
            onRemoveReviewButtonClick: sinon.spy()
        };

        wrapper = shallow(
            <Side { ...props } />
        );
    });

    it('should render elements correctly', () => {
        expect(wrapper.find(ProductInfo))
            .to.have.length(1);

        expect(wrapper.find(ReviewInput))
            .to.have.length(1);

        expect(wrapper.find(ReviewList))
            .to.have.length(1);
    });

    it('should call onAddReviewButtonClick event when the ReviewInput button is clicked', () => {
        wrapper.find(ReviewInput)
            .shallow().find('button')
            .simulate('click');
        expect(props.onAddReviewButtonClick.calledOnce)
            .to.be.true;
    });

    it('should call onRemoveReviewButtonClick event when the ReviewItem button is clicked', () => {
        // console.log(wrapper.find(ReviewList));
        wrapper.find(ReviewList).shallow()
            .find(ReviewItem).first().shallow()
            .find('button').simulate('click');

        expect(props.onRemoveReviewButtonClick.calledOnce)
            .to.be.true;
    });
});

describe('ReviewList component', () => {

    // init test props and wrapper
    let props, wrapper;
    before(() => {
        props = {
            selectedProduct: {
                _id: 1,
                name: "샘플 펜션",
                desc: "산 좋고, 물 좋고, 공기 좋고~",
                reviews: [
                    {
                        _id: 1,
                        comment: '여긴 별로에요',
                        score: 2,
                        user_id: 1,
                        product_id: 1
                    },
                    {
                        _id: 2,
                        comment: '그럭저럭',
                        score: 3,
                        user_id: 2,
                        product_id: 1
                    },
                ]
            }
        };

        wrapper = shallow(
            <ReviewList { ...props } />
        );
    });

    it('should render elements correctly', () => {
        // Does It have li elements?
        expect(wrapper.find(ReviewItem))
            .to.have.length(2);
    });
});

describe('ReviewItem component', () => {

    // init test props and wrapper
    let props, wrapper;
    before(() => {
        props = {
            review: {
                _id: 1,
                comment: '여긴 별로에요',
                score: 2,
                user_id: 1,
                product_id: 1
            },
            onClick: sinon.spy()
        };

        wrapper = shallow(
            <ReviewItem { ...props } />
        );
    });

    it('should render elements correctly', () => {
        // What does a list element have a text?
        expect(wrapper.find('li').text())
            .to.be.equal('2: 여긴 별로에요X');
    });

    it('should call onClick event when the button is clicked', () => {
        wrapper.find('button').simulate('click')
        expect(props.onClick.calledOnce)
            .to.be.true;
    });

});

describe('ReviewInput component', () => {

    // Init test props and wrapper
    let props, wrapper;
    before(() => {
        props = {
            selectedProduct: {
                _id: 1
            },
            onClick: sinon.spy()
        };

        wrapper = mount(
            <ReviewInput { ...props } />
        );
    });

    it('should render elements correctly', () => {
        // Does It have a textarea element?
        expect(wrapper.find('textarea'))
            .to.have.length(1);

        // Does It have a Input element?
        expect(wrapper.find('input'))
            .to.have.length(1);

        // What does button have a text?
        expect(wrapper.find('button').text().trim())
            .to.be.equal('리뷰 등록');
    });

    it('sould call onClick event when the button is clicked', () => {
        wrapper.find('button').simulate('click');
        expect(props.onClick.calledOnce)
            .to.be.true;
    });
});

describe('ProductSearch container component', () => {

    const props = {
        onSearchButtonClick: sinon.spy()
    };

    const wrapper = mount(
        <ProductSearch { ...props } />
    );

    it('should render elements correctly', () => {
        // is Input existing?
        expect(wrapper.find('input'))
            .to.have.length(1);

        // What does a button have a text?
        expect(wrapper.find('button').text())
            .to.equal('Search');
    });

    it('should call onClick event if a button is clicked', () => {
        // Is onClick event called?
        wrapper.find('button').simulate('click');
        expect(props.onSearchButtonClick.calledOnce)
            .to.be.true;
    });
});

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

    it('Should render elements correctly', () => {
        expect(wrapper.find('a').text())
            .to.be.equal('펜션 이름: 우리펜션, 리뷰 개수: 2');

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
        //     expect(AnchorElement.props.children).to.equal('펜션 이름: 우리펜션, 리뷰 개수: 2');
    });

    it('Should call fetchProducts method if ProductList component mount', () => {
        expect(props.fetchProducts.calledOnce)
            .to.be.true;
    });

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
            .to.be.equal('펜션 이름: 우리펜션, 리뷰 개수: 2');

    });

    it('Should call onClick method if an anchor element is clicked', () => {
        wrapper.find('a').simulate('click');
        expect(props.onClick.calledOnce)
            .to.be.true;
    });

});
