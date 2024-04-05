#!/bin/bash

# Deletes all package-lock.json files in all dirs and runs 'npm install' that
# triggers re-generation of package-lock.json files updating all versions to the latest.

find . -name 'package-lock.json' -print0 | while IFS= read -r -d '' lockfile; do
    dir=$(dirname "$lockfile")
    echo "Processing $dir"
    rm -f "$dir/package-lock.json" || exit 1
    rm -rf "$dir/node_modules" || exit 1
    cd "$dir" || exit 1
    npm install || exit 1
    cd - || exit 1
done
echo "Done"
