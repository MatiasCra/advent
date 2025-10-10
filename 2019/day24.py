import sys


DELTAS = ((1, 0), (-1, 0), (0, 1), (0, -1))
BUG, EMPTY = True, False
UNKNOWN = "?"
EMPTY_SCAN = (tuple(EMPTY for _ in range(5)) for _ in range(5))

MAX_X = MAX_Y = 5


def adj_inside(x, y):
    return (
        (x + dx, y + dy)
        for dx, dy in DELTAS
        if 0 <= x + dx < MAX_X and 0 <= y + dy < MAX_Y
    )


def count_adj(x, y, scan):
    return sum(1 for ax, ay in adj_inside(x, y) if scan[ax][ay] == BUG)


def next_in_pos(x, y, scan):
    curr = scan[x][y]
    count = count_adj(x, y, scan)
    return BUG if infests(curr, count) else EMPTY


def infests(curr, count):
    return (curr == BUG and count == 1) or (curr == EMPTY and count in (1, 2))


def next_scan(scan):
    return tuple(
        tuple(next_in_pos(x, y, scan) for y in range(len(scan[0])))
        for x in range(len(scan))
    )


def print_scan(scan):
    for row in scan:
        print("".join("?" if c == UNKNOWN else "#" if c else "." for c in row))
    print()


def biodiversity_rating(scan):
    s = 0
    for x in range(len(scan)):
        for y in range(len(scan[0])):
            if scan[x][y] == BUG:
                e = x * len(scan[0]) + y
                s += pow(2, e)

    return s


def solve_a(scan):
    scan_cache = set()
    while scan not in scan_cache:
        scan_cache.add(scan)
        scan = next_scan(scan)

    print("a)", biodiversity_rating(scan))


def adj(x, y, z):
    if x == 0:
        yield 1, 2, z + 1
    elif x == 4:
        yield 3, 2, z + 1

    if y == 0:
        yield 2, 1, z + 1
    elif y == 4:
        yield 2, 3, z + 1

    if (x, y) == (1, 2):
        yield from top(z - 1)
    elif (x, y) == (2, 1):
        yield from left(z - 1)
    elif (x, y) == (2, 3):
        yield from right(z - 1)
    elif (x, y) == (3, 2):
        yield from bottom(z - 1)

    yield from ((ax, ay, z) for ax, ay in adj_inside(x, y) if (ax, ay) != (2, 2))


def top(level):
    return ((0, y, level) for y in range(MAX_Y))


def bottom(level):
    return ((MAX_X - 1, y, level) for y in range(MAX_Y))


def left(level):
    return ((x, 0, level) for x in range(MAX_X))


def right(level):
    return ((x, MAX_Y - 1, level) for x in range(MAX_X))


def update_rec(bugs):
    new_bugs = []
    curr_adj = set()
    for x, y, z in bugs:
        curr_adj |= set(adj(x, y, z))

    for x, y, z in curr_adj:
        count = sum(1 for ax, ay, az in adj(x, y, z) if (ax, ay, az) in bugs)
        curr = BUG if (x, y, z) in bugs else EMPTY
        if infests(curr, count):
            new_bugs.append((x, y, z))

    return new_bugs


def solve_b(scan, minutes=200):
    bugs = sum(
        (
            tuple((x, y, 1) for x in range(len(scan[0])) if scan[x][y] == BUG)
            for y in range(len(scan))
        ),
        tuple(),
    )

    for m in range(minutes):
        bugs = update_rec(bugs)

    print("b)", len(bugs))


def main():
    with open(sys.argv[1]) as input_file:
        scan = parse_scan(input_file.read())

    solve_a(scan)
    solve_b(scan)


def test():
    str1 = """....#
#..#.
#..##
..#..
#...."""
    test1 = parse_scan(str1)

    print("TEST 1")
    solve_a(test1)

    print("TEST 2")
    assert set(adj(2, 3, 1)) == {
        (0, 4, 0),
        (1, 4, 0),
        (2, 4, 0),
        (3, 4, 0),
        (4, 4, 0),
        (1, 3, 1),
        (2, 4, 1),
        (3, 3, 1),
    }
    assert set(adj(2, 3, 0)) == {
        (0, 4, -1),
        (1, 4, -1),
        (2, 4, -1),
        (3, 4, -1),
        (4, 4, -1),
        (3, 3, 0),
        (1, 3, 0),
        (2, 4, 0),
    }
    str2 = """....#
#..#.
#.?##
..#..
#...."""
    test2 = parse_scan(str2)
    solve_b(test2, 10)


def parse_scan(scan_text):
    return tuple(tuple(c == "#" for c in line) for line in scan_text.splitlines())


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
    else:
        test()
