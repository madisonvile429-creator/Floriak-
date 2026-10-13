# FLORIAK mobile app prototype

A black-and-gold React Native / Expo prototype for Android, iOS, and web.

## Current prototype features
- Welcome screen and account registration form
- Demo login
- Demo wallet balance
- Simulated transfers that update only local app state
- Receive details for a sample wallet
- Card preview, currency list, transaction history, settings
- EAS build profiles for an internal Android APK and production builds

## Important limitations
This is a UI prototype, not a real bank or production-ready financial app. It does not store accounts securely, connect to a bank, send real money, issue payment cards, or provide live exchange rates. Do not enter real banking credentials or sensitive personal information. Real-money features require a licensed financial institution/payment provider, secure backend, identity verification, fraud controls, privacy and regulatory review.

## Run it locally
1. Install Node.js LTS.
2. Unzip this project and open a terminal in the `floriak` folder.
3. Run `npm install`.
4. Run `npx expo start`.
5. Install Expo Go on a phone and scan the QR code, or run `npx expo start --web`.

## Build an Android APK
An APK has not been built or tested yet. To create one using Expo Application Services (EAS):
1. Install Node.js LTS and run `npm install`.
2. Run `npx eas-cli login` and sign in to an Expo account.
3. Run `npx eas-cli build --platform android --profile preview`.
4. Follow the prompts. EAS will build in the cloud and provide a download link if the build succeeds.

## iPhone and store release
For iOS builds and App Store release, configure the Apple developer account and required signing details. Google Play/App Store publication also requires developer accounts, privacy disclosures, testing, and review. No store submission has been made.

## Next development stage
Add a secure backend and real authentication before storing user accounts. Keep all transfers simulated until a licensed payment/banking partner is integrated and security/compliance checks are completed.
