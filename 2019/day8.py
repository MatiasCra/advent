import sys
from collections import Counter
from itertools import batched


def main(input_file):
    with open(input_file) as f:
        digits = [int(c) for c in f.read().splitlines()[0]]

    wide, tall = 25, 6
    layers = batched(digits, wide * tall)
    counts = [Counter(layer) for layer in layers]
    fewest_zeros_counter = min(counts, key=lambda c: c[0])
    print("a)", fewest_zeros_counter[1] * fewest_zeros_counter[2])

    layers = list(batched(digits, wide * tall))
    grid = [list(batched(layer, wide)) for layer in layers]
    print("b)")
    for y in range(tall):
        for x in range(wide):
            for layer in grid:
                if layer[y][x] != 2:
                    print("█" if layer[y][x] == 1 else " ", end="")
                    break
        print()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
