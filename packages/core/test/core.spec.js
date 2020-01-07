const core = require('../dist/index');
const { expect } = require('chai');
const fs = require('fs');

/*describe('Core', function() {
  it('Should evaluate', async function() {
    this.timeout(10 * 10000);

    const report = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    //console.log(report);
    expect(report[0].type).to.be.equal('evaluation');
  });
  it('EARL report should have assertions from all modules', async function() {
    this.timeout(10 * 10000);

    const reports = await core.evaluate({ url: 'http://ciencias.ulisboa.pt'});
    const earlReports = await core.generateEarlReport();
    //await writeFile('report.json', JSON.stringify(reports, null, 2));
    expect(earlReports[0].graph.length).to.be.greaterThan(0);
  });
});

const URL = 'https://ciencias.ulisboa.pt';

describe('Testing plain html', function() {
  it.only('should run', async function() {
    this.timeout(1000 * 1000);
    const report = await core.evaluate({ url: URL });
    console.warn(report.system.dom.processed.html.plain);
    expect(report.system.dom.processed.html.plain).to.not.be.undefined;
  });
});*/

const URL = 'https://ciencias.ulisboa.pt';
const URL2 = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/video/';
const URL3 = 'http://accessible-serv.lasige.di.fc.ul.pt/~jvicente/test/';
const URL4 = 'http://www.visitilhavo.pt';
const URL5 = 'http://www.cm-pesoregua.pt';

describe.only('Testing new architecture', function() {
  it('should do something', async function() {
    this.timeout(1000 * 1000);
    const reports = await core.evaluate({ urls: [URL3, URL2] , execute: { act: true }, 'act-rules': { rules: ['QW-ACT-R1'] }, maxParallelEvaluations: 2});
    //const reports = await core.evaluate({ file: 'test/urls.txt', maxParallelEvaluations: 2 });
    console.log(reports.length);
    //fs.writeFileSync('test/reports.json', JSON.stringify(reports, null, 2));
  });
});

describe('Testing crawler', function() {
  it('Should execute', async function() {
    this.timeout(1000 * 1000);
    const reports = await core.evaluate({ crawl: 'https://ciencias.ulisboa.pt', maxParallelEvaluations: 5, execute: { act: true } });
    console.log(reports.length);
  })
});