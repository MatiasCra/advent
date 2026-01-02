#[derive(Debug, PartialEq, Eq)]
enum Op {
    Add,
    Mul,
}

impl From<&str> for Op {
    fn from(s: &str) -> Self {
        match s {
            "+" => Op::Add,
            "*" => Op::Mul,
            _ => panic!("Invalid op"),
        }
    }
}

#[derive(Debug, PartialEq, Eq)]
struct Problem {
    nums: Vec<u64>,
    op: Op,
}

fn parse_input(input: &str) -> Vec<Problem> {
    let mut cols: Vec<Problem> = Vec::new();
    let mut lines = input.lines();
    let last_line = lines.next_back().unwrap();
    last_line.split_whitespace().for_each(|op_str| {
        cols.push(Problem {
            nums: Vec::new(),
            op: (Op::from(op_str)),
        })
    });

    for num_line in lines {
        for (i, num_str) in num_line.split_whitespace().enumerate() {
            cols[i].nums.push(num_str.parse::<u64>().unwrap());
        }
    }
    return cols;
}

fn solve_problem(col: &Problem) -> u64 {
    match col.op {
        Op::Add => col.nums.iter().sum(),
        Op::Mul => col.nums.iter().product(),
    }
}

fn solve_all_problems(cols: &Vec<Problem>) -> u64 {
    cols.iter().map(|col| solve_problem(col)).sum()
}

fn parse_input_part2(input: &str) -> Vec<Problem> {
    let mut problems: Vec<Problem> = Vec::new();
    let mut lines = input.lines();
    let last_line = lines.next_back().unwrap();
    last_line.split_whitespace().rev().for_each(|op_str| {
        problems.push(Problem {
            nums: Vec::new(),
            op: (Op::from(op_str)),
        })
    });
    let mut rearranged: Vec<String> = Vec::new();
    for line in lines {
        for (i, c) in line.chars().enumerate() {
            if i < rearranged.len() {
                rearranged[i].push(c);
            } else {
                rearranged.push(c.to_string());
            }
        }
    }
    let nums_per_problem: Vec<Vec<u64>> = rearranged
        .split(|s| s.trim().is_empty())
        .map(|v| {
            v.iter()
                .map(|s| s.trim().parse::<u64>().unwrap())
                .rev()
                .collect()
        })
        .rev()
        .collect();
    for i in 0..problems.len() {
        problems[i].nums = nums_per_problem[i].clone();
    }
    return problems;
}

pub fn part1(input: &str) -> String {
    let cols = parse_input(input);
    return solve_all_problems(&cols).to_string();
}

pub fn part2(input: &str) -> String {
    let problems = parse_input_part2(input);
    return solve_all_problems(&problems).to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let test_input = "123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  ";
        assert_eq!(part1(&test_input), "4277556");
    }

    #[test]
    fn test_part2() {
        let test_input = "123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  ";
        assert_eq!(part2(&test_input), "3263827");
    }
}
