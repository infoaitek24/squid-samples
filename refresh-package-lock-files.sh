#!/bin/bash

# Deletes all package-lock.json files in all dirs and runs 'npm install' that
# triggers re-generation of package-lock.json files updating all versions to the latest.

find . -name 'package-lock.json' -not -path "*/node_modules/*" -not -path "*/generated/*" -print0 | while IFS= read -r -d '' LOCK_FILE; do
    LOCK_FILE_DIR=$(dirname "${LOCK_FILE}")
    echo "+++++++ Updating $LOCK_FILE_DIR"
    rm -f "${LOCK_FILE_DIR}/package-lock.json" || exit 1
    rm -rf "${LOCK_FILE_DIR}/node_modules" || exit 1
    cd "${LOCK_FILE_DIR}" || exit 1
    npm install || exit 1
    cd - || exit 1
done

echo "Done"
