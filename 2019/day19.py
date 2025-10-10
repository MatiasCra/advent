import sys
from intcode import IntCodeMachine, MachineIO, ListIOAdapter
from itertools import chain


class TractorBeamOutput(MachineIO):
    def __init__(self):
        self.being_pulled = None

    def output(self, value):
        self.being_pulled = bool(value)


def being_pulled(ints, x, y):
    if x < 0 or y < 0:
        return False

    output = TractorBeamOutput()
    machine = IntCodeMachine(
        ints, machine_input=ListIOAdapter([x, y]), machine_output=output
    )
    machine.run()
    return output.being_pulled


def main():
    with open(sys.argv[1]) as input_file:
        ints = [int(i) for i in input_file.read().split(",")]

    # Print 200x200 square and see the center of the #s in row 200 by eye. The direction vector should give the best
    # aproximation to the center of the beam
    direction = (199, 163)

    count = 0
    size = 1
    row = {}
    start = 1000  # start search for square
    max_rows = 400  # max rows to search
    for y in chain(range(50), range(start, start + max_rows)):
        center = round(y / direction[0] * direction[1])

        left = center - size // 2 + 1
        right = center + size // 2 - 1

        while being_pulled(ints, left - 1, y):
            left -= 1
        while being_pulled(ints, right + 1, y):
            right += 1

        spaces_count = left - 1
        new_size = max(0, right + 1 - left)

        if y < 50:
            spaces = " " * spaces_count
            print(f"{spaces}", end="")
            if new_size >= 1:
                print(f"{"#" * new_size}", end="")
            print()

        row[y] = spaces_count, new_size
        size = new_size
        if y <= 49:
            count += new_size

        if y == 49:
            print("a)", count)

        if y >= start + 100:
            prev_spaces, prev_size = row[y - 100]
            space_dif = spaces_count - prev_spaces
            if space_dif < 100 and prev_size >= space_dif + 100:
                closest_col = spaces_count + 1
                closest_row = y - 100
                print("b)", closest_col * 10000 + closest_row)
                break


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
