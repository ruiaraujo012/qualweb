import { resolve } from 'node:path';
import { buildTest } from './template';

buildTest('QW-BP12', resolve(__dirname, '../fixtures/testcases/BP12/testcases.json'));
