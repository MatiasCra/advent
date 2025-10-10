import sys
from collections import defaultdict
from math import ceil


def parse_lines(lines):
    reactions = {}
    for line in lines:
        materials_txt, result = line.split(" => ")
        materials = []
        for material_txt in materials_txt.split(", "):
            quantity_txt, material_name = material_txt.split()
            materials.append((int(quantity_txt), material_name))

        quantity_txt, result_name = result.split()
        reactions[result_name] = (int(quantity_txt), materials)

    return reactions


def find_minimum_ore(reactions, quantity=1):
    return find_minimum_requirements(reactions, quantity=quantity)[0]["ORE"]


def find_minimum_requirements(reactions, stock=None, quantity=1):
    if stock is None:
        stock = defaultdict(int)

    def needed_for(quantity=1, element="FUEL"):
        if element == "ORE":
            return {"ORE": quantity}

        quantity_obtained, materials = reactions[element]
        times_needed = ceil(quantity / quantity_obtained)
        needed = {element: quantity_obtained * times_needed}

        for material_quantity, material in materials:
            material_quantity *= times_needed
            stock_to_use = min(stock[material], material_quantity)
            material_quantity -= stock_to_use
            stock[material] -= stock_to_use
            if material_quantity == 0:
                continue

            needed_for_material = needed_for(material_quantity, material)
            for m, q in needed_for_material.items():
                needed[m] = needed.get(m, 0) + q
            stock[material] += needed_for_material[material] - material_quantity

        return needed

    res = needed_for(quantity, "FUEL")
    return res, stock


def fuel_per_ore(reactions, ore=1000000000000):
    # make bounds for binary search
    fuel = find_minimum_ore(reactions)
    max_fuel = (ore // fuel) * 2
    min_fuel = ore // fuel
    while max_fuel - min_fuel > 1:
        mid_fuel = (max_fuel + min_fuel) // 2
        mid_ore = find_minimum_ore(reactions, quantity=mid_fuel)
        if mid_ore > ore:
            max_fuel = mid_fuel
        else:
            min_fuel = mid_fuel

    return min_fuel


def main(input_name):
    with open(input_name) as f:
        lines = f.read().splitlines()

    reactions = parse_lines(lines)
    print("a)", find_minimum_ore(reactions))
    print("b)", fuel_per_ore(reactions))


def test():
    txt = """10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL""".splitlines()
    reactions = parse_lines(txt)
    assert reactions["A"] == (10, [(10, "ORE")])
    assert reactions["FUEL"] == (1, [(7, "A"), (1, "E")])
    assert find_minimum_ore(reactions) == 31

    txt = """1 ORE => 3 A
1 ORE => 3 B
2 A, 2 B => 1 C
1 A, 1 B => 1 D
1 C, 1 D => 1 FUEL""".splitlines()
    reactions = parse_lines(txt)
    assert find_minimum_ore(reactions) == 2

    txt = """9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL""".splitlines()
    reactions = parse_lines(txt)
    assert find_minimum_ore(reactions) == 165

    txt = """171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX
""".splitlines()
    reactions = parse_lines(txt)
    assert find_minimum_ore(reactions) == 2210736
    assert fuel_per_ore(reactions) == 460664


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        test()
