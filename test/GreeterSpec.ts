
import {assert, expect} from 'chai';

import Greeter = require('../src/Greeter');

describe('Greeter', () => {

    describe('greeting', () => {

        it('includes name in greeting', () => {
            var greeter = new Greeter();
            expect(greeter.greet("Mike")).to.have.string("Mike");
        });

    });

});
