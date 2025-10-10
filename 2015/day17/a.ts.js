const containers = [
    43,
    3,
    4,
    10,
    21,
    44,
    4,
    6,
    47,
    41,
    34,
    17,
    17,
    44,
    36,
    31,
    46,
    9,
    27,
    38
];
const litters = 150;
function solve(remainingContainers, remainingLiters) {
    if (remainingLiters === 0) {
        return 1;
    }
    if (remainingContainers.length === 0 || remainingLiters < 0) {
        return 0;
    }
    const remainingContainersThen = [
        ...remainingContainers
    ];
    const currentContainer = remainingContainersThen.pop();
    return solve(remainingContainersThen, remainingLiters - currentContainer) + solve(remainingContainersThen, remainingLiters);
}
const result = solve(containers, litters);
console.log(result);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTcvYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb250YWluZXJzID0gW1xuICA0MyxcbiAgMyxcbiAgNCxcbiAgMTAsXG4gIDIxLFxuICA0NCxcbiAgNCxcbiAgNixcbiAgNDcsXG4gIDQxLFxuICAzNCxcbiAgMTcsXG4gIDE3LFxuICA0NCxcbiAgMzYsXG4gIDMxLFxuICA0NixcbiAgOSxcbiAgMjcsXG4gIDM4LFxuXTtcblxuY29uc3QgbGl0dGVycyA9IDE1MDtcblxuZnVuY3Rpb24gc29sdmUocmVtYWluaW5nQ29udGFpbmVyczogbnVtYmVyW10sIHJlbWFpbmluZ0xpdGVyczogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHJlbWFpbmluZ0xpdGVycyA9PT0gMCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKHJlbWFpbmluZ0NvbnRhaW5lcnMubGVuZ3RoID09PSAwIHx8IHJlbWFpbmluZ0xpdGVycyA8IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGNvbnN0IHJlbWFpbmluZ0NvbnRhaW5lcnNUaGVuID0gWy4uLnJlbWFpbmluZ0NvbnRhaW5lcnNdO1xuICBjb25zdCBjdXJyZW50Q29udGFpbmVyID0gcmVtYWluaW5nQ29udGFpbmVyc1RoZW4ucG9wKCkgYXMgbnVtYmVyO1xuICByZXR1cm4gc29sdmUocmVtYWluaW5nQ29udGFpbmVyc1RoZW4sIHJlbWFpbmluZ0xpdGVycyAtIGN1cnJlbnRDb250YWluZXIpICtcbiAgICBzb2x2ZShyZW1haW5pbmdDb250YWluZXJzVGhlbiwgcmVtYWluaW5nTGl0ZXJzKTtcbn1cblxuY29uc3QgcmVzdWx0ID0gc29sdmUoY29udGFpbmVycywgbGl0dGVycyk7XG5jb25zb2xlLmxvZyhyZXN1bHQpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sYUFBYTtJQUNqQjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0NBQ0Q7QUFFRCxNQUFNLFVBQVU7QUFFaEIsU0FBUyxNQUFNLG1CQUE2QixFQUFFLGVBQXVCLEVBQVU7SUFDN0UsSUFBSSxvQkFBb0IsR0FBRztRQUN6QixPQUFPO0lBQ1QsQ0FBQztJQUVELElBQUksb0JBQW9CLE1BQU0sS0FBSyxLQUFLLGtCQUFrQixHQUFHO1FBQzNELE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSwwQkFBMEI7V0FBSTtLQUFvQjtJQUN4RCxNQUFNLG1CQUFtQix3QkFBd0IsR0FBRztJQUNwRCxPQUFPLE1BQU0seUJBQXlCLGtCQUFrQixvQkFDdEQsTUFBTSx5QkFBeUI7QUFDbkM7QUFFQSxNQUFNLFNBQVMsTUFBTSxZQUFZO0FBQ2pDLFFBQVEsR0FBRyxDQUFDIn0=