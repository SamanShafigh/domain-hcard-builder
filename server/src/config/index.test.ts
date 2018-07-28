import { makeConfig } from './index';

describe('Test config maker', () => {
  test('test config object with all provided env variables', () => {
    const env = <HCardT.Env>{
      STATIC_ROOT: 'root',
      PORT: 1234,
      RENDER_MODE: 'ssr',
      DB_URL: 'mongodb://localhost',
      DB_NAME: 'test'
    };
    expect(makeConfig(env)).toMatchSnapshot();
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