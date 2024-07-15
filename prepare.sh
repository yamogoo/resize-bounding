#!/bin/bash

LOGO=resize-bounding.svg
LOGO_WITH_DESCRIPTOR=resize-bounding-w-descriptor.svg
PREVIEW=resize-bounding.gif

IMAGES_PATH=shared/images
LIB_VUE_PATH=packages/vue/vue3-resize-bounding
LIB_REACT_PATH=packages/react/react-resize-bounding
DEMO_PATH=demo
DEMO_PUBLIC_PATH=$DEMO_PATH/public

MONOREPO_PACKAGE_JSON=package.json
DEMO_PACKAGE_JSON=$DEMO_PATH/package.json
LIB_VUE_PACKAGE_JSON=$LIB_VUE_PATH/package.json
LIB_REACT_PACKAGE_JSON=$LIB_REACT_PATH/package.json

README=README.md
LIB_VUE_README=$LIB_VUE_PATH/$README
LIB_REACT_README=$LIB_REACT_PATH/$README

MONOREPO_LICENSE=LICENSE
LIB_VUE_LICENSE=$LIB_VUE_PATH/$MONOREPO_LICENSE
LIB_REACT_LICENSE=$LIB_REACT_PATH/$MONOREPO_LICENSE

VERSION_PATTERN="[[:digit:]][[:graph:]][[:digit:]][[:graph:]][[:digit:]]"

function get_pkg_version {
   grep $1 $2 | sed "s/.*\"$1\": \"\($VERSION_PATTERN\)\".*/\1/"
}

function get_pkg_description {
   DESCRIPTION=$(grep $1 $2 | sed "s/.*\"$1\": \"\(.*\)\".*/\1/")
}

function change_pkg {
   sed -i .back "s@\(.*\"$1\"\): \"\(.*\)\"@\1: ""\"$2\"@" $3
}

function change_readme_version () {
   sed -i .back "s/version-$VERSION_PATTERN-$2/version-$1-$2/g" $3
   
}

function change_readme_assets_version () {
   sed -i .back "s@/v$VERSION_PATTERN@/v$1@g" $2
}

get_pkg_description description $MONOREPO_PACKAGE_JSON

VUE_VERSION=$(get_pkg_version vueVersion $MONOREPO_PACKAGE_JSON)
VUE_DESCRIPTION="Vue3 $DESCRIPTION"

REACT_VERSION=$(get_pkg_version reactVersion $MONOREPO_PACKAGE_JSON)
REACT_DESCRIPTION="React $DESCRIPTION"

MONOREPO_VERSION=$VUE_VERSION

# copy assets:
cp $IMAGES_PATH/$LOGO $LIB_VUE_PATH
cp $IMAGES_PATH/$LOGO_WITH_DESCRIPTOR $LIB_VUE_PATH
cp $IMAGES_PATH/$PREVIEW $LIB_VUE_PATH

cp $IMAGES_PATH/$LOGO $LIB_REACT_PATH
cp $IMAGES_PATH/$LOGO_WITH_DESCRIPTOR $LIB_REACT_PATH
cp $IMAGES_PATH/$PREVIEW $LIB_REACT_PATH

cp $IMAGES_PATH/$LOGO $DEMO_PUBLIC_PATH
cp $IMAGES_PATH/$PREVIEW $DEMO_PUBLIC_PATH


# change monorepo README versions:
change_readme_version $VUE_VERSION "green" $README
change_readme_version $REACT_VERSION "blue" $README
change_readme_assets_version $MONOREPO_VERSION $README

# change react README:
change_readme_version $REACT_VERSION "blue" $LIB_REACT_README
change_readme_assets_version $MONOREPO_VERSION $LIB_REACT_README

# change vue README:
change_readme_version $VUE_VERSION "green" $LIB_VUE_README
change_readme_assets_version $MONOREPO_VERSION $LIB_VUE_README

# change PKG files:
change_pkg description "$DESCRIPTION" $DEMO_PACKAGE_JSON

change_pkg version $VUE_VERSION $LIB_VUE_PACKAGE_JSON
change_pkg productVueVersion $VUE_VERSION $DEMO_PACKAGE_JSON
change_pkg description "$VUE_DESCRIPTION" $LIB_VUE_PACKAGE_JSON

change_pkg version $REACT_VERSION $LIB_REACT_PACKAGE_JSON
change_pkg description "$REACT_DESCRIPTION" $LIB_REACT_PACKAGE_JSON
change_pkg productReactVersion $REACT_VERSION $DEMO_PACKAGE_JSON