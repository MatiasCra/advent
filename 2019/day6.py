import sys
from collections import defaultdict


def dfs(adj, start, callback):
    visited = {start}

    def dfs_visit(u):
        for v in adj[u]:
            if v not in visited:
                visited.add(v)
                callback(v, u)
                dfs_visit(v)

    dfs_visit(start)


def parents_list(parent, object):
    ordered_parents = []
    while object in parent:
        object = parent[object]
        ordered_parents.append(object)

    return ordered_parents


def main(input_file):
    with open(input_file) as f:
        lines = f.read().splitlines()

    orbits = defaultdict(list)
    parent = {}
    for line in lines:
        center, orbiting = line.split(")")
        orbits[center].append(orbiting)
        parent[orbiting] = center

    orbit_counts = {}
    orbit_counts["COM"] = 0

    def update_orbit_count(orbiter, center):
        orbit_counts[orbiter] = orbit_counts[center] + 1

    dfs(orbits, "COM", update_orbit_count)
    print("a)", sum(orbit_counts.values()))

    san_parents = parents_list(parent, "SAN")
    you_parents = parents_list(parent, "YOU")
    for i, object in enumerate(you_parents):
        if object in san_parents:
            print("b)", i + san_parents.index(object))
            break


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
