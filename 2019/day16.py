import sys
from itertools import chain, repeat, cycle


def make_filter(position):
    base_pattern = (0, 1, 0, -1)
    filter_iter = cycle(chain(*(repeat(n, position + 1) for n in base_pattern)))
    next(filter_iter)  # skip the first 0
    return filter_iter


def pass_filter(nums):
    def pass_filter_in_pos(pos):
        filter_iter = make_filter(pos)
        s = sum(n * m for (n, m) in zip(nums, filter_iter))
        return abs(s) % 10

    return tuple(
        pass_filter_in_pos(i)
        for i in range(len(nums))
    )


def pass_100_filters(nums):
    for _ in range(100):
        nums = pass_filter(nums)

    return nums


def pass_acc_filter(nums):
    # The following element in the new is the sum of all the following elements in the original

    new_nums = [0] * len(nums)
    new_nums[-1] = nums[-1]
    for i in range(len(nums) - 2, -1, -1):
        new_nums[i] = (nums[i] + new_nums[i + 1]) % 10

    return tuple(new_nums)


def main():
    nums = tuple()
    with open(sys.argv[1]) as f:
        nums = tuple([int(c) for c in f.read().strip()])

    nums_res = pass_100_filters(nums)
    print("a)", join_ints(nums_res, 8))

    offset = join_ints(nums, 7)
    # As the offset is greater than half of the length of the input, the filter is always going to be 0 for the
    # elements before the index and 1 for the elements after. Therefore, the elements are going to be the sum of the
    # following elements plus the current element.
    # print((len(nums) * 10000 - offset) > len(nums) / 2)

    l = len(nums)
    nums = nums * (10000 - offset // l)
    for _ in range(100):
        nums = pass_acc_filter(nums)

    print("b)", join_ints(nums[offset % l:], 8))


def join_ints(nums_res, digits):
    return int("".join(str(n) for n in nums_res[:digits]))


if __name__ == '__main__':
    main()
