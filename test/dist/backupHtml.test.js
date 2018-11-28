const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const demoDir = path.join(__dirname, 'demo');
const runtimeDir = path.join(__dirname, 'runtime/backupHtml');
const distDir = path.join(runtimeDir, 'project/dist');

describe('dist backupHtml', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fse.copySync(demoDir, runtimeDir);
  });
  afterAll(() => {
    if (fs.existsSync(runtimeDir)) {
      fse.removeSync(runtimeDir);
    }
  });

  test('dist: backupHtml', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        local: 'backupHtml',
        runtimeDir: 'runtime/backupHtml',
      }),
    });

    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Pack source codes and static files into production successfully.');

      expect(filesCount(path.join(distDir, 'html'))).toBe(2);

      done();
    });
  });
});