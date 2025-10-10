const input = await Deno.readTextFile('./input.txt');
const directions = input.split('');
const houses = new Set();
houses.add(JSON.stringify({
    col: 0,
    row: 0
}));
let santaRow = 0;
let santaCol = 0;
let roboRow = 0;
let roboCol = 0;
directions.forEach((dir, i)=>{
    if (dir === '') {
        return;
    }
    if (i % 2 == 0) {
        console.log("Santa");
        if (dir === '>') {
            santaCol += 1;
        } else if (dir === '<') {
            santaCol -= 1;
        } else if (dir === '^') {
            santaRow += 1;
        } else if (dir === 'v') {
            santaRow -= 1;
        }
        if (!houses.has(JSON.stringify({
            col: santaCol,
            row: santaRow
        }))) {
            houses.add(JSON.stringify({
                col: santaCol,
                row: santaRow
            }));
            console.log(JSON.stringify({
                col: santaCol,
                row: santaRow
            }));
        }
    } else {
        console.log("Robo");
        if (dir === '>') {
            roboCol += 1;
        } else if (dir === '<') {
            roboCol -= 1;
        } else if (dir === '^') {
            roboRow += 1;
        } else if (dir === 'v') {
            roboRow -= 1;
        }
        if (!houses.has(JSON.stringify({
            col: roboCol,
            row: roboRow
        }))) {
            houses.add(JSON.stringify({
                col: roboCol,
                row: roboRow
            }));
            console.log(JSON.stringify({
                col: roboCol,
                row: roboRow
            }));
        }
    }
});
console.log(houses.size);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5My9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcblxuY29uc3QgZGlyZWN0aW9uczogc3RyaW5nW10gPSBpbnB1dC5zcGxpdCgnJylcblxuY29uc3QgaG91c2VzID0gbmV3IFNldDxzdHJpbmc+KClcbmhvdXNlcy5hZGQoSlNPTi5zdHJpbmdpZnkoeyBjb2w6IDAsIHJvdzogMCB9KSlcblxubGV0IHNhbnRhUm93ID0gMFxubGV0IHNhbnRhQ29sID0gMFxuXG5sZXQgcm9ib1JvdyA9IDBcbmxldCByb2JvQ29sID0gMFxuXG5kaXJlY3Rpb25zLmZvckVhY2goKGRpcjogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgaWYgKGRpciA9PT0gJycpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChpICUgMiA9PSAwKSB7XG4gICAgY29uc29sZS5sb2coXCJTYW50YVwiKVxuICAgIGlmIChkaXIgPT09ICc+Jykge1xuICAgICAgc2FudGFDb2wgKz0gMVxuICAgIH0gZWxzZSBpZiAoZGlyID09PSAnPCcpIHtcbiAgICAgIHNhbnRhQ29sIC09IDFcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ14nKSB7XG4gICAgICBzYW50YVJvdyArPSAxXG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICd2Jykge1xuICAgICAgc2FudGFSb3cgLT0gMVxuICAgIH1cblxuICAgIGlmICghaG91c2VzLmhhcyhKU09OLnN0cmluZ2lmeSh7IGNvbDogc2FudGFDb2wsIHJvdzogc2FudGFSb3cgfSkpKSB7XG4gICAgICBob3VzZXMuYWRkKEpTT04uc3RyaW5naWZ5KHsgY29sOiBzYW50YUNvbCwgcm93OiBzYW50YVJvdyB9KSlcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHsgY29sOiBzYW50YUNvbCwgcm93OiBzYW50YVJvdyB9KSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJSb2JvXCIpXG4gICAgaWYgKGRpciA9PT0gJz4nKSB7XG4gICAgICByb2JvQ29sICs9IDFcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJzwnKSB7XG4gICAgICByb2JvQ29sIC09IDFcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ14nKSB7XG4gICAgICByb2JvUm93ICs9IDFcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3YnKSB7XG4gICAgICByb2JvUm93IC09IDFcbiAgICB9XG5cbiAgICBpZiAoIWhvdXNlcy5oYXMoSlNPTi5zdHJpbmdpZnkoeyBjb2w6IHJvYm9Db2wsIHJvdzogcm9ib1JvdyB9KSkpIHtcbiAgICAgIGhvdXNlcy5hZGQoSlNPTi5zdHJpbmdpZnkoeyBjb2w6IHJvYm9Db2wsIHJvdzogcm9ib1JvdyB9KSlcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHsgY29sOiByb2JvQ29sLCByb3c6IHJvYm9Sb3cgfSkpXG4gICAgfVxuICB9XG59KVxuXG5jb25zb2xlLmxvZyhob3VzZXMuc2l6ZSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUV0QyxNQUFNLGFBQXVCLE1BQU0sS0FBSyxDQUFDO0FBRXpDLE1BQU0sU0FBUyxJQUFJO0FBQ25CLE9BQU8sR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDO0lBQUUsS0FBSztJQUFHLEtBQUs7QUFBRTtBQUUzQyxJQUFJLFdBQVc7QUFDZixJQUFJLFdBQVc7QUFFZixJQUFJLFVBQVU7QUFDZCxJQUFJLFVBQVU7QUFFZCxXQUFXLE9BQU8sQ0FBQyxDQUFDLEtBQWEsSUFBYztJQUM3QyxJQUFJLFFBQVEsSUFBSTtRQUNkO0lBQ0YsQ0FBQztJQUVELElBQUksSUFBSSxLQUFLLEdBQUc7UUFDZCxRQUFRLEdBQUcsQ0FBQztRQUNaLElBQUksUUFBUSxLQUFLO1lBQ2YsWUFBWTtRQUNkLE9BQU8sSUFBSSxRQUFRLEtBQUs7WUFDdEIsWUFBWTtRQUNkLE9BQU8sSUFBSSxRQUFRLEtBQUs7WUFDdEIsWUFBWTtRQUNkLE9BQU8sSUFBSSxRQUFRLEtBQUs7WUFDdEIsWUFBWTtRQUNkLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7WUFBRSxLQUFLO1lBQVUsS0FBSztRQUFTLEtBQUs7WUFDakUsT0FBTyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQUUsS0FBSztnQkFBVSxLQUFLO1lBQVM7WUFDekQsUUFBUSxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQUUsS0FBSztnQkFBVSxLQUFLO1lBQVM7UUFDNUQsQ0FBQztJQUNILE9BQU87UUFDTCxRQUFRLEdBQUcsQ0FBQztRQUNaLElBQUksUUFBUSxLQUFLO1lBQ2YsV0FBVztRQUNiLE9BQU8sSUFBSSxRQUFRLEtBQUs7WUFDdEIsV0FBVztRQUNiLE9BQU8sSUFBSSxRQUFRLEtBQUs7WUFDdEIsV0FBVztRQUNiLE9BQU8sSUFBSSxRQUFRLEtBQUs7WUFDdEIsV0FBVztRQUNiLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7WUFBRSxLQUFLO1lBQVMsS0FBSztRQUFRLEtBQUs7WUFDL0QsT0FBTyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQUUsS0FBSztnQkFBUyxLQUFLO1lBQVE7WUFDdkQsUUFBUSxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQUUsS0FBSztnQkFBUyxLQUFLO1lBQVE7UUFDMUQsQ0FBQztJQUNILENBQUM7QUFDSDtBQUVBLFFBQVEsR0FBRyxDQUFDLE9BQU8sSUFBSSJ9