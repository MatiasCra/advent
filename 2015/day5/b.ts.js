const input = await Deno.readTextFile('./input.txt');
const strs = input.split('\n');
strs.pop();
let nices = 0;
const debug = (it)=>it > 40 && it < 60;
strs.forEach((str, i)=>{
    if (debug(i)) console.log(str);
    // Check if it has at least one letter which repeats with exactly one letter between them
    let k = 0;
    for(; k < str.length - 2; k += 1){
        if (str[k] === str[k + 2]) break;
    }
    if (k === str.length - 2) return;
    if (debug(i)) console.log(`It has one letter which repeats with exactly one letter between them (${str.slice(k, k + 3)})`);
    // Check if it has two equal char pairs
    let j = 0;
    for(; j < str.length - 3; j += 1){
        const pair = str.slice(j, j + 2);
        if (str.slice(j + 2).search(pair) != -1) break;
    }
    if (j === str.length - 3) return;
    if (debug(i)) console.log(`It has a repeated char pair (${str.slice(j, j + 2)})`);
    nices += 1;
});
console.log(nices);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5NS9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcblxuY29uc3Qgc3RycyA9IGlucHV0LnNwbGl0KCdcXG4nKVxuc3Rycy5wb3AoKVxuXG5sZXQgbmljZXMgPSAwXG5cbmNvbnN0IGRlYnVnID0gKGl0OiBudW1iZXIpOiBib29sZWFuID0+IGl0ID4gNDAgJiYgaXQgPCA2MFxuXG5zdHJzLmZvckVhY2goKHN0cjogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgaWYgKGRlYnVnKGkpKSBjb25zb2xlLmxvZyhzdHIpXG5cbiAgLy8gQ2hlY2sgaWYgaXQgaGFzIGF0IGxlYXN0IG9uZSBsZXR0ZXIgd2hpY2ggcmVwZWF0cyB3aXRoIGV4YWN0bHkgb25lIGxldHRlciBiZXR3ZWVuIHRoZW1cbiAgbGV0IGsgPSAwXG4gIGZvciAoOyBrIDwgc3RyLmxlbmd0aCAtIDI7IGsgKz0gMSkge1xuICAgIGlmIChzdHJba10gPT09IHN0cltrICsgMl0pIGJyZWFrXG4gIH1cblxuICBpZiAoayA9PT0gc3RyLmxlbmd0aCAtIDIpIHJldHVyblxuXG4gIGlmIChkZWJ1ZyhpKSlcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBJdCBoYXMgb25lIGxldHRlciB3aGljaCByZXBlYXRzIHdpdGggZXhhY3RseSBvbmUgbGV0dGVyIGJldHdlZW4gdGhlbSAoJHtzdHIuc2xpY2UoXG4gICAgICAgIGssXG4gICAgICAgIGsgKyAzXG4gICAgICApfSlgXG4gICAgKVxuXG4gIC8vIENoZWNrIGlmIGl0IGhhcyB0d28gZXF1YWwgY2hhciBwYWlyc1xuICBsZXQgaiA9IDBcbiAgZm9yICg7IGogPCBzdHIubGVuZ3RoIC0gMzsgaiArPSAxKSB7XG4gICAgY29uc3QgcGFpciA9IHN0ci5zbGljZShqLCBqICsgMilcbiAgICBpZiAoc3RyLnNsaWNlKGogKyAyKS5zZWFyY2gocGFpcikgIT0gLTEpIGJyZWFrXG4gIH1cblxuICBpZiAoaiA9PT0gc3RyLmxlbmd0aCAtIDMpIHJldHVyblxuXG4gIGlmIChkZWJ1ZyhpKSlcbiAgICBjb25zb2xlLmxvZyhgSXQgaGFzIGEgcmVwZWF0ZWQgY2hhciBwYWlyICgke3N0ci5zbGljZShqLCBqICsgMil9KWApXG5cbiAgbmljZXMgKz0gMVxufSlcblxuY29uc29sZS5sb2cobmljZXMpXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRLE1BQU0sS0FBSyxZQUFZLENBQUM7QUFFdEMsTUFBTSxPQUFPLE1BQU0sS0FBSyxDQUFDO0FBQ3pCLEtBQUssR0FBRztBQUVSLElBQUksUUFBUTtBQUVaLE1BQU0sUUFBUSxDQUFDLEtBQXdCLEtBQUssTUFBTSxLQUFLO0FBRXZELEtBQUssT0FBTyxDQUFDLENBQUMsS0FBYSxJQUFjO0lBQ3ZDLElBQUksTUFBTSxJQUFJLFFBQVEsR0FBRyxDQUFDO0lBRTFCLHlGQUF5RjtJQUN6RixJQUFJLElBQUk7SUFDUixNQUFPLElBQUksSUFBSSxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQUc7UUFDakMsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLO0lBQ2xDO0lBRUEsSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUc7SUFFMUIsSUFBSSxNQUFNLElBQ1IsUUFBUSxHQUFHLENBQ1QsQ0FBQyxzRUFBc0UsRUFBRSxJQUFJLEtBQUssQ0FDaEYsR0FDQSxJQUFJLEdBQ0osQ0FBQyxDQUFDO0lBR1IsdUNBQXVDO0lBQ3ZDLElBQUksSUFBSTtJQUNSLE1BQU8sSUFBSSxJQUFJLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFBRztRQUNqQyxNQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJO1FBQzlCLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLO0lBQ2hEO0lBRUEsSUFBSSxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUc7SUFFMUIsSUFBSSxNQUFNLElBQ1IsUUFBUSxHQUFHLENBQUMsQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7SUFFcEUsU0FBUztBQUNYO0FBRUEsUUFBUSxHQUFHLENBQUMifQ==