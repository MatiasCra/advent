from intcode import IntCodeMachine, ListIOAdapter


def main():
    with open(0) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    m = IntCodeMachine(ints.copy(), machine_input=ListIOAdapter([1]))
    m.run()
    print("a)", m.machine_output.last_output())

    m = IntCodeMachine(ints, machine_input=ListIOAdapter([5]))
    m.run()
    print("b)", m.machine_output.last_output())


def test():
    ints = [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99,
    ]

    m = IntCodeMachine(ints.copy(), machine_input=ListIOAdapter([7]))
    m.run()
    assert m.machine_output.last_output() == 999

    m = IntCodeMachine(ints.copy(), machine_input=ListIOAdapter([8]))
    m.run()
    assert m.machine_output.last_output() == 1000

    m = IntCodeMachine(ints.copy(), machine_input=ListIOAdapter([9]))
    m.run()
    assert m.machine_output.last_output() == 1001


if __name__ == "__main__":
    test()
    main()
