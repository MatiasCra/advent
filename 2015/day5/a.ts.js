const input = await Deno.readTextFile('./input.txt');
let strs = input.split('\n');
strs.pop();
let nices = 0;
strs.forEach((str, i)=>{
    if (i < 10) console.log(str);
    // Chack that it doesn't have ab, cd, pq, or xy
    const pos = str.search('(ab|cd|pq|xy)');
    if (pos !== -1) return;
    if (i < 10) console.log("It doesn't have ab, cd, pq, or xy");
    // Check if it has 3 vowels
    let vowelPos = 0;
    let vowelCount = 0;
    // let vowels = "aeiou"
    // let j = vowels.length - 1
    // while(vowels.length > 0 && j >= 0 && vowelCount < 3) {
    //   if (str.search(vowels[j]) != -1) {
    //     vowelCount += 1
    //   }
    //   vowels = vowels.slice(0, j)
    //   j-=1
    // }
    while(vowelPos !== -1 && vowelCount < 3){
        const prev = vowelPos;
        vowelPos = str.slice(vowelPos, str.length).search('(a|e|i|o|u)');
        if (vowelPos !== -1) {
            vowelCount += 1;
            vowelPos += prev + 1;
        }
    }
    if (vowelCount < 3) return;
    if (i < 10) console.log('It has at least three vowels');
    // Check if it has two concecutive equal chars
    let j = 0;
    for(; j < str.length - 1; j += 1){
        if (str[j] === str[j + 1]) break;
    }
    if (j === str.length - 1) return;
    if (i < 10) console.log('It has the same char 2 consecutive times at pos', j);
    nices += 1;
});
console.log(nices);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5NS9hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcblxubGV0IHN0cnMgPSBpbnB1dC5zcGxpdCgnXFxuJylcbnN0cnMucG9wKClcblxubGV0IG5pY2VzID0gMFxuXG5zdHJzLmZvckVhY2goKHN0cjogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgaWYgKGkgPCAxMCkgY29uc29sZS5sb2coc3RyKVxuXG4gIC8vIENoYWNrIHRoYXQgaXQgZG9lc24ndCBoYXZlIGFiLCBjZCwgcHEsIG9yIHh5XG4gIGNvbnN0IHBvcyA9IHN0ci5zZWFyY2goJyhhYnxjZHxwcXx4eSknKVxuICBpZiAocG9zICE9PSAtMSkgcmV0dXJuXG5cbiAgaWYgKGkgPCAxMCkgY29uc29sZS5sb2coXCJJdCBkb2Vzbid0IGhhdmUgYWIsIGNkLCBwcSwgb3IgeHlcIilcblxuICAvLyBDaGVjayBpZiBpdCBoYXMgMyB2b3dlbHNcbiAgbGV0IHZvd2VsUG9zID0gMFxuICBsZXQgdm93ZWxDb3VudCA9IDBcblxuICAvLyBsZXQgdm93ZWxzID0gXCJhZWlvdVwiXG4gIC8vIGxldCBqID0gdm93ZWxzLmxlbmd0aCAtIDFcbiAgLy8gd2hpbGUodm93ZWxzLmxlbmd0aCA+IDAgJiYgaiA+PSAwICYmIHZvd2VsQ291bnQgPCAzKSB7XG4gIC8vICAgaWYgKHN0ci5zZWFyY2godm93ZWxzW2pdKSAhPSAtMSkge1xuICAvLyAgICAgdm93ZWxDb3VudCArPSAxXG4gIC8vICAgfVxuICAvLyAgIHZvd2VscyA9IHZvd2Vscy5zbGljZSgwLCBqKVxuICAvLyAgIGotPTFcbiAgLy8gfVxuICB3aGlsZSAodm93ZWxQb3MgIT09IC0xICYmIHZvd2VsQ291bnQgPCAzKSB7XG4gICAgY29uc3QgcHJldiA9IHZvd2VsUG9zXG4gICAgdm93ZWxQb3MgPSBzdHIuc2xpY2Uodm93ZWxQb3MsIHN0ci5sZW5ndGgpLnNlYXJjaCgnKGF8ZXxpfG98dSknKVxuICAgIGlmICh2b3dlbFBvcyAhPT0gLTEpIHtcbiAgICAgIHZvd2VsQ291bnQgKz0gMVxuICAgICAgdm93ZWxQb3MgKz0gcHJldiArIDFcbiAgICB9XG4gIH1cblxuICBpZiAodm93ZWxDb3VudCA8IDMpIHJldHVyblxuXG4gIGlmIChpIDwgMTApIGNvbnNvbGUubG9nKCdJdCBoYXMgYXQgbGVhc3QgdGhyZWUgdm93ZWxzJylcblxuICAvLyBDaGVjayBpZiBpdCBoYXMgdHdvIGNvbmNlY3V0aXZlIGVxdWFsIGNoYXJzXG4gIGxldCBqID0gMFxuICBmb3IgKDsgaiA8IHN0ci5sZW5ndGggLSAxOyBqICs9IDEpIHtcbiAgICBpZiAoc3RyW2pdID09PSBzdHJbaiArIDFdKSBicmVha1xuICB9XG5cbiAgaWYgKGogPT09IHN0ci5sZW5ndGggLSAxKSByZXR1cm5cblxuICBpZiAoaSA8IDEwKSBjb25zb2xlLmxvZygnSXQgaGFzIHRoZSBzYW1lIGNoYXIgMiBjb25zZWN1dGl2ZSB0aW1lcyBhdCBwb3MnLCBqKVxuXG4gIG5pY2VzICs9IDFcbn0pXG5cbmNvbnNvbGUubG9nKG5pY2VzKVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxNQUFNLEtBQUssWUFBWSxDQUFDO0FBRXRDLElBQUksT0FBTyxNQUFNLEtBQUssQ0FBQztBQUN2QixLQUFLLEdBQUc7QUFFUixJQUFJLFFBQVE7QUFFWixLQUFLLE9BQU8sQ0FBQyxDQUFDLEtBQWEsSUFBYztJQUN2QyxJQUFJLElBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQztJQUV4QiwrQ0FBK0M7SUFDL0MsTUFBTSxNQUFNLElBQUksTUFBTSxDQUFDO0lBQ3ZCLElBQUksUUFBUSxDQUFDLEdBQUc7SUFFaEIsSUFBSSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUM7SUFFeEIsMkJBQTJCO0lBQzNCLElBQUksV0FBVztJQUNmLElBQUksYUFBYTtJQUVqQix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLHlEQUF5RDtJQUN6RCx1Q0FBdUM7SUFDdkMsc0JBQXNCO0lBQ3RCLE1BQU07SUFDTixnQ0FBZ0M7SUFDaEMsU0FBUztJQUNULElBQUk7SUFDSixNQUFPLGFBQWEsQ0FBQyxLQUFLLGFBQWEsRUFBRztRQUN4QyxNQUFNLE9BQU87UUFDYixXQUFXLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ2xELElBQUksYUFBYSxDQUFDLEdBQUc7WUFDbkIsY0FBYztZQUNkLFlBQVksT0FBTztRQUNyQixDQUFDO0lBQ0g7SUFFQSxJQUFJLGFBQWEsR0FBRztJQUVwQixJQUFJLElBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQztJQUV4Qiw4Q0FBOEM7SUFDOUMsSUFBSSxJQUFJO0lBQ1IsTUFBTyxJQUFJLElBQUksTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFHO1FBQ2pDLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSztJQUNsQztJQUVBLElBQUksTUFBTSxJQUFJLE1BQU0sR0FBRyxHQUFHO0lBRTFCLElBQUksSUFBSSxJQUFJLFFBQVEsR0FBRyxDQUFDLG1EQUFtRDtJQUUzRSxTQUFTO0FBQ1g7QUFFQSxRQUFRLEdBQUcsQ0FBQyJ9