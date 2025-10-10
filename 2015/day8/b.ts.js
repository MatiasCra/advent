const input = await Deno.readTextFile('./input.txt');
const lines = input.split('\n');
lines.pop();
// console.log(lines[lines.length - 1])
const encode = (str, debug = false)=>{
    if (debug) console.log(str);
    str = str.replace(/\\/g, '\\\\') // \ --> \\
    ;
    if (debug) console.log(str);
    str = str.replace(/\"/g, '\\"') // " --> \"
    ;
    if (debug) {
        console.log(str);
        console.log('"' + str + '"');
    }
    return '"' + str + '"' // wrap in "
    ;
};
const counts = lines.map((line, it)=>{
    return encode(line).length - line.length;
});
const total = counts.reduce((acum, count)=>acum + count, 0);
console.log(total);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5OC9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcblxuY29uc3QgbGluZXMgPSBpbnB1dC5zcGxpdCgnXFxuJylcbmxpbmVzLnBvcCgpXG4vLyBjb25zb2xlLmxvZyhsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSlcblxuY29uc3QgZW5jb2RlID0gKHN0cjogc3RyaW5nLCBkZWJ1ZyA9IGZhbHNlKTogc3RyaW5nID0+IHtcbiAgaWYgKGRlYnVnKSBcbiAgICBjb25zb2xlLmxvZyhzdHIpXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpIC8vIFxcIC0tPiBcXFxcXG4gIGlmIChkZWJ1ZylcbiAgICBjb25zb2xlLmxvZyhzdHIpXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9cXFwiL2csICdcXFxcXCInKSAvLyBcIiAtLT4gXFxcIlxuICBpZiAoZGVidWcpIHtcbiAgICBjb25zb2xlLmxvZyhzdHIpXG4gICAgY29uc29sZS5sb2coJ1wiJyArIHN0ciArICdcIicpXG4gIH1cbiAgcmV0dXJuICdcIicgKyBzdHIgKyAnXCInIC8vIHdyYXAgaW4gXCJcbn1cblxuY29uc3QgY291bnRzOiBudW1iZXJbXSA9IGxpbmVzLm1hcChcbiAgKGxpbmU6IHN0cmluZywgaXQ6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGVuY29kZShsaW5lKS5sZW5ndGggLSBsaW5lLmxlbmd0aFxuICB9XG4pXG5cbmNvbnN0IHRvdGFsOiBudW1iZXIgPSBjb3VudHMucmVkdWNlKFxuICAoYWN1bTogbnVtYmVyLCBjb3VudDogbnVtYmVyKTogbnVtYmVyID0+IGFjdW0gKyBjb3VudCxcbiAgMFxuKVxuXG5jb25zb2xlLmxvZyh0b3RhbClcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUV0QyxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7QUFDMUIsTUFBTSxHQUFHO0FBQ1QsdUNBQXVDO0FBRXZDLE1BQU0sU0FBUyxDQUFDLEtBQWEsUUFBUSxLQUFLLEdBQWE7SUFDckQsSUFBSSxPQUNGLFFBQVEsR0FBRyxDQUFDO0lBQ2QsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLFFBQVEsV0FBVzs7SUFDNUMsSUFBSSxPQUNGLFFBQVEsR0FBRyxDQUFDO0lBQ2QsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLE9BQU8sV0FBVzs7SUFDM0MsSUFBSSxPQUFPO1FBQ1QsUUFBUSxHQUFHLENBQUM7UUFDWixRQUFRLEdBQUcsQ0FBQyxNQUFNLE1BQU07SUFDMUIsQ0FBQztJQUNELE9BQU8sTUFBTSxNQUFNLElBQUksWUFBWTs7QUFDckM7QUFFQSxNQUFNLFNBQW1CLE1BQU0sR0FBRyxDQUNoQyxDQUFDLE1BQWMsS0FBdUI7SUFDcEMsT0FBTyxPQUFPLE1BQU0sTUFBTSxHQUFHLEtBQUssTUFBTTtBQUMxQztBQUdGLE1BQU0sUUFBZ0IsT0FBTyxNQUFNLENBQ2pDLENBQUMsTUFBYyxRQUEwQixPQUFPLE9BQ2hEO0FBR0YsUUFBUSxHQUFHLENBQUMifQ==