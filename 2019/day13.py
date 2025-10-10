from intcode import IntCodeMachine, MachineIO
from collections import defaultdict
import os, sys
from getch import getch
from copy import deepcopy

X, Y, TILE = 0, 1, 2
EMPTY, WALL, BLOCK, PADDLE, BALL = 0, 1, 2, 3, 4
NEUTRAL, TILTED_LEFT, TILTED_RIGHT = 0, -1, 1


class GameScreenAdapter(MachineIO):
    def __init__(self, screen):
        self.screen = screen
        self.next_output = X
        self.last = None
        self.coords = (None, None)
        self.score = 0

    def output(self, value):
        self.last = value
        if self.next_output == X:
            self.coords = (value, self.coords[1])
            self.next_output = Y
        elif self.next_output == Y:
            self.coords = (self.coords[0], value)
            self.next_output = TILE
        elif self.next_output == TILE:
            if self.coords == (-1, 0):
                self.score = value
            else:
                self.screen[self.coords] = value
            self.next_output = X

    def last_output(self):
        return self.last

    def print_screen(self):
        tiles = {
            EMPTY: " ",
            WALL: "▒",
            BLOCK: "#",
            PADDLE: "-",
            BALL: "o",
        }
        lx = min(x for x, _ in self.screen)
        rx = max(x for x, _ in self.screen)
        ty = min(y for _, y in self.screen)
        by = max(y for _, y in self.screen)
        for y in range(ty, by + 1):
            for x in range(lx, rx + 1):
                tile = self.screen[x, y]
                print(tiles[tile], end="")
            print()

        print(self.score)


class JoystickAdapter(MachineIO):
    def __init__(self, signal_adapter, savestate, loadstate):
        self.position = NEUTRAL
        self.signal_adapter = signal_adapter
        self.save_state = savestate
        self.load_state = loadstate

    def input(self):
        os.system("clear")
        self.signal_adapter()
        inp = getch()
        while inp in "0123456789k":
            self.save_state(inp)
            inp = getch()

        if inp == "a":
            self.position = TILTED_LEFT
        elif inp == "d":
            self.position = TILTED_RIGHT
        elif inp == "l":
            self.load_state("0")
        elif inp == "q":
            self.load_state(input("State to load [0-9]: "))
        else:
            self.position = NEUTRAL
        return self.position


class AutoJoystickAdapter(MachineIO):
    # Strategy: follow x position of the balll
    def __init__(self, signal_adapter, paddle_position, paddle_start, visual=True):
        self.curr = paddle_start
        self.position = NEUTRAL
        self.signal_adapter = signal_adapter
        self.paddle_position = paddle_position
        self.visual = visual

    def input(self):
        if self.visual:
            os.system("clear")
            self.signal_adapter()

        xp = self.paddle_position()
        if self.curr < xp:
            self.curr += 1
            return TILTED_RIGHT
        elif self.curr > xp:
            self.curr -= 1
            return TILTED_LEFT
        else:
            return NEUTRAL


saves = [IntCodeMachine([]) for _ in range(10)]
pending_load = False
to_load = 0


def play_game(ints):
    global save, pending_load

    def savestate(m, n):
        global saves
        n = int(n) if n.isdigit() else 0
        saves[n] = deepcopy(m)

    def load_state(m: IntCodeMachine, n):
        global pending_load, to_load
        n = int(n) if n.isdigit() else 0
        pending_load = True
        to_load = n
        m.halt()

    remaining = 9999
    screen = defaultdict(lambda: EMPTY)
    while remaining > 0:
        if pending_load and len(saves[to_load].ints) > 0:
            m: IntCodeMachine = deepcopy(saves[to_load])
            pending_load = False
            m.run()
        else:
            ints[0] = 2
            screen = defaultdict(lambda: EMPTY)
            adapter = GameScreenAdapter(screen)
            joystick = JoystickAdapter(
                adapter.print_screen,
                lambda n: savestate(m, n),
                lambda n: load_state(m, n),
            )
            m = IntCodeMachine(ints, machine_input=joystick, machine_output=adapter)
            m.run()

        remaining = sum(1 for tile in screen.values() if tile == BLOCK)


def main():
    with open(sys.argv[1]) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    screen = defaultdict(lambda: EMPTY)
    adapter = GameScreenAdapter(screen)
    m = IntCodeMachine(ints, machine_output=adapter)
    m.run()
    print("a)", sum(1 for tile in screen.values() if tile == BLOCK))

    paddle_x, _ = next(k for k, v in screen.items() if v == PADDLE)

    ints[0] = 2
    screen = defaultdict(lambda: EMPTY)
    adapter = GameScreenAdapter(screen)
    joystick = AutoJoystickAdapter(
        adapter.print_screen, lambda: adapter.coords[0], paddle_x, visual=False
    )
    m = IntCodeMachine(ints, machine_input=joystick, machine_output=adapter)
    m.run()
    print("b)", adapter.score)


if __name__ == "__main__":
    main()
