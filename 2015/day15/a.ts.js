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
        return statsMult(addedStats);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTUvYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKFwiLi9pbnB1dC50eHRcIik7XG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KFwiXFxuXCIpO1xubGluZXMucG9wKCk7XG5cbmludGVyZmFjZSBTdGF0cyB7XG4gIGNhcGFjaXR5OiBudW1iZXI7XG4gIGR1cmFiaWxpdHk6IG51bWJlcjtcbiAgZmxhdm9yOiBudW1iZXI7XG4gIHRleHR1cmU6IG51bWJlcjtcbiAgY2Fsb3JpZXM6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIEluZ3JlZGllbnQgZXh0ZW5kcyBTdGF0cyB7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuY29uc3QgZ2V0UHJvcGVydHkgPSAobGluZTogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgY29uc3QgbWF0Y2hlcyA9IGxpbmUubWF0Y2goXG4gICAgbmV3IFJlZ0V4cChgKD88PSR7cHJvcGVydHl9ICkoKC0/KVswLTldKylgLCBcImdcIiksXG4gICkgfHwgW1wiMFwiXTtcbiAgcmV0dXJuIHBhcnNlSW50KG1hdGNoZXNbMF0pO1xufTtcblxuY29uc3QgaW5ncmVkaWVudHMgPSBsaW5lcy5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xuICBjb25zdCBuYW1lID0gbGluZS5zbGljZSgwLCBsaW5lLnNlYXJjaChcIjpcIikpO1xuICBjb25zdCBjYXBhY2l0eSA9IGdldFByb3BlcnR5KGxpbmUsIFwiY2FwYWNpdHlcIik7XG4gIGNvbnN0IGR1cmFiaWxpdHkgPSBnZXRQcm9wZXJ0eShsaW5lLCBcImR1cmFiaWxpdHlcIik7XG4gIGNvbnN0IGZsYXZvciA9IGdldFByb3BlcnR5KGxpbmUsIFwiZmxhdm9yXCIpO1xuICBjb25zdCB0ZXh0dXJlID0gZ2V0UHJvcGVydHkobGluZSwgXCJ0ZXh0dXJlXCIpO1xuICBjb25zdCBjYWxvcmllcyA9IGdldFByb3BlcnR5KGxpbmUsIFwiY2Fsb3JpZXNcIik7XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBjYXBhY2l0eSxcbiAgICBkdXJhYmlsaXR5LFxuICAgIGZsYXZvcixcbiAgICB0ZXh0dXJlLFxuICAgIGNhbG9yaWVzLFxuICB9IGFzIEluZ3JlZGllbnQ7XG59KTtcblxuY29uc3QgbWF4ID0gPFQ+KGVsZW0xOiBULCBlbGVtMjogVCk6IFQgPT4gKGVsZW0xID4gZWxlbTIgPyBlbGVtMSA6IGVsZW0yKTtcblxuY29uc3QgbXVsdGlwbHlTdGF0cyA9IChjdXJyZW50OiBJbmdyZWRpZW50LCBuOiBudW1iZXIpOiBJbmdyZWRpZW50ID0+IHtcbiAgY29uc3QgY2FwYWNpdHkgPSBjdXJyZW50LmNhcGFjaXR5ICogbjtcbiAgY29uc3QgZHVyYWJpbGl0eSA9IGN1cnJlbnQuZHVyYWJpbGl0eSAqIG47XG4gIGNvbnN0IGZsYXZvciA9IGN1cnJlbnQuZmxhdm9yICogbjtcbiAgY29uc3QgdGV4dHVyZSA9IGN1cnJlbnQudGV4dHVyZSAqIG47XG4gIGNvbnN0IGNhbG9yaWVzID0gY3VycmVudC5jYWxvcmllcyAqIG47XG4gIHJldHVybiB7XG4gICAgY2FwYWNpdHksXG4gICAgZHVyYWJpbGl0eSxcbiAgICBmbGF2b3IsXG4gICAgdGV4dHVyZSxcbiAgICBjYWxvcmllcyxcbiAgICBuYW1lOiBjdXJyZW50Lm5hbWUsXG4gIH0gYXMgSW5ncmVkaWVudDtcbn07XG5cbmNvbnN0IGFkZFN0YXRzID0gKHN0YXRzMTogU3RhdHMsIHN0YXRzMjogU3RhdHMpOiBTdGF0cyA9PiB7XG4gIHJldHVybiB7XG4gICAgY2FwYWNpdHk6IHN0YXRzMS5jYXBhY2l0eSArIHN0YXRzMi5jYXBhY2l0eSxcbiAgICBkdXJhYmlsaXR5OiBzdGF0czEuZHVyYWJpbGl0eSArIHN0YXRzMi5kdXJhYmlsaXR5LFxuICAgIGZsYXZvcjogc3RhdHMxLmZsYXZvciArIHN0YXRzMi5mbGF2b3IsXG4gICAgdGV4dHVyZTogc3RhdHMxLnRleHR1cmUgKyBzdGF0czIudGV4dHVyZSxcbiAgICBjYWxvcmllczogc3RhdHMxLmNhbG9yaWVzICsgc3RhdHMyLmNhbG9yaWVzLFxuICB9IGFzIFN0YXRzO1xufTtcblxuY29uc3Qgc3RhdHNNdWx0ID0gKHN0YXRzOiBTdGF0cykgPT5cbiAgbWF4KDAsIHN0YXRzLmNhcGFjaXR5KSAqIG1heCgwLCBzdGF0cy5kdXJhYmlsaXR5KSAqIG1heCgwLCBzdGF0cy5mbGF2b3IpICpcbiAgbWF4KDAsIHN0YXRzLnRleHR1cmUpO1xuXG5jb25zdCBzcG9vbnMgPSAxMDA7XG5cbmZ1bmN0aW9uIHNvbHZlTWF4U2NvcmUoXG4gIHByZXZpb3VzOiBJbmdyZWRpZW50W10sXG4gIHJlbWFpbmluZzogSW5ncmVkaWVudFtdLFxuICByZW1haW5pbmdTcG9vbnM6IG51bWJlcixcbik6IG51bWJlciB7XG4gIGlmIChyZW1haW5pbmcubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3QgY3VycmVudE11bHRpcGxpZWQgPSBtdWx0aXBseVN0YXRzKFxuICAgICAgcmVtYWluaW5nLnBvcCgpIGFzIEluZ3JlZGllbnQsXG4gICAgICByZW1haW5pbmdTcG9vbnMsXG4gICAgKTtcbiAgICBwcmV2aW91cy5wdXNoKGN1cnJlbnRNdWx0aXBsaWVkKTtcbiAgICBjb25zdCBhZGRlZFN0YXRzID0gcHJldmlvdXMucmVkdWNlKChhY3VtOiBTdGF0cywgaW5nOiBJbmdyZWRpZW50KSA9PiB7XG4gICAgICByZXR1cm4gYWRkU3RhdHMoYWN1bSwgaW5nIGFzIFN0YXRzKTtcbiAgICB9LCB7IGNhcGFjaXR5OiAwLCBkdXJhYmlsaXR5OiAwLCBmbGF2b3I6IDAsIHRleHR1cmU6IDAsIGNhbG9yaWVzOiAwIH0pO1xuICAgIHJldHVybiBzdGF0c011bHQoYWRkZWRTdGF0cyk7XG4gIH1cblxuICBsZXQgbWF4U2NvcmUgPSAwO1xuICBsZXQgbWF4U3Bvb25zID0gMDtcblxuICAvLyBTZWFyY2ggYW1tb3VudCBvZiBzcG9vbnMgdG8gYXNzaW5nIHRvIGN1cnJlbnQgaW5ncmVkaWVudCwgMCB0byByZW1haW5pbmdTcG9vbnNcbiAgQXJyYXkocmVtYWluaW5nU3Bvb25zICsgMSkuZmlsbCgwKS5mb3JFYWNoKChfLCBhc3NpZ25lZFNwb29uczogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgcmVtYWluaW5nVGhlbiA9IFsuLi5yZW1haW5pbmddO1xuICAgIGNvbnN0IGN1cnJlbnRNdWx0aXBsaWVkID0gbXVsdGlwbHlTdGF0cyhcbiAgICAgIHJlbWFpbmluZ1RoZW4ucG9wKCkgYXMgSW5ncmVkaWVudCxcbiAgICAgIGFzc2lnbmVkU3Bvb25zLFxuICAgICk7XG5cbiAgICBjb25zdCBwcmV2aW91c1RoZW4gPSBbLi4ucHJldmlvdXMsIGN1cnJlbnRNdWx0aXBsaWVkXTtcbiAgICBjb25zdCBldmVudHVhbFNjb3JlID0gc29sdmVNYXhTY29yZShcbiAgICAgIHByZXZpb3VzVGhlbixcbiAgICAgIHJlbWFpbmluZ1RoZW4sXG4gICAgICByZW1haW5pbmdTcG9vbnMgLSBhc3NpZ25lZFNwb29ucyxcbiAgICApO1xuXG4gICAgaWYgKGV2ZW50dWFsU2NvcmUgPiBtYXhTY29yZSkge1xuICAgICAgbWF4U2NvcmUgPSBldmVudHVhbFNjb3JlO1xuICAgICAgbWF4U3Bvb25zID0gYXNzaWduZWRTcG9vbnM7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBjdXJyZW50TXVsdGlwbGllZCA9IG11bHRpcGx5U3RhdHMoXG4gICAgcmVtYWluaW5nLnBvcCgpIGFzIEluZ3JlZGllbnQsXG4gICAgbWF4U3Bvb25zLFxuICApO1xuICBwcmV2aW91cy5wdXNoKGN1cnJlbnRNdWx0aXBsaWVkKTtcbiAgcmV0dXJuIHNvbHZlTWF4U2NvcmUocHJldmlvdXMsIHJlbWFpbmluZywgcmVtYWluaW5nU3Bvb25zIC0gbWF4U3Bvb25zKTtcbn1cblxuY29uc29sZS5sb2coc29sdmVNYXhTY29yZShbXSwg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