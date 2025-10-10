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
function solve(remainingContainers, remainingLiters, usedContainers) {
    if (remainingLiters === 0) {
        return [
            usedContainers
        ];
    }
    if (remainingContainers.length === 0 || remainingLiters < 0) {
        return [
            0
        ];
    }
    const remainingContainersThen = [
        ...remainingContainers
    ];
    const currentContainer = remainingContainersThen.pop();
    return solve(remainingContainersThen, remainingLiters - currentContainer, usedContainers + 1).concat(solve(remainingContainersThen, remainingLiters, usedContainers));
}
const results = solve(containers, litters, 0);
console.log(results);
let min = Number.MAX_SAFE_INTEGER;
let answer = 0;
results.forEach((usedContainers)=>{
    if (usedContainers < min && usedContainers > 0) {
        min = usedContainers;
        answer = 0;
    }
    if (usedContainers === min) answer++;
});
console.log(answer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTcvYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb250YWluZXJzID0gW1xuICA0MyxcbiAgMyxcbiAgNCxcbiAgMTAsXG4gIDIxLFxuICA0NCxcbiAgNCxcbiAgNixcbiAgNDcsXG4gIDQxLFxuICAzNCxcbiAgMTcsXG4gIDE3LFxuICA0NCxcbiAgMzYsXG4gIDMxLFxuICA0NixcbiAgOSxcbiAgMjcsXG4gIDM4LFxuXTtcblxuY29uc3QgbGl0dGVycyA9IDE1MDtcblxuZnVuY3Rpb24gc29sdmUoXG4gIHJlbWFpbmluZ0NvbnRhaW5lcnM6IG51bWJlcltdLFxuICByZW1haW5pbmdMaXRlcnM6IG51bWJlcixcbiAgdXNlZENvbnRhaW5lcnM6IG51bWJlcixcbik6IG51bWJlcltdIHtcbiAgaWYgKHJlbWFpbmluZ0xpdGVycyA9PT0gMCkge1xuICAgIHJldHVybiBbdXNlZENvbnRhaW5lcnNdO1xuICB9XG5cbiAgaWYgKHJlbWFpbmluZ0NvbnRhaW5lcnMubGVuZ3RoID09PSAwIHx8IHJlbWFpbmluZ0xpdGVycyA8IDApIHtcbiAgICByZXR1cm4gWzBdO1xuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nQ29udGFpbmVyc1RoZW4gPSBbLi4ucmVtYWluaW5nQ29udGFpbmVyc107XG4gIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSByZW1haW5pbmdDb250YWluZXJzVGhlbi5wb3AoKSBhcyBudW1iZXI7XG4gIHJldHVybiBzb2x2ZShcbiAgICByZW1haW5pbmdDb250YWluZXJzVGhlbixcbiAgICByZW1haW5pbmdMaXRlcnMgLSBjdXJyZW50Q29udGFpbmVyLFxuICAgIHVzZWRDb250YWluZXJzICsgMSxcbiAgKS5jb25jYXQoXG4gICAgc29sdmUocmVtYWluaW5nQ29udGFpbmVyc1RoZW4sIHJlbWFpbmluZ0xpdGVycywgdXNlZENvbnRhaW5lcnMpLFxuICApO1xufVxuXG5jb25zdCByZXN1bHRzOiBudW1iZXJbXSA9IHNvbHZlKGNvbnRhaW5lcnMsIGxpdHRlcnMsIDApO1xuY29uc29sZS5sb2cocmVzdWx0cyk7XG5cbmxldCBtaW4gPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxubGV0IGFuc3dlcjogbnVtYmVyID0gMFxucmVzdWx0cy5mb3JFYWNoKCh1c2VkQ29udGFpbmVyczogbnVtYmVyKSA9PiB7XG4gIGlmICh1c2VkQ29udGFpbmVycyA8IG1pbiAmJiB1c2VkQ29udGFpbmVycyA+IDApIHtcbiAgICBtaW4gPSB1c2VkQ29udGFpbmVyc1xuICAgIGFuc3dlciA9IDBcbiAgfVxuXG4gIGlmICh1c2VkQ29udGFpbmVycyA9PT0gbWluKVxuICAgIGFuc3dlcisrXG59KVxuY29uc29sZS5sb2coYW5zd2VyKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGFBQWE7SUFDakI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtDQUNEO0FBRUQsTUFBTSxVQUFVO0FBRWhCLFNBQVMsTUFDUCxtQkFBNkIsRUFDN0IsZUFBdUIsRUFDdkIsY0FBc0IsRUFDWjtJQUNWLElBQUksb0JBQW9CLEdBQUc7UUFDekIsT0FBTztZQUFDO1NBQWU7SUFDekIsQ0FBQztJQUVELElBQUksb0JBQW9CLE1BQU0sS0FBSyxLQUFLLGtCQUFrQixHQUFHO1FBQzNELE9BQU87WUFBQztTQUFFO0lBQ1osQ0FBQztJQUVELE1BQU0sMEJBQTBCO1dBQUk7S0FBb0I7SUFDeEQsTUFBTSxtQkFBbUIsd0JBQXdCLEdBQUc7SUFDcEQsT0FBTyxNQUNMLHlCQUNBLGtCQUFrQixrQkFDbEIsaUJBQWlCLEdBQ2pCLE1BQU0sQ0FDTixNQUFNLHlCQUF5QixpQkFBaUI7QUFFcEQ7QUFFQSxNQUFNLFVBQW9CLE1BQU0sWUFBWSxTQUFTO0FBQ3JELFFBQVEsR0FBRyxDQUFDO0FBRVosSUFBSSxNQUFNLE9BQU8sZ0JBQWdCO0FBQ2pDLElBQUksU0FBaUI7QUFDckIsUUFBUSxPQUFPLENBQUMsQ0FBQyxpQkFBMkI7SUFDMUMsSUFBSSxpQkFBaUIsT0FBTyxpQkFBaUIsR0FBRztRQUM5QyxNQUFNO1FBQ04sU0FBUztJQUNYLENBQUM7SUFFRCxJQUFJLG1CQUFtQixLQUNyQjtBQUNKO0FBQ0EsUUFBUSxHQUFHLENBQUMifQ==