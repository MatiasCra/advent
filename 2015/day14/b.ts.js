const input = await Deno.readTextFile('./input.txt');
const lines = input.split('\n');
lines.pop();
const reindeers = lines.map((line)=>{
    const words = line.split(' ');
    const name = words[0];
    const speed = parseInt(words[3]);
    const timeAtSpeed = parseInt(words[6]);
    const restTime = parseInt(words[13]);
    return {
        name,
        speed,
        timeAtSpeed,
        restTime
    };
});
const min = (num1, num2)=>num1 < num2 ? num1 : num2;
let currnetSecond = 0;
const positions = new Map(reindeers.map((reindeer)=>[
        reindeer.name,
        0
    ]));
const points = new Map(reindeers.map((reindeer)=>[
        reindeer.name,
        0
    ]));
function advanceOneSecond() {
    ++currnetSecond;
    reindeers.forEach(({ name , speed , timeAtSpeed , restTime  })=>{
        const cicleTime = timeAtSpeed + restTime;
        const modulo = currnetSecond % cicleTime;
        if (0 < modulo && modulo <= timeAtSpeed) {
            positions.set(name, positions.get(name) + speed);
        }
    });
    let maxPosition = 0;
    let winningReindeers = [];
    positions.forEach((position, name)=>{
        if (position === maxPosition) winningReindeers.push(name);
        else if (position > maxPosition) {
            maxPosition = position;
            winningReindeers = [
                name
            ];
        }
    });
    winningReindeers.forEach((name)=>{
        points.set(name, points.get(name) + 1);
    });
    return maxPosition;
}
const seconds = 2503;
Array(seconds).fill(0).forEach((_)=>{
    advanceOneSecond();
});
let maxPoints = 0;
points.forEach((amount, _)=>{
    if (amount > maxPoints) {
        maxPoints = amount;
    }
});
console.log(points);
console.log(maxPoints);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTQvYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKCcuL2lucHV0LnR4dCcpXG5cbmludGVyZmFjZSBSZWluZGVlciB7XG4gIG5hbWU6IHN0cmluZ1xuICBzcGVlZDogbnVtYmVyXG4gIHRpbWVBdFNwZWVkOiBudW1iZXJcbiAgcmVzdFRpbWU6IG51bWJlclxufVxuXG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KCdcXG4nKVxubGluZXMucG9wKClcblxuY29uc3QgcmVpbmRlZXJzOiBSZWluZGVlcltdID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gIGNvbnN0IHdvcmRzID0gbGluZS5zcGxpdCgnICcpXG4gIGNvbnN0IG5hbWUgPSB3b3Jkc1swXVxuICBjb25zdCBzcGVlZCA9IHBhcnNlSW50KHdvcmRzWzNdKVxuICBjb25zdCB0aW1lQXRTcGVlZCA9IHBhcnNlSW50KHdvcmRzWzZdKVxuICBjb25zdCByZXN0VGltZSA9IHBhcnNlSW50KHdvcmRzWzEzXSlcbiAgcmV0dXJuIHsgbmFtZSwgc3BlZWQsIHRpbWVBdFNwZWVkLCByZXN0VGltZSB9XG59KVxuXG5jb25zdCBtaW4gPSAobnVtMTogbnVtYmVyLCBudW0yOiBudW1iZXIpOiBudW1iZXIgPT4gKG51bTEgPCBudW0yID8gbnVtMSA6IG51bTIpXG5cbmxldCBjdXJybmV0U2Vjb25kID0gMFxuY29uc3QgcG9zaXRpb25zID0gbmV3IE1hcChyZWluZGVlcnMubWFwKChyZWluZGVlcikgPT4gW3JlaW5kZWVyLm5hbWUsIDBdKSlcbmNvbnN0IHBvaW50cyA9IG5ldyBNYXAocmVpbmRlZXJzLm1hcCgocmVpbmRlZXIpID0+IFtyZWluZGVlci5uYW1lLCAwXSkpXG5cbmZ1bmN0aW9uIGFkdmFuY2VPbmVTZWNvbmQoKSB7XG4gICsrY3Vycm5ldFNlY29uZFxuICByZWluZGVlcnMuZm9yRWFjaCgoeyBuYW1lLCBzcGVlZCwgdGltZUF0U3BlZWQsIHJlc3RUaW1lIH0pID0+IHtcbiAgICBjb25zdCBjaWNsZVRpbWUgPSB0aW1lQXRTcGVlZCArIHJlc3RUaW1lXG4gICAgY29uc3QgbW9kdWxvID0gY3Vycm5ldFNlY29uZCAlIGNpY2xlVGltZVxuICAgIGlmICgwIDwgbW9kdWxvICYmIG1vZHVsbyA8PSB0aW1lQXRTcGVlZCkge1xuICAgICAgcG9zaXRpb25zLnNldChuYW1lLCA8bnVtYmVyPnBvc2l0aW9ucy5nZXQobmFtZSkgKyBzcGVlZClcbiAgICB9XG4gIH0pXG5cbiAgbGV0IG1heFBvc2l0aW9uID0gMFxuICBsZXQgd2lubmluZ1JlaW5kZWVyczogc3RyaW5nW10gPSBbXVxuICBwb3NpdGlvbnMuZm9yRWFjaCgocG9zaXRpb24sIG5hbWUpID0+IHtcbiAgICBpZiAocG9zaXRpb24gPT09IG1heFBvc2l0aW9uKSB3aW5uaW5nUmVpbmRlZXJzLnB1c2gobmFtZSlcbiAgICBlbHNlIGlmIChwb3NpdGlvbiA+IG1heFBvc2l0aW9uKSB7XG4gICAgICBtYXhQb3NpdGlvbiA9IHBvc2l0aW9uXG4gICAgICB3aW5uaW5nUmVpbmRlZXJzID0gW25hbWVdXG4gICAgfVxuICB9KVxuXG4gIHdpbm5pbmdSZWluZGVlcnMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIHBvaW50cy5zZXQobmFtZSwgPG51bWJlcj5wb2ludHMuZ2V0KG5hbWUpICsgMSlcbiAgfSlcbiAgcmV0dXJuIG1heFBvc2l0aW9uXG59XG5cbmNvbnN0IHNlY29uZHMgPSAyNTAzXG5BcnJheShzZWNvbmRzKVxuICAuZmlsbCgwKVxuICAuZm9yRWFjaCgoXykgPT4ge1xuICAgIGFkdmFuY2VPbmVTZWNvbmQoKVxuICB9KVxuXG5sZXQgbWF4UG9pbnRzID0gMFxucG9pbnRzLmZvckVhY2goKGFtb3VudCwgXykgPT4ge1xuICBpZiAoYW1vdW50ID4gbWF4UG9pbnRzKSB7XG4gICAgbWF4UG9pbnRzID0gYW1vdW50XG4gIH1cbn0pXG5cbmNvbnNvbGUubG9nKHBvaW50cylcbmNvbnNvbGUubG9nKG1heFBvaW50cylcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQVN0QyxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7QUFDMUIsTUFBTSxHQUFHO0FBRVQsTUFBTSxZQUF3QixNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQVM7SUFDaEQsTUFBTSxRQUFRLEtBQUssS0FBSyxDQUFDO0lBQ3pCLE1BQU0sT0FBTyxLQUFLLENBQUMsRUFBRTtJQUNyQixNQUFNLFFBQVEsU0FBUyxLQUFLLENBQUMsRUFBRTtJQUMvQixNQUFNLGNBQWMsU0FBUyxLQUFLLENBQUMsRUFBRTtJQUNyQyxNQUFNLFdBQVcsU0FBUyxLQUFLLENBQUMsR0FBRztJQUNuQyxPQUFPO1FBQUU7UUFBTTtRQUFPO1FBQWE7SUFBUztBQUM5QztBQUVBLE1BQU0sTUFBTSxDQUFDLE1BQWMsT0FBMEIsT0FBTyxPQUFPLE9BQU8sSUFBSTtBQUU5RSxJQUFJLGdCQUFnQjtBQUNwQixNQUFNLFlBQVksSUFBSSxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsV0FBYTtRQUFDLFNBQVMsSUFBSTtRQUFFO0tBQUU7QUFDeEUsTUFBTSxTQUFTLElBQUksSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFdBQWE7UUFBQyxTQUFTLElBQUk7UUFBRTtLQUFFO0FBRXJFLFNBQVMsbUJBQW1CO0lBQzFCLEVBQUU7SUFDRixVQUFVLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSSxFQUFFLE1BQUssRUFBRSxZQUFXLEVBQUUsU0FBUSxFQUFFLEdBQUs7UUFDNUQsTUFBTSxZQUFZLGNBQWM7UUFDaEMsTUFBTSxTQUFTLGdCQUFnQjtRQUMvQixJQUFJLElBQUksVUFBVSxVQUFVLGFBQWE7WUFDdkMsVUFBVSxHQUFHLENBQUMsTUFBTSxBQUFRLFVBQVUsR0FBRyxDQUFDLFFBQVE7UUFDcEQsQ0FBQztJQUNIO0lBRUEsSUFBSSxjQUFjO0lBQ2xCLElBQUksbUJBQTZCLEVBQUU7SUFDbkMsVUFBVSxPQUFPLENBQUMsQ0FBQyxVQUFVLE9BQVM7UUFDcEMsSUFBSSxhQUFhLGFBQWEsaUJBQWlCLElBQUksQ0FBQzthQUMvQyxJQUFJLFdBQVcsYUFBYTtZQUMvQixjQUFjO1lBQ2QsbUJBQW1CO2dCQUFDO2FBQUs7UUFDM0IsQ0FBQztJQUNIO0lBRUEsaUJBQWlCLE9BQU8sQ0FBQyxDQUFDLE9BQVM7UUFDakMsT0FBTyxHQUFHLENBQUMsTUFBTSxBQUFRLE9BQU8sR0FBRyxDQUFDLFFBQVE7SUFDOUM7SUFDQSxPQUFPO0FBQ1Q7QUFFQSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxTQUNILElBQUksQ0FBQyxHQUNMLE9BQU8sQ0FBQyxDQUFDLElBQU07SUFDZDtBQUNGO0FBRUYsSUFBSSxZQUFZO0FBQ2hCLE9BQU8sT0FBTyxDQUFDLENBQUMsUUFBUSxJQUFNO0lBQzVCLElBQUksU0FBUyxXQUFXO1FBQ3RCLFlBQVk7SUFDZCxDQUFDO0FBQ0g7QUFFQSxRQUFRLEdBQUcsQ0FBQztBQUNaLFFBQVEsR0FBRyxDQUFDIn0=