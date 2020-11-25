import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiSubset from 'chai-subset';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

chai.use(chaiHttp);
chai.use(chaiSubset);
chai.use(dirtyChai);
chai.use(sinonChai);

global.expect = chai.expect;
global.chai = chai;
global.request = chai.request;
