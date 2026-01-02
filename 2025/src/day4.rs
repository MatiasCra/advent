use std::collections::HashMap;

use itertools::{iproduct, Itertools};

#[derive(Debug, PartialEq, Eq)]
enum MapItem {
    Paper,
    Space,
}

fn adj(x: usize, y: usize, map: &Vec<Vec<MapItem>>) -> Vec<(usize, usize)> {
    let max_x = map[0].len();
    let max_y = map.len();

    let xs = (x.saturating_sub(1))..=usize::min(x + 1, max_x - 1);
    let ys = (y.saturating_sub(1))..=usize::min(y + 1, max_y - 1);

    iproduct!(xs, ys)
        .filter(|&(nx, ny)| !(nx == x && ny == y))
        .collect()
}

fn adj_paper_rolls(map: &Vec<Vec<MapItem>>) -> HashMap<(usize, usize), Vec<(usize, usize)>> {
    let mut adjs: HashMap<(usize, usize), Vec<(usize, usize)>> = HashMap::new();
    for (y, row) in map.iter().enumerate() {
        for (x, item) in row.iter().enumerate() {
            if *item == MapItem::Paper {
                let adjacent_rolls: Vec<(usize, usize)> = adj(x, y, map)
                    .iter()
                    .filter(|(ax, ay)| map[*ay][*ax] == MapItem::Paper)
                    .map(|(ax, ay)| (*ax, *ay))
                    .collect();

                adjs.insert((x, y), adjacent_rolls);
            }
        }
    }
    return adjs;
}

fn accessible_from(adjs: &HashMap<(usize, usize), Vec<(usize, usize)>>) -> Vec<(usize, usize)> {
    return adjs
        .iter()
        .filter(|(_, adj_rolls)| adj_rolls.len() < 4)
        .map(|(pos, _)| *pos)
        .collect();
}

fn valid_rolls(map: &Vec<Vec<MapItem>>) -> Vec<(usize, usize)> {
    let adjs = adj_paper_rolls(map);
    return accessible_from(&adjs);
}

fn parse_input(input: &str) -> Vec<Vec<MapItem>> {
    return input
        .lines()
        .map(|line| {
            line.chars()
                .map(|c| match c {
                    '.' => MapItem::Space,
                    '@' => MapItem::Paper,
                    _ => panic!("Invalid character"),
                })
                .collect()
        })
        .collect();
}

fn removable_rolls_count(map: &Vec<Vec<MapItem>>) -> usize {
    let mut adjs = adj_paper_rolls(map);
    let mut count = 0;
    let mut accessible = accessible_from(&adjs);
    while accessible.len() > 0 {
        for (x, y) in accessible.iter() {
            for v in adjs.values_mut() {
                if let Some((i, _)) = v.iter().find_position(|(ax, ay)| (*ax, *ay) == (*x, *y)) {
                    v.remove(i);
                }
            }
            adjs.remove_entry(&(*x, *y));
        }
        count += accessible.len();
        accessible = accessible_from(&adjs);
    }

    return count;
}

pub fn part1(input: &str) -> String {
    let map = parse_input(input);
    let valids = valid_rolls(&map);
    return valids.len().to_string();
}

pub fn part2(input: &str) -> String {
    let map = parse_input(input);
    let count = removable_rolls_count(&map);
    return count.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_part1() {
        let input = "..@@.@@@@.
        @@@.@.@.@@
        @@@@@.@.@@
        @.@@@@..@.
        @@.@@@@.@@
        .@@@@@@@.@
        .@.@.@.@@@
        @.@@@.@@@@
        .@@@@@@@@.
        @.@.@@@.@."
            .replace(" ", "");
        assert_eq!(part1(&input), "13");
    }

    #[test]
    fn test_part2() {
        let input = "..@@.@@@@.
        @@@.@.@.@@
        @@@@@.@.@@
        @.@@@@..@.
        @@.@@@@.@@
        .@@@@@@@.@
        .@.@.@.@@@
        @.@@@.@@@@
        .@@@@@@@@.
        @.@.@@@.@."
            .replace(" ", "");
        assert_eq!(part2(&input), "43");
    }
}
