import {cp,mkdir,writeFile,rm} from 'node:fs/promises';
await writeFile('dist/.nojekyll','');
await rm('docs',{recursive:true,force:true});
await mkdir('docs',{recursive:true});
await cp('dist','docs',{recursive:true});
console.log('Listo: dist/ y docs/ contienen la aplicación compilada para GitHub Pages.');
