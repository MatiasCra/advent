from intcode import IntCodeMachine, MachineIO
import sys


def adj_scaffolds_count(space_map, row, col):
    return sum(
        1
        for (dr, dc) in ((-1, 0), (1, 0), (0, -1), (0, 1))
        if 0 <= row + dr < len(space_map)
        and 0 <= col + dc < len(space_map[row + dr])
        and space_map[row + dr][col + dc] == "#"
    )


def intersections(space_map, scaffolds=None):
    if scaffolds is None:
        scaffolds = sum(
            (
                [
                    (row, col)
                    for col in range(len(space_map[row]))
                    if space_map[row][col] == "#"
                ]
                for row in range(len(space_map))
            ),
            [],
        )

    return [
        (row, col)
        for (row, col) in scaffolds
        if adj_scaffolds_count(space_map, row, col) > 2
    ]


class SpaceMapOutput(MachineIO):
    def __init__(self, print_map=True):
        self.scaffolds = []
        self.print = print_map
        self.map: list[list[str]] = [[]]

    def output(self, ascii_code):
        ascii_chr = chr(ascii_code)
        if ascii_chr == "\n":
            self.map.append([])
        else:
            self.map[-1].append(ascii_chr)
            if ascii_chr == "#":
                self.scaffolds.append((len(self.map) - 1, len(self.map[-1]) - 1))

        if self.print:
            print(ascii_chr, end="")


class SpaceMapIO(MachineIO):
    def __init__(
        self,
        main_instructions,
        a_instructions,
        b_instructions,
        c_instructions,
        video="n",
    ):
        self.last = None
        self.main = main_instructions
        self.func_a = a_instructions
        self.func_b = b_instructions
        self.func_c = c_instructions
        self.video = list(f"{video}\n")

    def __next_input(self) -> int:
        for instruction_list in [
            self.main,
            self.func_a,
            self.func_b,
            self.func_c,
            self.video,
        ]:
            if instruction_list:
                return ord(instruction_list.pop(0))

        return int(input()[0])

    def input(self) -> int:
        res = self.__next_input()
        # print(chr(res), end="")
        return res

    def output(self, value) -> None:
        self.last = value
        if not isinstance(value, int) or value > 255:
            pass  # finished
        # else:
        #     print(chr(value), end="")

    def last_output(self) -> int | None:
        return self.last


def print_with_intersections(inter, space_map):
    for row in range(len(space_map)):
        for col in range(len(space_map[row])):
            if (row, col) in inter:
                print("O", end="")
            else:
                print(space_map[row][col], end="")
        print()


def next_delta(direction: str):
    return {"<": (0, -1), ">": (0, 1), "^": (-1, 0), "v": (1, 0)}[direction]


def directions_to_end(space_map):
    def adj(row, col, direction):
        adj_d = {}
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            if (
                0 <= row + dr < len(space_map)
                and 0 <= col + dc < len(space_map[row + dr])
                and not (dr * -1, dc * -1) == next_delta(direction)
            ):
                adj_d[row + dr, col + dc] = space_map[row + dr][col + dc]

        return adj_d

    start = None
    for rown, row in enumerate(space_map):
        for coln, sym in enumerate(row):
            if sym in "<>^v":
                start = (rown, coln)
                break
        if start:
            break

    advance = {(1, 0, "v"), (-1, 0, "^"), (0, 1, ">"), (0, -1, "<")}
    turn = {
        (1, 0, ">"): ("R", "v"),
        (1, 0, "<"): ("L", "v"),
        (-1, 0, ">"): ("L", "^"),
        (-1, 0, "<"): ("R", "^"),
        (0, 1, "^"): ("R", ">"),
        (0, 1, "v"): ("L", ">"),
        (0, -1, "^"): ("L", "<"),
        (0, -1, "v"): ("R", "<"),
    }

    dirs = []
    row, col = start
    direction = space_map[row][col]
    adj_dir = adj(row, col, direction)
    while not all(s == "." for s in adj_dir.values()):
        dr, dc = next_delta(direction)
        if adj_dir.get((row + dr, col + dc), ".") != "#":
            ar, ac = next((row, col) for (row, col), s in adj_dir.items() if s == "#")
            dr, dc = ar - row, ac - col

        if (dr, dc, direction) in advance:
            if isinstance(dirs[-1], int):
                dirs[-1] += 1
            else:
                dirs.append(1)

            row += dr
            col += dc
            adj_dir = adj(row, col, direction)
        else:
            turn_instruction, direction = turn[(dr, dc, direction)]
            dirs.append(turn_instruction)

    return dirs


def main():
    with open(sys.argv[1]) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    space_map = part_a(ints.copy())
    part_b(ints, space_map)


def compress(full_list, sublist):
    i = 0
    while i < len(full_list):
        if full_list[i : i + len(sublist)] == sublist:
            full_list[i : i + len(sublist)] = [sublist]
        i += 1


def turn_to_instructions(list_directions):
    return list(",".join(str(e) for e in list_directions) + "\n")


def part_b(ints, space_map):
    # Get the directions and compress by eye
    directions = directions_to_end(space_map)
    list_a = ["L", 4, "L", 10, "L", 6]
    list_b = ["L", 6, "L", 4, "R", 8, "R", 8]
    list_c = ["L", 6, "R", 8, "L", 10, "L", 8, "L", 8]
    compress(directions, list_a)
    compress(directions, list_b)
    compress(directions, list_c)
    assert all(d in (list_a, list_b, list_c) for d in directions)

    main_instructions = list(
        ",".join(
            ["A" if d == list_a else "B" if d == list_b else "C" for d in directions]
        )
    ) + ["\n"]
    a_instructions = turn_to_instructions(list_a)
    b_instructions = turn_to_instructions(list_b)
    c_instructions = turn_to_instructions(list_c)

    ints[0] = 2
    io = SpaceMapIO(main_instructions, a_instructions, b_instructions, c_instructions)
    machine = IntCodeMachine(ints, machine_input=io, machine_output=io)
    machine.run()
    print("b)", io.last)


def part_a(ints):
    space_map_out = SpaceMapOutput(print_map=False)
    machine = IntCodeMachine(ints, machine_output=space_map_out)
    machine.run()
    inter = intersections(space_map_out.map, space_map_out.scaffolds)
    print_with_intersections(inter, space_map_out.map)
    print(
        "a)",
        sum(row * col for row, col in inter),
    )
    return space_map_out.map


def test():
    print("Test")
    test_map = """..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...^..""".splitlines()

    inter = intersections(test_map)
    print_with_intersections(inter, test_map)

    print("a)", sum(row * col for row, col in inter))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
    else:
        test()
