cd android/
./gradlew clean
./gradlew clean build --refresh-dependencies --no-build-cache
cd ..
yarn run android:release