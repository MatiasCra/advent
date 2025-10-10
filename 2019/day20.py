import sys
from collections import deque
from queue import PriorityQueue
from functools import cache


def find_portals(maze_map):
    portals = {}
    for rown, row in enumerate(maze_map[:-1]):
        if " " not in row:
            continue
        horizontal_cols = (
            coln
            for coln, sym in enumerate(row[:-1])
            if sym.isupper() and row[coln + 1].isupper()
        )

        for coln in horizontal_cols:
            code = "".join((row[coln], row[coln + 1]))
            is_outer = coln < 2 or coln > len(maze_map[2]) - 3
            if coln < len(row) - 2 and row[coln + 2] == ".":
                portals[rown, coln + 1] = (code, (rown, coln + 2), is_outer)
            else:
                assert row[coln - 1] == "."
                portals[rown, coln] = (code, (rown, coln - 1), is_outer)

        vertical_cols = (
            coln
            for coln, sym in enumerate(row)
            if sym.isupper() and maze_map[rown + 1][coln].isupper()
        )
        for coln in vertical_cols:
            code = "".join((row[coln], maze_map[rown + 1][coln]))
            is_outer = rown < 2 or rown > len(maze_map) - 3
            if rown < len(maze_map) - 2 and maze_map[rown + 2][coln] == ".":
                portals[rown + 1, coln] = (code, (rown + 2, coln), is_outer)
            else:
                assert maze_map[rown - 1][coln] == "."
                portals[rown, coln] = (code, (rown - 1, coln), is_outer)

    corrected_portals = {}
    for loc, (code, portal_exit, is_outer) in portals.items():
        if code in ("AA", "ZZ"):
            corrected_portals[loc] = (code, portal_exit, is_outer)
        else:
            other_end = next(
                other_exit
                for other_loc, (other_code, other_exit, _) in portals.items()
                if code == other_code and loc != other_loc
            )
            corrected_portals[loc] = (code, other_end, is_outer)

    return corrected_portals


def min_dist(start, adj):
    queue = PriorityQueue()
    distance = {start: 0}
    queue.put((0, start))

    while not queue.empty():
        dist, loc = queue.get()

        for aloc, cost in adj(loc):
            if cost + dist < distance.get(aloc, float("inf")):
                distance[aloc] = cost + dist
                queue.put((distance[aloc], aloc))

    return distance


def min_outermost_dist(adj):
    start = (("AA", True), 0)
    queue = PriorityQueue()
    distance = {start: 0}
    queue.put((0, start))
    max_steps = 10**4

    while not queue.empty():
        dist, (portal, level) = queue.get()
        if dist > max_steps:
            continue

        for aportal, cost in adj(portal):
            code, is_outer = aportal
            next_level = (
                0
                if (code, level) == ("ZZ", 0)
                else level - 1 if is_outer else level + 1
            )
            if next_level < 0 or level != 0 and code in ("AA", "ZZ"):
                continue

            if cost + dist < distance.get((aportal, next_level), float("inf")):
                distance[aportal, next_level] = cost + dist
                if (code, next_level) == ("ZZ", 0):
                    max_steps = next_level
                else:
                    queue.put((cost + dist, (aportal, next_level)))

    return distance


def solve(maze, skip_a=False, skip_b=False):
    portals = find_portals(maze)

    @cache
    def maze_adj(rown, coln):
        next_locs = (
            (rown + 1, coln),
            (rown - 1, coln),
            (rown, coln + 1),
            (rown, coln - 1),
        )

        adjacent = []
        for nrow, ncol in next_locs:
            if not (0 <= nrow < len(maze) and 0 <= ncol < len(maze[0])):
                continue

            if maze[nrow][ncol] == "." or (nrow, ncol) in portals:
                adjacent.append((nrow, ncol))

        return tuple(adjacent)

    def make_adj(x, y):
        distance = {}
        visited = set()
        if (x, y) in portals:
            p_code, p_exit, is_outer = portals[x, y]
            visited.add((x, y))
            x, y = p_exit

        queue = deque([((x, y), 0)])
        while queue:
            (x, y), dist = queue.popleft()
            visited.add((x, y))
            for nrow, ncol in maze_adj(x, y):
                if (nrow, ncol) in visited:
                    continue

                if (nrow, ncol) in portals:
                    code, p_exit, is_outer = portals[(nrow, ncol)]
                    distance[code, is_outer] = dist + 1

                queue.append(((nrow, ncol), dist + 1))

        if ("AA", True) in distance:
            distance["AA", True] -= 1
        if ("ZZ", True) in distance:
            distance["ZZ", True] -= 1
        return distance

    adj = {}
    for (x, y), (code, p_exit, is_outer) in portals.items():
        adj[code, is_outer] = make_adj(x, y)

    if not skip_a:
        print("a)", min_dist(("AA", True), lambda k: adj[k].items())["ZZ", True])

    if not skip_b:
        print("b)", min_outermost_dist(lambda k: adj[k].items())[("ZZ", True), 0])


def main():
    with open(sys.argv[1]) as input_file:
        maze = input_file.read().splitlines()

    solve(maze)


def test():
    test1 = """         A           
         A           
  #######.#########  
  #######.........#  
  #######.#######.#  
  #######.#######.#  
  #######.#######.#  
  #####  B    ###.#  
BC...##  C    ###.#  
  ##.##       ###.#  
  ##...DE  F  ###.#  
  #####    G  ###.#  
  #########.#####.#  
DE..#######...###.#  
  #.#########.###.#  
FG..#########.....#  
  ###########.#####  
             Z       
             Z  """.splitlines()

    test2 = """                   A               
                   A               
  #################.#############  
  #.#...#...................#.#.#  
  #.#.#.###.###.###.#########.#.#  
  #.#.#.......#...#.....#.#.#...#  
  #.#########.###.#####.#.#.###.#  
  #.............#.#.....#.......#  
  ###.###########.###.#####.#.#.#  
  #.....#        A   C    #.#.#.#  
  #######        S   P    #####.#  
  #.#...#                 #......VT
  #.#.#.#                 #.#####  
  #...#.#               YN....#.#  
  #.###.#                 #####.#  
DI....#.#                 #.....#  
  #####.#                 #.###.#  
ZZ......#               QG....#..AS
  ###.###                 #######  
JO..#.#.#                 #.....#  
  #.#.#.#                 ###.#.#  
  #...#..DI             BU....#..LF
  #####.#                 #.#####  
YN......#               VT..#....QG
  #.###.#                 #.###.#  
  #.#...#                 #.....#  
  ###.###    J L     J    #.#.###  
  #.....#    O F     P    #.#...#  
  #.###.#####.#.#####.#####.###.#  
  #...#.#.#...#.....#.....#.#...#  
  #.#####.###.###.#.#.#########.#  
  #...#.#.....#...#.#.#.#.....#.#  
  #.###.#####.###.###.#.#.#######  
  #.#.........#...#.............#  
  #########.###.###.#############  
           B   J   C               
           U   P   P               """.splitlines()

    test3 = """             Z L X W       C                 
             Z P Q B       K                 
  ###########.#.#.#.#######.###############  
  #...#.......#.#.......#.#.......#.#.#...#  
  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  
  #.#...#.#.#...#.#.#...#...#...#.#.......#  
  #.###.#######.###.###.#.###.###.#.#######  
  #...#.......#.#...#...#.............#...#  
  #.#########.#######.#.#######.#######.###  
  #...#.#    F       R I       Z    #.#.#.#  
  #.###.#    D       E C       H    #.#.#.#  
  #.#...#                           #...#.#  
  #.###.#                           #.###.#  
  #.#....OA                       WB..#.#..ZH
  #.###.#                           #.#.#.#  
CJ......#                           #.....#  
  #######                           #######  
  #.#....CK                         #......IC
  #.###.#                           #.###.#  
  #.....#                           #...#.#  
  ###.###                           #.#.#.#  
XF....#.#                         RF..#.#.#  
  #####.#                           #######  
  #......CJ                       NM..#...#  
  ###.#.#                           #.###.#  
RE....#.#                           #......RF
  ###.###        X   X       L      #.#.#.#  
  #.....#        F   Q       P      #.#.#.#  
  ###.###########.###.#######.#########.###  
  #.....#...#.....#.......#...#.....#.#...#  
  #####.#.###.#######.#######.###.###.#.#.#  
  #.......#.......#.#.#.#.#...#...#...#.#.#  
  #####.###.#####.#.#.#.#.###.###.#.###.###  
  #.......#.....#.#...#...............#...#  
  #############.#.#.###.###################  
               A O F   N                     
               A A D   M                     """.splitlines()

    print("TEST 1")
    solve(test1)
    print("TEST 2")
    solve(test2, skip_b=True)
    print("TEST 3")
    solve(test3, skip_a=True)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
    else:
        test()
