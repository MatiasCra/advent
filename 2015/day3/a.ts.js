const input = await Deno.readTextFile('./input.txt');
const directions = input.split('');
const houses = new Set();
let row = 0;
let col = 0;
houses.add(JSON.stringify({
    col,
    row
}));
directions.forEach((dir)=>{
    if (dir === '') {
        return;
    }
    if (dir === '>') {
        col += 1;
    } else if (dir === '<') {
        col -= 1;
    } else if (dir === '^') {
        row += 1;
    } else if (dir === 'v') {
        row -= 1;
    }
    if (!houses.has(JSON.stringify({
        col,
        row
    }))) {
        console.log("Adding", [
            col,
            row
        ]);
        houses.add(JSON.stringify({
            col,
            row
        }));
    }
});
console.log(houses.size);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5My9hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlucHV0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoJy4vaW5wdXQudHh0JylcblxuY29uc3QgZGlyZWN0aW9uczogc3RyaW5nW10gPSBpbnB1dC5zcGxpdCgnJylcblxuY29uc3QgaG91c2VzID0gbmV3IFNldDxzdHJpbmc+KClcblxubGV0IHJvdyA9IDBcbmxldCBjb2wgPSAwXG5ob3VzZXMuYWRkKEpTT04uc3RyaW5naWZ5KHtjb2wsIHJvd30pKVxuXG5kaXJlY3Rpb25zLmZvckVhY2goKGRpcjogc3RyaW5nKSA9PiB7XG4gIGlmIChkaXIgPT09ICcnKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoZGlyID09PSAnPicpIHtcbiAgICBjb2wgKz0gMVxuICB9IGVsc2UgaWYgKGRpciA9PT0gJzwnKSB7XG4gICAgY29sIC09IDFcbiAgfSBlbHNlIGlmIChkaXIgPT09ICdeJykge1xuICAgIHJvdyArPSAxXG4gIH0gZWxzZSBpZiAoZGlyID09PSAndicpIHtcbiAgICByb3cgLT0gMVxuICB9XG5cbiAgaWYgKCFob3VzZXMuaGFzKEpTT04uc3RyaW5naWZ5KHtjb2wsIHJvd30pKSkge1xuICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nXCIsIFtjb2wsIHJvd10pXG4gICAgaG91c2VzLmFkZChKU09OLnN0cmluZ2lmeSh7Y29sLCByb3d9KSlcbiAgfVxufSlcblxuY29uc29sZS5sb2coaG91c2VzLnNpemUpXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRLE1BQU0sS0FBSyxZQUFZLENBQUM7QUFFdEMsTUFBTSxhQUF1QixNQUFNLEtBQUssQ0FBQztBQUV6QyxNQUFNLFNBQVMsSUFBSTtBQUVuQixJQUFJLE1BQU07QUFDVixJQUFJLE1BQU07QUFDVixPQUFPLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUFDO0lBQUs7QUFBRztBQUVuQyxXQUFXLE9BQU8sQ0FBQyxDQUFDLE1BQWdCO0lBQ2xDLElBQUksUUFBUSxJQUFJO1FBQ2Q7SUFDRixDQUFDO0lBRUQsSUFBSSxRQUFRLEtBQUs7UUFDZixPQUFPO0lBQ1QsT0FBTyxJQUFJLFFBQVEsS0FBSztRQUN0QixPQUFPO0lBQ1QsT0FBTyxJQUFJLFFBQVEsS0FBSztRQUN0QixPQUFPO0lBQ1QsT0FBTyxJQUFJLFFBQVEsS0FBSztRQUN0QixPQUFPO0lBQ1QsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztRQUFDO1FBQUs7SUFBRyxLQUFLO1FBQzNDLFFBQVEsR0FBRyxDQUFDLFVBQVU7WUFBQztZQUFLO1NBQUk7UUFDaEMsT0FBTyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUM7WUFBQztZQUFLO1FBQUc7SUFDckMsQ0FBQztBQUNIO0FBRUEsUUFBUSxHQUFHLENBQUMsT0FBTyxJQUFJIn0=