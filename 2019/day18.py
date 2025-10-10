import sys
from collections import deque
from functools import cache


def bfs_distances(row, col, tunnels_map):
    @cache
    def adj(row, col):
        nonlocal tunnels_map
        for ar, ac in ((row + 1, col), (row - 1, col), (row, col + 1), (row, col - 1)):
            if (
                0 <= ar < len(tunnels_map)
                and 0 <= ac < len(tunnels_map[ar])
                and tunnels_map[ar][ac] != "#"
            ):
                yield ar, ac

    sym = tunnels_map[row][col]
    dist = {sym: (0, set())} if sym.islower() else {}
    visited = {(row, col)}
    queue = deque([(row, col, 0, set())])
    while queue:
        cur_row, cur_col, distance, doors = queue.popleft()
        for ar, ac in adj(cur_row, cur_col):
            if (ar, ac) in visited:
                continue

            visited.add((ar, ac))
            sym = tunnels_map[ar][ac]
            if sym.islower():
                dist[sym] = (distance + 1, doors)
            elif sym.isupper():
                doors = doors | {sym.lower()}

            queue.append((ar, ac, distance + 1, doors))

    return dist


def make_graph(tunnels_map, start_r=None, start_c=None):
    if start_r is None:
        start_r = len(tunnels_map) // 2
    if start_c is None:
        start_c = len(tunnels_map[0]) // 2
    assert tunnels_map[start_r][start_c] == "@"
    location = {"@": (start_r, start_c)}
    for rown, row in enumerate(tunnels_map):
        for coln, sym in enumerate(row):
            if sym.islower():
                location[sym] = (rown, coln)

    adj = {}
    for sym, (row, col) in location.items():
        adj[sym] = bfs_distances(row, col, tunnels_map)

    return sorted(location.keys() - {"@"}), adj


def min_path(goals, adj):
    min_cost = float("inf")
    remaining = set(goals)

    min_cost_cache = {}

    def dfs_min(sym, total_cost=0):
        nonlocal min_cost, remaining, min_cost_cache

        if len(remaining) == 0:
            min_cost = total_cost
            return 0

        hash_key = sym + str(sorted(remaining))
        if hash_key in min_cost_cache:
            return min_cost_cache[hash_key]

        curr_min = float("inf")
        for next_key in remaining:
            cost, needed_keys = adj[sym][next_key]
            if not needed_keys.isdisjoint(remaining) or total_cost + cost >= min_cost:
                continue

            remaining.remove(next_key)
            curr_min = min(curr_min, dfs_min(next_key, total_cost + cost) + cost)
            remaining.add(next_key)

        min_cost_cache[hash_key] = curr_min
        return curr_min

    return dfs_min("@")


def separate_vaults(tunnels_map):
    mid_r = len(tunnels_map) // 2
    mid_c = len(tunnels_map[0]) // 2
    tunnels_map[mid_r - 1] = (
        tunnels_map[mid_r - 1][: mid_c - 1]
        + "@#@"
        + tunnels_map[mid_r + 1][mid_c + 2 :]
    )
    tunnels_map[mid_r] = (
        tunnels_map[mid_r][: mid_c - 1] + "###" + tunnels_map[mid_r][mid_c + 2 :]
    )
    tunnels_map[mid_r + 1] = (
        tunnels_map[mid_r + 1][: mid_c - 1]
        + "@#@"
        + tunnels_map[mid_r + 1][mid_c + 2 :]
    )

    return (
        (mid_r - 1, mid_c - 1),
        (mid_r - 1, mid_c + 1),
        (mid_r + 1, mid_c - 1),
        (mid_r + 1, mid_c + 1),
    )


def four_way_min_path(goals, adjs):
    min_cost = float("inf")
    remaining = set(goals)

    min_cost_cache = {}

    def dfs_min(syms, total_cost=0):
        nonlocal min_cost, remaining, min_cost_cache

        if len(remaining) == 0:
            min_cost = total_cost
            return 0

        hash_key = (syms, tuple(sorted(remaining)))
        if hash_key in min_cost_cache:
            return min_cost_cache[hash_key]

        curr_min = float("inf")
        for next_key in remaining:
            for i in range(4):
                if next_key not in adjs[i][syms[i]]:
                    continue

                cost, needed_keys = adjs[i][syms[i]][next_key]
                if (
                    not needed_keys.isdisjoint(remaining)
                    or total_cost + cost >= min_cost
                ):
                    continue

                new_state = tuple(s if j != i else next_key for j, s in enumerate(syms))
                remaining.remove(next_key)
                curr_min = min(curr_min, dfs_min(new_state, total_cost + cost) + cost)
                remaining.add(next_key)

        min_cost_cache[hash_key] = curr_min
        return curr_min

    return dfs_min(("@", "@", "@", "@"))


def main():
    with open(sys.argv[1]) as f:
        tunnels_map = f.read().splitlines()

    goals, adj = make_graph(tunnels_map)
    print("a)", min_path(goals, adj))

    entrances = separate_vaults(tunnels_map)
    adjs = [{}, {}, {}, {}]
    for i in range(4):
        _, adjs[i] = make_graph(tunnels_map, entrances[i][0], entrances[i][1])

    print("b)", four_way_min_path(goals, adjs))


if __name__ == "__main__":
    main()
