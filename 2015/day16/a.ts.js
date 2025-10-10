const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
lines.pop();
const correctData = {
    num: undefined,
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};
const getProperty = (line, property)=>{
    const matches = line.match(new RegExp(`(?<=${property}: )([0-9]+)`, "g")) || [
        "-1"
    ];
    const n = parseInt(matches[0]);
    return n !== -1 ? n : undefined;
};
const getNumber = (line)=>{
    const matches = line.match(new RegExp(`(?<=Sue )([0-9]+)`, "g")) || [
        "-1"
    ];
    return parseInt(matches[0]);
};
const sues = lines.map((line)=>{
    const num = getNumber(line);
    const children = getProperty(line, "children");
    const cats = getProperty(line, "cats");
    const samoyeds = getProperty(line, "samoyeds");
    const pomeranians = getProperty(line, "pomeranians");
    const akitas = getProperty(line, "akitas");
    const vizslas = getProperty(line, "vizslas");
    const goldfish = getProperty(line, "goldfish");
    const trees = getProperty(line, "trees");
    const cars = getProperty(line, "cars");
    const perfumes = getProperty(line, "perfumes");
    return {
        num,
        children,
        cats,
        samoyeds,
        pomeranians,
        akitas,
        vizslas,
        goldfish,
        trees,
        cars,
        perfumes
    };
});
const matchingSues = sues.filter((sue)=>{
    return (sue.children === undefined || sue.children === correctData.children) && (sue.cats === undefined || sue.cats === correctData.cats) && (sue.samoyeds === undefined || sue.samoyeds === correctData.samoyeds) && (sue.pomeranians === undefined || sue.pomeranians === correctData.pomeranians) && (sue.akitas === undefined || sue.akitas === correctData.akitas) && (sue.vizslas === undefined || sue.vizslas === correctData.vizslas) && (sue.goldfish === undefined || sue.goldfish === correctData.goldfish) && (sue.trees === undefined || sue.trees === correctData.trees) && (sue.cars === undefined || sue.cars === correctData.cars) && (sue.perfumes === undefined || sue.perfumes === correctData.perfumes);
});
console.log(matchingSues);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTYvYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKFwiLi9pbnB1dC50eHRcIik7XG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KFwiXFxuXCIpO1xubGluZXMucG9wKCk7XG5cbmludGVyZmFjZSBEYXRhIHtcbiAgbnVtOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGNoaWxkcmVuOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGNhdHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgc2Ftb3llZHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcG9tZXJhbmlhbnM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgYWtpdGFzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHZpenNsYXM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgZ29sZGZpc2g6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgdHJlZXM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgY2FyczogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwZXJmdW1lczogbnVtYmVyIHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBjb3JyZWN0RGF0YSA9IHtcbiAgbnVtOiB1bmRlZmluZWQsXG4gIGNoaWxkcmVuOiAzLFxuICBjYXRzOiA3LFxuICBzYW1veWVkczogMixcbiAgcG9tZXJhbmlhbnM6IDMsXG4gIGFraXRhczogMCxcbiAgdml6c2xhczogMCxcbiAgZ29sZGZpc2g6IDUsXG4gIHRyZWVzOiAzLFxuICBjYXJzOiAyLFxuICBwZXJmdW1lczogMSxcbn0gYXMgRGF0YTtcblxuY29uc3QgZ2V0UHJvcGVydHkgPSAobGluZTogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgbWF0Y2hlcyA9IGxpbmUubWF0Y2goXG4gICAgbmV3IFJlZ0V4cChgKD88PSR7cHJvcGVydHl9OiApKFswLTldKylgLCBcImdcIiksXG4gICkgfHwgW1wiLTFcIl07XG4gIGNvbnN0IG4gPSBwYXJzZUludChtYXRjaGVzWzBdKTtcbiAgcmV0dXJuIG4gIT09IC0xID8gbiA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IGdldE51bWJlciA9IChsaW5lOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBtYXRjaGVzID0gbGluZS5tYXRjaChcbiAgICBuZXcgUmVnRXhwKGAoPzw9U3VlICkoWzAtOV0rKWAsIFwiZ1wiKSxcbiAgKSB8fCBbXCItMVwiXTtcbiAgcmV0dXJuIHBhcnNlSW50KG1hdGNoZXNbMF0pO1xufTtcblxuY29uc3Qgc3VlczogRGF0YVtdID0gbGluZXMubWFwKChsaW5lOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgbnVtID0gZ2V0TnVtYmVyKGxpbmUpO1xuICBjb25zdCBjaGlsZHJlbiA9IGdldFByb3BlcnR5KGxpbmUsIFwiY2hpbGRyZW5cIik7XG4gIGNvbnN0IGNhdHMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImNhdHNcIik7XG4gIGNvbnN0IHNhbW95ZWRzID0gZ2V0UHJvcGVydHkobGluZSwgXCJzYW1veWVkc1wiKTtcbiAgY29uc3QgcG9tZXJhbmlhbnMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcInBvbWVyYW5pYW5zXCIpO1xuICBjb25zdCBha2l0YXMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImFraXRhc1wiKTtcbiAgY29uc3Qgdml6c2xhcyA9IGdldFByb3BlcnR5KGxpbmUsIFwidml6c2xhc1wiKTtcbiAgY29uc3QgZ29sZGZpc2ggPSBnZXRQcm9wZXJ0eShsaW5lLCBcImdvbGRmaXNoXCIpO1xuICBjb25zdCB0cmVlcyA9IGdldFByb3BlcnR5KGxpbmUsIFwidHJlZXNcIik7XG4gIGNvbnN0IGNhcnMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImNhcnNcIik7XG4gIGNvbnN0IHBlcmZ1bWVzID0gZ2V0UHJvcGVydHkobGluZSwgXCJwZXJmdW1lc1wiKTtcblxuICByZXR1cm4ge1xuICAgIG51bSxcbiAgICBjaGlsZHJlbixcbiAgICBjYXRzLFxuICAgIHNhbW95ZWRzLFxuICAgIHBvbWVyYW5pYW5zLFxuICAgIGFraXRhcyxcbiAgICB2aXpzbGFzLFxuICAgIGdvbGRmaXNoLFxuICAgIHRyZWVzLFxuICAgIGNhcnMsXG4gICAgcGVyZnVtZXMsXG4gIH0gYXMgRGF0YTtcbn0pO1xuXG5jb25zdCBtYXRjaGluZ1N1ZXMgPSBzdWVzLmZpbHRlcigoc3VlOiBEYXRhKSA9PiB7XG4gIHJldHVybiAoXG4gICAgKHN1ZS5jaGlsZHJlbiA9PT0gdW5kZWZpbmVkIHx8IHN1ZS5jaGlsZHJlbiA9PT0gY29ycmVjdERhdGEuY2hpbGRyZW4pICYmXG4gICAgKHN1ZS5jYXRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS5jYXRzID09PSBjb3JyZWN0RGF0YS5jYXRzKSAmJlxuICAgIChcbiAgICAgIHN1ZS5zYW1veWVkcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBzdWUuc2Ftb3llZHMgPT09IGNvcnJlY3REYXRhLnNhbW95ZWRzXG4gICAgKSAmJiAoXG4gICAgICBzdWUucG9tZXJhbmlhbnMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgc3VlLnBvbWVyYW5pYW5zID09PSBjb3JyZWN0RGF0YS5wb21lcmFuaWFuc1xuICAgICkgJiYgKFxuICAgICAgc3VlLmFraXRhcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBzdWUuYWtpdGFzID09PSBjb3JyZWN0RGF0YS5ha2l0YXNcbiAgICApICYmIChcbiAgICAgIHN1ZS52aXpzbGFzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS52aXpzbGFzID09PSBjb3JyZWN0RGF0YS52aXpzbGFzXG4gICAgKSAmJiAoXG4gICAgICBzdWUuZ29sZGZpc2ggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgc3VlLmdvbGRmaXNoID09PSBjb3JyZWN0RGF0YS5nb2xkZmlzaFxuICAgICkgJiYgKFxuICAgICAgc3VlLnRyZWVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS50cmVlcyA9PT0gY29ycmVjdERhdGEudHJlZXNcbiAgICApICYmIChcbiAgICAgIHN1ZS5jYXJzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS5jYXJzID09PSBjb3JyZWN0RGF0YS5jYXJzXG4gICAgKSAmJlxuICAgIChzdWUucGVyZnVtZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgc3VlLnBlcmZ1bWVzID09PSBjb3JyZWN0RGF0YS5wZXJmdW1lcylcbiAgKTtcbn0pO1xuXG5jb25zb2xlLmxvZyhtYXRjaGluZ1N1ZXMpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxNQUFNLEtBQUssWUFBWSxDQUFDO0FBQ3RDLE1BQU0sUUFBUSxNQUFNLEtBQUssQ0FBQztBQUMxQixNQUFNLEdBQUc7QUFnQlQsTUFBTSxjQUFjO0lBQ2xCLEtBQUs7SUFDTCxVQUFVO0lBQ1YsTUFBTTtJQUNOLFVBQVU7SUFDVixhQUFhO0lBQ2IsUUFBUTtJQUNSLFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztJQUNQLE1BQU07SUFDTixVQUFVO0FBQ1o7QUFFQSxNQUFNLGNBQWMsQ0FBQyxNQUFjLFdBQXlDO0lBQzFFLE1BQU0sVUFBVSxLQUFLLEtBQUssQ0FDeEIsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsV0FBVyxDQUFDLEVBQUUsU0FDdEM7UUFBQztLQUFLO0lBQ1gsTUFBTSxJQUFJLFNBQVMsT0FBTyxDQUFDLEVBQUU7SUFDN0IsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLFNBQVM7QUFDakM7QUFFQSxNQUFNLFlBQVksQ0FBQyxPQUF5QjtJQUMxQyxNQUFNLFVBQVUsS0FBSyxLQUFLLENBQ3hCLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsU0FDN0I7UUFBQztLQUFLO0lBQ1gsT0FBTyxTQUFTLE9BQU8sQ0FBQyxFQUFFO0FBQzVCO0FBRUEsTUFBTSxPQUFlLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBaUI7SUFDL0MsTUFBTSxNQUFNLFVBQVU7SUFDdEIsTUFBTSxXQUFXLFlBQVksTUFBTTtJQUNuQyxNQUFNLE9BQU8sWUFBWSxNQUFNO0lBQy9CLE1BQU0sV0FBVyxZQUFZLE1BQU07SUFDbkMsTUFBTSxjQUFjLFlBQVksTUFBTTtJQUN0QyxNQUFNLFNBQVMsWUFBWSxNQUFNO0lBQ2pDLE1BQU0sVUFBVSxZQUFZLE1BQU07SUFDbEMsTUFBTSxXQUFXLFlBQVksTUFBTTtJQUNuQyxNQUFNLFFBQVEsWUFBWSxNQUFNO0lBQ2hDLE1BQU0sT0FBTyxZQUFZLE1BQU07SUFDL0IsTUFBTSxXQUFXLFlBQVksTUFBTTtJQUVuQyxPQUFPO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtJQUNGO0FBQ0Y7QUFFQSxNQUFNLGVBQWUsS0FBSyxNQUFNLENBQUMsQ0FBQyxNQUFjO0lBQzlDLE9BQ0UsQ0FBQyxJQUFJLFFBQVEsS0FBSyxhQUFhLElBQUksUUFBUSxLQUFLLFlBQVksUUFBUSxLQUNwRSxDQUFDLElBQUksSUFBSSxLQUFLLGFBQ1osSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLEtBQy9CLENBQ0UsSUFBSSxRQUFRLEtBQUssYUFDakIsSUFBSSxRQUFRLEtBQUssWUFBWSxRQUFRLEFBQ3ZDLEtBQUssQ0FDSCxJQUFJLFdBQVcsS0FBSyxhQUNwQixJQUFJLFdBQVcsS0FBSyxZQUFZLFdBQVcsQUFDN0MsS0FBSyxDQUNILElBQUksTUFBTSxLQUFLLGFBQ2YsSUFBSSxNQUFNLEtBQUssWUFBWSxNQUFNLEFBQ25DLEtBQUssQ0FDSCxJQUFJLE9BQU8sS0FBSyxhQUNoQixJQUFJLE9BQU8sS0FBSyxZQUFZLE9BQU8sQUFDckMsS0FBSyxDQUNILElBQUksUUFBUSxLQUFLLGFBQ2pCLElBQUksUUFBUSxLQUFLLFlBQVksUUFBUSxBQUN2QyxLQUFLLENBQ0gsSUFBSSxLQUFLLEtBQUssYUFDZCxJQUFJLEtBQUssS0FBSyxZQUFZLEtBQUssQUFDakMsS0FBSyxDQUNILElBQUksSUFBSSxLQUFLLGFBQ2IsSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLEFBQy9CLEtBQ0EsQ0FBQyxJQUFJLFFBQVEsS0FBSyxhQUNoQixJQUFJLFFBQVEsS0FBSyxZQUFZLFFBQVE7QUFFM0M7QUFFQSxRQUFRLEdBQUcsQ0FBQyJ9