#!/bin/bash
NO_COLOR='\033[0m'
RED='\033[0;31m'

while test $# -gt 0; do
  case "$1" in
  --bump)
    shift
    if [ "$1" = 'patch' ]; then
      pnpm version patch --no-commit-hooks --no-git-tag-version --no-workspaces-update
      cd http
      pnpm version patch --no-commit-hooks --no-git-tag-version --no-workspaces-update
      cd ..
      git add package.json http/package.json
      git commit -m "chore: bump version"
      git push
    elif [ "$1" = 'minor' ]; then
      pnpm version minor --no-commit-hooks --no-git-tag-version --no-workspaces-update
      cd http
      pnpm version minor --no-commit-hooks --no-git-tag-version --no-workspaces-update
      cd ..
      git add package.json http/package.json
      git commit -m "chore: bump version"
      git push
    elif [ "$1" = 'major' ]; then
      pnpm version major --no-commit-hooks --no-git-tag-version --no-workspaces-update
      cd http
      pnpm version major --no-commit-hooks --no-git-tag-version --no-workspaces-update
      cd ..
      git add package.json http/package.json
      git commit -m "chore: bump version"
      git push
    else
      echo -e "${RED}Invalid bump type${NO_COLOR}"
    fi
    shift
    ;;
  esac
done
