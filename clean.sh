rm -rf node_modules
watchman watch-del-all
rm -rf $TMPDIR/react-native-packager-cache-*
rm -rf $TMPDIR/metro-bundler-cache-*
yarn cache clean --force
yarn install


cd android/
./gradlew clean
# ./gradlew clean build --refresh-dependencies --no-build-cache

cd ..

rm -rf android/app/build
rm -rf ~/Library/Caches/CocoaPods; 
rm -rf ios/Pods 
rm ios/Podfile.lock 
rm -rf ~/Library/Developer/Xcode/DerivedData/*; 
cd ios
pod deintegrate; 
pod setup; 
pod install

cd ..