const input = await Deno.readTextFile("./input.txt");
const allDimensions = input.split("\n");
allDimensions.pop();
let total = 0;
allDimensions.forEach((dimensionsStr)=>{
    const dimensions = dimensionsStr.split("x");
    console.log(dimensions);
    const perimeters = dimensions.map((dim, index)=>{
        if (index < dimensions.length - 1) {
            return parseInt(dim) * 2 + parseInt(dimensions[index + 1]) * 2;
        } else {
            return parseInt(dimensions[0]) * 2 + parseInt(dim) * 2;
        }
    });
    const volume = dimensions.reduce((acc, curr)=>acc * parseInt(curr), 1);
    const min = perimeters.sort((a, b)=>a < b ? -1 : 1)[0];
    total += min + volume;
});
console.log(total);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5Mi9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgaW5wdXQgPSBhd2FpdCBEZW5vLnJlYWRUZXh0RmlsZShcIi4vaW5wdXQudHh0XCIpXG5cbmNvbnN0IGFsbERpbWVuc2lvbnMgPSBpbnB1dC5zcGxpdChcIlxcblwiKVxuYWxsRGltZW5zaW9ucy5wb3AoKVxuXG5sZXQgdG90YWwgPSAwXG5hbGxEaW1lbnNpb25zLmZvckVhY2goKGRpbWVuc2lvbnNTdHI6IHN0cmluZykgPT4ge1xuICBjb25zdCBkaW1lbnNpb25zOiBzdHJpbmdbXSA9IGRpbWVuc2lvbnNTdHIuc3BsaXQoXCJ4XCIpXG4gIGNvbnNvbGUubG9nKGRpbWVuc2lvbnMpXG4gIGNvbnN0IHBlcmltZXRlcnM6IG51bWJlcltdID0gZGltZW5zaW9ucy5tYXAoKGRpbTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKGluZGV4IDwgZGltZW5zaW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoZGltKSAqIDIgKyBwYXJzZUludChkaW1lbnNpb25zW2luZGV4ICsgMV0pICogMlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoZGltZW5zaW9uc1swXSkgKiAyICsgcGFyc2VJbnQoZGltKSAqIDJcbiAgICB9XG4gIH0pXG5cbiAgY29uc3Qgdm9sdW1lOiBudW1iZXIgPSBkaW1lbnNpb25zLnJlZHVjZSgoYWNjOiBudW1iZXIsIGN1cnI6IHN0cmluZykgPT4gYWNjICogcGFyc2VJbnQoY3VyciksIDEpXG4gIGNvbnN0IG1pbiA9IHBlcmltZXRlcnMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IDEpWzBdXG4gIHRvdGFsICs9IG1pbiArIHZvbHVtZVxufSlcbmNvbnNvbGUubG9nKHRvdGFsKVxuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxRQUFRLE1BQU0sS0FBSyxZQUFZLENBQUM7QUFFdEMsTUFBTSxnQkFBZ0IsTUFBTSxLQUFLLENBQUM7QUFDbEMsY0FBYyxHQUFHO0FBRWpCLElBQUksUUFBUTtBQUNaLGNBQWMsT0FBTyxDQUFDLENBQUMsZ0JBQTBCO0lBQy9DLE1BQU0sYUFBdUIsY0FBYyxLQUFLLENBQUM7SUFDakQsUUFBUSxHQUFHLENBQUM7SUFDWixNQUFNLGFBQXVCLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBYSxRQUFrQjtRQUMxRSxJQUFJLFFBQVEsV0FBVyxNQUFNLEdBQUcsR0FBRztZQUNqQyxPQUFPLFNBQVMsT0FBTyxJQUFJLFNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJO1FBQy9ELE9BQU87WUFDTCxPQUFPLFNBQVMsVUFBVSxDQUFDLEVBQUUsSUFBSSxJQUFJLFNBQVMsT0FBTztRQUN2RCxDQUFDO0lBQ0g7SUFFQSxNQUFNLFNBQWlCLFdBQVcsTUFBTSxDQUFDLENBQUMsS0FBYSxPQUFpQixNQUFNLFNBQVMsT0FBTztJQUM5RixNQUFNLE1BQU0sV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3hELFNBQVMsTUFBTTtBQUNqQjtBQUNBLFFBQVEsR0FBRyxDQUFDIn0=