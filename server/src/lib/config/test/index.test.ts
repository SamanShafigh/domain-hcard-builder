import { makeConfig } from '../index';
import { mockEnv } from '../../mock';

describe('Test config maker', () => {
  test('test config object with all provided env variables', () => {
    expect(makeConfig(mockEnv)).toMatchSnapshot();
  });

  test('test config object with only env.STATIC_ROOT variable', () => {
    const env = <HCardT.Env>{
      STATIC_ROOT: 'root',
    };
    expect(makeConfig(env)).toMatchSnapshot();
  });

  test('tes config object without any env variable', () => {
    const env = <HCardT.Env>{};
    expect(makeConfig(env)).toMatchSnapshot();
  });
});