use std::collections::{HashMap, VecDeque};

const EPSILON: f64 = 1e-6;
const MAX_PRESSES_LIMIT: u32 = 1000;
type Manual = Vec<(Vec<bool>, Vec<Vec<usize>>, Vec<u32>)>;

fn parse_csv<T: std::str::FromStr>(s: &str, trim: &[char]) -> Vec<T> {
    s.trim_matches(trim)
        .split(',')
        .filter_map(|n| n.parse().ok())
        .collect()
}

fn parse_input(input: &str) -> Manual {
    input
        .lines()
        .filter(|l| !l.is_empty())
        .map(|line| {
            let mut parts = line.split_whitespace();
            let (lights_str, joltage_str) = (parts.next().unwrap(), parts.next_back().unwrap());
            let lights = lights_str
                .chars()
                .filter_map(|c| match c {
                    '.' => Some(false),
                    '#' => Some(true),
                    _ => None,
                })
                .collect();
            let joltage = parse_csv(joltage_str, &['{', '}']);
            let buttons = parts.map(|s| parse_csv(s, &['(', ')'])).collect();
            (lights, buttons, joltage)
        })
        .collect()
}

fn fewest_presses_bfs(goal: &[bool], buttons: &[Vec<usize>]) -> u64 {
    let initial = vec![false; goal.len()];
    let mut visited = HashMap::from([(initial.clone(), 0)]);
    let mut queue = VecDeque::from([initial]);
    while let Some(state) = queue.pop_front() {
        let dist = visited[&state];
        if state == goal {
            return dist;
        }
        for btn in buttons {
            let mut next = state.clone();
            let len = next.len();
            btn.iter()
                .filter(|&&l| l < len)
                .for_each(|&l| next[l] = !next[l]);
            visited.entry(next.clone()).or_insert_with(|| {
                queue.push_back(next);
                dist + 1
            });
        }
    }
    u64::MAX
}

pub fn part1(input: &str) -> String {
    parse_input(input)
        .iter()
        .map(|(goal, buttons, _)| fewest_presses_bfs(goal, buttons))
        .sum::<u64>()
        .to_string()
}

fn is_integer(val: f64) -> bool {
    (val - val.round()).abs() < EPSILON
}

fn to_rref(matrix: &mut [Vec<f64>]) -> Vec<Option<usize>> {
    let (num_l, num_cols) = (matrix.len(), matrix[0].len());
    let mut pivot_row = 0;
    let mut pivots = vec![None; num_l];
    for col in 0..num_cols - 1 {
        if pivot_row >= num_l {
            break;
        }
        if let Some(sel) = (pivot_row..num_l).max_by(|&a, &b| {
            matrix[a][col]
                .abs()
                .partial_cmp(&matrix[b][col].abs())
                .unwrap()
        }) {
            if matrix[sel][col].abs() > EPSILON {
                matrix.swap(pivot_row, sel);
                let c = matrix[pivot_row][col];
                for j in col..num_cols {
                    matrix[pivot_row][j] /= c;
                }
                for i in 0..num_l {
                    if i != pivot_row {
                        let factor = matrix[i][col];
                        for j in col..num_cols {
                            matrix[i][j] -= factor * matrix[pivot_row][j];
                        }
                    }
                }
                pivots[pivot_row] = Some(col);
                pivot_row += 1;
            }
        }
    }
    pivots
}

fn search_min_presses(
    idx: usize,
    current_sum: u64,
    free_vals: &mut [u32],
    free_vars: &[usize],
    matrix: &[Vec<f64>],
    num_pivots: usize,
    min_sum: &mut u64,
) {
    if idx == free_vars.len() {
        let mut total = current_sum;
        let num_b = matrix[0].len() - 1;
        let valid = (0..num_pivots).all(|r| {
            let mut val = matrix[r][num_b];
            for (i, &fv) in free_vars.iter().enumerate() {
                val -= matrix[r][fv] * free_vals[i] as f64;
            }
            if val < -EPSILON || !is_integer(val) {
                return false;
            }
            let rounded = val.round() as i64;
            if rounded < 0 {
                return false;
            }
            total += rounded as u64;
            true
        });
        if valid {
            *min_sum = (*min_sum).min(total);
        }
        return;
    }
    for v in 0..=MAX_PRESSES_LIMIT {
        if current_sum + v as u64 >= *min_sum {
            break;
        }
        free_vals[idx] = v;
        search_min_presses(
            idx + 1,
            current_sum + v as u64,
            free_vals,
            free_vars,
            matrix,
            num_pivots,
            min_sum,
        );
    }
}

fn solve_joltage_line(joltage: &[u32], buttons: &[Vec<usize>]) -> u64 {
    let (num_l, num_b) = (joltage.len(), buttons.len());
    let mut matrix = vec![vec![0.0; num_b + 1]; num_l];
    for (b_i, b) in buttons.iter().enumerate() {
        for &l_i in b {
            if l_i < num_l {
                matrix[l_i][b_i] = 1.0;
            }
        }
    }
    for (i, &v) in joltage.iter().enumerate() {
        matrix[i][num_b] = v as f64;
    }
    let pivots = to_rref(&mut matrix);
    let num_pivots = pivots.iter().flatten().count();
    let pivot_set: std::collections::HashSet<usize> = pivots.iter().flatten().copied().collect();
    let free_vars: Vec<usize> = (0..num_b).filter(|c| !pivot_set.contains(c)).collect();
    let mut min_sum = u64::MAX;
    search_min_presses(
        0,
        0,
        &mut vec![0; free_vars.len()],
        &free_vars,
        &matrix,
        num_pivots,
        &mut min_sum,
    );
    min_sum
}

pub fn part2(input: &str) -> String {
    parse_input(input)
        .iter()
        .map(|(_, b, j)| solve_joltage_line(j, b))
        .sum::<u64>()
        .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let input = "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}\n[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}\n[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}";
        assert_eq!(part1(&input), "7");
    }

    #[test]
    fn test_part2() {
        let input = "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}\n[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}\n[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}";
        assert_eq!(part2(&input), "33");
    }

    #[test]
    fn test_3() {
        let input = "[.##.#...] (0,4) (0,2,4,5,7) (0,1,3,4,5,7) (0,2,3,5,6,7) (1,2,6,7) (1,3) (0,6,7) (0,2,3,6,7) (0,7) (0,2,4,5,6) {265,33,227,40,229,215,224,76}\n";
        assert_eq!(part2(&input), "278");
    }
}
