#[derive(PartialEq, Eq, Clone, Debug)]
enum Direction {
    Left,
    Right,
}

impl std::str::FromStr for Direction {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s[..1].to_uppercase().as_str() {
            "L" => Ok(Direction::Left),
            "R" => Ok(Direction::Right),
            _ => Err(()),
        }
    }
}

const DIAL_SIZE: i32 = 100;

fn turn_dial(current: i32, direction: Direction, amount: i32) -> i32 {
    match direction {
        Direction::Left => (current - amount).rem_euclid(DIAL_SIZE),
        Direction::Right => (current + amount).rem_euclid(DIAL_SIZE),
    }
}

pub fn part1(input: &str) -> String {
    let instructions: Vec<(Direction, i32)> = input
        .lines()
        .filter_map(|line| {
            let (dir_str, amount_str) = line.split_at(1);
            let direction: Direction = dir_str.parse::<Direction>().ok()?;
            let amount = amount_str.parse::<i32>().ok()?;
            Some((direction, amount))
        })
        .collect();
    let mut current = 50;
    let mut password: i32 = 0;
    for (direction, amount) in instructions {
        current = turn_dial(current, direction, amount);
        if current == 0 {
            password += 1
        }
    }
    return password.to_string();
}

pub fn part2(input: &str) -> String {
    let instructions: Vec<(Direction, i32)> = input
        .lines()
        .filter_map(|line| {
            let (dir_str, amount_str) = line.split_at(1);
            let direction: Direction = dir_str.parse::<Direction>().ok()?;
            let amount = amount_str.parse::<i32>().ok()?;
            Some((direction, amount))
        })
        .collect();
    let mut current = 50;
    let mut password: i32 = 0;
    for (direction, amount) in instructions {
        if direction == Direction::Right && amount >= (DIAL_SIZE - current) {
            password += 1 + (amount - (DIAL_SIZE - current)) / DIAL_SIZE
        } else if direction == Direction::Left && amount >= current {
            if current != 0 {
                password += 1;
            }
            password += (amount - current) / DIAL_SIZE;
        }
        current = turn_dial(current, direction, amount);
    }
    return password.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_part2() {
        assert_eq!(part2("R151\nL101"), "4");
    }
}
