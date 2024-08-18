# Run things in this order to start
### `npm i`
### `npx cap sync`

# Now whenever you want to test run this
## Web
### `npm start`
## Android
### `npm run build`
### `npx cap sync`
### `npx cap open android`
## IOS
### `npm run build`
### `npx cap sync`
### `npx cap open ios`
## Electron
### `npm run build`
### `npx cap sync`
### `npx cap open @capacitor-community/electron`

# Packaging
## Electron
### `npm run build`
### `npx cap sync`
### `npm install electron-packager -g`
### `electron-packager X:\code\captest\electron MAshkif --platform=win32 --arch=x64`