import sys

UP, DOWN, LEFT, RIGHT = "U", "D", "L", "R"
HORIZONTAL, VERTICAL = "H", "V"


class Wire:
    def __init__(self, wire_lines):
        self.lines = wire_lines

    def __str__(self):
        return str(self.lines)

    @classmethod
    def from_directions(cls, directions):
        lines = []
        x, y = 0, 0
        for txt in directions.split(","):
            line = WireLine.from_direction((x, y), txt)
            x, y = line.end
            lines.append(line)

        return cls(lines)

    def intersects(self, wire_line):
        distance = 0
        for line in self.lines:
            intersections = line.intersects(wire_line)
            xs, ys = line.start
            for intersection in intersections:
                x, y = intersection
                yield distance + abs(xs - x) + abs(ys - y), intersection

            distance += len(line)

    def wire_intersections(self, other_wire):
        intersections_list = []
        own_distance = 0
        for line in self.lines:
            for distance, intersection in other_wire.intersects(line):
                if intersection != (0, 0):
                    xs, ys = line.start
                    x, y = intersection
                    intersections_list.append(
                        (
                            distance + own_distance + abs(xs - x) + abs(ys - y),
                            intersection,
                        )
                    )

            own_distance += len(line)

        return intersections_list


class WireLine:
    def __init__(self, start, end):
        xstart, ystart = start
        xend, yend = end
        assert (xstart == xend and ystart != yend) or (
            xstart != xend and ystart == yend
        )

        self.start = start
        self.end = end

    def __str__(self):
        return f"{self.start} -> {self.end}"

    def __repr__(self):
        return f"{self.start} -> {self.end}"

    def orientation(self):
        xstart, _ = self.start
        xend, _ = self.end

        if xstart == xend:
            return VERTICAL
        else:
            return HORIZONTAL

    def anchored_representation(self):
        orientation = self.orientation()
        if orientation == HORIZONTAL:
            xstart, anchor = self.start
            xend, _ = self.end
            if xstart > xend:
                xstart, xend = xend, xstart

            return orientation, anchor, xstart, xend
        else:
            anchor, ystart = self.start
            _, yend = self.end
            if ystart > yend:
                ystart, yend = yend, ystart

            return orientation, anchor, ystart, yend

    def __len__(self):
        xstart, ystart = self.start
        xend, yend = self.end
        return abs(xstart - xend) + abs(ystart - yend)

    def intersects(self, other_wire_line):
        self_orientation, self_anchor, self_start, self_end = (
            self.anchored_representation()
        )
        other_orientation, other_anchor, other_start, other_end = (
            other_wire_line.anchored_representation()
        )

        if (
            self_orientation != other_orientation
            and self_start <= other_anchor <= self_end
            and other_start <= self_anchor <= other_end
        ):
            if self_orientation == HORIZONTAL:
                return {(other_anchor, self_anchor)}
            else:
                return {(self_anchor, other_anchor)}
        elif self_orientation == other_orientation and self_anchor == other_anchor:
            if self_start <= other_start <= self_end:
                inter_range = range(other_start, min(self_end, other_end) + 1)
            elif other_start <= self_start <= other_end:
                inter_range = range(self_start, min(self_end, other_end) + 1)
            else:
                return {}

            if self_orientation == HORIZONTAL:
                return {(x, self_anchor) for x in inter_range}
            else:
                return {(self_anchor, y) for y in inter_range}

        return {}

    @classmethod
    def from_direction(cls, start, direction_txt):
        x, y = start
        direction = direction_txt[0]
        amount = int(direction_txt[1:])

        if direction == UP:
            end = x, y + amount
        elif direction == DOWN:
            end = x, y - amount
        elif direction == LEFT:
            end = x - amount, y
        elif direction == RIGHT:
            end = x + amount, y
        else:
            raise ValueError

        return cls(start, end)


def main():
    with open(sys.argv[1]) as input_file:
        direction1, directions2 = input_file.read().splitlines()

    wire1 = Wire.from_directions(direction1)
    wire2 = Wire.from_directions(directions2)

    intersections = wire1.wire_intersections(wire2)
    print("a)", min((sum(map(abs, i)) for _, i in intersections)))
    print("b)", min(d for d, _ in intersections))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
