import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chronovault.app',
  appName: 'Chronovault',
  webDir: 'out',
  server: {
    url: 'https://your-project.vercel.app', // Replace this with your Vercel URL after deployment
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'android/app/chronovault.keystore',
      keystorePassword: 'your-keystore-password',
      keystoreAlias: 'chronovault',
      keystoreAliasPassword: 'your-alias-password'
    }
  }
};

export default config; 