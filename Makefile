run-1:
	npx expo run:android --device RMX1921

run-2:
	npx expo run:android --device ASUS_X00TDB --port 8082

clean:
	rm -rf node_modules
	rm -rf package-lock.json
	rm -rf android/app/build
	rm -rf android/.gradle
	npm cache clean --force
