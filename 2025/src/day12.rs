// use geo::{coord, point, BooleanOps, Contains, MultiPolygon, Polygon, Rect, Rotate};
use itertools::Itertools;
// use std::f64;

const SHAPE_SIZE: usize = 3 * 3;

// fn build_polygon_from_grid(positions: Vec<(f64, f64)>) -> Polygon<f64> {
//     let mut merged_shape = MultiPolygon::<f64>::new(vec![]);
//     for (x, y) in positions {
//         let square =
//             Rect::new(coord! { x: x, y: y }, coord! { x: x + 1.0, y: y + 1.0 }).to_polygon();
//         merged_shape = merged_shape.union(&square);
//     }
//     merged_shape
//         .0
//         .into_iter()
//         .next()
//         .expect("The input should have formed at least one polygon")
// }

// fn flip_polygon(polygon: &Polygon<f64>) -> Polygon<f64> {
//     let center_x = 1.5;
//     let flipped_coords: Vec<_> = polygon
//         .exterior()
//         .coords()
//         .map(|coord| coord! { x: 2.0 * center_x - coord.x, y: coord.y })
//         .collect();

//     Polygon::new(flipped_coords.into(), polygon.interiors().to_vec())
// }

// fn get_occupied_cells(poly: &Polygon<f64>) -> Vec<(i32, i32)> {
//     let mut cells = vec![];
//     for y in 0..3 {
//         for x in 0..3 {
//             let p = point! { x: x as f64 + 0.5, y: y as f64 + 0.5 };
//             if poly.contains(&p) {
//                 cells.push((x as i32, y as i32));
//             }
//         }
//     }
//     cells
// }

// fn get_dihedral_shapes(polygon: &Polygon<f64>) -> Vec<Vec<(i32, i32)>> {
//     let center = point! { x: 1.5, y: 1.5 };
//     let mut variants = Vec::new();

//     let mut current = polygon.clone();
//     for _ in 0..4 {
//         variants.push(get_occupied_cells(&current));
//         current = current.rotate_around_point(-90.0, center);
//     }

//     let flipped = flip_polygon(polygon);
//     let mut current = flipped;
//     for _ in 0..4 {
//         variants.push(get_occupied_cells(&current));
//         current = current.rotate_around_point(-90.0, center);
//     }

//     let mut unique_shapes = Vec::new();
//     for cells in variants {
//         if cells.is_empty() {
//             continue;
//         }
//         let min_x = cells.iter().map(|c| c.0).min().unwrap();
//         let min_y = cells.iter().map(|c| c.1).min().unwrap();
//         let mut normalized: Vec<(i32, i32)> =
//             cells.iter().map(|c| (c.0 - min_x, c.1 - min_y)).collect();
//         normalized.sort();
//         unique_shapes.push(normalized);
//     }
//     unique_shapes.sort();
//     unique_shapes.dedup();
//     unique_shapes
// }

// fn parse_single_shape(s: &str) -> Polygon<f64> {
//     let mut positions = vec![];
//     for (y, line) in s.lines().skip(1).enumerate() {
//         for (x, chr) in line.chars().enumerate() {
//             if chr == '#' {
//                 positions.push((x as f64, y as f64));
//             }
//         }
//     }
//     build_polygon_from_grid(positions)
// }

fn parse_input(input: &str) -> (Vec<String>, Vec<(usize, usize, Vec<usize>)>) {
    let mut shapes = vec![];
    let mut regions = vec![];

    let sections: Vec<&str> = input.split("\n\n").collect();
    for section in sections {
        let mut lines_it = section.lines().into_iter();
        if !lines_it.next().unwrap().contains("x") {
            shapes.push(lines_it.collect());
        } else {
            section.lines().for_each(|line| {
                let (dims_txt, amounts_txt) = line.split(": ").collect_tuple().unwrap();
                let (width, height): (usize, usize) = dims_txt
                    .split("x")
                    .map(|n| n.parse().unwrap())
                    .collect_tuple()
                    .unwrap();
                let amounts: Vec<usize> = amounts_txt
                    .split_whitespace()
                    .map(|n| n.parse().unwrap())
                    .collect();
                regions.push((width, height, amounts));
            });
        }
    }
    (shapes, regions)
}

fn can_fit_region(
    shapes: &Vec<String>,
    width: usize,
    height: usize,
    presents: &Vec<usize>,
) -> bool {
    let shape_space: Vec<usize> = shapes
        .iter()
        .map(|shape| shape.chars().counts()[&'#'])
        .collect();
    let needed_space: usize = presents
        .iter()
        .enumerate()
        .map(|(i, amount)| shape_space[i] * amount)
        .sum();
    let naive_solution_space: usize = presents.iter().map(|amount| amount * SHAPE_SIZE).sum();
    let available_space = width * height;
    if needed_space > available_space {
        return false;
    } else if naive_solution_space <= available_space {
        return true;
    }
    todo!("Search solution space or use SAT sovler");
}

pub fn part1(input: &str) -> String {
    let (shapes, regions) = parse_input(input);
    regions
        .iter()
        .filter(|(w, h, p)| can_fit_region(&shapes, *w, *h, p))
        .count()
        .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part1() {
        let input = "0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2";
        assert_eq!(part1(&input), "2");
    }
}
