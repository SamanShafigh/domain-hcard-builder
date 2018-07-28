import * as TemplateService from '../template-service';
import { mockReactComponentPath, mockHtmlPagePath } from '../../mock';
import * as React from 'react';

describe('Test template service', () => {
  test('test render a react component', async () => {
    const component = TemplateService.render(mockReactComponentPath);
    expect(component).toMatchSnapshot();
  });

  test('test html function', async () => {
    const component = TemplateService.html('some content');
    expect(component).toMatchSnapshot();
  });

  test('test serve a html file', async () => {
    function getContent() {
      return new Promise((resolve, reject) => {
        const chunks = [];
        const stream = TemplateService.serve(mockHtmlPagePath);
        stream.on('data', (chunk) => {
          chunks.push(chunk.toString());
        });
        stream.on('end', () => {
          resolve(chunks.join(''));
        });
        stream.on('error', reject);
      })
    }

    const content = await getContent();
    expect(content).toMatchSnapshot();
  });
});