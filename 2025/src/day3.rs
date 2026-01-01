use itertools::Itertools;

fn parse_input(input: &str) -> Vec<Vec<u32>> {
    return input
        .lines()
        .map(|line| line.chars().map(|c| c.to_digit(10).unwrap()).collect())
        .collect();
}

fn max_position(bank: &Vec<u32>) -> (usize, &u32) {
    return bank
        .iter()
        .enumerate()
        .reduce(
            |(maxpos, max), (pos, val)| {
                if val > max {
                    (pos, val)
                } else {
                    (maxpos, max)
                }
            },
        )
        .unwrap();
}

fn bank_max_joltage(bank: &Vec<u32>, batteries: u32) -> u64 {
    let mut curr = batteries as usize;
    let mut start_pos = 0;
    let mut chosen: Vec<u32> = Vec::new();
    while curr > 0 {
        let options = bank[start_pos..bank.len() - curr + 1].to_vec();
        let (max_pos, battery) = max_position(&options);
        start_pos += max_pos + 1;
        curr -= 1;
        chosen.push(*battery);
    }

    return chosen
        .iter()
        .map(|c| c.to_string())
        .join("")
        .parse::<u64>()
        .unwrap();
}

fn total_joltage(banks: Vec<Vec<u32>>, batteries: u32) -> u64 {
    return banks
        .iter()
        .map(|bank| bank_max_joltage(bank, batteries) as u64)
        .sum();
}

pub fn part1(input: &str) -> String {
    let banks = parse_input(input);
    return total_joltage(banks, 2).to_string();
}

pub fn part2(input: &str) -> String {
    let banks = parse_input(input);
    return total_joltage(banks, 12).to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let text_input = "987654321111111
        811111111111119
        234234234234278
        818181911112111"
            .replace(" ", "");
        assert_eq!(part1(&text_input), "357");
    }

    #[test]
    fn test_part2() {
        let text_input = "987654321111111
        811111111111119
        234234234234278
        818181911112111"
            .replace(" ", "");
        assert_eq!(part2(&text_input), "3121910778619");
    }
}
