const input = await Deno.readTextFile('./inputB.txt');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTMvYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGF3YWl0IERlbm8ucmVhZFRleHRGaWxlKCcuL2lucHV0Qi50eHQnKVxuXG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KCdcXG4nKVxubGluZXMucG9wKClcblxuaW50ZXJmYWNlIFJlbGF0aW9uIHtcbiAgZmlzdEd1ZXN0OiBzdHJpbmdcbiAgc2Vjb25kR3Vlc3Q6IHN0cmluZ1xuICBoYXBwaW5lc3M6IG51bWJlclxufVxuXG4vLyBQYXJzZSBpbnB1dFxuY29uc3QgcmVsYXRpb25zID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gIGNvbnN0IGVuZEZpcnN0R3Vlc3QgPSBsaW5lLnNlYXJjaCgnICcpXG4gIGNvbnN0IGZpcnN0R3Vlc3QgPSBsaW5lLnNsaWNlKDAsIGVuZEZpcnN0R3Vlc3QpXG5cbiAgY29uc3Qgc3RhcnRTZWNvbmRHdWVzdCA9IGxpbmUuc2VhcmNoKC9cXHMoPyEuKlxccykvKSArIDEgLy8gTGFzdCB3aGl0ZXNwYWNlICsgMVxuICBjb25zdCBzZWNvbmRHdWVzdCA9IGxpbmUuc2xpY2Uoc3RhcnRTZWNvbmRHdWVzdCwgbGluZS5sZW5ndGggLSAxKVxuXG4gIGxldCBoYXBwaW5lc3MgPSBwYXJzZUludCgobGluZS5tYXRjaChuZXcgUmVnRXhwKC9bMC05XSsvLCAnZycpKSB8fCBbJyddKVswXSlcbiAgaWYgKGxpbmUuc2VhcmNoKC9cXHdcXHN3b3VsZFxcc2xvc2UvKSAhPT0gLTEpIHtcbiAgICBoYXBwaW5lc3MgPSAtaGFwcGluZXNzXG4gIH1cblxuICByZXR1cm4geyBmaXJzdEd1ZXN0LCBzZWNvbmRHdWVzdCwgaGFwcGluZXNzIH1cbn0pXG5cbi8vIE1ha2UgZ3Vlc3RzIGxpc3RcbmNvbnN0IGd1ZXN0cyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5yZWxhdGlvbnMuZm9yRWFjaCgoeyBmaXJzdEd1ZXN0LCBzZWNvbmRHdWVzdCwgaGFwcGluZXNzIH0pID0+IHtcbiAgaWYgKCFndWVzdHMuaGFzKGZpcnN0R3Vlc3QpKSBndWVzdHMuYWRkKGZpcnN0R3Vlc3QpXG5cbiAgaWYgKCFndWVzdHMuaGFzKHNlY29uZEd1ZXN0KSkgZ3Vlc3RzLmFkZChzZWNvbmRHdWVzdClcbn0pXG5cbi8vIE1hcCBpZHNcbmxldCBjdXJyZW50SWQgPSAtMVxuY29uc3QgbmV4dElkID0gKCkgPT4gKytjdXJyZW50SWRcbmNvbnN0IGlkcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KClcbmd1ZXN0cy5mb3JFYWNoKChndWVzdCkgPT4ge1xuICBpZHMuc2V0KGd1ZXN0LCBuZXh0SWQoKSlcbn0pXG5jb25zdCBpZE9mID0gKGd1ZXN0OiBzdHJpbmcpOiBudW1iZXIgPT4gaWRzLmdldChndWVzdCkgYXMgbnVtYmVyXG5cbi8vIE1ha2UgcmVsYXRpb24gbWF0cml4XG5jb25zdCBtYXRyaXggPSBuZXcgQXJyYXk8QXJyYXk8bnVtYmVyPj4oZ3Vlc3RzLnNpemUpXG5pZHMuZm9yRWFjaCgoaWQsIF8pID0+IHtcbiAgbWF0cml4W2lkXSA9IG5ldyBBcnJheTxudW1iZXI+KGd1ZXN0cy5zaXplKVxuICBpZHMuZm9yRWFjaCgoaWQyLCBfKSA9PiB7XG4gICAgbWF0cml4W2lkXVtpZDJdID0gMFxuICB9KVxufSlcblxucmVsYXRpb25zLmZvckVhY2goKHsgZmlyc3RHdWVzdCwgc2Vjb25kR3Vlc3QsIGhhcHBpbmVzcyB9KSA9PiB7XG4gIG1hdHJpeFtpZE9mKGZpcnN0R3Vlc3QpXVtpZE9mKHNlY29uZEd1ZXN0KV0gPSBoYXBwaW5lc3Ncbn0pXG5cbi8vIE1heFxuZnVuY3Rpb24gbWF4SGFwcGluZXNzKFxuICBjdXJyZW50R3Vlc3Q6IHN0cmluZyxcbiAgcmVtYWluaW5nOiBTZXQ8c3RyaW5nPixcbiAgcG9zaXRpb25zOiBBcnJheTxzdHJpbmc+XG4pIHtcbiAgaWYgKHJlbWFpbmluZy5zaXplID09PSAwKVxuICAgIHJldHVybiAoXG4gICAgICBtYXRyaXhbaWRPZihwb3NpdGlvbnNbMF0pXVtpZE9mKHBvc2l0aW9uc1twb3NpdGlvbnMubGVuZ3RoIC0gMV0pXSArXG4gICAgICBtYXRyaXhbaWRPZihwb3NpdGlvbnNbcG9zaXRpb25zLmxlbmd0aCAtIDFdKV1baWRPZihwb3NpdGlvbnNbMF0pXVxuICAgIClcblxuICBsZXQgbWF4ID0gMFxuICBsZXQgbWF4Q3VyclRvTmV4dCA9IDBcbiAgcmVtYWluaW5nLmZvckVhY2goKGd1ZXN0OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCByZW1haW5pbmdUaGVuID0gbmV3IFNldChyZW1haW5pbmcpXG4gICAgcmVtYWluaW5nVGhlbi5kZWxldGUoZ3Vlc3QpXG4gICAgY29uc3QgcG9zaXRpb25zVGhlbiA9IEFycmF5LmZyb20ocG9zaXRpb25zKVxuICAgIHBvc2l0aW9ucy5wdXNoKGd1ZXN0KVxuICAgIGNvbnN0IGhhcHBpbmVzc1RoZW4gPSBtYXhIYXBwaW5lc3MoZ3Vlc3QsIHJlbWFpbmluZ1RoZW4sIHBvc2l0aW9uc1RoZW4pXG5cbiAgICBjb25zdCBjdXJyVG9OZXh0ID1cbiAgICAgIG1hdHJpeFtpZE9mKGN1cnJlbnRHdWVzdCldW2lkT2YoZ3Vlc3QpXSArXG4gICAgICBtYXRyaXhbaWRPZihndWVzdCldW2lkT2YoY3VycmVudEd1ZXN0KV1cblxuICAgIGlmIChoYXBwaW5lc3NUaGVuID49IG1heCAmJiBjdXJyVG9OZXh0ID4gbWF4Q3VyclRvTmV4dCkge1xuICAgICAgbWF4ID0gaGFwcGluZXNzVGhlblxuICAgICAgbWF4Q3VyclRvTmV4dCA9IGN1cnJUb05leHRcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIG1heCArIG1heEN1cnJUb05leHRcbn1cblxubGV0IG1heCA9IDBcbmd1ZXN0cy5mb3JFYWNoKChndWVzdCkgPT4ge1xuICBjb25zdCBwb3NpdGlvbnMgPSBbZ3Vlc3RdXG4gIGNvbnN0IHJlbWFpbmluZyA9IG5ldyBTZXQoZ3Vlc3RzKVxuICByZW1haW5pbmcuZGVsZXRlKGd1ZXN0KVxuICBjb25zdCBoYXBwaW5lc3MgPSBtYXhIYXBwaW5lc3MoZ3Vlc3QsIHJlbWFpbmluZywgcG9zaXRpb25zKVxuICBpZiAoaGFwcGluZXNzID4gbWF4KSBtYXggPSBoYXBwaW5lc3Ncbn0pXG5cbmNvbnNvbGUubG9nKG1heClcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUV0QyxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7QUFDMUIsTUFBTSxHQUFHO0FBUVQsY0FBYztBQUNkLE1BQU0sWUFBWSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQVM7SUFDcEMsTUFBTSxnQkFBZ0IsS0FBSyxNQUFNLENBQUM7SUFDbEMsTUFBTSxhQUFhLEtBQUssS0FBSyxDQUFDLEdBQUc7SUFFakMsTUFBTSxtQkFBbUIsS0FBSyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsc0JBQXNCOztJQUM3RSxNQUFNLGNBQWMsS0FBSyxLQUFLLENBQUMsa0JBQWtCLEtBQUssTUFBTSxHQUFHO0lBRS9ELElBQUksWUFBWSxTQUFTLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxPQUFPLFVBQVUsU0FBUztRQUFDO0tBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDM0UsSUFBSSxLQUFLLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHO1FBQ3pDLFlBQVksQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPO1FBQUU7UUFBWTtRQUFhO0lBQVU7QUFDOUM7QUFFQSxtQkFBbUI7QUFDbkIsTUFBTSxTQUFTLElBQUk7QUFDbkIsVUFBVSxPQUFPLENBQUMsQ0FBQyxFQUFFLFdBQVUsRUFBRSxZQUFXLEVBQUUsVUFBUyxFQUFFLEdBQUs7SUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsT0FBTyxHQUFHLENBQUM7SUFFeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLGNBQWMsT0FBTyxHQUFHLENBQUM7QUFDM0M7QUFFQSxVQUFVO0FBQ1YsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxTQUFTLElBQU0sRUFBRTtBQUN2QixNQUFNLE1BQU0sSUFBSTtBQUNoQixPQUFPLE9BQU8sQ0FBQyxDQUFDLFFBQVU7SUFDeEIsSUFBSSxHQUFHLENBQUMsT0FBTztBQUNqQjtBQUNBLE1BQU0sT0FBTyxDQUFDLFFBQTBCLElBQUksR0FBRyxDQUFDO0FBRWhELHVCQUF1QjtBQUN2QixNQUFNLFNBQVMsSUFBSSxNQUFxQixPQUFPLElBQUk7QUFDbkQsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQU07SUFDckIsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLE1BQWMsT0FBTyxJQUFJO0lBQzFDLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxJQUFNO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHO0lBQ3BCO0FBQ0Y7QUFFQSxVQUFVLE9BQU8sQ0FBQyxDQUFDLEVBQUUsV0FBVSxFQUFFLFlBQVcsRUFBRSxVQUFTLEVBQUUsR0FBSztJQUM1RCxNQUFNLENBQUMsS0FBSyxZQUFZLENBQUMsS0FBSyxhQUFhLEdBQUc7QUFDaEQ7QUFFQSxNQUFNO0FBQ04sU0FBUyxhQUNQLFlBQW9CLEVBQ3BCLFNBQXNCLEVBQ3RCLFNBQXdCLEVBQ3hCO0lBQ0EsSUFBSSxVQUFVLElBQUksS0FBSyxHQUNyQixPQUNFLE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxVQUFVLE1BQU0sR0FBRyxFQUFFLEVBQUUsR0FDakUsTUFBTSxDQUFDLEtBQUssU0FBUyxDQUFDLFVBQVUsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssU0FBUyxDQUFDLEVBQUUsRUFBRTtJQUdyRSxJQUFJLE1BQU07SUFDVixJQUFJLGdCQUFnQjtJQUNwQixVQUFVLE9BQU8sQ0FBQyxDQUFDLFFBQWtCO1FBQ25DLE1BQU0sZ0JBQWdCLElBQUksSUFBSTtRQUM5QixjQUFjLE1BQU0sQ0FBQztRQUNyQixNQUFNLGdCQUFnQixNQUFNLElBQUksQ0FBQztRQUNqQyxVQUFVLElBQUksQ0FBQztRQUNmLE1BQU0sZ0JBQWdCLGFBQWEsT0FBTyxlQUFlO1FBRXpELE1BQU0sYUFDSixNQUFNLENBQUMsS0FBSyxjQUFjLENBQUMsS0FBSyxPQUFPLEdBQ3ZDLE1BQU0sQ0FBQyxLQUFLLE9BQU8sQ0FBQyxLQUFLLGNBQWM7UUFFekMsSUFBSSxpQkFBaUIsT0FBTyxhQUFhLGVBQWU7WUFDdEQsTUFBTTtZQUNOLGdCQUFnQjtRQUNsQixDQUFDO0lBQ0g7SUFFQSxPQUFPLE1BQU07QUFDZjtBQUVBLElBQUksTUFBTTtBQUNWLE9BQU8sT0FBTyxDQUFDLENBQUMsUUFBVTtJQUN4QixNQUFNLFlBQVk7UUFBQztLQUFNO0lBQ3pCLE1BQU0sWUFBWSxJQUFJLElBQUk7SUFDMUIsVUFBVSxNQUFNLENBQUM7SUFDakIsTUFBTSxZQUFZLGFBQWEsT0FBTyxXQUFXO0lBQ2pELElBQUksWUFBWSxLQUFLLE1BQU07QUFDN0I7QUFFQSxRQUFRLEdBQUcsQ0FBQyJ9