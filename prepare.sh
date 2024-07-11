#!/bin/bash

ICON=resize-bounding.svg
PREVIEW=resize-bounding.gif
README=README.md
IMAGES_PATH=shared/images
LIB_PATH=packages/vue3-resize-bounding
DEMO_PATH=demo
DEMO_PUBLIC_PATH=$DEMO_PATH/public

MONOREPO_PACKAGE_JSON=package.json
DEMO_PACKAGE_JSON=$DEMO_PATH/package.json
LIB_PACKAGE_JSON=$LIB_PATH/package.json

MONOREPO_LICENSE=LICENSE
LIB_LICENSE=$LIB_PATH/LICENSE

VERSION_PATTERN="[[:digit:]][[:graph:]][[:digit:]][[:graph:]][[:digit:]]"

function get_version {
    VERSION=$(grep version $1 | sed "s/.*\"version\": \"\($VERSION_PATTERN\)\".*/\1/")
}

function get_description {
    DESCRIPTION=$(grep description $1 | sed "s/.*\"description\": \"\(.*\)\".*/\1/")
}

function change_readme_version () {
    sed -i .back "s/version-$VERSION_PATTERN-blue/version-$1-blue/g" $2
    sed -i .back "s@/v$VERSION_PATTERN@/v$1@g" $2
}

function change_pkg {
     sed -i .back "s@\(.*\"$1\"\): \"\(.*\)\"@\1: ""\"$2\"@" $3
}

get_version $MONOREPO_PACKAGE_JSON
get_description $MONOREPO_PACKAGE_JSON

# update LICENSE:
cp $MONOREPO_LICENSE $LIB_LICENSE

# copy assets:
cp $IMAGES_PATH/$ICON $LIB_PATH
cp $IMAGES_PATH/$ICON $DEMO_PUBLIC_PATH
cp $IMAGES_PATH/$PREVIEW $LIB_PATH
cp $IMAGES_PATH/$PREVIEW $DEMO_PUBLIC_PATH

# change and copy README:
change_readme_version $VERSION $README
cp $README $LIB_PATH/$README

# change PKG files:
change_pkg productVersion $VERSION $DEMO_PACKAGE_JSON
change_pkg description "$DESCRIPTION" $DEMO_PACKAGE_JSON
change_pkg version $VERSION $LIB_PACKAGE_JSON
change_pkg description "$DESCRIPTION" $LIB_PACKAGE_JSON