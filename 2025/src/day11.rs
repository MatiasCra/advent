use itertools::Itertools;
use std::collections::{HashMap, HashSet};

fn parse_input(input: &str) -> HashMap<&str, HashSet<&str>> {
    input
        .lines()
        .map(|line| {
            let (from, adj_str) = line.split(": ").collect_tuple().unwrap();
            (from, adj_str.split_whitespace().collect())
        })
        .collect()
}

fn paths_to_out<'a>(
    curr: &'a str,
    adj: &HashMap<&str, HashSet<&'a str>>,
    cache: &mut HashMap<&'a str, u64>,
) -> u64 {
    if curr == "out" {
        return 1;
    }
    if let Some(&paths) = cache.get(curr) {
        return paths;
    }
    let paths = adj
        .get(curr)
        .unwrap_or(&HashSet::new())
        .iter()
        .fold(0, |sum, &elem| sum + paths_to_out(elem, adj, cache));
    cache.insert(curr, paths);
    return paths;
}

pub fn part1(input: &str) -> String {
    let adj = parse_input(input);
    paths_to_out("you", &adj, &mut HashMap::new()).to_string()
}

fn paths_to_out_passing_dac_and_fft<'a>(
    curr: &'a str,
    adj: &HashMap<&str, HashSet<&'a str>>,
    passed_dac: bool,
    passed_fft: bool,
    cache: &mut HashMap<(&'a str, bool, bool), u64>,
) -> u64 {
    if curr == "out" {
        return if passed_dac && passed_fft { 1 } else { 0 };
    }
    if let Some(&paths) = cache.get(&(curr, passed_dac, passed_fft)) {
        return paths;
    }
    let paths = adj
        .get(curr)
        .unwrap_or(&HashSet::new())
        .iter()
        .fold(0, |sum, &elem| {
            sum + paths_to_out_passing_dac_and_fft(
                elem,
                adj,
                if curr == "dac" { true } else { passed_dac },
                if curr == "fft" { true } else { passed_fft },
                cache,
            )
        });
    cache.insert((curr, passed_dac, passed_fft), paths);
    return paths;
}

pub fn part2(input: &str) -> String {
    let adj = parse_input(input);
    paths_to_out_passing_dac_and_fft("svr", &adj, false, false, &mut HashMap::new()).to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let input = "aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out";
        assert_eq!(part1(&input), "5");
    }

    #[test]
    fn test_part2() {
        let input = "svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out";
        assert_eq!(part2(&input), "2");
    }
}
