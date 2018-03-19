#!/usr/bin/env bash

set -e

echo TODO
exit 1

convert $1 -resize 512x512 ${1:##.}jpg