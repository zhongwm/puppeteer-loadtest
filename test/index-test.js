
const expect = require('ultimate-chai').expect;
const mock = require('mock-require');
const sinon = require('sinon');
const sandbox = sinon.sandbox.create()
const execStub = sandbox.stub();
mock('child_process', { exec: execStub });

const original_argv = [...process.argv];
process.env.DEBUG = 'puppeteer-loadtest';


describe('index.js', () => {
  afterEach(() => {
    //console.log('😀 Clear sandbox')

    // Rest test stub.
    sandbox.reset()

    // Reset process.argv
    process.argv = original_argv

    // let ../bin be reloadable.
    Object.keys(require.cache).forEach(function(key) {
      if (key.indexOf('puppeteer-loadtest/bin.js') >= 0) {
        console.log('Found cached bin entry, deleting...')
        delete require.cache[key]
      }
    })    
  })
  context('testing index', () => {
    it('should call exec with command', (done) => {
      process.argv.push("--file=./test/basic.js");
      const index = require('../bin');
      expect(execStub).to.have.been.called();
      expect(execStub).to.have.been.calledWith('node ./test/basic.js');
      done();
    });
  });
  context('testing index with csv data', () => {
    it('should call exec with command', (done) => {
      process.argv.push("--file=./test/basic.js");
      process.argv.push("--csv=test/loginusers.csv");
      const index = require('../bin');

      expect(execStub).to.have.been.called();
      expect(execStub).to.have.been.calledWith("node ./test/basic.js '{\"userid\":\"tom_\",\"user_pwd\":\"ad$k~!fk;sdqk*&212=cds\"}'");
      done();
    });
  });
});
