import re
import sys
from itertools import combinations
from math import lcm


def parse_positions(positions_txt):
    positions = []
    for line in positions_txt.splitlines():
        res = re.match(r"<x=(-?\d+), y=(-?\d+), z=(-?\d+)>", line)
        if not res:
            raise Exception("Error parsing position")
        positions.append(tuple(int(n) for n in res.groups()))

    return tuple(positions)


def step(moons, velocities):
    for (first_id, (fx, fy, fz)), (second_id, (sx, sy, sz)) in combinations(
        enumerate(moons), 2
    ):
        if fx > sx:
            velocities[first_id][0] -= 1
            velocities[second_id][0] += 1
        elif fx < sx:
            velocities[first_id][0] += 1
            velocities[second_id][0] -= 1

        if fy > sy:
            velocities[first_id][1] -= 1
            velocities[second_id][1] += 1
        elif fy < sy:
            velocities[first_id][1] += 1
            velocities[second_id][1] -= 1

        if fz > sz:
            velocities[first_id][2] -= 1
            velocities[second_id][2] += 1
        elif fz < sz:
            velocities[first_id][2] += 1
            velocities[second_id][2] -= 1

    return tuple(
        (x + vx, y + vy, z + vz) for (x, y, z), (vx, vy, vz) in zip(moons, velocities)
    )


def total_energy(moons, velocities):
    return sum(
        sum(map(abs, moon)) * sum(map(abs, vel)) for moon, vel in zip(moons, velocities)
    )


def step_n(n: int, moons, velocities):
    for _ in range(n):
        moons = step(moons, velocities)

    return moons, velocities


def till_repeat(moons, velocities):
    # x, y, and z are completely independant
    x_cache = {}
    y_cache = {}
    z_cache = {}
    rep_x = 0
    rep_y = 0
    rep_z = 0

    i = 0
    while rep_x == 0 or rep_y == 0 or rep_z == 0:
        moons = step(moons, velocities)
        i += 1

        if rep_x == 0:
            hashable_x = tuple(x for x, _, _ in moons), tuple(
                x for x, _, _ in velocities
            )
            if hashable_x in x_cache:
                rep_x = i - x_cache[hashable_x]
            else:
                x_cache[hashable_x] = i

        if rep_y == 0:
            hashable_y = tuple(y for _, y, _ in moons), tuple(
                y for _, y, _ in velocities
            )
            if hashable_y in y_cache:
                rep_y = i - y_cache[hashable_y]
            else:
                y_cache[hashable_y] = i

        if rep_z == 0:
            hashable_z = tuple(z for _, _, z in moons), tuple(
                z for _, _, z in velocities
            )
            if hashable_z in z_cache:
                rep_z = i - z_cache[hashable_z]
            else:
                z_cache[hashable_z] = i

    return lcm(rep_x, rep_y, rep_z)


def main(input_file):
    with open(input_file) as f:
        moons = parse_positions(f.read())

    velocities = [[0, 0, 0] for _ in range(len(moons))]
    moons, velocities = step_n(1000, moons, velocities)
    print("a)", total_energy(moons, velocities))

    with open(input_file) as f:
        moons = parse_positions(f.read())

    velocities = [[0, 0, 0] for _ in range(len(moons))]
    print("b)", till_repeat(moons, velocities))


def test():
    moons = parse_positions(
        """<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>"""
    )
    velocities = [[0, 0, 0] for _ in range(len(moons))]
    moons, velocities = step_n(10, moons, velocities)
    assert total_energy(moons, velocities) == 179

    moons = parse_positions(
        """<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>"""
    )
    velocities = [[0, 0, 0] for _ in range(len(moons))]
    moons, velocities = step_n(100, moons, velocities)
    assert total_energy(moons, velocities) == 1940

    moons = parse_positions(
        """<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>
"""
    )
    velocities = [[0, 0, 0] for _ in range(len(moons))]
    assert (till_repeat(moons, velocities)) == 4686774924


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        test()
