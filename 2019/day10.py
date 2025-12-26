import sys
from math import atan2, pi, sqrt


def calc_distance(a, b):
    return sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)


def parse_map(map_str):
    asteroid_map = map_str.splitlines()
    asteroids = []
    for y, line in enumerate(asteroid_map):
        for x, char in enumerate(line):
            if char == "#":
                asteroids.append((y, x))
    return asteroids


def directions_from(point, asteroids):
    y, x = point
    directions = {}
    for ay, ax in asteroids:
        distance = calc_distance((ax, ay), (x, y))
        directions[(ay, ax)] = (
            (round((ay - y) / distance, 4), round((ax - x) / distance, 4))
            if distance != 0
            else (0, 0)
        )
    return directions


def group_by_direction(directions):
    asteroids_by_direction = {}
    for asteroid, direction in directions.items():
        if not asteroids_by_direction.get(direction):
            asteroids_by_direction[direction] = []

        asteroids_by_direction[direction].append(asteroid)

    return asteroids_by_direction


def detected_asteroids(asteroids, base):
    directions = directions_from(base, asteroids)
    asteroid_by_direction = group_by_direction(directions)
    return len(asteroid_by_direction) - 1


def best_location(asteroids):
    return max((detected_asteroids(asteroids, (y, x)), (y, x)) for y, x in asteroids)


def calc_angle(direction):
    y, x = direction
    # adjust for calcs, up is positive (previously negative as it's closer to the top)
    y *= -1

    # angle from the right in the interval [-pi, pi]
    angle = atan2(y, x)
    # first quadrant
    if 0 <= angle <= pi / 2:
        angle = pi / 2 - angle
    # second quadrant
    elif (pi / 2) < angle <= pi:
        angle = (3 / 2) * pi + (pi - angle)
    # third and fourth quadrants
    else:
        angle = (pi / 2) + abs(angle)

    return angle


def laser_order(asteroids_by_direction, laser):
    asteroids_by_laser_turn = {}
    for direction, asteroids in asteroids_by_direction.items():
        angle = calc_angle(direction)
        for turn_n, asteroid in enumerate(
            sorted(asteroids, key=lambda asteroid: calc_distance(laser, asteroid))
        ):
            asteroids_by_laser_turn[turn_n, angle] = asteroid

    return [
        asteroid
        for _, asteroid in sorted(asteroids_by_laser_turn.items(), key=lambda kv: kv[0])
    ]


def evaporated_target(asteroids_by_direction, laser):
    ordered = laser_order(asteroids_by_direction, laser)
    y, x = ordered[199]
    return x * 100 + y


def main(input_file):
    with open(input_file) as f:
        asteroid_map = f.read()

    asteroids = parse_map(asteroid_map)
    amount_in_sight, best = best_location(asteroids)
    print("a)", amount_in_sight)

    asteroids_by_direction = group_by_direction(directions_from(best, asteroids))
    del asteroids_by_direction[0, 0]
    print("b)", evaporated_target(asteroids_by_direction, best))


def test():
    asteroid_map = ".#..#\n.....\n#####\n....#\n...##"
    asteroids = parse_map(asteroid_map)
    assert best_location(asteroids) == (8, (4, 3))

    asteroid_map = """.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##"""
    asteroids = parse_map(asteroid_map)
    asteroids_by_direction = group_by_direction(directions_from((3, 8), asteroids))
    assert laser_order(asteroids_by_direction, (3, 8))[:6] == [
        (1, 8),
        (0, 9),
        (1, 9),
        (0, 10),
        (2, 9),
        (1, 11),
    ]


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        test()
