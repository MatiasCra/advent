from functools import cache
import sys


@cache
def required_fuel(mass):
    return (mass // 3) - 2


@cache
def rec_required_fuel(mass):
    if mass == 0:
        return 0

    fuel_for_mass = max(0, required_fuel(mass))
    return fuel_for_mass + rec_required_fuel(fuel_for_mass)


def main():
    with open(sys.argv[1]) as input_file:
        modules_mass = [int(v) for v in input_file.read().splitlines()]

    print("a)", sum(map(required_fuel, modules_mass)))
    print("b)", sum(map(rec_required_fuel, modules_mass)))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
