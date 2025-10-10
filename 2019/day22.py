import sys
from collections import deque


def exponentiation(base, exp, modulo):
    if exp == 0:
        return 1
    elif exp == 1:
        return base % modulo

    if exp % 2 == 0:
        return exponentiation(base**2 % modulo, exp // 2, modulo) % modulo
    else:
        return base * exponentiation(base**2 % modulo, (exp - 1) // 2, modulo) % modulo


def calc_params(instructions, deck_size):
    mult, add = 1, 0
    for instruction in reversed(instructions):
        words = instruction.split()
        if words[0] == "cut":
            n = int(words[-1])
            add += n
        elif words[1] == "with":
            n = int(words[-1])
            m = pow(n, -1, deck_size)
            mult *= m
            add *= m
        else:
            mult *= -1
            add = -add + deck_size - 1

    return mult % deck_size, add % deck_size


def deal_into_new_stack(cards):
    cards.reverse()
    return cards


def cut(cards, n):
    if n >= 0:
        cards.rotate(-n)
    else:
        cards.rotate(len(cards) + abs(n))

    return cards


def deal_with_increment(cards, n, size):
    new_list = [_ for _ in range(size)]
    for i, v in enumerate(cards):
        new_list[(i * n) % size] = v

    return deque(new_list)


def shuffled(instructions, deck_size):
    cards = deque(range(deck_size))
    for instruction in instructions:
        words = instruction.split()
        if words[0] == "cut":
            n = int(words[-1])
            cut(cards, n)
        elif words[1] == "into":
            cards = deal_into_new_stack(cards)
        else:
            assert words[1] == "with"
            n = int(words[-1])
            cards = deal_with_increment(cards, n, deck_size)

    return cards


def before_cut(n, current, deck_size):
    return (current + n) % deck_size


def before_deal_into(current, deck_size):
    return -current + (deck_size - 1)


def before_deal_with(n, current, deck_size):
    n_inv = pow(n, -1, deck_size)
    return (current * n_inv) % deck_size


def shuffled_at_with3d_printed(instructions, deck_size, position):
    shuffles = 101741582076661
    fmult, fadd = calc_params(instructions, deck_size)
    # f(position) = fmult * position + fadd mod deck_size
    # f^k(position) = fmult^k * position + ((fmult^k - 1) / (fmult - 1)) * fadd mod deck_size

    # Exponentiation by squaring using mod in every step
    mult = exponentiation(fmult, shuffles, deck_size)
    # ((fmult^k - 1) / (fmult - 1)) mod deck_size = ((fmult^k - 1) * pow(fmult - 1, -1, deck_size)) mod deck_size
    add = fadd * ((mult - 1) * pow(fmult - 1, -1, deck_size)) % deck_size

    return (mult * position + add) % deck_size


def shuffled_at(instructions, deck_size, position):
    # for instruction in reversed(instructions):
    #     position = before_instruction(deck_size, instruction, position)
    #
    # return position
    mult, add = calc_params(instructions, deck_size)
    return (mult * position + add) % deck_size


def before_instruction(deck_size, instruction, position):
    words = instruction.split()
    if words[0] == "cut":
        n = int(words[-1])
        position = before_cut(n, position, deck_size)
    elif words[1] == "into":
        position = before_deal_into(position, deck_size)
    else:
        assert words[1] == "with"
        n = int(words[-1])
        position = before_deal_with(n, position, deck_size)
    return position


def card_after_shuffle(instructions, deck_size, card):
    for instruction in instructions:
        words = instruction.split()
        if words[0] == "cut":
            n = int(words[-1])
            card = (card - n) % deck_size
        elif words[1] == "into":
            card = deck_size - card - 1
        else:
            assert words[1] == "with"
            n = int(words[-1])
            card = (card * n) % deck_size

    return card


def main():
    with open(sys.argv[1]) as input_file:
        instructions = input_file.read().splitlines()

    card = card_after_shuffle(instructions, 10007, 2019)
    print("a)", card)

    printed_deck_size = 119315717514047
    card = shuffled_at_with3d_printed(instructions, printed_deck_size, 2020)
    print("b)", card)


def test():
    cards = deque(range(10))
    assert list(deal_into_new_stack(cards)) == [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    cards = deque(range(10))
    assert list(cut(cards, 3)) == [3, 4, 5, 6, 7, 8, 9, 0, 1, 2]

    cards = deque(range(10))
    assert list(cut(cards, -4)) == [6, 7, 8, 9, 0, 1, 2, 3, 4, 5]

    cards = deque(range(10))
    assert list(deal_with_increment(cards, 3, 10)) == [0, 7, 4, 1, 8, 5, 2, 9, 6, 3]

    def test1():
        instructions = """deal with increment 7
deal into new stack
deal into new stack""".splitlines()

        assert list(shuffled(instructions, 10)) == [0, 3, 6, 9, 2, 5, 8, 1, 4, 7]

        assert shuffled_at(instructions, 10, 1) == 3
        assert shuffled_at(instructions, 10, 9) == 7

    def test2():
        instructions = """deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1""".splitlines()

        assert list(shuffled(instructions, 10)) == [9, 2, 5, 8, 1, 4, 7, 0, 3, 6]

        assert shuffled_at(instructions, 10, 2) == 5
        assert shuffled_at(instructions, 10, 9) == 6

    test1()
    test2()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
    else:
        test()
