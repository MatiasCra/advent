use itertools::Itertools;
use std::collections::{HashMap, HashSet};

type Position = (usize, usize);

fn find_adjs(pos: Position, cols: &Vec<String>) -> HashSet<Position> {
    let mut adj: HashSet<Position> = HashSet::new();
    let (x, y) = pos;
    if x > 0 {
        if let Some((found_y, _)) = cols[x - 1].chars().skip(y).find_position(|&c| c == '^') {
            adj.insert((x - 1, y + found_y));
        }
    }
    if x < cols.len() - 1 {
        if let Some((found_y, _)) = cols[x + 1].chars().skip(y).find_position(|&c| c == '^') {
            adj.insert((x + 1, y + found_y));
        }
    }
    return adj;
}

fn dfs(
    start: Position,
    adj_func: impl Fn(Position) -> HashSet<Position>,
    mut callback_func: impl FnMut(Position, Position),
) {
    fn dfs_visit(
        parent: Position,
        adj_func: &impl Fn(Position) -> HashSet<Position>,
        callback_func: &mut impl FnMut(Position, Position),
        visited: &mut HashSet<Position>,
    ) {
        for child in adj_func(parent) {
            if !visited.contains(&child) {
                visited.insert(child);
                callback_func(parent, child);
                dfs_visit(child, adj_func, callback_func, visited);
            }
        }
    }

    let mut visited = HashSet::from([start]);
    dfs_visit(start, &adj_func, &mut callback_func, &mut visited);
}

// fn bfs(
//     start: Position,
//     adj_func: impl Fn(Position) -> HashSet<Position>,
//     mut callback_func: impl FnMut(Position, Position),
// ) {
//     let mut queue: VecDeque<Position> = VecDeque::new();
//     queue.push_back(start);
//     let mut visited: HashSet<Position> = HashSet::new();
//     visited.insert(start);
//     while !queue.is_empty() {
//         let parent = queue.pop_front().unwrap();
//         for child in adj_func(parent) {
//             if visited.contains(&child) {
//                 continue;
//             }
//             callback_func(parent, child);
//             visited.insert(child);
//             queue.push_back(child);
//         }
//     }
// }

fn parse_input(input: &str) -> (Position, HashMap<Position, HashSet<Position>>) {
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
    adj.insert(start, HashSet::from([begin]));
    dfs(
        begin,
        |pos| find_adjs(pos, &cols),
        |parent, child| {
            if let Some(parent_adj) = adj.get_mut(&parent) {
                parent_adj.insert(child);
            } else {
                adj.insert(parent, HashSet::new());
                adj.get_mut(&parent).unwrap().insert(child);
            }
        },
    );
    return (start, adj);
}

pub fn part1(input: &str) -> String {
    let (start, adj) = parse_input(input);
    let begin = *adj.get(&start).unwrap().iter().next().unwrap();
    let mut count = 1;
    dfs(
        begin,
        |pos| adj.get(&pos).unwrap_or(&HashSet::new()).clone(),
        |_, _| count += 1,
    );
    return count.to_string();
}

pub fn part2(_input: &str) -> String {
    return "".to_string();
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

    // #[test]
    // fn test_part2() {
    //     assert_eq!(part2(""), "");
    // }
}
