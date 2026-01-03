use itertools::Itertools;
use std::{
    collections::{HashMap, HashSet},
    ops::AddAssign,
};

type Position = (usize, usize);

fn find_adjs(pos: Position, cols: &Vec<String>) -> HashSet<Position> {
    let mut adj: HashSet<Position> = HashSet::new();
    let (x, y) = pos;
    if x > 0 {
        if let Some((found_y, _)) = cols[x - 1].chars().skip(y).find_position(|&c| c == '^') {
            adj.insert((x - 1, y + found_y));
        } else if y < cols[x - 1].len() - 1 {
            adj.insert((x - 1, cols[x - 1].len() - 1));
        }
    }
    if x < cols.len() - 1 {
        if let Some((found_y, _)) = cols[x + 1].chars().skip(y).find_position(|&c| c == '^') {
            adj.insert((x + 1, y + found_y));
        } else if y < cols[x + 1].len() - 1 {
            adj.insert((x + 1, cols[x + 1].len() - 1));
        }
    }
    return adj;
}

fn dfs(
    start: Position,
    adj_func: impl Fn(Position) -> HashSet<Position>,
    mut callback_func: impl FnMut(Position, Position, bool),
) {
    fn dfs_visit(
        parent: Position,
        adj_func: &impl Fn(Position) -> HashSet<Position>,
        callback_func: &mut impl FnMut(Position, Position, bool),
        visited: &mut HashSet<Position>,
    ) {
        for child in adj_func(parent) {
            let is_visited = visited.contains(&child);
            if !is_visited {
                visited.insert(child);
                dfs_visit(child, adj_func, callback_func, visited);
            }
            callback_func(parent, child, is_visited);
        }
    }

    let mut visited = HashSet::from([start]);
    dfs_visit(start, &adj_func, &mut callback_func, &mut visited);
}

fn parse_input(
    input: &str,
) -> (
    Position,
    HashMap<Position, HashSet<Position>>,
    HashSet<Position>,
) {
    let mut cols: Vec<String> = Vec::new();
    let mut lines = input.lines();
    let first_line = lines.next().unwrap();
    let mut start_x = 0;
    for (i, c) in first_line.chars().enumerate() {
        if c == 'S' {
            start_x = i;
            cols.push("S".to_string());
        } else {
            cols.push(".".to_string());
        }
    }
    for line in lines {
        for (i, c) in line.chars().enumerate() {
            cols[i].push(c);
        }
    }
    let mut adj: HashMap<Position, HashSet<Position>> = HashMap::new();
    let start = (start_x, 0);
    let begin = (start_x, cols[start_x].find(|c| c == '^').unwrap());
    let mut ends: HashSet<Position> = HashSet::new();
    adj.insert(start, HashSet::from([begin]));
    for (col_x, col) in cols.iter().enumerate() {
        adj.insert((col_x, col.len() - 1), HashSet::new());
        ends.insert((col_x, col.len() - 1));
    }
    dfs(
        begin,
        |pos| find_adjs(pos, &cols),
        |parent, child, _| {
            if let Some(parent_adj) = adj.get_mut(&parent) {
                parent_adj.insert(child);
            } else {
                adj.insert(parent, HashSet::new());
                adj.get_mut(&parent).unwrap().insert(child);
            }
        },
    );
    return (start, adj, ends);
}

fn count_splits(
    start: Position,
    adj: &HashMap<Position, HashSet<Position>>,
    ends: &HashSet<Position>,
) -> usize {
    let begin = *adj.get(&start).unwrap().iter().next().unwrap();
    let mut count = 1;
    dfs(
        begin,
        |pos| adj.get(&pos).unwrap_or(&HashSet::new()).clone(),
        |_, child, is_visited| {
            if !is_visited && !ends.contains(&child) {
                count += 1
            }
        },
    );
    return count;
}

fn count_timelines(
    start: Position,
    adj: &HashMap<Position, HashSet<Position>>,
    ends: &HashSet<Position>,
) -> usize {
    let begin = *adj.get(&start).unwrap().iter().next().unwrap();
    let mut timelines_map: HashMap<Position, usize> = HashMap::new();
    for &pos in adj.keys() {
        timelines_map.insert(pos, if ends.contains(&pos) { 1 } else { 0 });
    }
    dfs(
        begin,
        |pos| adj.get(&pos).unwrap_or(&HashSet::new()).clone(),
        |parent, child, _| {
            let child_timelines = timelines_map.get(&child).unwrap().clone();
            timelines_map
                .get_mut(&parent)
                .unwrap()
                .add_assign(child_timelines);
        },
    );
    return *timelines_map.get(&begin).unwrap();
}

pub fn part1(input: &str) -> String {
    let (start, adj, ends) = parse_input(input);
    let count = count_splits(start, &adj, &ends);
    return count.to_string();
}

pub fn part2(input: &str) -> String {
    let (start, adj, ends) = parse_input(input);
    let timelines = count_timelines(start, &adj, &ends);
    return timelines.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let test_string = ".......S.......
        ...............
        .......^.......
        ...............
        ......^.^......
        ...............
        .....^.^.^.....
        ...............
        ....^.^...^....
        ...............
        ...^.^...^.^...
        ...............
        ..^...^.....^..
        ...............
        .^.^.^.^.^...^.
        ..............."
            .replace(" ", "");
        assert_eq!(part1(&test_string), "21");
    }

    #[test]
    fn test_part2() {
        let test_string = ".......S.......
        ...............
        .......^.......
        ...............
        ......^.^......
        ...............
        .....^.^.^.....
        ...............
        ....^.^...^....
        ...............
        ...^.^...^.^...
        ...............
        ..^...^.....^..
        ...............
        .^.^.^.^.^...^.
        ..............."
            .replace(" ", "");
        assert_eq!(part2(&test_string), "40");
    }
}
