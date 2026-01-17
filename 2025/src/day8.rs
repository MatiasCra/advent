use itertools::Itertools;
use std::collections::{HashSet, VecDeque};

type Point = (i64, i64, i64);

fn parse_input(input: &str) -> Vec<Point> {
    input
        .lines()
        .map(|line| {
            line.split(",")
                .map(|n| n.parse().unwrap())
                .collect_tuple()
                .unwrap()
        })
        .collect()
}

fn sq_dist(p1: Point, p2: Point) -> u64 {
    ((p1.0 - p2.0).pow(2)) as u64 + ((p1.1 - p2.1).pow(2)) as u64 + ((p1.2 - p2.2).pow(2)) as u64
}

fn ordered_pairs(points: &Vec<Point>, n: usize) -> Vec<(usize, usize, u64)> {
    points
        .iter()
        .enumerate()
        .combinations(2)
        .map(|c| {
            let (i, p1) = c[0];
            let (j, p2) = c[1];
            return (i, j, sq_dist(*p1, *p2));
        })
        .sorted_by_key(|(_, _, d)| *d)
        .take(n)
        .collect()
}

fn build_graph(points: &Vec<Point>, size: usize) -> Vec<Vec<usize>> {
    let dists = ordered_pairs(&points, size);
    let mut adj = vec![];
    for _ in 0..points.len() {
        adj.push(vec![]);
    }
    for (i, j, _) in dists {
        adj[i].push(j);
        adj[j].push(i);
    }
    return adj;
}

fn dfs_add(
    u: usize,
    adj: &Vec<Vec<usize>>,
    visited: &mut HashSet<usize>,
    add_to: &mut HashSet<usize>,
) {
    visited.insert(u);
    add_to.insert(u);
    for v in &adj[u] {
        if !visited.contains(v) {
            dfs_add(*v, adj, visited, add_to);
        }
    }
}

fn strongly_connected_components(adj: &Vec<Vec<usize>>) -> Vec<HashSet<usize>> {
    let mut visited: HashSet<usize> = HashSet::new();
    let mut components: Vec<HashSet<usize>> = vec![];
    for i in 0..adj.len() {
        if visited.contains(&i) {
            continue;
        }
        let mut component: HashSet<usize> = HashSet::new();
        dfs_add(i, adj, &mut visited, &mut component);
        components.push(component);
    }
    return components;
}

fn final_number_part1(components: &Vec<HashSet<usize>>) -> usize {
    components
        .iter()
        .map(|component| component.len())
        .sorted_by(|a, b| b.cmp(a))
        .take(3)
        .product()
}

pub fn part1(input: &str) -> String {
    let points = parse_input(input);
    let adj = build_graph(&points, 1000);
    let components = strongly_connected_components(&adj);
    let num = final_number_part1(&components);
    return num.to_string();
}

fn kruskal(points: &Vec<Point>) -> Vec<(usize, usize)> {
    let mut edges: Vec<(usize, usize, u64)> = vec![];
    for comb in points.iter().enumerate().combinations(2) {
        let (i, p1) = comb[0];
        let (j, p2) = comb[1];
        edges.push((i, j, sq_dist(*p1, *p2)));
    }
    edges.sort_by_key(|(_, _, d)| *d);
    let mut queue = VecDeque::from(edges);

    let mut belongs: Vec<usize> = vec![];
    for i in 0..points.len() {
        belongs.push(i);
    }
    let mut tree: Vec<(usize, usize)> = vec![];
    while tree.len() < points.len() - 1 && !queue.is_empty() {
        let (i, j, _) = queue.pop_front().unwrap();
        if belongs[j] != belongs[i] && !tree.contains(&(i, j)) {
            let temp = belongs[j];
            for k in 0..points.len() {
                if belongs[k] == temp {
                    belongs[k] = belongs[i];
                }
            }
            tree.push((i, j));
        }
    }

    return tree;
}

fn final_number_part2(points: &Vec<Point>, tree: &Vec<(usize, usize)>) -> u64 {
    let (p1, p2) = tree.last().unwrap();
    (points[*p1].0 * points[*p2].0) as u64
}

pub fn part2(input: &str) -> String {
    let points = parse_input(input);
    let tree = kruskal(&points);
    return final_number_part2(&points, &tree).to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let input = "162,817,812
        57,618,57
        906,360,560
        592,479,940
        352,342,300
        466,668,158
        542,29,236
        431,825,988
        739,650,466
        52,470,668
        216,146,977
        819,987,18
        117,168,530
        805,96,715
        346,949,466
        970,615,88
        941,993,340
        862,61,35
        984,92,344
        425,690,689"
            .replace(" ", "");
        let points = parse_input(&input);
        let adj = build_graph(&points, 10);
        let components = strongly_connected_components(&adj);
        let num = final_number_part1(&components);
        assert_eq!(num, 40);
    }

    #[test]
    fn test_part2() {
        let input = "162,817,812
            57,618,57
            906,360,560
            592,479,940
            352,342,300
            466,668,158
            542,29,236
            431,825,988
            739,650,466
            52,470,668
            216,146,977
            819,987,18
            117,168,530
            805,96,715
            346,949,466
            970,615,88
            941,993,340
            862,61,35
            984,92,344
            425,690,689"
            .replace(" ", "");
        assert_eq!(part2(&input), "25272");
    }
}
