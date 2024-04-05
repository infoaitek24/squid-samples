#!/bin/bash

# Runs npm install & npm run build in all folders with package.json file.

find . -name 'package.json' -not -path "*/node_modules/*" -not -path "*/generated/*" -print0 | while IFS= read -r -d '' PACKAGE_JSON_FILE; do
    PACKAGE_JSON_DIR=$(dirname "${PACKAGE_JSON_FILE}")
    if grep -q '"build":' "${PACKAGE_JSON_FILE}"; then
      echo "+++++++ Building ${PACKAGE_JSON_DIR}"
      cd "${PACKAGE_JSON_DIR}" || exit 1
      npm ci || exit 1
      npm run build || exit 1
      cd - || exit 1
    fi
done

echo "Done"
