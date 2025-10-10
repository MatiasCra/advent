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
    return (sue.children === undefined || sue.children === correctData.children) && (sue.cats === undefined || sue.cats > correctData.cats) && (sue.samoyeds === undefined || sue.samoyeds === correctData.samoyeds) && (sue.pomeranians === undefined || sue.pomeranians < correctData.pomeranians) && (sue.akitas === undefined || sue.akitas === correctData.akitas) && (sue.vizslas === undefined || sue.vizslas === correctData.vizslas) && (sue.goldfish === undefined || sue.goldfish < correctData.goldfish) && (sue.trees === undefined || sue.trees > correctData.trees) && (sue.cars === undefined || sue.cars === correctData.cars) && (sue.perfumes === undefined || sue.perfumes === correctData.perfumes);
});
console.log(matchingSues);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTYvYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKFwiLi9pbnB1dC50eHRcIik7XG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KFwiXFxuXCIpO1xubGluZXMucG9wKCk7XG5cbmludGVyZmFjZSBEYXRhIHtcbiAgbnVtOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGNoaWxkcmVuOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGNhdHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgc2Ftb3llZHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcG9tZXJhbmlhbnM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgYWtpdGFzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHZpenNsYXM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgZ29sZGZpc2g6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgdHJlZXM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgY2FyczogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwZXJmdW1lczogbnVtYmVyIHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBjb3JyZWN0RGF0YSA9IHtcbiAgbnVtOiB1bmRlZmluZWQsXG4gIGNoaWxkcmVuOiAzLFxuICBjYXRzOiA3LFxuICBzYW1veWVkczogMixcbiAgcG9tZXJhbmlhbnM6IDMsXG4gIGFraXRhczogMCxcbiAgdml6c2xhczogMCxcbiAgZ29sZGZpc2g6IDUsXG4gIHRyZWVzOiAzLFxuICBjYXJzOiAyLFxuICBwZXJmdW1lczogMSxcbn0gYXMgRGF0YTtcblxuY29uc3QgZ2V0UHJvcGVydHkgPSAobGluZTogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgbWF0Y2hlcyA9IGxpbmUubWF0Y2goXG4gICAgbmV3IFJlZ0V4cChgKD88PSR7cHJvcGVydHl9OiApKFswLTldKylgLCBcImdcIiksXG4gICkgfHwgW1wiLTFcIl07XG4gIGNvbnN0IG4gPSBwYXJzZUludChtYXRjaGVzWzBdKTtcbiAgcmV0dXJuIG4gIT09IC0xID8gbiA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IGdldE51bWJlciA9IChsaW5lOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBtYXRjaGVzID0gbGluZS5tYXRjaChcbiAgICBuZXcgUmVnRXhwKGAoPzw9U3VlICkoWzAtOV0rKWAsIFwiZ1wiKSxcbiAgKSB8fCBbXCItMVwiXTtcbiAgcmV0dXJuIHBhcnNlSW50KG1hdGNoZXNbMF0pO1xufTtcblxuY29uc3Qgc3VlczogRGF0YVtdID0gbGluZXMubWFwKChsaW5lOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgbnVtID0gZ2V0TnVtYmVyKGxpbmUpO1xuICBjb25zdCBjaGlsZHJlbiA9IGdldFByb3BlcnR5KGxpbmUsIFwiY2hpbGRyZW5cIik7XG4gIGNvbnN0IGNhdHMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImNhdHNcIik7XG4gIGNvbnN0IHNhbW95ZWRzID0gZ2V0UHJvcGVydHkobGluZSwgXCJzYW1veWVkc1wiKTtcbiAgY29uc3QgcG9tZXJhbmlhbnMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcInBvbWVyYW5pYW5zXCIpO1xuICBjb25zdCBha2l0YXMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImFraXRhc1wiKTtcbiAgY29uc3Qgdml6c2xhcyA9IGdldFByb3BlcnR5KGxpbmUsIFwidml6c2xhc1wiKTtcbiAgY29uc3QgZ29sZGZpc2ggPSBnZXRQcm9wZXJ0eShsaW5lLCBcImdvbGRmaXNoXCIpO1xuICBjb25zdCB0cmVlcyA9IGdldFByb3BlcnR5KGxpbmUsIFwidHJlZXNcIik7XG4gIGNvbnN0IGNhcnMgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImNhcnNcIik7XG4gIGNvbnN0IHBlcmZ1bWVzID0gZ2V0UHJvcGVydHkobGluZSwgXCJwZXJmdW1lc1wiKTtcblxuICByZXR1cm4ge1xuICAgIG51bSxcbiAgICBjaGlsZHJlbixcbiAgICBjYXRzLFxuICAgIHNhbW95ZWRzLFxuICAgIHBvbWVyYW5pYW5zLFxuICAgIGFraXRhcyxcbiAgICB2aXpzbGFzLFxuICAgIGdvbGRmaXNoLFxuICAgIHRyZWVzLFxuICAgIGNhcnMsXG4gICAgcGVyZnVtZXMsXG4gIH0gYXMgRGF0YTtcbn0pO1xuXG5jb25zdCBtYXRjaGluZ1N1ZXMgPSBzdWVzLmZpbHRlcigoc3VlOiBEYXRhKSA9PiB7XG4gIHJldHVybiAoXG4gICAgKHN1ZS5jaGlsZHJlbiA9PT0gdW5kZWZpbmVkIHx8IHN1ZS5jaGlsZHJlbiA9PT0gY29ycmVjdERhdGEuY2hpbGRyZW4pICYmXG4gICAgKHN1ZS5jYXRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS5jYXRzID4gY29ycmVjdERhdGEuY2F0cykgJiZcbiAgICAoXG4gICAgICBzdWUuc2Ftb3llZHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgc3VlLnNhbW95ZWRzID09PSBjb3JyZWN0RGF0YS5zYW1veWVkc1xuICAgICkgJiYgKFxuICAgICAgc3VlLnBvbWVyYW5pYW5zID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS5wb21lcmFuaWFucyA8IGNvcnJlY3REYXRhLnBvbWVyYW5pYW5zXG4gICAgKSAmJiAoXG4gICAgICBzdWUuYWtpdGFzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS5ha2l0YXMgPT09IGNvcnJlY3REYXRhLmFraXRhc1xuICAgICkgJiYgKFxuICAgICAgc3VlLnZpenNsYXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgc3VlLnZpenNsYXMgPT09IGNvcnJlY3REYXRhLnZpenNsYXNcbiAgICApICYmIChcbiAgICAgIHN1ZS5nb2xkZmlzaCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBzdWUuZ29sZGZpc2ggPCBjb3JyZWN0RGF0YS5nb2xkZmlzaFxuICAgICkgJiYgKFxuICAgICAgc3VlLnRyZWVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS50cmVlcyA+IGNvcnJlY3REYXRhLnRyZWVzXG4gICAgKSAmJiAoXG4gICAgICBzdWUuY2FycyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBzdWUuY2FycyA9PT0gY29ycmVjdERhdGEuY2Fyc1xuICAgICkgJiZcbiAgICAoc3VlLnBlcmZ1bWVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHN1ZS5wZXJmdW1lcyA9PT0gY29ycmVjdERhdGEucGVyZnVtZXMpXG4gICk7XG59KTtcblxuY29uc29sZS5sb2cobWF0Y2hpbmdTdWVzKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUN0QyxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7QUFDMUIsTUFBTSxHQUFHO0FBZ0JULE1BQU0sY0FBYztJQUNsQixLQUFLO0lBQ0wsVUFBVTtJQUNWLE1BQU07SUFDTixVQUFVO0lBQ1YsYUFBYTtJQUNiLFFBQVE7SUFDUixTQUFTO0lBQ1QsVUFBVTtJQUNWLE9BQU87SUFDUCxNQUFNO0lBQ04sVUFBVTtBQUNaO0FBRUEsTUFBTSxjQUFjLENBQUMsTUFBYyxXQUF5QztJQUMxRSxNQUFNLFVBQVUsS0FBSyxLQUFLLENBQ3hCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLFdBQVcsQ0FBQyxFQUFFLFNBQ3RDO1FBQUM7S0FBSztJQUNYLE1BQU0sSUFBSSxTQUFTLE9BQU8sQ0FBQyxFQUFFO0lBQzdCLE9BQU8sTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTO0FBQ2pDO0FBRUEsTUFBTSxZQUFZLENBQUMsT0FBeUI7SUFDMUMsTUFBTSxVQUFVLEtBQUssS0FBSyxDQUN4QixJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFNBQzdCO1FBQUM7S0FBSztJQUNYLE9BQU8sU0FBUyxPQUFPLENBQUMsRUFBRTtBQUM1QjtBQUVBLE1BQU0sT0FBZSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQWlCO0lBQy9DLE1BQU0sTUFBTSxVQUFVO0lBQ3RCLE1BQU0sV0FBVyxZQUFZLE1BQU07SUFDbkMsTUFBTSxPQUFPLFlBQVksTUFBTTtJQUMvQixNQUFNLFdBQVcsWUFBWSxNQUFNO0lBQ25DLE1BQU0sY0FBYyxZQUFZLE1BQU07SUFDdEMsTUFBTSxTQUFTLFlBQVksTUFBTTtJQUNqQyxNQUFNLFVBQVUsWUFBWSxNQUFNO0lBQ2xDLE1BQU0sV0FBVyxZQUFZLE1BQU07SUFDbkMsTUFBTSxRQUFRLFlBQVksTUFBTTtJQUNoQyxNQUFNLE9BQU8sWUFBWSxNQUFNO0lBQy9CLE1BQU0sV0FBVyxZQUFZLE1BQU07SUFFbkMsT0FBTztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7SUFDRjtBQUNGO0FBRUEsTUFBTSxlQUFlLEtBQUssTUFBTSxDQUFDLENBQUMsTUFBYztJQUM5QyxPQUNFLENBQUMsSUFBSSxRQUFRLEtBQUssYUFBYSxJQUFJLFFBQVEsS0FBSyxZQUFZLFFBQVEsS0FDcEUsQ0FBQyxJQUFJLElBQUksS0FBSyxhQUNaLElBQUksSUFBSSxHQUFHLFlBQVksSUFBSSxLQUM3QixDQUNFLElBQUksUUFBUSxLQUFLLGFBQ2pCLElBQUksUUFBUSxLQUFLLFlBQVksUUFBUSxBQUN2QyxLQUFLLENBQ0gsSUFBSSxXQUFXLEtBQUssYUFDcEIsSUFBSSxXQUFXLEdBQUcsWUFBWSxXQUFXLEFBQzNDLEtBQUssQ0FDSCxJQUFJLE1BQU0sS0FBSyxhQUNmLElBQUksTUFBTSxLQUFLLFlBQVksTUFBTSxBQUNuQyxLQUFLLENBQ0gsSUFBSSxPQUFPLEtBQUssYUFDaEIsSUFBSSxPQUFPLEtBQUssWUFBWSxPQUFPLEFBQ3JDLEtBQUssQ0FDSCxJQUFJLFFBQVEsS0FBSyxhQUNqQixJQUFJLFFBQVEsR0FBRyxZQUFZLFFBQVEsQUFDckMsS0FBSyxDQUNILElBQUksS0FBSyxLQUFLLGFBQ2QsSUFBSSxLQUFLLEdBQUcsWUFBWSxLQUFLLEFBQy9CLEtBQUssQ0FDSCxJQUFJLElBQUksS0FBSyxhQUNiLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxBQUMvQixLQUNBLENBQUMsSUFBSSxRQUFRLEtBQUssYUFDaEIsSUFBSSxRQUFRLEtBQUssWUFBWSxRQUFRO0FBRTNDO0FBRUEsUUFBUSxHQUFHLENBQUMifQ==