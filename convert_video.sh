#!/bin/sh
set -e

ffmpeg -i $1 -c:v libvpx -qmin 4 -qmax 63 -r 15 -crf 10 -b:v 512K $2

ffmpeg -i $1 -ss 00:00:00 -vframes 1 ${2}.jpg