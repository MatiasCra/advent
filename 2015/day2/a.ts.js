const input = await Deno.readTextFile("./input.txt");
const allDimensions = input.split("\n");
allDimensions.pop();
let total = 0;
allDimensions.forEach((dimensionsStr)=>{
    const dimensions = dimensionsStr.split("x");
    console.log(dimensions);
    const areas = dimensions.map((dim, index)=>{
        if (index < dimensions.length - 1) {
            return parseInt(dim) * parseInt(dimensions[index + 1]);
        } else {
            return parseInt(dimensions[0]) * parseInt(dim);
        }
    });
    const min = areas.sort((a, b)=>a < b ? -1 : 1)[0];
    const sum = areas.reduce((acc, curr)=>acc + 2 * curr, 0);
    total += min + sum;
});
console.log(total);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5Mi9hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgaW5wdXQgPSBhd2FpdCBEZW5vLnJlYWRUZXh0RmlsZShcIi4vaW5wdXQudHh0XCIpXG5cbmNvbnN0IGFsbERpbWVuc2lvbnMgPSBpbnB1dC5zcGxpdChcIlxcblwiKVxuYWxsRGltZW5zaW9ucy5wb3AoKVxuXG5sZXQgdG90YWwgPSAwXG5hbGxEaW1lbnNpb25zLmZvckVhY2goKGRpbWVuc2lvbnNTdHI6IHN0cmluZykgPT4ge1xuICBjb25zdCBkaW1lbnNpb25zOiBzdHJpbmdbXSA9IGRpbWVuc2lvbnNTdHIuc3BsaXQoXCJ4XCIpXG4gIGNvbnNvbGUubG9nKGRpbWVuc2lvbnMpXG4gIGNvbnN0IGFyZWFzOiBudW1iZXJbXSA9IGRpbWVuc2lvbnMubWFwKChkaW06IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGlmIChpbmRleCA8IGRpbWVuc2lvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGRpbSkgKiBwYXJzZUludChkaW1lbnNpb25zW2luZGV4ICsgMV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJzZUludChkaW1lbnNpb25zWzBdKSAqIHBhcnNlSW50KGRpbSlcbiAgICB9XG4gIH0pXG4gIGNvbnN0IG1pbiA9IGFyZWFzLnNvcnQoKGEsIGIpID0+IGEgPCBiID8gLTEgOiAxKVswXVxuICBjb25zdCBzdW0gPSBhcmVhcy5yZWR1Y2UoKGFjYywgY3VycikgPT4gYWNjICsgKDIgKiBjdXJyKSwgMClcbiAgdG90YWwgKz0gbWluICsgc3VtXG59KVxuY29uc29sZS5sb2codG90YWwpXG5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUV0QyxNQUFNLGdCQUFnQixNQUFNLEtBQUssQ0FBQztBQUNsQyxjQUFjLEdBQUc7QUFFakIsSUFBSSxRQUFRO0FBQ1osY0FBYyxPQUFPLENBQUMsQ0FBQyxnQkFBMEI7SUFDL0MsTUFBTSxhQUF1QixjQUFjLEtBQUssQ0FBQztJQUNqRCxRQUFRLEdBQUcsQ0FBQztJQUNaLE1BQU0sUUFBa0IsV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFhLFFBQWtCO1FBQ3JFLElBQUksUUFBUSxXQUFXLE1BQU0sR0FBRyxHQUFHO1lBQ2pDLE9BQU8sU0FBUyxPQUFPLFNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRTtRQUN2RCxPQUFPO1lBQ0wsT0FBTyxTQUFTLFVBQVUsQ0FBQyxFQUFFLElBQUksU0FBUztRQUM1QyxDQUFDO0lBQ0g7SUFDQSxNQUFNLE1BQU0sTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ25ELE1BQU0sTUFBTSxNQUFNLE1BQU0sQ0FBQyxDQUFDLEtBQUssT0FBUyxNQUFPLElBQUksTUFBTztJQUMxRCxTQUFTLE1BQU07QUFDakI7QUFDQSxRQUFRLEdBQUcsQ0FBQyJ9