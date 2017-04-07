#!/bin/sh
ffmpeg -i $1 -c:v libvpx -qmin 4 -qmax 63 -crf 10 -b:v 512K $2

