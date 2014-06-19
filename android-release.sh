grunt build
cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/ant-build/FreeList-release-unsigned.apk alias_name
zipalign -v 4 platforms/android/ant-build/FreeList-release-unsigned.apk release/android/Android-release-.$1.apk
