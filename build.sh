#!/bin/bash

ICON=resize-bounding.svg
PREVIEW=resize-bounding.gif
README=README.md

IMAGES_PATH=images
LIB_PATH=packages/vue3-resize-bounding
DEMO_PATH=demo/public

cp ./$IMAGES_PATH/$ICON ./$LIB_PATH/
cp ./$IMAGES_PATH/$ICON ./$DEMO_PATH/
cp ./$IMAGES_PATH/$PREVIEW ./$LIB_PATH/
cp ./$IMAGES_PATH/$PREVIEW ./$DEMO_PATH/
cp ./$README ./$LIB_PATH/$README