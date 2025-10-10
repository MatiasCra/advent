import sys


def possible_passwords(start, end, exactly_two=False):
    min_txt = str(start)
    max_txt = str(end)

    def passwords_count(
        digits_remaining=6,
        last_digit=-sys.maxsize,
        need_double=True,
        is_min=True,
        is_max=True,
        same_count=1,
    ):
        if digits_remaining == 0:
            if need_double and same_count != 2:
                return 0
            else:
                return 1
        else:
            start_range = (
                last_digit
                if not is_min
                else max(last_digit, int(min_txt[-digits_remaining]))
            )
            end_range = (
                10 if not is_max else min(10, int(max_txt[-digits_remaining]) + 1)
            )
            return sum(
                (
                    passwords_count(
                        digits_remaining - 1,
                        digit,
                        (
                            need_double and digit != last_digit
                            if not exactly_two
                            else need_double
                            and not (same_count == 2 and digit != last_digit)
                        ),
                        is_min and digit == int(min_txt[-digits_remaining]),
                        is_max and digit == int(max_txt[-digits_remaining]),
                        same_count + 1 if digit == last_digit else 1,
                    )
                    for digit in range(start_range, end_range)
                )
            )

    return passwords_count()


def main():
    with open(sys.argv[1]) as input_file:
        txt = input_file.read().splitlines()[0]

    s_txt, e_txt = txt.split("-")
    start = int(s_txt)
    end = int(e_txt)
    print("a)", possible_passwords(start, end))
    print("b)", possible_passwords(start, end, True))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
