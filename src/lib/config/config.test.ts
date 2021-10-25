import { RunMode } from '@lib/dataServer.types';
import { setConfig } from './config';
import { Config } from './config.types';

describe('Config test', () => {
  describe('setConfig', () => {
    it(`Returns correct config`, () => {
      const config: Config = {
        dataDir: 'src/mocks/fixtures/data/',
        workDir: 'src/mocks/fixtures/work/',
        queryDir: 'src/mocks/fixtures/query',
        postProcessor: 'src/mocks/fixtures/post-processor/postProcessor.ts',
        runMode: RunMode.DEV,
      };
      expect(setConfig(config)).toEqual(config);
    });

    it(`Wrong dataDir returns expected error`, () => {
      const config: Config = {
        dataDir: 'non-existent-dir',
        runMode: RunMode.DEV,
      };
      expect(() => setConfig(config)).toThrowError(
        'Cannot find dataDir directory: ',
      );
    });

    it(`Wrong workDir returns expected error`, () => {
      const config: Config = {
        dataDir: 'src/mocks/fixtures/data',
        workDir: 'non-existent-dir',
        runMode: RunMode.DEV,
      };
      expect(() => setConfig(config)).toThrowError(
        'Cannot find workDir directory: ',
      );
    });

    it(`Wrong queryDir returns expected error`, () => {
      const config: Config = {
        dataDir: 'src/mocks/fixtures/data',
        queryDir: 'non-existent-dir',
        runMode: RunMode.DEV,
      };
      expect(() => setConfig(config)).toThrowError(
        'Cannot find queryDir directory: ',
      );
    });

    it(`Wrong postProcessor returns expected error`, () => {
      const config: Config = {
        dataDir: 'src/mocks/fixtures/data',
        postProcessor: 'non-existent-file',
        runMode: RunMode.DEV,
      };
      expect(() => setConfig(config)).toThrowError(
        'Cannot find postProcessor module: ',
      );
    });
  });
});