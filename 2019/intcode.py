from collections import defaultdict


class Instruction:
    def __init__(self, modes):
        assert len(modes) == self.parameters()
        self.modes = modes

    @classmethod
    def decode(cls, intcode):
        target_class = next(
            c for c in cls.__subclasses__() if c.opcode() == intcode % 100
        )
        params = target_class.parameters()
        full_opcode = f"{intcode:0{params+2}d}"
        modes = [int(n) for n in full_opcode[:-2][::-1]]
        return target_class(modes)

    @classmethod
    def opcode(cls):
        raise NotImplementedError

    @classmethod
    def parameters(cls):
        raise NotImplementedError

    def run_on(self, machine):
        raise NotImplementedError


class Add(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        second = machine.peek(2)
        third = machine.peek(3)
        val1 = machine.get(first, self.modes[0])
        val2 = machine.get(second, self.modes[1])
        machine.set(third, val1 + val2, self.modes[2])

    @classmethod
    def opcode(cls):
        return 1

    @classmethod
    def parameters(cls):
        return 3


class Mul(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        second = machine.peek(2)
        third = machine.peek(3)
        val1 = machine.get(first, self.modes[0])
        val2 = machine.get(second, self.modes[1])
        machine.set(third, val1 * val2, self.modes[2])

    @classmethod
    def opcode(cls):
        return 2

    @classmethod
    def parameters(cls):
        return 3


class Input(Instruction):
    def run_on(self, machine):
        val = machine.input()
        store = machine.peek(1)
        machine.set(store, val, self.modes[0])

    @classmethod
    def opcode(cls):
        return 3

    @classmethod
    def parameters(cls):
        return 1


class Output(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        val = machine.get(first, self.modes[0])
        machine.output(val)

    @classmethod
    def opcode(cls):
        return 4

    @classmethod
    def parameters(cls):
        return 1


class JumpIfTrue(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        val1 = machine.get(first, self.modes[0])
        if val1 != 0:
            second = machine.peek(2)
            val2 = machine.get(second, self.modes[1])
            machine.goto(val2)

    @classmethod
    def opcode(cls):
        return 5

    @classmethod
    def parameters(cls):
        return 2


class JumpIfFalse(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        val1 = machine.get(first, self.modes[0])
        if val1 == 0:
            second = machine.peek(2)
            val2 = machine.get(second, self.modes[1])
            machine.goto(val2)

    @classmethod
    def opcode(cls):
        return 6

    @classmethod
    def parameters(cls):
        return 2


class LessThan(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        second = machine.peek(2)
        third = machine.peek(3)
        val1 = machine.get(first, self.modes[0])
        val2 = machine.get(second, self.modes[1])
        machine.set(third, int(val1 < val2), self.modes[2])

    @classmethod
    def opcode(cls):
        return 7

    @classmethod
    def parameters(cls):
        return 3


class Equals(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        second = machine.peek(2)
        third = machine.peek(3)
        val1 = machine.get(first, self.modes[0])
        val2 = machine.get(second, self.modes[1])
        machine.set(third, int(val1 == val2), self.modes[2])

    @classmethod
    def opcode(cls):
        return 8

    @classmethod
    def parameters(cls):
        return 3


class RelativeBaseOffset(Instruction):
    def run_on(self, machine):
        first = machine.peek(1)
        val1 = machine.get(first, self.modes[0])
        machine.relative_base_offset(val1)

    @classmethod
    def opcode(cls):
        return 9

    @classmethod
    def parameters(cls):
        return 1


class Halt(Instruction):
    def run_on(self, machine):
        machine.halt()

    @classmethod
    def opcode(cls):
        return 99

    @classmethod
    def parameters(cls):
        return 0


class MachineIO:
    def input(self) -> int:
        raise NotImplementedError

    def output(self, value) -> None:
        raise NotImplementedError

    def last_output(self) -> int | None:
        raise NotImplementedError


class ListIOAdapter(MachineIO):
    def __init__(self, adapted_list):
        self.list = adapted_list

    def input(self):
        return self.list.pop(0)

    def output(self, value):
        self.list.append(value)

    def last_output(self):
        return self.list[-1]


class PipeIOAdapter(MachineIO):
    def __init__(self, pipe):
        self.pipe = pipe
        self.last = None

    def input(self):
        return self.pipe.recv()

    def output(self, value):
        self.last = value
        self.pipe.send(value)

    def last_output(self):
        return self.last


class IntCodeMachine:
    def __init__(self, ints: list[int], machine_input=None, machine_output=None):
        if machine_input is None:
            machine_input = ListIOAdapter([])
        if machine_output is None:
            machine_output = ListIOAdapter([])

        self.ints = defaultdict(lambda: 0)
        for i in range(len(ints)):
            self.ints[i] = ints[i]

        self.machine_input = machine_input
        self.machine_output = machine_output
        self.ip = 0
        self.relative_base = 0
        self.halted = False
        self.dirty_ip = False

    def halt(self):
        self.halted = True

    def unhalt(self):
        self.halted = False

    def peek(self, offset):
        return self.ints[self.ip + offset]

    def get(self, address, mode):
        if mode == 0:
            return self.ints[address]
        elif mode == 1:
            return address
        elif mode == 2:
            return self.ints[self.relative_base + address]
        else:
            raise Exception("Invalid mode: {}".format(mode))

    def __set(self, address, value):
        if address < 0:
            raise IndexError

        self.ints[address] = value

    def set(self, address, value, mode):
        if mode == 0:
            self.__set(address, value)
            self.ints[address] = value
        elif mode == 2:
            self.__set(self.relative_base + address, value)
        else:
            raise Exception("Invalid mode: {}".format(mode))

    def input(self):
        return self.machine_input.input()

    def output(self, value):
        self.machine_output.output(value)

    def goto(self, address):
        self.ip = address
        self.dirty_ip = True

    def relative_base_offset(self, offset):
        self.relative_base += offset

    def get_intcodes(self):
        m = max(self.ints.keys())
        return [self.ints[i] for i in range(m + 1)]

    def run(self):
        while 0 <= self.ip < len(self.ints) and not self.halted:
            instruction = Instruction.decode(self.ints[self.ip])
            instruction.run_on(self)
            if not self.dirty_ip:
                self.ip += instruction.parameters() + 1
            else:
                self.dirty_ip = False


if __name__ == "__main__":
    pass
