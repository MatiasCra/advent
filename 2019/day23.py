from intcode import IntCodeMachine, MachineIO
import sys
from queue import Empty, Queue


NAT_ID = 255


class NetwortkCommunicationIO(MachineIO):
    def __init__(self, machine_id, queues, machine, multiplexor):
        self.outputs_till_target = 0
        self.packet = [-1, -1, -1]

        self.id = machine_id
        self.queues = queues

        self.machine = machine
        self.multiplexor = multiplexor

        self.packets_received = 0

    def current_target(self):
        return self.packet[0]

    def send_packet(self):
        queue = self.queues[self.current_target()]
        queue.put(self.packet[1])
        queue.put(self.packet[2])

    def input(self):
        try:
            value = self.queues[self.id].get(False)
        except Empty:
            value = -1
            self.machine.halt()
        else:
            self.packets_received += 1

        return value

    def output(self, value):
        if self.outputs_till_target == 2:
            self.packet[1] = value
        elif self.outputs_till_target == 1:
            self.packet[2] = value
            if self.current_target() == NAT_ID:
                self.multiplexor.send_to_nat((self.packet[1], self.packet[2]))
            else:
                self.send_packet()
        elif self.outputs_till_target == 0:
            self.packet[0] = value
        self.outputs_till_target = (self.outputs_till_target - 1) % 3


class NetworkMachinesMultiplexor:
    def __init__(self, ints, number):
        self.last_nat_packet_sent = (None, None)
        self.nat_packet = (None, None)

        self.queues = [Queue() for _ in range(number)]
        for i, queue in enumerate(self.queues):
            queue.put(i)

        self.machines = []
        for i in range(number):
            machine = IntCodeMachine(ints.copy())
            io = NetwortkCommunicationIO(i, self.queues, machine, self)
            machine.machine_input = io
            machine.machine_output = io
            self.machines.append(machine)

    def total_received(self):
        return sum(machine.machine_output.packets_received for machine in self.machines)

    def send_to_nat(self, packet):
        x, y = packet
        if self.nat_packet[1] is None:
            print("a)", y)

        self.nat_packet = (x, y)

    def run_all_machines(self):
        for machine in self.machines:
            machine.unhalt()
            machine.run()

    def run_till_idle(self):
        last_received = self.total_received()
        while not (
            all(q.empty() for q in self.queues)
            and self.total_received() - last_received == 0
        ):
            last_received = self.total_received()
            self.run_all_machines()

    def run(self):
        while True:
            self.run_till_idle()
            x, y = self.nat_packet
            if self.nat_packet == self.last_nat_packet_sent:
                print("b)", y)
                exit()

            self.queues[0].put(x)
            self.queues[0].put(y)
            self.last_nat_packet_sent = (x, y)


def main():
    with open(sys.argv[1]) as input_file:
        ints = [int(v) for v in input_file.read().split(",")]

    number = 50
    mplx = NetworkMachinesMultiplexor(ints, number)
    mplx.run()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
