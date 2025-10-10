from intcode import IntCodeMachine, MachineIO
from getch import getch
import sys

DIRECTIONS = ["west", "east", "north", "south"]


class GameIO(MachineIO):
    def __init__(self):
        self.chosen_command = []
        self.output_text = ""
        self.output_line = ""

        self.zone_items = []
        self.zone_directions = []
        self.held_items = []

    def make_command(self, response):
        if response == "a" and "west" in self.zone_directions:
            return "west"
        elif response == "d" and "east" in self.zone_directions:
            return "east"
        elif response == "w" and "north" in self.zone_directions:
            return "north"
        elif response == "s" and "south" in self.zone_directions:
            return "south"
        elif response == "i":
            return "inv"
        elif response == "p":
            return ""
        elif response == "r":
            print("Choose item to drop")
            for i, item in enumerate(self.held_items):
                print(i + 1, "-", item)

            number = getch()
            if number == "e":
                raise IndexError

            while not number.isdigit() or not (
                1 <= int(number) <= len(self.held_items)
            ):
                print("Wrong input, choose a valid item index or 'e' to exit")
                number = getch()
                if number == "e":
                    raise IndexError

            chosen = int(number) - 1
            return f"drop {self.held_items.pop(chosen)}"
        elif response.isdigit():
            if not (1 <= int(response) <= len(self.zone_items)):
                raise ValueError

            chosen = int(response) - 1
            return f"take {self.zone_items.pop(chosen)}"
        else:
            raise ValueError

    def input(self):
        if len(self.chosen_command) == 0:
            while True:
                response = getch()
                try:
                    command = self.make_command(response)
                except ValueError:
                    print("Wrong input, choose again")
                except IndexError:
                    print("Choose command")
                else:
                    break
            if command in self.zone_directions:
                self.reset_zone()

            self.chosen_command = list(command + "\n")

        return ord(self.chosen_command.pop(0))

    def output(self, value):
        self.output_line += chr(value)
        if value == 10:
            self.output_text += self.output_line

            if self.output_line == "Command?\n":
                self.parse_output()
                self.output_text = ""

            self.output_line = ""
        print(chr(value), end="")

    def reset_zone(self):
        self.zone_items = []
        self.zone_directions = []

    def parse_output(self):
        lines = self.output_text.splitlines()
        reading_directions = False
        reading_items = False
        for line in lines:
            if line.startswith("Doors here lead"):
                reading_directions = True
            elif line.startswith("Items here"):
                reading_items = True
            elif line.startswith("You take the"):
                item = " ".join(line[:-1].split()[3:])
                self.held_items.append(item)
            elif reading_directions:
                if line.startswith("-"):
                    self.zone_directions.append(line[2:])
                else:
                    reading_directions = False
            elif reading_items:
                if line.startswith("-"):
                    self.zone_items.append(line[2:])
                else:
                    reading_items = False


def main():
    with open(sys.argv[1]) as input_file:
        ints = [int(v) for v in input_file.read().split(",")]

    io = GameIO()
    machine = IntCodeMachine(ints, machine_input=io, machine_output=io)
    machine.run()
    print("a)", 11534338)  # Klein bottle, Mutex, Hypercube, Mug


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
