const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
lines.pop();
let lights = lines.map((line)=>{
    return Array.from(line).map((char)=>{
        return char === "#" ? 1 : 0;
    });
});
console.log(lights);
const steps = 1;
const size = lights.length;
function getNeighborsOn(row, column) {
    let lightsOn = 0;
    for(let i = row - 1; i < row + 2; i++){
        for(let j = column - 1; j < column + 2; j++){
            if (!(i === row && j === column) && i >= 0 && i < size && j >= 0 && j < size && lights[i][j]) {
                lightsOn++;
            }
        }
    }
    // console.log(`Light (${row}, ${column}) has ${lightsOn} neighbors on`)
    return lightsOn;
}
Array(steps).fill(0).forEach((_, i)=>{
    // New empty lights matrix
    const newLights = Array(size).fill(Array(size).fill(0));
    lights.forEach((lightsRow, row)=>{
        lightsRow.forEach((light, column)=>{
            newLights[row][column] = light;
            const neighborsOn = getNeighborsOn(row, column);
            console.log(`Light (${row}, ${column}): ${light}`);
            console.log(`Neighbors on: ${neighborsOn}`);
            if (light) {
                // If its on, it turns off when there is not 2 or 3 neighbors on
                if (!(neighborsOn === 2 || neighborsOn === 3)) {
                    newLights[row][column] = 0;
                    console.log("Turning off");
                }
            } else {
                // If its off, it turns on when there is exactly 3 neighbors on
                if (neighborsOn === 3) {
                    newLights[row][column] = 1;
                    console.log("Turning on");
                }
            }
            console.log(newLights[row][column]);
        });
    });
    lights = [
        ...newLights
    ];
    console.log("After step", i + 1);
    console.log(newLights[0][0]);
});
const totalLightsOn = lights.reduce((n, arr)=>n + arr.reduce((n, val)=>n + val), 0);
console.log(totalLightsOn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTgvYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKFwiLi9pbnB1dC50eHRcIik7XG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KFwiXFxuXCIpO1xubGluZXMucG9wKCk7XG5cbmxldCBsaWdodHM6IG51bWJlcltdW10gPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgcmV0dXJuIEFycmF5LmZyb20obGluZSkubWFwKChjaGFyOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhciA9PT0gXCIjXCIgPyAxIDogMDtcbiAgfSk7XG59KTtcblxuY29uc29sZS5sb2cobGlnaHRzKTtcblxuY29uc3Qgc3RlcHMgPSAxO1xuY29uc3Qgc2l6ZSA9IGxpZ2h0cy5sZW5ndGg7XG5cbmZ1bmN0aW9uIGdldE5laWdoYm9yc09uKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xuICBsZXQgbGlnaHRzT24gPSAwO1xuICBmb3IgKGxldCBpID0gcm93IC0gMTsgaSA8IHJvdyArIDI7IGkrKykge1xuICAgIGZvciAobGV0IGogPSBjb2x1bW4gLSAxOyBqIDwgY29sdW1uICsgMjsgaisrKSB7XG4gICAgICBpZiAoXG4gICAgICAgICEoaSA9PT0gcm93ICYmIGogPT09IGNvbHVtbikgJiYgaSA+PSAwICYmIGkgPCBzaXplICYmIGogPj0gMCAmJlxuICAgICAgICBqIDwgc2l6ZSAmJiBsaWdodHNbaV1bal1cbiAgICAgICkge1xuICAgICAgICBsaWdodHNPbisrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGNvbnNvbGUubG9nKGBMaWdodCAoJHtyb3d9LCAke2NvbHVtbn0pIGhhcyAke2xpZ2h0c09ufSBuZWlnaGJvcnMgb25gKVxuICByZXR1cm4gbGlnaHRzT247XG59XG5cbkFycmF5KHN0ZXBzKS5maWxsKDApLmZvckVhY2goKF8sIGkpID0+IHtcbiAgLy8gTmV3IGVtcHR5IGxpZ2h0cyBtYXRyaXhcbiAgY29uc3QgbmV3TGlnaHRzID0gQXJyYXkoc2l6ZSkuZmlsbChBcnJheShzaXplKS5maWxsKDApKTtcblxuICBsaWdodHMuZm9yRWFjaCgobGlnaHRzUm93LCByb3cpID0+IHtcbiAgICBsaWdodHNSb3cuZm9yRWFjaCgobGlnaHQsIGNvbHVtbikgPT4ge1xuICAgICAgbmV3TGlnaHRzW3Jvd11bY29sdW1uXSA9IGxpZ2h0XG5cbiAgICAgIGNvbnN0IG5laWdoYm9yc09uID0gZ2V0TmVpZ2hib3JzT24ocm93LCBjb2x1bW4pO1xuICAgICAgY29uc29sZS5sb2coYExpZ2h0ICgke3Jvd30sICR7Y29sdW1ufSk6ICR7bGlnaHR9YCk7XG4gICAgICBjb25zb2xlLmxvZyhgTmVpZ2hib3JzIG9uOiAke25laWdoYm9yc09ufWApO1xuICAgICAgaWYgKGxpZ2h0KSB7XG4gICAgICAgIC8vIElmIGl0cyBvbiwgaXQgdHVybnMgb2ZmIHdoZW4gdGhlcmUgaXMgbm90IDIgb3IgMyBuZWlnaGJvcnMgb25cbiAgICAgICAgaWYgKCEobmVpZ2hib3JzT24gPT09IDIgfHwgbmVpZ2hib3JzT24gPT09IDMpKSB7XG4gICAgICAgICAgbmV3TGlnaHRzW3Jvd11bY29sdW1uXSA9IDA7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuaW5nIG9mZlwiKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBpdHMgb2ZmLCBpdCB0dXJucyBvbiB3aGVuIHRoZXJlIGlzIGV4YWN0bHkgMyBuZWlnaGJvcnMgb25cbiAgICAgICAgaWYgKG5laWdoYm9yc09uID09PSAzKSB7XG4gICAgICAgICAgbmV3TGlnaHRzW3Jvd11bY29sdW1uXSA9IDE7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUdXJuaW5nIG9uXCIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKG5ld0xpZ2h0c1tyb3ddW2NvbHVtbl0pO1xuICAgIH0pO1xuICB9KTtcblxuICBsaWdodHMgPSBbLi4ubmV3TGlnaHRzXTtcblxuICBjb25zb2xlLmxvZyhcIkFmdGVyIHN0ZXBcIiwgaSArIDEpO1xuICBjb25zb2xlLmxvZyhuZXdMaWdodHNbMF1bMF0pO1xufSk7XG5cbmNvbnN0IHRvdGFsTGlnaHRzT24gPSBsaWdodHMucmVkdWNlKFxuICAobiwgYXJyKSA9PiBuICsgYXJyLnJlZHVjZSgobiwgdmFsKSA9PiBuICsgdmFsKSxcbiAgMCxcbik7XG5cbmNvbnNvbGUubG9nKHRvdGFsTGlnaHRzT24pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxNQUFNLEtBQUssWUFBWSxDQUFDO0FBQ3RDLE1BQU0sUUFBUSxNQUFNLEtBQUssQ0FBQztBQUMxQixNQUFNLEdBQUc7QUFFVCxJQUFJLFNBQXFCLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBUztJQUMzQyxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBaUI7UUFDNUMsT0FBTyxTQUFTLE1BQU0sSUFBSSxDQUFDO0lBQzdCO0FBQ0Y7QUFFQSxRQUFRLEdBQUcsQ0FBQztBQUVaLE1BQU0sUUFBUTtBQUNkLE1BQU0sT0FBTyxPQUFPLE1BQU07QUFFMUIsU0FBUyxlQUFlLEdBQVcsRUFBRSxNQUFjLEVBQUU7SUFDbkQsSUFBSSxXQUFXO0lBQ2YsSUFBSyxJQUFJLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxHQUFHLElBQUs7UUFDdEMsSUFBSyxJQUFJLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxHQUFHLElBQUs7WUFDNUMsSUFDRSxDQUFDLENBQUMsTUFBTSxPQUFPLE1BQU0sTUFBTSxLQUFLLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUMzRCxJQUFJLFFBQVEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQ3hCO2dCQUNBO1lBQ0YsQ0FBQztRQUNIO0lBQ0Y7SUFFQSx3RUFBd0U7SUFDeEUsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBTTtJQUNyQywwQkFBMEI7SUFDMUIsTUFBTSxZQUFZLE1BQU0sTUFBTSxJQUFJLENBQUMsTUFBTSxNQUFNLElBQUksQ0FBQztJQUVwRCxPQUFPLE9BQU8sQ0FBQyxDQUFDLFdBQVcsTUFBUTtRQUNqQyxVQUFVLE9BQU8sQ0FBQyxDQUFDLE9BQU8sU0FBVztZQUNuQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUV6QixNQUFNLGNBQWMsZUFBZSxLQUFLO1lBQ3hDLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sR0FBRyxFQUFFLE1BQU0sQ0FBQztZQUNqRCxRQUFRLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUM7WUFDMUMsSUFBSSxPQUFPO2dCQUNULGdFQUFnRTtnQkFDaEUsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssZ0JBQWdCLENBQUMsR0FBRztvQkFDN0MsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUc7b0JBQ3pCLFFBQVEsR0FBRyxDQUFDO2dCQUNkLENBQUM7WUFDSCxPQUFPO2dCQUNMLCtEQUErRDtnQkFDL0QsSUFBSSxnQkFBZ0IsR0FBRztvQkFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUc7b0JBQ3pCLFFBQVEsR0FBRyxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1lBQ0QsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPO1FBQ3BDO0lBQ0Y7SUFFQSxTQUFTO1dBQUk7S0FBVTtJQUV2QixRQUFRLEdBQUcsQ0FBQyxjQUFjLElBQUk7SUFDOUIsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzdCO0FBRUEsTUFBTSxnQkFBZ0IsT0FBTyxNQUFNLENBQ2pDLENBQUMsR0FBRyxNQUFRLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQVEsSUFBSSxNQUMzQztBQUdGLFFBQVEsR0FBRyxDQUFDIn0=