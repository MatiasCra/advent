from collections import defaultdict
from intcode import IntCodeMachine, MachineIO

PAINT, MOVE = 0, 1
BLACK, WHITE = 0, 1
LEFT, RIGHT, DOWN, UP = 0, 1, 2, 3


def turn_left(direction):
    if direction == UP:
        return LEFT
    elif direction == LEFT:
        return DOWN
    elif direction == DOWN:
        return RIGHT
    elif direction == RIGHT:
        return UP


def turn_right(direction):
    if direction == UP:
        return RIGHT
    elif direction == RIGHT:
        return DOWN
    elif direction == DOWN:
        return LEFT
    elif direction == LEFT:
        return UP


class Robot:
    def __init__(self) -> None:
        self.map = defaultdict(lambda: BLACK)
        self.current = 0, 0
        self.direction = UP

    def current_color(self):
        return self.map[self.current]

    def paint(self, color):
        if color not in (WHITE, BLACK):
            raise ValueError(f"Invalid color: {color}")

        self.map[self.current] = color

    def turn(self, turn_direction):
        if turn_direction not in (LEFT, RIGHT):
            raise ValueError(f"Invalid turn direction: {turn_direction}")

        self.direction = (
            turn_left(self.direction)
            if turn_direction == LEFT
            else turn_right(self.direction)
        )

    def move(self):
        if self.direction == UP:
            self.current = self.current[0], self.current[1] - 1
        elif self.direction == DOWN:
            self.current = self.current[0], self.current[1] + 1
        elif self.direction == LEFT:
            self.current = self.current[0] - 1, self.current[1]
        elif self.direction == RIGHT:
            self.current = self.current[0] + 1, self.current[1]

    def painted_panels_count(self):
        return len(self.map.keys())

    def print_map(self):
        lx = min(x for x, _ in self.map)
        rx = max(x for x, _ in self.map)
        ty = min(y for _, y in self.map)
        by = max(y for _, y in self.map)
        for y in range(ty, by + 1):
            for x in range(lx, rx + 1):
                color = self.map[x, y]
                print("#" if color == WHITE else " ", end="")
            print()


class RobotIOAdapter(MachineIO):
    def __init__(self, robot):
        self.next_operation = PAINT
        self.robot = robot
        self.last = None

    def input(self):
        return self.robot.current_color()

    def output(self, value):
        self.last = value
        if self.next_operation == PAINT:
            self.robot.paint(value)
            self.next_operation = MOVE
        else:
            self.robot.turn(value)
            self.robot.move()
            self.next_operation = PAINT

    def last_output(self):
        return self.last


def main():
    with open(0) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    robot = Robot()
    adapter = RobotIOAdapter(robot)
    m = IntCodeMachine(ints, machine_input=adapter, machine_output=adapter)
    m.run()
    print("a)", robot.painted_panels_count())

    robot = Robot()
    robot.paint(WHITE)
    adapter = RobotIOAdapter(robot)
    m = IntCodeMachine(ints, machine_input=adapter, machine_output=adapter)
    m.run()
    print("b)")
    robot.print_map()


if __name__ == "__main__":
    main()
