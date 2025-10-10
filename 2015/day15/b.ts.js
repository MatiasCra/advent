const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
lines.pop();
const getProperty = (line, property)=>{
    const matches = line.match(new RegExp(`(?<=${property} )((-?)[0-9]+)`, "g")) || [
        "0"
    ];
    return parseInt(matches[0]);
};
const ingredients = lines.map((line)=>{
    const name = line.slice(0, line.search(":"));
    const capacity = getProperty(line, "capacity");
    const durability = getProperty(line, "durability");
    const flavor = getProperty(line, "flavor");
    const texture = getProperty(line, "texture");
    const calories = getProperty(line, "calories");
    return {
        name,
        capacity,
        durability,
        flavor,
        texture,
        calories
    };
});
const max = (elem1, elem2)=>elem1 > elem2 ? elem1 : elem2;
const multiplyStats = (current, n)=>{
    const capacity = current.capacity * n;
    const durability = current.durability * n;
    const flavor = current.flavor * n;
    const texture = current.texture * n;
    const calories = current.calories * n;
    return {
        capacity,
        durability,
        flavor,
        texture,
        calories,
        name: current.name
    };
};
const addStats = (stats1, stats2)=>{
    return {
        capacity: stats1.capacity + stats2.capacity,
        durability: stats1.durability + stats2.durability,
        flavor: stats1.flavor + stats2.flavor,
        texture: stats1.texture + stats2.texture,
        calories: stats1.calories + stats2.calories
    };
};
const statsMult = (stats)=>max(0, stats.capacity) * max(0, stats.durability) * max(0, stats.flavor) * max(0, stats.texture);
const spoons = 100;
function solveMaxScore(previous, remaining, remainingSpoons) {
    if (remaining.length === 1) {
        const currentMultiplied = multiplyStats(remaining.pop(), remainingSpoons);
        previous.push(currentMultiplied);
        const addedStats = previous.reduce((acum, ing)=>{
            return addStats(acum, ing);
        }, {
            capacity: 0,
            durability: 0,
            flavor: 0,
            texture: 0,
            calories: 0
        });
        return addedStats.calories === 500 ? statsMult(addedStats) : 0;
    }
    let maxScore = 0;
    let maxSpoons = 0;
    // Search ammount of spoons to assing to current ingredient, 0 to remainingSpoons
    Array(remainingSpoons + 1).fill(0).forEach((_, assignedSpoons)=>{
        const remainingThen = [
            ...remaining
        ];
        const currentMultiplied = multiplyStats(remainingThen.pop(), assignedSpoons);
        const previousThen = [
            ...previous,
            currentMultiplied
        ];
        const eventualScore = solveMaxScore(previousThen, remainingThen, remainingSpoons - assignedSpoons);
        if (eventualScore > maxScore) {
            maxScore = eventualScore;
            maxSpoons = assignedSpoons;
        }
    });
    const currentMultiplied = multiplyStats(remaining.pop(), maxSpoons);
    previous.push(currentMultiplied);
    return solveMaxScore(previous, remaining, remainingSpoons - maxSpoons);
}
console.log(solveMaxScore([], ingredients, spoons));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTUvYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKFwiLi9pbnB1dC50eHRcIik7XG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KFwiXFxuXCIpO1xubGluZXMucG9wKCk7XG5cbmludGVyZmFjZSBTdGF0cyB7XG4gIGNhcGFjaXR5OiBudW1iZXI7XG4gIGR1cmFiaWxpdHk6IG51bWJlcjtcbiAgZmxhdm9yOiBudW1iZXI7XG4gIHRleHR1cmU6IG51bWJlcjtcbiAgY2Fsb3JpZXM6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIEluZ3JlZGllbnQgZXh0ZW5kcyBTdGF0cyB7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuY29uc3QgZ2V0UHJvcGVydHkgPSAobGluZTogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgY29uc3QgbWF0Y2hlcyA9IGxpbmUubWF0Y2goXG4gICAgbmV3IFJlZ0V4cChgKD88PSR7cHJvcGVydHl9ICkoKC0/KVswLTldKylgLCBcImdcIiksXG4gICkgfHwgW1wiMFwiXTtcbiAgcmV0dXJuIHBhcnNlSW50KG1hdGNoZXNbMF0pO1xufTtcblxuY29uc3QgaW5ncmVkaWVudHMgPSBsaW5lcy5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xuICBjb25zdCBuYW1lID0gbGluZS5zbGljZSgwLCBsaW5lLnNlYXJjaChcIjpcIikpO1xuICBjb25zdCBjYXBhY2l0eSA9IGdldFByb3BlcnR5KGxpbmUsIFwiY2FwYWNpdHlcIik7XG4gIGNvbnN0IGR1cmFiaWxpdHkgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImR1cmFiaWxpdHlcIik7XG4gIGNvbnN0IGZsYXZvciA9IGdldFByb3BlcnR5KGxpbmUsIFwiZmxhdm9yXCIpO1xuICBjb25zdCB0ZXh0dXJlID0gZ2V0UHJvcGVydHkobGluZSwgXCJ0ZXh0dXJlXCIpO1xuICBjb25zdCBjYWxvcmllcyA9IGdldFByb3BlcnR5KGxpbmUsIFwiY2Fsb3JpZXNcIik7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBjYXBhY2l0eSxcbiAgICBkdXJhYmlsaXR5LFxuICAgIGZsYXZvcixcbiAgICB0ZXh0dXJlLFxuICAgIGNhbG9yaWVzLFxuICB9IGFzIEluZ3JlZGllbnQ7XG59KTtcblxuY29uc3QgbWF4ID0gPFQ+KGVsZW0xOiBULCBlbGVtMjogVCk6IFQgPT4gKGVsZW0xID4gZWxlbTIgPyBlbGVtMSA6IGVsZW0yKTtcblxuY29uc3QgbXVsdGlwbHlTdGF0cyA9IChjdXJyZW50OiBJbmdyZWRpZW50LCBuOiBudW1iZXIpOiBJbmdyZWRpZW50ID0+IHtcbiAgY29uc3QgY2FwYWNpdHkgPSBjdXJyZW50LmNhcGFjaXR5ICogbjtcbiAgY29uc3QgZHVyYWJpbGl0eSA9IGN1cnJlbnQuZHVyYWJpbGl0eSAqIG47XG4gIGNvbnN0IGZsYXZvciA9IGN1cnJlbnQuZmxhdm9yICogbjtcbiAgY29uc3QgdGV4dHVyZSA9IGN1cnJlbnQudGV4dHVyZSAqIG47XG4gIGNvbnN0IGNhbG9yaWVzID0gY3VycmVudC5jYWxvcmllcyAqIG47XG4gIHJldHVybiB7XG4gICAgY2FwYWNpdHksXG4gICAgZHVyYWJpbGl0eSxcbiAgICBmbGF2b3IsXG4gICAgdGV4dHVyZSxcbiAgICBjYWxvcmllcyxcbiAgICBuYW1lOiBjdXJyZW50Lm5hbWUsXG4gIH0gYXMgSW5ncmVkaWVudDtcbn07XG5cbmNvbnN0IGFkZFN0YXRzID0gKHN0YXRzMTogU3RhdHMsIHN0YXRzMjogU3RhdHMpOiBTdGF0cyA9PiB7XG4gIHJldHVybiB7XG4gICAgY2FwYWNpdHk6IHN0YXRzMS5jYXBhY2l0eSArIHN0YXRzMi5jYXBhY2l0eSxcbiAgICBkdXJhYmlsaXR5OiBzdGF0czEuZHVyYWJpbGl0eSArIHN0YXRzMi5kdXJhYmlsaXR5LFxuICAgIGZsYXZvcjogc3RhdHMxLmZsYXZvciArIHN0YXRzMi5mbGF2b3IsXG4gICAgdGV4dHVyZTogc3RhdHMxLnRleHR1cmUgKyBzdGF0czIudGV4dHVyZSxcbiAgICBjYWxvcmllczogc3RhdHMxLmNhbG9yaWVzICsgc3RhdHMyLmNhbG9yaWVzLFxuICB9IGFzIFN0YXRzO1xufTtcblxuY29uc3Qgc3RhdHNNdWx0ID0gKHN0YXRzOiBTdGF0cykgPT5cbiAgbWF4KDAsIHN0YXRzLmNhcGFjaXR5KSAqIG1heCgwLCBzdGF0cy5kdXJhYmlsaXR5KSAqIG1heCgwLCBzdGF0cy5mbGF2b3IpICpcbiAgbWF4KDAsIHN0YXRzLnRleHR1cmUpO1xuXG5jb25zdCBzcG9vbnMgPSAxMDA7XG5cbmZ1bmN0aW9uIHNvbHZlTWF4U2NvcmUoXG4gIHByZXZpb3VzOiBJbmdyZWRpZW50W10sXG4gIHJlbWFpbmluZzogSW5ncmVkaWVudFtdLFxuICByZW1haW5pbmdTcG9vbnM6IG51bWJlcixcbik6IG51bWJlciB7XG4gIGlmIChyZW1haW5pbmcubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3QgY3VycmVudE11bHRpcGxpZWQgPSBtdWx0aXBseVN0YXRzKFxuICAgICAgcmVtYWluaW5nLnBvcCgpIGFzIEluZ3JlZGllbnQsXG4gICAgICByZW1haW5pbmdTcG9vbnMsXG4gICAgKTtcbiAgICBwcmV2aW91cy5wdXNoKGN1cnJlbnRNdWx0aXBsaWVkKTtcbiAgICBjb25zdCBhZGRlZFN0YXRzID0gcHJldmlvdXMucmVkdWNlKChhY3VtOiBTdGF0cywgaW5nOiBJbmdyZWRpZW50KSA9PiB7XG4gICAgICByZXR1cm4gYWRkU3RhdHMoYWN1bSwgaW5nIGFzIFN0YXRzKTtcbiAgICB9LCB7IGNhcGFjaXR5OiAwLCBkdXJhYmlsaXR5OiAwLCBmbGF2b3I6IDAsIHRleHR1cmU6IDAsIGNhbG9yaWVzOiAwIH0pO1xuICAgIHJldHVybiBhZGRlZFN0YXRzLmNhbG9yaWVzID09PSA1MDAgPyBzdGF0c011bHQoYWRkZWRTdGF0cykgOiAwO1xuICB9XG5cbiAgbGV0IG1heFNjb3JlID0gMDtcbiAgbGV0IG1heFNwb29ucyA9IDA7XG5cbiAgLy8gU2VhcmNoIGFtbW91bnQgb2Ygc3Bvb25zIHRvIGFzc2luZyB0byBjdXJyZW50IGluZ3JlZGllbnQsIDAgdG8gcmVtYWluaW5nU3Bvb25zXG4gIEFycmF5KHJlbWFpbmluZ1Nwb29ucyArIDEpLmZpbGwoMCkuZm9yRWFjaCgoXywgYXNzaWduZWRTcG9vbnM6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHJlbWFpbmluZ1RoZW4gPSBbLi4ucmVtYWluaW5nXTtcbiAgICBjb25zdCBjdXJyZW50TXVsdGlwbGllZCA9IG11bHRpcGx5U3RhdHMoXG4gICAgICByZW1haW5pbmdUaGVuLnBvcCgpIGFzIEluZ3JlZGllbnQsXG4gICAgICBhc3NpZ25lZFNwb29ucyxcbiAgICApO1xuXG4gICAgY29uc3QgcHJldmlvdXNUaGVuID0gWy4uLnByZXZpb3VzLCBjdXJyZW50TXVsdGlwbGllZF07XG4gICAgY29uc3QgZXZlbnR1YWxTY29yZSA9IHNvbHZlTWF4U2NvcmUoXG4gICAgICBwcmV2aW91c1RoZW4sXG4gICAgICByZW1haW5pbmdUaGVuLFxuICAgICAgcmVtYWluaW5nU3Bvb25zIC0gYXNzaWduZWRTcG9vbnMsXG4gICAgKTtcblxuICAgIGlmIChldmVudHVhbFNjb3JlID4gbWF4U2NvcmUpIHtcbiAgICAgIG1heFNjb3JlID0gZXZlbnR1YWxTY29yZTtcbiAgICAgIG1heFNwb29ucyA9IGFzc2lnbmVkU3Bvb25zO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgY3VycmVudE11bHRpcGxpZWQgPSBtdWx0aXBseVN0YXRzKFxuICAgIHJlbWFpbmluZy5wb3AoKSBhcyBJbmdyZWRpZW50LFxuICAgIG1heFNwb29ucyxcbiAgKTtcbiAgcHJldmlvdXMucHVzaChjdXJyZW50TXVsdGlwbGllZCk7XG4gIHJldHVybiBzb2x2ZU1heFNjb3JlKHByZXZpb3VzLCByZW1haW5pbmcsIHJlbWFpbmluZ1Nwb29ucyAtIG1heFNwb29ucyk7XG59XG5cbmNvbnNvbGUubG9nKHNvbHZlTWF4U2NvcmUoW10sIGluZ3JlZGllbnRzLCBzcG9vbnMpKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUN0QyxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7QUFDMUIsTUFBTSxHQUFHO0FBY1QsTUFBTSxjQUFjLENBQUMsTUFBYyxXQUE2QjtJQUM5RCxNQUFNLFVBQVUsS0FBSyxLQUFLLENBQ3hCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLGNBQWMsQ0FBQyxFQUFFLFNBQ3pDO1FBQUM7S0FBSTtJQUNWLE9BQU8sU0FBUyxPQUFPLENBQUMsRUFBRTtBQUM1QjtBQUVBLE1BQU0sY0FBYyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQWlCO0lBQzlDLE1BQU0sT0FBTyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDO0lBQ3ZDLE1BQU0sV0FBVyxZQUFZLE1BQU07SUFDbkMsTUFBTSxhQUFhLFlBQVksTUFBTTtJQUNyQyxNQUFNLFNBQVMsWUFBWSxNQUFNO0lBQ2pDLE1BQU0sVUFBVSxZQUFZLE1BQU07SUFDbEMsTUFBTSxXQUFXLFlBQVksTUFBTTtJQUNuQyxPQUFPO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0lBQ0Y7QUFDRjtBQUVBLE1BQU0sTUFBTSxDQUFJLE9BQVUsUUFBaUIsUUFBUSxRQUFRLFFBQVEsS0FBSztBQUV4RSxNQUFNLGdCQUFnQixDQUFDLFNBQXFCLElBQTBCO0lBQ3BFLE1BQU0sV0FBVyxRQUFRLFFBQVEsR0FBRztJQUNwQyxNQUFNLGFBQWEsUUFBUSxVQUFVLEdBQUc7SUFDeEMsTUFBTSxTQUFTLFFBQVEsTUFBTSxHQUFHO0lBQ2hDLE1BQU0sVUFBVSxRQUFRLE9BQU8sR0FBRztJQUNsQyxNQUFNLFdBQVcsUUFBUSxRQUFRLEdBQUc7SUFDcEMsT0FBTztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNLFFBQVEsSUFBSTtJQUNwQjtBQUNGO0FBRUEsTUFBTSxXQUFXLENBQUMsUUFBZSxTQUF5QjtJQUN4RCxPQUFPO1FBQ0wsVUFBVSxPQUFPLFFBQVEsR0FBRyxPQUFPLFFBQVE7UUFDM0MsWUFBWSxPQUFPLFVBQVUsR0FBRyxPQUFPLFVBQVU7UUFDakQsUUFBUSxPQUFPLE1BQU0sR0FBRyxPQUFPLE1BQU07UUFDckMsU0FBUyxPQUFPLE9BQU8sR0FBRyxPQUFPLE9BQU87UUFDeEMsVUFBVSxPQUFPLFFBQVEsR0FBRyxPQUFPLFFBQVE7SUFDN0M7QUFDRjtBQUVBLE1BQU0sWUFBWSxDQUFDLFFBQ2pCLElBQUksR0FBRyxNQUFNLFFBQVEsSUFBSSxJQUFJLEdBQUcsTUFBTSxVQUFVLElBQUksSUFBSSxHQUFHLE1BQU0sTUFBTSxJQUN2RSxJQUFJLEdBQUcsTUFBTSxPQUFPO0FBRXRCLE1BQU0sU0FBUztBQUVmLFNBQVMsY0FDUCxRQUFzQixFQUN0QixTQUF1QixFQUN2QixlQUF1QixFQUNmO0lBQ1IsSUFBSSxVQUFVLE1BQU0sS0FBSyxHQUFHO1FBQzFCLE1BQU0sb0JBQW9CLGNBQ3hCLFVBQVUsR0FBRyxJQUNiO1FBRUYsU0FBUyxJQUFJLENBQUM7UUFDZCxNQUFNLGFBQWEsU0FBUyxNQUFNLENBQUMsQ0FBQyxNQUFhLE1BQW9CO1lBQ25FLE9BQU8sU0FBUyxNQUFNO1FBQ3hCLEdBQUc7WUFBRSxVQUFVO1lBQUcsWUFBWTtZQUFHLFFBQVE7WUFBRyxTQUFTO1lBQUcsVUFBVTtRQUFFO1FBQ3BFLE9BQU8sV0FBVyxRQUFRLEtBQUssTUFBTSxVQUFVLGNBQWMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxXQUFXO0lBQ2YsSUFBSSxZQUFZO0lBRWhCLGlGQUFpRjtJQUNqRixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsaUJBQTJCO1FBQ3hFLE1BQU0sZ0JBQWdCO2VBQUk7U0FBVTtRQUNwQyxNQUFNLG9CQUFvQixjQUN4QixjQUFjLEdBQUcsSUFDakI7UUFHRixNQUFNLGVBQWU7ZUFBSTtZQUFVO1NBQWtCO1FBQ3JELE1BQU0sZ0JBQWdCLGNBQ3BCLGNBQ0EsZUFDQSxrQkFBa0I7UUFHcEIsSUFBSSxnQkFBZ0IsVUFBVTtZQUM1QixXQUFXO1lBQ1gsWUFBWTtRQUNkLENBQUM7SUFDSDtJQUVBLE1BQU0sb0JBQW9CLGNBQ3hCLFVBQVUsR0FBRyxJQUNiO0lBRUYsU0FBUyxJQUFJLENBQUM7SUFDZCxPQUFPLGNBQWMsVUFBVSxXQUFXLGtCQUFrQjtBQUM5RDtBQUVBLFFBQVEsR0FBRyxDQUFDLGNBQWMsRUFBRSxFQUFFLGFBQWEifQ==