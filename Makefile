run:
	npx expo start 

check:
	npx expo-doctor

build-apk:
	eas build --platform android --local --profile production

clean:
	rm -rf node_modules
	rm -rf package-lock.json
	rm -rf android/app/build
	rm -rf android/.gradle
	npm cache clean --force
