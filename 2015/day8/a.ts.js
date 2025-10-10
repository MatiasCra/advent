const input = await Deno.readTextFile('./input.txt');
const lines = input.split('\n');
lines.pop();
console.log(lines[lines.length - 1]);
const counts = lines.map((line, it)=>{
    const actualLine = line.slice(1, line.length - 1) // Don't use the " at the start and end of the text to avoid matching an ending \" for example
    ;
    const asciCount = (actualLine.match(new RegExp(/\\x([0-9]|[a-f]|[A-F])([0-9]|[a-f]|[A-F])/, 'g')) || []).length;
    const quotesCount = (actualLine.match(new RegExp(/\\\"/, 'g')) || []).length;
    const backSlashCount = (actualLine.match(new RegExp(/\\\\/, 'g')) || []).length;
    // Debug
    if (it === 92) {
        console.log('Text:', line);
        console.log('Asci:', asciCount);
        console.log('Double quotes:', quotesCount);
        console.log('Back slashes:', backSlashCount);
        console.log('');
    }
    return [
        line.length,
        line.length - asciCount * 3 - quotesCount - backSlashCount - 2
    ];
});
const total = counts.reduce((acum, count)=>acum + count[0] - count[1], 0);
console.log(total);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5OC9hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcblxuY29uc3QgbGluZXMgPSBpbnB1dC5zcGxpdCgnXFxuJylcbmxpbmVzLnBvcCgpXG5jb25zb2xlLmxvZyhsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSlcblxuY29uc3QgY291bnRzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBsaW5lcy5tYXAoXG4gIChsaW5lOiBzdHJpbmcsIGl0OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgICBjb25zdCBhY3R1YWxMaW5lID0gbGluZS5zbGljZSgxLCBsaW5lLmxlbmd0aCAtIDEpIC8vIERvbid0IHVzZSB0aGUgXCIgYXQgdGhlIHN0YXJ0IGFuZCBlbmQgb2YgdGhlIHRleHQgdG8gYXZvaWQgbWF0Y2hpbmcgYW4gZW5kaW5nIFxcXCIgZm9yIGV4YW1wbGVcblxuICAgIGNvbnN0IGFzY2lDb3VudCA9IChcbiAgICAgIGFjdHVhbExpbmUubWF0Y2goXG4gICAgICAgIG5ldyBSZWdFeHAoL1xcXFx4KFswLTldfFthLWZdfFtBLUZdKShbMC05XXxbYS1mXXxbQS1GXSkvLCAnZycpXG4gICAgICApIHx8IFtdXG4gICAgKS5sZW5ndGhcbiAgICBjb25zdCBxdW90ZXNDb3VudCA9IChhY3R1YWxMaW5lLm1hdGNoKG5ldyBSZWdFeHAoL1xcXFxcXFwiLywgJ2cnKSkgfHwgW10pLmxlbmd0aFxuICAgIGNvbnN0IGJhY2tTbGFzaENvdW50ID0gKGFjdHVhbExpbmUubWF0Y2gobmV3IFJlZ0V4cCgvXFxcXFxcXFwvLCAnZycpKSB8fCBbXSlcbiAgICAgIC5sZW5ndGhcblxuICAgIC8vIERlYnVnXG4gICAgaWYgKGl0ID09PSA5Mikge1xuICAgICAgY29uc29sZS5sb2coJ1RleHQ6JywgbGluZSlcbiAgICAgIGNvbnNvbGUubG9nKCdBc2NpOicsIGFzY2lDb3VudClcbiAgICAgIGNvbnNvbGUubG9nKCdEb3VibGUgcXVvdGVzOicsIHF1b3Rlc0NvdW50KVxuICAgICAgY29uc29sZS5sb2coJ0JhY2sgc2xhc2hlczonLCBiYWNrU2xhc2hDb3VudClcbiAgICAgIGNvbnNvbGUubG9nKCcnKVxuICAgIH1cbiAgICByZXR1cm4gW1xuICAgICAgbGluZS5sZW5ndGgsXG4gICAgICBsaW5lLmxlbmd0aCAtIGFzY2lDb3VudCAqIDMgLSBxdW90ZXNDb3VudCAtIGJhY2tTbGFzaENvdW50IC0gMixcbiAgICBdXG4gIH1cbilcblxuY29uc3QgdG90YWw6IG51bWJlciA9IGNvdW50cy5yZWR1Y2UoXG4gIChhY3VtOiBudW1iZXIsIGNvdW50OiBbbnVtYmVyLCBudW1iZXJdKTogbnVtYmVyID0+IGFjdW0gKyBjb3VudFswXSAtIGNvdW50WzFdLFxuICAwXG4pXG5cbmNvbnNvbGUubG9nKHRvdGFsKVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUSxNQUFNLEtBQUssWUFBWSxDQUFDO0FBRXRDLE1BQU0sUUFBUSxNQUFNLEtBQUssQ0FBQztBQUMxQixNQUFNLEdBQUc7QUFDVCxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUVuQyxNQUFNLFNBQTZCLE1BQU0sR0FBRyxDQUMxQyxDQUFDLE1BQWMsS0FBaUM7SUFDOUMsTUFBTSxhQUFhLEtBQUssS0FBSyxDQUFDLEdBQUcsS0FBSyxNQUFNLEdBQUcsR0FBRyw4RkFBOEY7O0lBRWhKLE1BQU0sWUFBWSxDQUNoQixXQUFXLEtBQUssQ0FDZCxJQUFJLE9BQU8sNkNBQTZDLFNBQ3JELEVBQUUsQUFDVCxFQUFFLE1BQU07SUFDUixNQUFNLGNBQWMsQ0FBQyxXQUFXLEtBQUssQ0FBQyxJQUFJLE9BQU8sUUFBUSxTQUFTLEVBQUUsRUFBRSxNQUFNO0lBQzVFLE1BQU0saUJBQWlCLENBQUMsV0FBVyxLQUFLLENBQUMsSUFBSSxPQUFPLFFBQVEsU0FBUyxFQUFFLEVBQ3BFLE1BQU07SUFFVCxRQUFRO0lBQ1IsSUFBSSxPQUFPLElBQUk7UUFDYixRQUFRLEdBQUcsQ0FBQyxTQUFTO1FBQ3JCLFFBQVEsR0FBRyxDQUFDLFNBQVM7UUFDckIsUUFBUSxHQUFHLENBQUMsa0JBQWtCO1FBQzlCLFFBQVEsR0FBRyxDQUFDLGlCQUFpQjtRQUM3QixRQUFRLEdBQUcsQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPO1FBQ0wsS0FBSyxNQUFNO1FBQ1gsS0FBSyxNQUFNLEdBQUcsWUFBWSxJQUFJLGNBQWMsaUJBQWlCO0tBQzlEO0FBQ0g7QUFHRixNQUFNLFFBQWdCLE9BQU8sTUFBTSxDQUNqQyxDQUFDLE1BQWMsUUFBb0MsT0FBTyxLQUFLLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLEVBQzdFO0FBR0YsUUFBUSxHQUFHLENBQUMifQ==