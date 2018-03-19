#!/bin/sh
set -e

ffmpeg -i $1 -vf eq=saturation=0.6:gamma=0.6:contrast=0.4 -c:v libvpx -crf 10 -qmin 4 -qmax 50 -r 15 -b:v 1M $2

ffmpeg -i $1 -vf eq=saturation=0.6:gamma=0.6:contrast=0.4 -ss 00:00:00 -vframes 1 ${2}.jpg
