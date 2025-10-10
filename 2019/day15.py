from copy import deepcopy
from intcode import IntCodeMachine, MachineIO
from collections import deque, defaultdict
import sys

COMMANDS = NORTH, SOUTH, WEST, EAST = 1, 2, 3, 4
ELEMENTS = WALL, EMPTY, OXYGEN, UNKNOWN = 0, 1, 2, 3
DELTAS = (0, 1), (0, -1), (-1, 0), (1, 0)
STATES = FRONTIER, MOVING = 0, 1

global_map = defaultdict(lambda: UNKNOWN)
global_map[0, 0] = EMPTY
global_queue = deque()


class Remote(MachineIO):
    def __init__(self, machine, pos=(0, 0), steps=0, next_answer=None, next_pos=None):
        self.pos = pos
        self.steps = steps
        self.next_answer = next_answer
        self.next_pos = next_pos
        self.machine = machine

    def input(self):
        # Answer specified direction
        if self.next_answer is not None:
            ans = self.next_answer
            self.next_answer = None
            return ans

        # Spawn all possibilities and halt
        for command, (dx, dy) in zip(COMMANDS, DELTAS):
            x, y = self.pos
            next_pos = (x + dx, y + dy)
            if next_pos in global_map:
                continue

            # Keeps machine state including IP. Since the Input instruction didn't touch the state or IP it will repeat
            # the Input instruction once it runs
            new_machine = deepcopy(self.machine)
            new_remote = Remote(new_machine, self.pos, self.steps, command, next_pos)
            new_machine.machine_input = new_remote
            new_machine.machine_output = new_remote
            global_queue.append(new_machine)

        self.machine.halted = True

    def output(self, value) -> None:
        if value == WALL:
            self.machine.halted = True
        else:
            self.pos = self.next_pos
            self.steps += 1
            if value == OXYGEN:
                print("a)", self.steps)

        global_map[self.next_pos] = value


def show_map(area_map):
    last_col = max(x for x, _ in area_map)
    first_col = min(x for x, _ in area_map)
    last_row = max(y for _, y in area_map)
    first_row = min(y for _, y in area_map)
    chars = {WALL: "#", OXYGEN: "O", EMPTY: ".", UNKNOWN: " "}
    for row in range(last_row, first_row - 1, -1):
        for col in range(first_col, last_col + 1):
            if (row, col) == (0, 0):
                print("S", end="")
            else:
                print(chars[area_map[col, row]], end="")
        print()


def main():
    with open(sys.argv[1]) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    machine = IntCodeMachine(ints)
    remote = Remote(machine)
    machine.machine_input = remote
    machine.machine_output = remote

    global_queue.append(machine)
    while global_queue:
        machine = global_queue.popleft()
        machine.run()

    minutes = 0
    oxygen_pos, _ = next(((pos, value) for (pos, value) in global_map.items() if value == OXYGEN))
    filled = {oxygen_pos}
    queue = deque([(oxygen_pos, minutes)])
    while queue:
        (x, y), minutes = queue.popleft()
        for dx, dy in DELTAS:
            next_pos = (x + dx, y + dy)
            if global_map[next_pos] != EMPTY or next_pos in filled:
                continue

            filled.add(next_pos)
            queue.append((next_pos, minutes + 1))

    print("b)", minutes)


if __name__ == "__main__":
    main()
