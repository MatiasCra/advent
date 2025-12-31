#!/bin/sh

if [ $# -eq 0 ]; then
	echo "Usage: $0 <day_number>"
	exit 1
fi

DAY=$1
cd "$(dirname "$0")"
cargo run --bin day$DAY
