#!/bin/bash
# Generate PhoneGap icon and splash screens.
# Copyright 2013 Tom Vincent <http://tlvince.com/contact>

usage() { echo "usage: $0 icon colour [dest_dir]"; exit 1; }

[ "$1" ] && [ "$2" ] || usage
[ "$3" ] || set "$1" "$2" "."

devices=android,bada,bada-wac,blackberry,ios,webos,windows-phone
eval mkdir -p "$3/res/{icon,screen}/{$devices}"

# Show the user some progress by outputing all commands being run.
set -x

# Explicitly set background in case image is transparent (see: #3)
convert="convert -background none"
# ANDROID ICONS
$convert "$1" -resize 128x128 "$3/android/res/drawable/icon.png"
$convert "$1" -resize 36x36 "$3/android/res/drawable-ldpi/icon.png"
$convert "$1" -resize 72x72 "$3/android/res/drawable-hdpi/icon.png"
$convert "$1" -resize 48x48 "$3/android/res/drawable-mdpi/icon.png"
$convert "$1" -resize 96x96 "$3/android/res/drawable-xhdpi/icon.png"
# IOS ICONS
$convert "$1" -resize 40x40 "$3/ios/$4/Resources/icons/icon-40.png"
$convert "$1" -resize 80x80 "$3/ios/$4/Resources/icons/icon-40@2x.png"
$convert "$1" -resize 50x50 "$3/ios/$4/Resources/icons/icon-50.png"
$convert "$1" -resize 100x100 "$3/ios/$4/Resources/icons/icon-50@2x.png"
$convert "$1" -resize 60x60 "$3/ios/$4/Resources/icons/icon-60.png"
$convert "$1" -resize 120x120 "$3/ios/$4/Resources/icons/icon-60@2x.png"
$convert "$1" -resize 60x60 "$3/ios/$4/Resources/icons/icon-60.png"
$convert "$1" -resize 120x120 "$3/ios/$4/Resources/icons/icon-60@2x.png"
$convert "$1" -resize 72x72 "$3/ios/$4/Resources/icons/icon-72.png"
$convert "$1" -resize 144x144 "$3/ios/$4/Resources/icons/icon-72@2x.png"
$convert "$1" -resize 72x72 "$3/ios/$4/Resources/icons/icon-72.png"
$convert "$1" -resize 144x144 "$3/ios/$4/Resources/icons/icon-72@2x.png"
$convert "$1" -resize 76x76 "$3/ios/$4/Resources/icons/icon-76.png"
$convert "$1" -resize 152x152 "$3/ios/$4/Resources/icons/icon-76@2x.png"
$convert "$1" -resize 29x29 "$3/ios/$4/Resources/icons/icon-small.png"
$convert "$1" -resize 58x58 "$3/ios/$4/Resources/icons/icon-small@2x.png"
$convert "$1" -resize 57x57 "$3/ios/$4/Resources/icons/icon.png"
$convert "$1" -resize 114x114 "$3/ios/$4/Resources/icons/icon@2x.png"

convert="convert $1 -background $2 -gravity center"
# ANDROID SPLASH
$convert -resize 512x512 -extent 720x1280 "$3/android/res/drawable/screen.png"
$convert -resize 512x512 -extent 1280x720 "$3/android/res/drawable-land-xhdpi/screen.png"
$convert -resize 256x256 -extent 480x800 "$3/android/res/drawable-port-hdpi/screen.png"
$convert -resize 128x128 -extent 320x200 "$3/android/res/drawable-land-ldpi/screen.png"
$convert -resize 512x512 -extent 720x1280 "$3/android/res/drawable-port-xhdpi/screen.png"
$convert -resize 256x256 -extent 320x480 "$3/android/res/drawable-port-mdpi/screen.png"
$convert -resize 256x256 -extent 480x320 "$3/android/res/drawable-land-mdpi/screen.png"
$convert -resize 128x128 -extent 200x320 "$3/android/res/drawable-port-ldpi/screen.png"
$convert -resize 256x256 -extent 800x480 "$3/android/res/drawable-land-hdpi/screen.png"
# IOS SPASH
$convert -resize 256x256 -extent 320x480 "$3/ios/$4/Resources/splash/Default~iphone.png"
$convert -resize 256x256 -extent 640x960 "$3/ios/$4/Resources/splash/Default@2x~iphone.png"
$convert -resize 256x256 -extent 640x1136 "$3/ios/$4/Resources/splash/Default-568h@2x~iphone.png"

$convert -resize 512x512 -extent 768x724 "$3/ios/$4/Resources/splash/Default-Portrait~ipad.png"
$convert -resize 1024x1024 -extent 1536x2048 "$3/ios/$4/Resources/splash/Default-Portrait@2x~ipad.png"

$convert -resize 512x512 -extent 1024x768 "$3/ios/$4/Resources/splash/Default-Landscape~ipad.png"
$convert -resize 1024x1024 -extent 2048x1536 "$3/ios/$4/Resources/splash/Default-Landscape@2x~ipad.png"

