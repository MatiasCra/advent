const input = await Deno.readTextFile('./inputTest.txt');
const lines = input.split('\n');
lines.pop();
const distances = lines.map((line)=>{
    const endFrom = line.search(' ');
    const startTo = endFrom + 4;
    const endTo = line.slice(endFrom + 4, line.length).search(' ') + endFrom + 4;
    const startDistance = endTo + 3;
    const from = line.slice(0, endFrom);
    const to = line.slice(startTo, endTo);
    const distance = parseInt(line.slice(startDistance, line.length));
    return {
        from,
        to,
        distance
    };
});
// Set with all locations
const locations = new Set();
distances.forEach(({ from , to , distance  })=>{
    if (!locations.has(from)) {
        locations.add(from);
    }
    if (!locations.has(to)) {
        locations.add(to);
    }
});
// Set Ids
let current_id = -1;
const next_id = ()=>++current_id;
const ids = new Map();
locations.forEach((location)=>{
    ids.set(location, next_id());
});
const id = (location)=>ids.get(location);
// Init matrix
const matrix = new Array(locations.size);
locations.forEach((location)=>{
    matrix[id(location)] = new Array(locations.size);
});
// Set distances
distances.forEach(({ from , to , distance  })=>{
    matrix[id(from)][id(to)] = distance;
    matrix[id(to)][id(from)] = distance;
    matrix[id(to)][id(to)] = 0;
    matrix[id(from)][id(from)] = 0;
});
function maxDistance(currentLocation, remaining) {
    if (remaining.size === 1) {
        const lastLoc = Array.from(remaining)[0];
        return matrix[id(currentLocation)][id(lastLoc)];
    }
    if (remaining.size === 0) return 0;
    let max = 0;
    let maxFromCurr = 0;
    remaining.forEach((location)=>{
        if (location === currentLocation) return;
        const remainingThen = new Set(remaining);
        remainingThen.delete(location);
        const dist = maxDistance(location, remainingThen);
        if (dist >= max && matrix[id(currentLocation)][id(location)] > maxFromCurr) {
            max = dist;
            maxFromCurr = matrix[id(currentLocation)][id(location)];
        }
    });
    return max + maxFromCurr;
}
let max = 0;
locations.forEach((location)=>{
    const remaining = new Set(locations);
    remaining.delete(location);
    const dist = maxDistance(location, remaining);
    if (dist > max) max = dist;
});
console.log(max) // Print matrix for debug
 // let matrixText = ''
 // for (let i = 0; i < matrix.length; i++) {
 //   for (let j = 0; j < matrix[i].length; j++) {
 //     matrixText += matrix[i][j] + '\t'
 //   }
 //   console.log(matrixText)
 //   matrixText = ''
 // }
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5OS9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXRUZXN0LnR4dCcpXG5jb25zdCBsaW5lcyA9IGlucHV0LnNwbGl0KCdcXG4nKVxubGluZXMucG9wKClcblxuaW50ZXJmYWNlIHRyYXZlbCB7XG4gIGZyb206IHN0cmluZ1xuICB0bzogc3RyaW5nXG4gIGRpc3RhbmNlOiBudW1iZXJcbn1cblxuY29uc3QgZGlzdGFuY2VzOiB0cmF2ZWxbXSA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICBjb25zdCBlbmRGcm9tID0gbGluZS5zZWFyY2goJyAnKVxuICBjb25zdCBzdGFydFRvID0gZW5kRnJvbSArIDRcbiAgY29uc3QgZW5kVG8gPSBsaW5lLnNsaWNlKGVuZEZyb20gKyA0LCBsaW5lLmxlbmd0aCkuc2VhcmNoKCcgJykgKyBlbmRGcm9tICsgNFxuICBjb25zdCBzdGFydERpc3RhbmNlID0gZW5kVG8gKyAzXG5cbiAgY29uc3QgZnJvbSA9IGxpbmUuc2xpY2UoMCwgZW5kRnJvbSlcbiAgY29uc3QgdG8gPSBsaW5lLnNsaWNlKHN0YXJ0VG8sIGVuZFRvKVxuICBjb25zdCBkaXN0YW5jZSA9IHBhcnNlSW50KGxpbmUuc2xpY2Uoc3RhcnREaXN0YW5jZSwgbGluZS5sZW5ndGgpKVxuXG4gIHJldHVybiB7IGZyb20sIHRvLCBkaXN0YW5jZSB9XG59KVxuXG4vLyBTZXQgd2l0aCBhbGwgbG9jYXRpb25zXG5jb25zdCBsb2NhdGlvbnMgPSBuZXcgU2V0PHN0cmluZz4oKVxuZGlzdGFuY2VzLmZvckVhY2goKHsgZnJvbSwgdG8sIGRpc3RhbmNlIH0pID0+IHtcbiAgaWYgKCFsb2NhdGlvbnMuaGFzKGZyb20pKSB7XG4gICAgbG9jYXRpb25zLmFkZChmcm9tKVxuICB9XG5cbiAgaWYgKCFsb2NhdGlvbnMuaGFzKHRvKSkge1xuICAgIGxvY2F0aW9ucy5hZGQodG8pXG4gIH1cbn0pXG5cbi8vIFNldCBJZHNcbmxldCBjdXJyZW50X2lkID0gLTFcbmNvbnN0IG5leHRfaWQgPSAoKSA9PiArK2N1cnJlbnRfaWRcbmNvbnN0IGlkcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KClcbmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICBpZHMuc2V0KGxvY2F0aW9uLCBuZXh0X2lkKCkpXG59KVxuY29uc3QgaWQgPSAobG9jYXRpb246IHN0cmluZyk6IG51bWJlciA9PiBpZHMuZ2V0KGxvY2F0aW9uKSBhcyBudW1iZXJcblxuLy8gSW5pdCBtYXRyaXhcbmNvbnN0IG1hdHJpeDogbnVtYmVyW11bXSA9IG5ldyBBcnJheTxBcnJheTxudW1iZXI+Pihsb2NhdGlvbnMuc2l6ZSlcbmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICBtYXRyaXhbaWQobG9jYXRpb24pXSA9IG5ldyBBcnJheShsb2NhdGlvbnMuc2l6ZSlcbn0pXG5cbi8vIFNldCBkaXN0YW5jZXNcbmRpc3RhbmNlcy5mb3JFYWNoKCh7IGZyb20sIHRvLCBkaXN0YW5jZSB9KSA9PiB7XG4gIG1hdHJpeFtpZChmcm9tKV1baWQodG8pXSA9IGRpc3RhbmNlXG4gIG1hdHJpeFtpZCh0byldW2lkKGZyb20pXSA9IGRpc3RhbmNlXG4gIG1hdHJpeFtpZCh0byldW2lkKHRvKV0gPSAwXG4gIG1hdHJpeFtpZChmcm9tKV1baWQoZnJvbSldID0gMFxufSlcblxuZnVuY3Rpb24gbWF4RGlzdGFuY2UoY3VycmVudExvY2F0aW9uOiBzdHJpbmcsIHJlbWFpbmluZzogU2V0PHN0cmluZz4pOiBudW1iZXIge1xuICBpZiAocmVtYWluaW5nLnNpemUgPT09IDEpIHtcbiAgICBjb25zdCBsYXN0TG9jID0gQXJyYXkuZnJvbShyZW1haW5pbmcpWzBdXG4gICAgcmV0dXJuIG1hdHJpeFtpZChjdXJyZW50TG9jYXRpb24pXVtpZChsYXN0TG9jKV1cbiAgfVxuXG4gIGlmIChyZW1haW5pbmcuc2l6ZSA9PT0gMCkgcmV0dXJuIDBcblxuICBsZXQgbWF4ID0gMFxuICBsZXQgbWF4RnJvbUN1cnIgPSAwXG5cbiAgcmVtYWluaW5nLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgaWYgKGxvY2F0aW9uID09PSBjdXJyZW50TG9jYXRpb24pIHJldHVyblxuXG4gICAgY29uc3QgcmVtYWluaW5nVGhlbiA9IG5ldyBTZXQocmVtYWluaW5nKVxuICAgIHJlbWFpbmluZ1RoZW4uZGVsZXRlKGxvY2F0aW9uKVxuICAgIGNvbnN0IGRpc3QgPSBtYXhEaXN0YW5jZShsb2NhdGlvbiwgcmVtYWluaW5nVGhlbilcblxuICAgIGlmIChkaXN0ID49IG1heCAmJiBtYXRyaXhbaWQoY3VycmVudExvY2F0aW9uKV1baWQobG9jYXRpb24pXSA+IG1heEZyb21DdXJyKSB7XG4gICAgICBtYXggPSBkaXN0XG4gICAgICBtYXhGcm9tQ3VyciA9IG1hdHJpeFtpZChjdXJyZW50TG9jYXRpb24pXVtpZChsb2NhdGlvbildXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBtYXggKyBtYXhGcm9tQ3VyclxufVxuXG5sZXQgbWF4ID0gMFxubG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gIGNvbnN0IHJlbWFpbmluZyA9IG5ldyBTZXQobG9jYXRpb25zKVxuICByZW1haW5pbmcuZGVsZXRlKGxvY2F0aW9uKVxuICBjb25zdCBkaXN0ID0gbWF4RGlzdGFuY2UobG9jYXRpb24sIHJlbWFpbmluZylcbiAgaWYgKGRpc3QgPiBtYXgpIG1heCA9IGRpc3Rcbn0pXG5jb25zb2xlLmxvZyhtYXgpXG5cbi8vIFByaW50IG1hdHJpeCBmb3IgZGVidWdcbi8vIGxldCBtYXRyaXhUZXh0ID0gJydcbi8vIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0cml4Lmxlbmd0aDsgaSsrKSB7XG4vLyAgIGZvciAobGV0IGogPSAwOyBqIDwgbWF0cml4W2ldLmxlbmd0aDsgaisrKSB7XG4vLyAgICAgbWF0cml4VGV4dCArPSBtYXRyaXhbaV1bal0gKyAnXFx0J1xuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKG1hdHJpeFRleHQpXG4vLyAgIG1hdHJpeFRleHQgPSAnJ1xuLy8gfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxNQUFNLEtBQUssWUFBWSxDQUFDO0FBQ3RDLE1BQU0sUUFBUSxNQUFNLEtBQUssQ0FBQztBQUMxQixNQUFNLEdBQUc7QUFRVCxNQUFNLFlBQXNCLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBUztJQUM5QyxNQUFNLFVBQVUsS0FBSyxNQUFNLENBQUM7SUFDNUIsTUFBTSxVQUFVLFVBQVU7SUFDMUIsTUFBTSxRQUFRLEtBQUssS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxVQUFVO0lBQzNFLE1BQU0sZ0JBQWdCLFFBQVE7SUFFOUIsTUFBTSxPQUFPLEtBQUssS0FBSyxDQUFDLEdBQUc7SUFDM0IsTUFBTSxLQUFLLEtBQUssS0FBSyxDQUFDLFNBQVM7SUFDL0IsTUFBTSxXQUFXLFNBQVMsS0FBSyxLQUFLLENBQUMsZUFBZSxLQUFLLE1BQU07SUFFL0QsT0FBTztRQUFFO1FBQU07UUFBSTtJQUFTO0FBQzlCO0FBRUEseUJBQXlCO0FBQ3pCLE1BQU0sWUFBWSxJQUFJO0FBQ3RCLFVBQVUsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFJLEVBQUUsR0FBRSxFQUFFLFNBQVEsRUFBRSxHQUFLO0lBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxPQUFPO1FBQ3hCLFVBQVUsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSztRQUN0QixVQUFVLEdBQUcsQ0FBQztJQUNoQixDQUFDO0FBQ0g7QUFFQSxVQUFVO0FBQ1YsSUFBSSxhQUFhLENBQUM7QUFDbEIsTUFBTSxVQUFVLElBQU0sRUFBRTtBQUN4QixNQUFNLE1BQU0sSUFBSTtBQUNoQixVQUFVLE9BQU8sQ0FBQyxDQUFDLFdBQWE7SUFDOUIsSUFBSSxHQUFHLENBQUMsVUFBVTtBQUNwQjtBQUNBLE1BQU0sS0FBSyxDQUFDLFdBQTZCLElBQUksR0FBRyxDQUFDO0FBRWpELGNBQWM7QUFDZCxNQUFNLFNBQXFCLElBQUksTUFBcUIsVUFBVSxJQUFJO0FBQ2xFLFVBQVUsT0FBTyxDQUFDLENBQUMsV0FBYTtJQUM5QixNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsSUFBSSxNQUFNLFVBQVUsSUFBSTtBQUNqRDtBQUVBLGdCQUFnQjtBQUNoQixVQUFVLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSSxFQUFFLEdBQUUsRUFBRSxTQUFRLEVBQUUsR0FBSztJQUM1QyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUc7SUFDM0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHO0lBQzNCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRztJQUN6QixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUc7QUFDL0I7QUFFQSxTQUFTLFlBQVksZUFBdUIsRUFBRSxTQUFzQixFQUFVO0lBQzVFLElBQUksVUFBVSxJQUFJLEtBQUssR0FBRztRQUN4QixNQUFNLFVBQVUsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDeEMsT0FBTyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFNBQVM7SUFDakQsQ0FBQztJQUVELElBQUksVUFBVSxJQUFJLEtBQUssR0FBRyxPQUFPO0lBRWpDLElBQUksTUFBTTtJQUNWLElBQUksY0FBYztJQUVsQixVQUFVLE9BQU8sQ0FBQyxDQUFDLFdBQWE7UUFDOUIsSUFBSSxhQUFhLGlCQUFpQjtRQUVsQyxNQUFNLGdCQUFnQixJQUFJLElBQUk7UUFDOUIsY0FBYyxNQUFNLENBQUM7UUFDckIsTUFBTSxPQUFPLFlBQVksVUFBVTtRQUVuQyxJQUFJLFFBQVEsT0FBTyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFVBQVUsR0FBRyxhQUFhO1lBQzFFLE1BQU07WUFDTixjQUFjLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsVUFBVTtRQUN6RCxDQUFDO0lBQ0g7SUFFQSxPQUFPLE1BQU07QUFDZjtBQUVBLElBQUksTUFBTTtBQUNWLFVBQVUsT0FBTyxDQUFDLENBQUMsV0FBYTtJQUM5QixNQUFNLFlBQVksSUFBSSxJQUFJO0lBQzFCLFVBQVUsTUFBTSxDQUFDO0lBQ2pCLE1BQU0sT0FBTyxZQUFZLFVBQVU7SUFDbkMsSUFBSSxPQUFPLEtBQUssTUFBTTtBQUN4QjtBQUNBLFFBQVEsR0FBRyxDQUFDLEtBRVoseUJBQXlCO0NBQ3pCLHNCQUFzQjtDQUN0Qiw0Q0FBNEM7Q0FDNUMsaURBQWlEO0NBQ2pELHdDQUF3QztDQUN4QyxNQUFNO0NBQ04sNEJBQTRCO0NBQzVCLG9CQUFvQjtDQUNwQixJQUFJIn0=