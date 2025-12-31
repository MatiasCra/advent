pub mod day1;
pub mod day10;
pub mod day11;
pub mod day12;
pub mod day2;
pub mod day3;
pub mod day4;
pub mod day5;
pub mod day6;
pub mod day7;
pub mod day8;
pub mod day9;

#[macro_export]
macro_rules! solve {
    ($day:ident) => {
        use advent2025::$day;
        use std::env;
        use std::fs;

        fn main() {
            let args: Vec<String> = env::args().collect();
            let day_num = stringify!($day).replace("day", "");
            let input =
                fs::read_to_string(format!("inputs/day{}.txt", day_num)).unwrap_or_default();
            if args.len() < 2 {
                println!("Part 1: {}", $day::part1(&input));
                println!("Part 2: {}", $day::part2(&input));
                return;
            }
            let result = match args[1].as_str() {
                "1" => $day::part1(&input),
                "2" => $day::part2(&input),
                _ => panic!("Invalid part"),
            };
            println!("{}", result);
        }
    };
}
