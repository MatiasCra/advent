const input = await Deno.readTextFile('./input.txt');
const brackets = input.split('');
const result = brackets.reduce((acc, curr)=>{
    if (curr == '(') {
        return acc + 1;
    } else if (curr == ')') {
        return acc - 1;
    }
    return acc;
}, 0);
console.log(result);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MS9hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0OiBzdHJpbmcgPSBhd2FpdCBEZW5vLnJlYWRUZXh0RmlsZSgnLi9pbnB1dC50eHQnKVxuXG5jb25zdCBicmFja2V0czogc3RyaW5nW10gPSBpbnB1dC5zcGxpdCgnJylcblxuY29uc3QgcmVzdWx0OiBudW1iZXIgPSBicmFja2V0cy5yZWR1Y2UoKGFjYzogbnVtYmVyLCBjdXJyOiBzdHJpbmcpID0+IHtcbiAgaWYgKGN1cnIgPT0gJygnKSB7XG4gICAgcmV0dXJuIGFjYyArIDFcbiAgfSBlbHNlIGlmIChjdXJyID09ICcpJykge1xuICAgIHJldHVybiBhY2MgLSAxXG4gIH1cblxuICByZXR1cm4gYWNjXG59LCAwKVxuXG5jb25zb2xlLmxvZyhyZXN1bHQpXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFnQixNQUFNLEtBQUssWUFBWSxDQUFDO0FBRTlDLE1BQU0sV0FBcUIsTUFBTSxLQUFLLENBQUM7QUFFdkMsTUFBTSxTQUFpQixTQUFTLE1BQU0sQ0FBQyxDQUFDLEtBQWEsT0FBaUI7SUFDcEUsSUFBSSxRQUFRLEtBQUs7UUFDZixPQUFPLE1BQU07SUFDZixPQUFPLElBQUksUUFBUSxLQUFLO1FBQ3RCLE9BQU8sTUFBTTtJQUNmLENBQUM7SUFFRCxPQUFPO0FBQ1QsR0FBRztBQUVILFFBQVEsR0FBRyxDQUFDIn0=