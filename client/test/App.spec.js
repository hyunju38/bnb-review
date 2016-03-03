import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../src/App';

// http://rackt.org/redux/docs/recipes/WritingTests.html
function setup () {
    let props = {};
    let renderer = TestUtils.createRenderer();
    renderer.render(<App />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('components', () => {
    describe('App', () => {
        it('should render correctly', () => {
            const { output } = setup();

            expect(output.type).to.equal('h1');
            expect(output.props.children).to.equal('Hello, world!');
        });
    });
});
