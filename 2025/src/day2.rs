use fancy_regex::Regex;
use itertools::Itertools;

fn parse_input(input: &str) -> Vec<(u64, u64)> {
    return input
        .split(",")
        .map(|range_line| {
            range_line
                .split("-")
                .map(|n| n.parse::<u64>().unwrap())
                .take(2)
                .collect_tuple()
                .unwrap()
        })
        .collect();
}

fn invalid_ids_in_range(id_range: (u64, u64), match_multiple: bool) -> Vec<u64> {
    // regex is slow, maybe look into a substring based solution
    let (start, end) = id_range;
    let invalid_regex = if match_multiple {
        Regex::new(r"^(\d+)\1+$").unwrap()
    } else {
        Regex::new(r"^(\d+)\1$").unwrap()
    };
    let mut invalids: Vec<u64> = Vec::new();
    for id in start..end + 1 {
        if invalid_regex.is_match(&id.to_string()).unwrap() {
            invalids.push(id);
        }
    }
    return invalids;
}

fn invalid_ids(id_ranges: Vec<(u64, u64)>, match_multiple: bool) -> Vec<u64> {
    let mut invalids: Vec<u64> = Vec::new();
    for range in id_ranges {
        invalids.extend(invalid_ids_in_range(range, match_multiple));
    }
    return invalids;
}

pub fn part1(input: &str) -> String {
    let ranges = parse_input(&input.replace("\n", ""));
    let invalids = invalid_ids(ranges, false);
    return invalids.iter().sum::<u64>().to_string();
}

pub fn part2(input: &str) -> String {
    let ranges = parse_input(&input.replace("\n", ""));
    let invalids = invalid_ids(ranges, true);
    return invalids.iter().sum::<u64>().to_string();
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_part1() {
        let test_input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
        1698522-1698528,446443-446449,38593856-38593862,565653-565659,
        824824821-824824827,2121212118-2121212124"
            .replace("\n", "")
            .replace(" ", "");
        assert_eq!(part1(&test_input), "1227775554");
    }

    #[test]
    fn test_part2() {
        let test_input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
           1698522-1698528,446443-446449,38593856-38593862,565653-565659,
           824824821-824824827,2121212118-2121212124"
            .replace("\n", "")
            .replace(" ", "");
        assert_eq!(part2(&test_input), "4174379265");
    }
}
