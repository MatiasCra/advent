use itertools::Itertools;

fn parse_input(input: &str) -> (Vec<(u64, u64)>, Vec<u64>) {
    let (ranges_str, available_str) = input.split("\n\n").collect_tuple().unwrap();
    let ranges: Vec<(u64, u64)> = ranges_str
        .split("\n")
        .map(|line| {
            line.split("-")
                .map(|n| n.parse::<u64>().unwrap())
                .collect_tuple()
                .unwrap()
        })
        .collect();

    let available: Vec<u64> = available_str
        .split("\n")
        .flat_map(|n| n.parse::<u64>())
        .collect();
    return (ranges, available);
}

fn is_fresh(product: u64, sorted_fresh_ranges: &Vec<(u64, u64)>) -> bool {
    let mut i = 0;
    while i < sorted_fresh_ranges.len() && sorted_fresh_ranges[i].0 <= product {
        if product <= sorted_fresh_ranges[i].1 {
            return true;
        }
        i += 1;
    }
    return false;
}

fn count_fresh(fresh_ranges: &mut Vec<(u64, u64)>, available: &Vec<u64>) -> usize {
    fresh_ranges.sort();
    return available
        .iter()
        .filter(|&&prod| is_fresh(prod, fresh_ranges))
        .count();
}

fn compressed_ranges(sorted_fresh_ranges: &Vec<(u64, u64)>) -> Vec<(u64, u64)> {
    let mut new_ranges = vec![sorted_fresh_ranges[0]];
    for &(start, end) in sorted_fresh_ranges.iter().skip(1) {
        let &(_, last_end) = new_ranges.last().unwrap();
        // If it ends before the last one it's irrelevant
        if end > last_end {
            let new_start = u64::max(start, last_end + 1);
            new_ranges.push((new_start, end));
        }
    }
    return new_ranges;
}

fn total_fresh_ids(fresh_ranges: &mut Vec<(u64, u64)>) -> u64 {
    fresh_ranges.sort();
    let compressed = compressed_ranges(&fresh_ranges);
    return compressed.iter().map(|&(s, e)| e - s + 1).sum::<u64>();
}

pub fn part1(input: &str) -> String {
    let (mut fresh_ranges, available) = parse_input(input);
    return count_fresh(&mut fresh_ranges, &available).to_string();
}

pub fn part2(input: &str) -> String {
    let (mut fresh_ranges, _) = parse_input(input);
    return total_fresh_ids(&mut fresh_ranges).to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let test_input = "3-5
        10-14
        16-20
        12-18

        1
        5
        8
        11
        17
        32"
        .replace(" ", "");
        assert_eq!(part1(&test_input), "3");
    }

    #[test]
    fn test_part2() {
        let test_input = "3-5
        10-14
        16-20
        12-18

        1
        5
        8
        11
        17
        32"
        .replace(" ", "");
        assert_eq!(part2(&test_input), "14");
    }
}
