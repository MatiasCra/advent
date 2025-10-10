const input = await Deno.readTextFile('./input.txt');
const lines = input.split('\n');
lines.pop();
// Parse input
const relations = lines.map((line)=>{
    const endFirstGuest = line.search(' ');
    const firstGuest = line.slice(0, endFirstGuest);
    const startSecondGuest = line.search(/\s(?!.*\s)/) + 1 // Last whitespace + 1
    ;
    const secondGuest = line.slice(startSecondGuest, line.length - 1);
    let happiness = parseInt((line.match(new RegExp(/[0-9]+/, 'g')) || [
        ''
    ])[0]);
    if (line.search(/\w\swould\slose/) !== -1) {
        happiness = -happiness;
    }
    return {
        firstGuest,
        secondGuest,
        happiness
    };
});
// Make guests list
const guests = new Set();
relations.forEach(({ firstGuest , secondGuest , happiness  })=>{
    if (!guests.has(firstGuest)) guests.add(firstGuest);
    if (!guests.has(secondGuest)) guests.add(secondGuest);
});
// Map ids
let currentId = -1;
const nextId = ()=>++currentId;
const ids = new Map();
guests.forEach((guest)=>{
    ids.set(guest, nextId());
});
const idOf = (guest)=>ids.get(guest);
// Make relation matrix
const matrix = new Array(guests.size);
ids.forEach((id, _)=>{
    matrix[id] = new Array(guests.size);
    ids.forEach((id2, _)=>{
        matrix[id][id2] = 0;
    });
});
relations.forEach(({ firstGuest , secondGuest , happiness  })=>{
    matrix[idOf(firstGuest)][idOf(secondGuest)] = happiness;
});
// Max
function maxHappiness(currentGuest, remaining, positions) {
    if (remaining.size === 0) return matrix[idOf(positions[0])][idOf(positions[positions.length - 1])] + matrix[idOf(positions[positions.length - 1])][idOf(positions[0])];
    let max = 0;
    let maxCurrToNext = 0;
    remaining.forEach((guest)=>{
        const remainingThen = new Set(remaining);
        remainingThen.delete(guest);
        const positionsThen = Array.from(positions);
        positions.push(guest);
        const happinessThen = maxHappiness(guest, remainingThen, positionsThen);
        const currToNext = matrix[idOf(currentGuest)][idOf(guest)] + matrix[idOf(guest)][idOf(currentGuest)];
        if (happinessThen >= max && currToNext > maxCurrToNext) {
            max = happinessThen;
            maxCurrToNext = currToNext;
        }
    });
    return max + maxCurrToNext;
}
let max = 0;
guests.forEach((guest)=>{
    const positions = [
        guest
    ];
    const remaining = new Set(guests);
    remaining.delete(guest);
    const happiness = maxHappiness(guest, remaining, positions);
    if (happiness > max) max = happiness;
});
console.log(max);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTMvYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKCcuL2lucHV0LnR4dCcpXG5cbmNvbnN0IGxpbmVzID0gaW5wdXQuc3BsaXQoJ1xcbicpXG5saW5lcy5wb3AoKVxuXG5pbnRlcmZhY2UgUmVsYXRpb24ge1xuICBmaXN0R3Vlc3Q6IHN0cmluZ1xuICBzZWNvbmRHdWVzdDogc3RyaW5nXG4gIGhhcHBpbmVzczogbnVtYmVyXG59XG5cbi8vIFBhcnNlIGlucHV0XG5jb25zdCByZWxhdGlvbnMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgY29uc3QgZW5kRmlyc3RHdWVzdCA9IGxpbmUuc2VhcmNoKCcgJylcbiAgY29uc3QgZmlyc3RHdWVzdCA9IGxpbmUuc2xpY2UoMCwgZW5kRmlyc3RHdWVzdClcblxuICBjb25zdCBzdGFydFNlY29uZEd1ZXN0ID0gbGluZS5zZWFyY2goL1xccyg/IS4qXFxzKS8pICsgMSAvLyBMYXN0IHdoaXRlc3BhY2UgKyAxXG4gIGNvbnN0IHNlY29uZEd1ZXN0ID0gbGluZS5zbGljZShzdGFydFNlY29uZEd1ZXN0LCBsaW5lLmxlbmd0aCAtIDEpXG5cbiAgbGV0IGhhcHBpbmVzcyA9IHBhcnNlSW50KChsaW5lLm1hdGNoKG5ldyBSZWdFeHAoL1swLTldKy8sICdnJykpIHx8IFsnJ10pWzBdKVxuICBpZiAobGluZS5zZWFyY2goL1xcd1xcc3dvdWxkXFxzbG9zZS8pICE9PSAtMSkge1xuICAgIGhhcHBpbmVzcyA9IC1oYXBwaW5lc3NcbiAgfVxuXG4gIHJldHVybiB7IGZpcnN0R3Vlc3QsIHNlY29uZEd1ZXN0LCBoYXBwaW5lc3MgfVxufSlcblxuLy8gTWFrZSBndWVzdHMgbGlzdFxuY29uc3QgZ3Vlc3RzID0gbmV3IFNldDxzdHJpbmc+KClcbnJlbGF0aW9ucy5mb3JFYWNoKCh7IGZpcnN0R3Vlc3QsIHNlY29uZEd1ZXN0LCBoYXBwaW5lc3MgfSkgPT4ge1xuICBpZiAoIWd1ZXN0cy5oYXMoZmlyc3RHdWVzdCkpIGd1ZXN0cy5hZGQoZmlyc3RHdWVzdClcblxuICBpZiAoIWd1ZXN0cy5oYXMoc2Vjb25kR3Vlc3QpKSBndWVzdHMuYWRkKHNlY29uZEd1ZXN0KVxufSlcblxuLy8gTWFwIGlkc1xubGV0IGN1cnJlbnRJZCA9IC0xXG5jb25zdCBuZXh0SWQgPSAoKSA9PiArK2N1cnJlbnRJZFxuY29uc3QgaWRzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKVxuZ3Vlc3RzLmZvckVhY2goKGd1ZXN0KSA9PiB7XG4gIGlkcy5zZXQoZ3Vlc3QsIG5leHRJZCgpKVxufSlcbmNvbnN0IGlkT2YgPSAoZ3Vlc3Q6IHN0cmluZyk6IG51bWJlciA9PiBpZHMuZ2V0KGd1ZXN0KSBhcyBudW1iZXJcblxuLy8gTWFrZSByZWxhdGlvbiBtYXRyaXhcbmNvbnN0IG1hdHJpeCA9IG5ldyBBcnJheTxBcnJheTxudW1iZXI+PihndWVzdHMuc2l6ZSlcbmlkcy5mb3JFYWNoKChpZCwgXykgPT4ge1xuICBtYXRyaXhbaWRdID0gbmV3IEFycmF5PG51bWJlcj4oZ3Vlc3RzLnNpemUpXG4gIGlkcy5mb3JFYWNoKChpZDIsIF8pID0+IHtcbiAgICBtYXRyaXhbaWRdW2lkMl0gPSAwXG4gIH0pXG59KVxuXG5yZWxhdGlvbnMuZm9yRWFjaCgoeyBmaXJzdEd1ZXN0LCBzZWNvbmRHdWVzdCwgaGFwcGluZXNzIH0pID0+IHtcbiAgbWF0cml4W2lkT2YoZmlyc3RHdWVzdCldW2lkT2Yoc2Vjb25kR3Vlc3QpXSA9IGhhcHBpbmVzc1xufSlcblxuLy8gTWF4XG5mdW5jdGlvbiBtYXhIYXBwaW5lc3MoXG4gIGN1cnJlbnRHdWVzdDogc3RyaW5nLFxuICByZW1haW5pbmc6IFNldDxzdHJpbmc+LFxuICBwb3NpdGlvbnM6IEFycmF5PHN0cmluZz5cbikge1xuICBpZiAocmVtYWluaW5nLnNpemUgPT09IDApXG4gICAgcmV0dXJuIChcbiAgICAgIG1hdHJpeFtpZE9mKHBvc2l0aW9uc1swXSldW2lkT2YocG9zaXRpb25zW3Bvc2l0aW9ucy5sZW5ndGggLSAxXSldICtcbiAgICAgIG1hdHJpeFtpZE9mKHBvc2l0aW9uc1twb3NpdGlvbnMubGVuZ3RoIC0gMV0pXVtpZE9mKHBvc2l0aW9uc1swXSldXG4gICAgKVxuXG4gIGxldCBtYXggPSAwXG4gIGxldCBtYXhDdXJyVG9OZXh0ID0gMFxuICByZW1haW5pbmcuZm9yRWFjaCgoZ3Vlc3Q6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHJlbWFpbmluZ1RoZW4gPSBuZXcgU2V0KHJlbWFpbmluZylcbiAgICByZW1haW5pbmdUaGVuLmRlbGV0ZShndWVzdClcbiAgICBjb25zdCBwb3NpdGlvbnNUaGVuID0gQXJyYXkuZnJvbShwb3NpdGlvbnMpXG4gICAgcG9zaXRpb25zLnB1c2goZ3Vlc3QpXG4gICAgY29uc3QgaGFwcGluZXNzVGhlbiA9IG1heEhhcHBpbmVzcyhndWVzdCwgcmVtYWluaW5nVGhlbiwgcG9zaXRpb25zVGhlbilcblxuICAgIGNvbnN0IGN1cnJUb05leHQgPVxuICAgICAgbWF0cml4W2lkT2YoY3VycmVudEd1ZXN0KV1baWRPZihndWVzdCldICtcbiAgICAgIG1hdHJpeFtpZE9mKGd1ZXN0KV1baWRPZihjdXJyZW50R3Vlc3QpXVxuXG4gICAgaWYgKGhhcHBpbmVzc1RoZW4gPj0gbWF4ICYmIGN1cnJUb05leHQgPiBtYXhDdXJyVG9OZXh0KSB7XG4gICAgICBtYXggPSBoYXBwaW5lc3NUaGVuXG4gICAgICBtYXhDdXJyVG9OZXh0ID0gY3VyclRvTmV4dFxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gbWF4ICsgbWF4Q3VyclRvTmV4dFxufVxuXG5sZXQgbWF4ID0gMFxuZ3Vlc3RzLmZvckVhY2goKGd1ZXN0KSA9PiB7XG4gIGNvbnN0IHBvc2l0aW9ucyA9IFtndWVzdF1cbiAgY29uc3QgcmVtYWluaW5nID0gbmV3IFNldChndWVzdHMpXG4gIHJlbWFpbmluZy5kZWxldGUoZ3Vlc3QpXG4gIGNvbnN0IGhhcHBpbmVzcyA9IG1heEhhcHBpbmVzcyhndWVzdCwgcmVtYWluaW5nLCBwb3NpdGlvbnMpXG4gIGlmIChoYXBwaW5lc3MgPiBtYXgpXG4gICAgbWF4ID0gaGFwcGluZXNzXG59KVxuXG5jb25zb2xlLmxvZyhtYXgpXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRLE1BQU0sS0FBSyxZQUFZLENBQUM7QUFFdEMsTUFBTSxRQUFRLE1BQU0sS0FBSyxDQUFDO0FBQzFCLE1BQU0sR0FBRztBQVFULGNBQWM7QUFDZCxNQUFNLFlBQVksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFTO0lBQ3BDLE1BQU0sZ0JBQWdCLEtBQUssTUFBTSxDQUFDO0lBQ2xDLE1BQU0sYUFBYSxLQUFLLEtBQUssQ0FBQyxHQUFHO0lBRWpDLE1BQU0sbUJBQW1CLEtBQUssTUFBTSxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQjs7SUFDN0UsTUFBTSxjQUFjLEtBQUssS0FBSyxDQUFDLGtCQUFrQixLQUFLLE1BQU0sR0FBRztJQUUvRCxJQUFJLFlBQVksU0FBUyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksT0FBTyxVQUFVLFNBQVM7UUFBQztLQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzNFLElBQUksS0FBSyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRztRQUN6QyxZQUFZLENBQUM7SUFDZixDQUFDO0lBRUQsT0FBTztRQUFFO1FBQVk7UUFBYTtJQUFVO0FBQzlDO0FBRUEsbUJBQW1CO0FBQ25CLE1BQU0sU0FBUyxJQUFJO0FBQ25CLFVBQVUsT0FBTyxDQUFDLENBQUMsRUFBRSxXQUFVLEVBQUUsWUFBVyxFQUFFLFVBQVMsRUFBRSxHQUFLO0lBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxhQUFhLE9BQU8sR0FBRyxDQUFDO0lBRXhDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxjQUFjLE9BQU8sR0FBRyxDQUFDO0FBQzNDO0FBRUEsVUFBVTtBQUNWLElBQUksWUFBWSxDQUFDO0FBQ2pCLE1BQU0sU0FBUyxJQUFNLEVBQUU7QUFDdkIsTUFBTSxNQUFNLElBQUk7QUFDaEIsT0FBTyxPQUFPLENBQUMsQ0FBQyxRQUFVO0lBQ3hCLElBQUksR0FBRyxDQUFDLE9BQU87QUFDakI7QUFDQSxNQUFNLE9BQU8sQ0FBQyxRQUEwQixJQUFJLEdBQUcsQ0FBQztBQUVoRCx1QkFBdUI7QUFDdkIsTUFBTSxTQUFTLElBQUksTUFBcUIsT0FBTyxJQUFJO0FBQ25ELElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFNO0lBQ3JCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxNQUFjLE9BQU8sSUFBSTtJQUMxQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBTTtRQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRztJQUNwQjtBQUNGO0FBRUEsVUFBVSxPQUFPLENBQUMsQ0FBQyxFQUFFLFdBQVUsRUFBRSxZQUFXLEVBQUUsVUFBUyxFQUFFLEdBQUs7SUFDNUQsTUFBTSxDQUFDLEtBQUssWUFBWSxDQUFDLEtBQUssYUFBYSxHQUFHO0FBQ2hEO0FBRUEsTUFBTTtBQUNOLFNBQVMsYUFDUCxZQUFvQixFQUNwQixTQUFzQixFQUN0QixTQUF3QixFQUN4QjtJQUNBLElBQUksVUFBVSxJQUFJLEtBQUssR0FDckIsT0FDRSxNQUFNLENBQUMsS0FBSyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxTQUFTLENBQUMsVUFBVSxNQUFNLEdBQUcsRUFBRSxFQUFFLEdBQ2pFLE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxVQUFVLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxFQUFFLEVBQUU7SUFHckUsSUFBSSxNQUFNO0lBQ1YsSUFBSSxnQkFBZ0I7SUFDcEIsVUFBVSxPQUFPLENBQUMsQ0FBQyxRQUFrQjtRQUNuQyxNQUFNLGdCQUFnQixJQUFJLElBQUk7UUFDOUIsY0FBYyxNQUFNLENBQUM7UUFDckIsTUFBTSxnQkFBZ0IsTUFBTSxJQUFJLENBQUM7UUFDakMsVUFBVSxJQUFJLENBQUM7UUFDZixNQUFNLGdCQUFnQixhQUFhLE9BQU8sZUFBZTtRQUV6RCxNQUFNLGFBQ0osTUFBTSxDQUFDLEtBQUssY0FBYyxDQUFDLEtBQUssT0FBTyxHQUN2QyxNQUFNLENBQUMsS0FBSyxPQUFPLENBQUMsS0FBSyxjQUFjO1FBRXpDLElBQUksaUJBQWlCLE9BQU8sYUFBYSxlQUFlO1lBQ3RELE1BQU07WUFDTixnQkFBZ0I7UUFDbEIsQ0FBQztJQUNIO0lBRUEsT0FBTyxNQUFNO0FBQ2Y7QUFFQSxJQUFJLE1BQU07QUFDVixPQUFPLE9BQU8sQ0FBQyxDQUFDLFFBQVU7SUFDeEIsTUFBTSxZQUFZO1FBQUM7S0FBTTtJQUN6QixNQUFNLFlBQVksSUFBSSxJQUFJO0lBQzFCLFVBQVUsTUFBTSxDQUFDO0lBQ2pCLE1BQU0sWUFBWSxhQUFhLE9BQU8sV0FBVztJQUNqRCxJQUFJLFlBQVksS0FDZCxNQUFNO0FBQ1Y7QUFFQSxRQUFRLEdBQUcsQ0FBQyJ9