from intcode import IntCodeMachine


def main():
    with open(0) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    i = ints.copy()
    i[1] = 12
    i[2] = 2
    m = IntCodeMachine(i)
    m.run()
    print("a)", m.ints[0])

    for noun in range(100):
        for verb in range(100):
            i = ints.copy()
            i[1] = noun
            i[2] = verb
            m = IntCodeMachine(i)
            m.run()
            if m.ints[0] == 19690720:
                print("b)", 100 * noun + verb)
                break


def test_d2():
    i = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
    m = IntCodeMachine(i)
    m.run()
    assert m.get_intcodes() == [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]

    i = [1, 1, 1, 4, 99, 5, 6, 0, 99]
    m = IntCodeMachine(i)
    m.run()
    assert m.get_intcodes() == [30, 1, 1, 4, 2, 5, 6, 0, 99]


if __name__ == "__main__":
    test_d2()
    main()
