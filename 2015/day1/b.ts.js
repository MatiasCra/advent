const input = await Deno.readTextFile('./input.txt');
const brackets = input.split('');
brackets.reduce((acc, curr, pos, arr)=>{
    if (acc === -1) {
        console.log(pos + 1);
        arr.splice(1) // break
        ;
    }
    if (curr === '(') {
        return acc + 1;
    } else if (curr === ')') {
        return acc - 1;
    }
    return acc;
}, 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MS9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0OiBzdHJpbmcgPSBhd2FpdCBEZW5vLnJlYWRUZXh0RmlsZSgnLi9pbnB1dC50eHQnKVxuXG5jb25zdCBicmFja2V0czogc3RyaW5nW10gPSBpbnB1dC5zcGxpdCgnJylcblxuYnJhY2tldHMucmVkdWNlKChhY2M6IG51bWJlciwgY3Vycjogc3RyaW5nLCBwb3M6IG51bWJlciwgYXJyOiBzdHJpbmdbXSkgPT4ge1xuICBpZiAoYWNjID09PSAtMSkge1xuICAgIGNvbnNvbGUubG9nKHBvcyArIDEpXG4gICAgYXJyLnNwbGljZSgxKSAgLy8gYnJlYWtcbiAgfVxuICBcbiAgaWYgKGN1cnIgPT09ICcoJykge1xuICAgIHJldHVybiBhY2MgKyAxXG4gIH0gZWxzZSBpZiAoY3VyciA9PT0gJyknKSB7XG4gICAgcmV0dXJuIGFjYyAtIDFcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn0sIDApXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFnQixNQUFNLEtBQUssWUFBWSxDQUFDO0FBRTlDLE1BQU0sV0FBcUIsTUFBTSxLQUFLLENBQUM7QUFFdkMsU0FBUyxNQUFNLENBQUMsQ0FBQyxLQUFhLE1BQWMsS0FBYSxNQUFrQjtJQUN6RSxJQUFJLFFBQVEsQ0FBQyxHQUFHO1FBQ2QsUUFBUSxHQUFHLENBQUMsTUFBTTtRQUNsQixJQUFJLE1BQU0sQ0FBQyxHQUFJLFFBQVE7O0lBQ3pCLENBQUM7SUFFRCxJQUFJLFNBQVMsS0FBSztRQUNoQixPQUFPLE1BQU07SUFDZixPQUFPLElBQUksU0FBUyxLQUFLO1FBQ3ZCLE9BQU8sTUFBTTtJQUNmLENBQUM7SUFFRCxPQUFPO0FBQ1QsR0FBRyJ9