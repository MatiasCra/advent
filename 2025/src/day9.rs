use geo::{coord, Contains, LineString, Polygon, Rect};
use itertools::Itertools;
type Tile = (f64, f64);

fn parse_input(input: &str) -> Vec<Tile> {
    let mut tiles: Vec<Tile> = input
        .lines()
        .map(|line| {
            line.split(",")
                .map(|n| n.parse().unwrap())
                .collect_tuple()
                .unwrap()
        })
        .collect();

    if let (Some(first), Some(last)) = (tiles.first(), tiles.last()) {
        if first != last {
            tiles.push(*first);
        }
    }
    tiles
}

fn rect_area_by_corners(r1: Tile, r2: Tile) -> u64 {
    let (x1, y1) = r1;
    let (x2, y2) = r2;
    let height = ((y1 as i64) - (y2 as i64)).abs() as u64 + 1;
    let width = ((x1 as i64) - (x2 as i64)).abs() as u64 + 1;
    return height * width;
}

fn largest_rect_area(tiles: &Vec<Tile>) -> u64 {
    tiles
        .iter()
        .combinations(2)
        .map(|comb| {
            let (x1, y1) = comb[0];
            let (x2, y2) = comb[1];
            return rect_area_by_corners((*x1, *y1), (*x2, *y2));
        })
        .max()
        .unwrap()
}

fn largest_rect_area_2(tiles: &Vec<Tile>, poly: &Polygon) -> u64 {
    let mut areas: Vec<_> = tiles
        .iter()
        .combinations(2)
        .map(|comb| {
            let &(x1, y1) = comb[0];
            let &(x2, y2) = comb[1];
            return (x1, y1, x2, y2, rect_area_by_corners((x1, y1), (x2, y2)));
        })
        .collect();
    areas.sort_unstable_by(|a, b| b.4.cmp(&a.4));
    for (x1, y1, x2, y2, area) in areas {
        let min_x = x1.min(x2);
        let max_x = x1.max(x2);
        let min_y = y1.min(y2);
        let max_y = y1.max(y2);
        if min_x == max_x || min_y == max_y {
            continue;
        }
        let rect = Rect::new(coord! { x: min_x, y: min_y }, coord! { x: max_x, y: max_y });
        if poly.contains(&rect) {
            return area;
        }
    }
    return 0;
}

pub fn part1(input: &str) -> String {
    let tiles = parse_input(input);
    let largest_area = largest_rect_area(&tiles);
    return largest_area.to_string();
}

pub fn part2(input: &str) -> String {
    // It's very slow on debug mode. Run as a release ```cargo run --release --bin day9```
    let tiles = parse_input(input);
    let poly = Polygon::new(LineString::from(tiles.clone()), vec![]);
    let largest_area = largest_rect_area_2(&tiles, &poly);
    return largest_area.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let input = "7,1
        11,1
        11,7
        9,7
        9,5
        2,5
        2,3
        7,3"
        .replace(" ", "");
        assert_eq!(part1(&input), "50");
    }

    #[test]
    fn test_part2() {
        let input = "7,1
        11,1
        11,7
        9,7
        9,5
        2,5
        2,3
        7,3"
        .replace(" ", "");
        assert_eq!(part2(&input), "24");
    }
}
