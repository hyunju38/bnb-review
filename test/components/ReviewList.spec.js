import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ReviewList from '../../clients/src/components/ReviewList';

describe('ReviewList component', () => {
    let props, wrapper;
    before(() => {
        props = {
            reviews: {
                paginator: {
                },
                items: [
                    {
                        _id: 1,
                        comment: 'sa;lekj',
                        score: 4,
                        user_id: 1
                    },
                    {
                        _id: 2,
                        comment: 'as;ljlekn',
                        score: 2,
                        user_id: 1
                    }
                ] 
            } 
        };

        wrapper = shallow(<ReviewList {...props} />);
    });

    it('should render element with reviews data', () => {
        
        const listItems = wrapper.find('.review-list').find('a');
        
        expect(
            listItems
        ).to.have.length(2);

        const firstListItem = listItems.first();
        const lastListItem = listItems.last();

        expect(
            firstListItem.find('h4').text()
        ).to.be.equal(`${props.reviews.items[0].score} by ${props.reviews.items[0].user_id}`);
        expect(
            firstListItem.find('p').text()
        ).to.be.equal(props.reviews.items[0].comment);

        expect(
            lastListItem.find('h4').text()
        ).to.be.equal(`${props.reviews.items[1].score} by ${props.reviews.items[1].user_id}`);
        expect(
            lastListItem.find('p').text()
        ).to.be.equal(props.reviews.items[1].comment);
        
        const nextButton = wrapper.find('.pager').find('.next');
        expect(
            nextButton.hasClass('disabled')
        ).to.equal(true);
    });
    
});
