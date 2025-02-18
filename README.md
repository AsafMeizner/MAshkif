# Getting Started

1. **Install Dependencies & Sync Capacitor**

   `npm install`
   `npx cap sync`

---

# Running the App

## Web
Run the development server:

   `npm start`

## Android
1. Build the React app:
   `npm run build`
2. Sync Capacitor:
   `npx cap sync`
3. Open the Android project in Android Studio:
   `npx cap open android`

## iOS
1. Build the React app:
   `npm run build`
2. Sync Capacitor:
   `npx cap sync`
3. Open the iOS project in Xcode:
   `npx cap open ios`

## Electron

### Development
Run the Electron app in development mode (starts the React dev server and Electron together):

   `npm run electron-dev`

### Production Testing
Build your production React app and run it with Electron:

   `npm run electron-prod`

---

# Packaging for Release (Electron)

To package your Electron app into an installer (using electron-builder):

1. Build the production React app:
   `npm run build`
3. Package the Electron app:
   `npm run dist`

> **Note:** The `npm run dist` command runs the production build and then uses electron-builder to package your app. The generated installer (e.g., the Windows NSIS `.exe`) will be located in the `release-builds` folder. You can then attach this installer when publishing a release on GitHub.
