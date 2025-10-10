from intcode import IntCodeMachine, MachineIO, ListIOAdapter
import sys


def choose(bag, amount):
    if amount <= 0:
        return []
    if amount == 1:
        return [[item] for item in bag]

    res = []
    for item in bag:
        for rec in choose(bag, amount - 1):
            res.append([item] + rec)

    return res


class AsciiOutput(MachineIO):
    def __init__(self, on_success):
        self.on_success = on_success

    def output(self, value):
        if value > 255:
            self.on_success(value)
        else:
            print(chr(value), end="")


def main():
    with open(sys.argv[1]) as input_file:
        ints = [int(i) for i in input_file.read().split(",")]

    # Jumps take you 4 tiles forward
    # Jump if A, B or C are not ground and D is
    program = list(
        map(
            ord,
            """
    NOT A J
    NOT B T
    OR T J
    NOT C T
    OR T J
    AND D J
    WALK
    """.strip()
            + "\n",
        )
    )

    m_output = AsciiOutput(lambda v: print("a)", v))
    m_input = ListIOAdapter(program)
    machine = IntCodeMachine(ints, machine_input=m_input, machine_output=m_output)
    machine.run()

    # Problem: you may land where you must jumpl but can't land
    # Solution: only jump if afterward you can continue running or jump and land
    program = list(
        map(
            ord,
            """
    NOT A J
    NOT B T
    OR T J
    NOT C T
    OR T J
    AND D J
    NOT A T
    AND A T
    OR E T
    OR H T
    AND T J
    RUN
    """.strip()
            + "\n",
        )
    )
    m_output = AsciiOutput(lambda v: print("b)", v))
    m_input = ListIOAdapter(program)
    machine = IntCodeMachine(ints, machine_input=m_input, machine_output=m_output)
    machine.run()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
