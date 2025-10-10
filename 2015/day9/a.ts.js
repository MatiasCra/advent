const input = await Deno.readTextFile('./input.txt');
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
function minDistance(currentLocation, remaining) {
    if (remaining.size === 1) {
        const lastLoc = Array.from(remaining)[0];
        return matrix[id(currentLocation)][id(lastLoc)];
    }
    if (remaining.size === 0) return 0;
    // DEBUG
    if (currentLocation === 'London' && remaining.size === locations.size - 1) console.log(remaining);
    let min = Number.MAX_SAFE_INTEGER;
    let minFromCurr = Number.MAX_SAFE_INTEGER;
    remaining.forEach((location)=>{
        if (location === currentLocation) return;
        const remainingThen = new Set(remaining);
        remainingThen.delete(location);
        const dist = minDistance(location, remainingThen);
        if (dist <= min && matrix[id(currentLocation)][id(location)] < minFromCurr) {
            min = dist;
            minFromCurr = matrix[id(currentLocation)][id(location)];
        }
    });
    return min + minFromCurr;
}
let min = Number.MAX_SAFE_INTEGER;
locations.forEach((location)=>{
    const remaining = new Set(locations);
    remaining.delete(location);
    const dist = minDistance(location, remaining);
    if (dist < min) min = dist;
});
console.log(min) // Print matrix for debug
 // let matrixText = ''
 // for (let i = 0; i < matrix.length; i++) {
 //   for (let j = 0; j < matrix[i].length; j++) {
 //     matrixText += matrix[i][j] + '\t'
 //   }
 //   console.log(matrixText)
 //   matrixText = ''
 // }
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5OS9hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcbmNvbnN0IGxpbmVzID0gaW5wdXQuc3BsaXQoJ1xcbicpXG5saW5lcy5wb3AoKVxuXG5pbnRlcmZhY2UgdHJhdmVsIHtcbiAgZnJvbTogc3RyaW5nXG4gIHRvOiBzdHJpbmdcbiAgZGlzdGFuY2U6IG51bWJlclxufVxuXG5jb25zdCBkaXN0YW5jZXM6IHRyYXZlbFtdID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gIGNvbnN0IGVuZEZyb20gPSBsaW5lLnNlYXJjaCgnICcpXG4gIGNvbnN0IHN0YXJ0VG8gPSBlbmRGcm9tICsgNFxuICBjb25zdCBlbmRUbyA9IGxpbmUuc2xpY2UoZW5kRnJvbSArIDQsIGxpbmUubGVuZ3RoKS5zZWFyY2goJyAnKSArIGVuZEZyb20gKyA0XG4gIGNvbnN0IHN0YXJ0RGlzdGFuY2UgPSBlbmRUbyArIDNcblxuICBjb25zdCBmcm9tID0gbGluZS5zbGljZSgwLCBlbmRGcm9tKVxuICBjb25zdCB0byA9IGxpbmUuc2xpY2Uoc3RhcnRUbywgZW5kVG8pXG4gIGNvbnN0IGRpc3RhbmNlID0gcGFyc2VJbnQobGluZS5zbGljZShzdGFydERpc3RhbmNlLCBsaW5lLmxlbmd0aCkpXG5cbiAgcmV0dXJuIHsgZnJvbSwgdG8sIGRpc3RhbmNlIH1cbn0pXG5cbi8vIFNldCB3aXRoIGFsbCBsb2NhdGlvbnNcbmNvbnN0IGxvY2F0aW9ucyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5kaXN0YW5jZXMuZm9yRWFjaCgoeyBmcm9tLCB0bywgZGlzdGFuY2UgfSkgPT4ge1xuICBpZiAoIWxvY2F0aW9ucy5oYXMoZnJvbSkpIHtcbiAgICBsb2NhdGlvbnMuYWRkKGZyb20pXG4gIH1cblxuICBpZiAoIWxvY2F0aW9ucy5oYXModG8pKSB7XG4gICAgbG9jYXRpb25zLmFkZCh0bylcbiAgfVxufSlcblxuLy8gU2V0IElkc1xubGV0IGN1cnJlbnRfaWQgPSAtMVxuY29uc3QgbmV4dF9pZCA9ICgpID0+ICsrY3VycmVudF9pZFxuY29uc3QgaWRzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKVxubG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gIGlkcy5zZXQobG9jYXRpb24sIG5leHRfaWQoKSlcbn0pXG5jb25zdCBpZCA9IChsb2NhdGlvbjogc3RyaW5nKTogbnVtYmVyID0+IGlkcy5nZXQobG9jYXRpb24pIGFzIG51bWJlclxuXG4vLyBJbml0IG1hdHJpeFxuY29uc3QgbWF0cml4OiBudW1iZXJbXVtdID0gbmV3IEFycmF5PEFycmF5PG51bWJlcj4+KGxvY2F0aW9ucy5zaXplKVxubG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gIG1hdHJpeFtpZChsb2NhdGlvbildID0gbmV3IEFycmF5KGxvY2F0aW9ucy5zaXplKVxufSlcblxuLy8gU2V0IGRpc3RhbmNlc1xuZGlzdGFuY2VzLmZvckVhY2goKHsgZnJvbSwgdG8sIGRpc3RhbmNlIH0pID0+IHtcbiAgbWF0cml4W2lkKGZyb20pXVtpZCh0byldID0gZGlzdGFuY2VcbiAgbWF0cml4W2lkKHRvKV1baWQoZnJvbSldID0gZGlzdGFuY2VcbiAgbWF0cml4W2lkKHRvKV1baWQodG8pXSA9IDBcbiAgbWF0cml4W2lkKGZyb20pXVtpZChmcm9tKV0gPSAwXG59KVxuXG5mdW5jdGlvbiBtaW5EaXN0YW5jZShjdXJyZW50TG9jYXRpb246IHN0cmluZywgcmVtYWluaW5nOiBTZXQ8c3RyaW5nPik6IG51bWJlciB7XG4gIGlmIChyZW1haW5pbmcuc2l6ZSA9PT0gMSkge1xuICAgIGNvbnN0IGxhc3RMb2MgPSBBcnJheS5mcm9tKHJlbWFpbmluZylbMF1cbiAgICByZXR1cm4gbWF0cml4W2lkKGN1cnJlbnRMb2NhdGlvbildW2lkKGxhc3RMb2MpXVxuICB9XG5cbiAgaWYgKHJlbWFpbmluZy5zaXplID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIERFQlVHXG4gIGlmIChjdXJyZW50TG9jYXRpb24gPT09ICdMb25kb24nICYmIHJlbWFpbmluZy5zaXplID09PSBsb2NhdGlvbnMuc2l6ZSAtIDEpXG4gICAgY29uc29sZS5sb2cocmVtYWluaW5nKVxuXG4gIGxldCBtaW4gPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICBsZXQgbWluRnJvbUN1cnIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuXG4gIHJlbWFpbmluZy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgIGlmIChsb2NhdGlvbiA9PT0gY3VycmVudExvY2F0aW9uKSByZXR1cm5cblxuICAgIGNvbnN0IHJlbWFpbmluZ1RoZW4gPSBuZXcgU2V0KHJlbWFpbmluZylcbiAgICByZW1haW5pbmdUaGVuLmRlbGV0ZShsb2NhdGlvbilcbiAgICBjb25zdCBkaXN0ID0gbWluRGlzdGFuY2UobG9jYXRpb24sIHJlbWFpbmluZ1RoZW4pXG5cbiAgICBpZiAoZGlzdCA8PSBtaW4gJiYgbWF0cml4W2lkKGN1cnJlbnRMb2NhdGlvbildW2lkKGxvY2F0aW9uKV0gPCBtaW5Gcm9tQ3Vycikge1xuICAgICAgbWluID0gZGlzdFxuICAgICAgbWluRnJvbUN1cnIgPSBtYXRyaXhbaWQoY3VycmVudExvY2F0aW9uKV1baWQobG9jYXRpb24pXVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gbWluICsgbWluRnJvbUN1cnJcbn1cblxubGV0IG1pbiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG5sb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgY29uc3QgcmVtYWluaW5nID0gbmV3IFNldChsb2NhdGlvbnMpXG4gIHJlbWFpbmluZy5kZWxldGUobG9jYXRpb24pXG4gIGNvbnN0IGRpc3QgPSBtaW5EaXN0YW5jZShsb2NhdGlvbiwgcmVtYWluaW5nKVxuICBpZiAoZGlzdCA8IG1pbikgbWluID0gZGlzdFxufSlcbmNvbnNvbGUubG9nKG1pbilcblxuLy8gUHJpbnQgbWF0cml4IGZvciBkZWJ1Z1xuLy8gbGV0IG1hdHJpeFRleHQgPSAnJ1xuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRyaXgubGVuZ3RoOyBpKyspIHtcbi8vICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXRyaXhbaV0ubGVuZ3RoOyBqKyspIHtcbi8vICAgICBtYXRyaXhUZXh0ICs9IG1hdHJpeFtpXVtqXSArICdcXHQnXG4vLyAgIH1cbi8vICAgY29uc29sZS5sb2cobWF0cml4VGV4dClcbi8vICAgbWF0cml4VGV4dCA9ICcnXG4vLyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRLE1BQU0sS0FBSyxZQUFZLENBQUM7QUFDdEMsTUFBTSxRQUFRLE1BQU0sS0FBSyxDQUFDO0FBQzFCLE1BQU0sR0FBRztBQVFULE1BQU0sWUFBc0IsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFTO0lBQzlDLE1BQU0sVUFBVSxLQUFLLE1BQU0sQ0FBQztJQUM1QixNQUFNLFVBQVUsVUFBVTtJQUMxQixNQUFNLFFBQVEsS0FBSyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLFVBQVU7SUFDM0UsTUFBTSxnQkFBZ0IsUUFBUTtJQUU5QixNQUFNLE9BQU8sS0FBSyxLQUFLLENBQUMsR0FBRztJQUMzQixNQUFNLEtBQUssS0FBSyxLQUFLLENBQUMsU0FBUztJQUMvQixNQUFNLFdBQVcsU0FBUyxLQUFLLEtBQUssQ0FBQyxlQUFlLEtBQUssTUFBTTtJQUUvRCxPQUFPO1FBQUU7UUFBTTtRQUFJO0lBQVM7QUFDOUI7QUFFQSx5QkFBeUI7QUFDekIsTUFBTSxZQUFZLElBQUk7QUFDdEIsVUFBVSxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUksRUFBRSxHQUFFLEVBQUUsU0FBUSxFQUFFLEdBQUs7SUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLE9BQU87UUFDeEIsVUFB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