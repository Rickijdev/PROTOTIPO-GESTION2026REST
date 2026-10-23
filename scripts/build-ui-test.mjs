import {build} from 'vite';
await build({configFile:'./vite.config.js',logLevel:'error',define:{'process.env.NODE_ENV':'"production"'},build:{outDir:'.test-ui',emptyOutDir:true,lib:{entry:'src/main.jsx',name:'MenuDeUITest',formats:['iife'],fileName:'app'},cssCodeSplit:false}});
