from intcode import IntCodeMachine, ListIOAdapter


def test():
    i = [104, 1125899906842624, 99]
    m = IntCodeMachine(i)
    m.run()
    assert m.machine_output.last_output() == 1125899906842624

    i = [1102, 34915192, 34915192, 7, 4, 7, 99, 0]
    m = IntCodeMachine(i)
    m.run()
    assert len(str(m.machine_output.last_output())) == 16

    ints = [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99]
    m = IntCodeMachine(ints)
    m.run()
    assert m.machine_output.list == ints


def main():
    with open(0) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    m = IntCodeMachine(ints, machine_input=ListIOAdapter([1]))
    m.run()
    print("a)", m.machine_output.last_output())

    m = IntCodeMachine(ints, machine_input=ListIOAdapter([2]))
    m.run()
    print("b)", m.machine_output.last_output())


if __name__ == "__main__":
    test()
    main()
