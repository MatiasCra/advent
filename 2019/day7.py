from itertools import permutations
from multiprocessing import Process, Pipe, Value
from intcode import IntCodeMachine, PipeIOAdapter


def max_thrusters_signal(ints):
    max_thrusters = 0
    for settings in permutations(range(5)):
        machines = [IntCodeMachine(ints) for _ in range(5)]
        last_signal = 0
        for machine, phase_setting in zip(machines, settings):
            machine.machine_input.output(phase_setting)
            machine.machine_input.output(last_signal)
            machine.run()
            last_signal = machine.machine_output.list[-1]

        if last_signal > max_thrusters:
            max_thrusters = last_signal

    return max_thrusters


def run_machine(ints, pipe_input, pipe_output, machine_id, max_thrusters):
    m = IntCodeMachine(
        ints,
        machine_input=PipeIOAdapter(pipe_input),
        machine_output=PipeIOAdapter(pipe_output),
    )
    m.run()
    if machine_id == 4 and m.machine_output.last_output() > max_thrusters.value:
        max_thrusters.value = m.machine_output.last_output()


def max_thrusters_with_loop(ints):
    max_thrusters = Value("i", 0)
    for settings in permutations(range(5, 10)):
        pipes = [Pipe() for _ in range(5)]
        for i, phase_seting in enumerate(settings):
            pipes[i - 1][1].send(phase_seting)
        pipes[-1][1].send(0)

        processes = [
            Process(
                target=run_machine,
                args=(
                    ints,
                    pipes[i - 1][0],
                    pipes[i][1],
                    i,
                    max_thrusters,
                ),
            )
            for i in range(5)
        ]

        for p in processes:
            p.start()

        for p in processes:
            p.join()

    return max_thrusters.value


def main():
    with open(0) as input_file:
        ints = list(map(int, input_file.read().split(",")))

    print("a)", max_thrusters_signal(ints))
    print("b)", max_thrusters_with_loop(ints))


def test():
    ints = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0]
    assert max_thrusters_signal(ints) == 43210

    ints = [
        3,
        26,
        1001,
        26,
        -4,
        26,
        3,
        27,
        1002,
        27,
        2,
        27,
        1,
        27,
        26,
        27,
        4,
        27,
        1001,
        28,
        -1,
        28,
        1005,
        28,
        6,
        99,
        0,
        0,
        5,
    ]
    assert max_thrusters_with_loop(ints) == 139629729


if __name__ == "__main__":
    test()
    main()
