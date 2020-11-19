const chai = require('chai');

chai.use(require('chai-http'));
chai.use(require('chai-subset'));
chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));

global.expect = chai.expect;
global.chai = chai;
global.request = chai.request;
