import packager from 'electron-packager';
import packagejson from '../package.json';

const opts = {
  'app-version': packagejson.version,
  asar: true,
  dir: 'build',
  icon: 'build/images/desktop/app',
  name: 'Kakapo',
  ignore: []
};

export default async function pkg() {
  await Promise.all([ 'linux', 'win32', 'darwin' ].map(plat =>
    new Promise((resolve, reject) =>
      packager({ ...opts, ... {
        platform: plat,
        arch: 'x64',
        out: `./release/${plat}`
      } }, (err, path) => {
        if (err) reject(err);
        resolve(path);
      })
    )
  ));
}
