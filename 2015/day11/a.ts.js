const input = 'vzbxkghb';
function isValid(password) {
    // Chack that it doesn't have an i, o or l
    if (password.search(/(i|o|l)/) !== -1) return false;
    // Check if it includes one increasing straight of at least three letters
    let i = 0;
    while(i < password.length){
        let j = 0;
        while(i + j < password.length - 1 && password.charCodeAt(i + j) === password.charCodeAt(i + j + 1) - 1 && j < 2){
            ++j;
        }
        if (j === 2) {
            break;
        }
        ++i;
    }
    if (i === password.length) return false;
    // Check that it has at least two pairs of repeated characters
    const repeated = (password.match(new RegExp(/([a-z])\1/, 'g')) || []).length;
    if (repeated < 2) return false;
    return true;
}
const replaceAt = (i, text, newChar)=>text.slice(0, i) + newChar + text.slice(i + 1, text.length);
const increaseChar = (i, text)=>{
    const firstCode = 'a'.charCodeAt(0);
    const lastCode = 'z'.charCodeAt(0);
    let newCode = text.charCodeAt(i) + 1;
    if (newCode > lastCode) newCode = firstCode;
    const newChar = String.fromCharCode(newCode);
    return replaceAt(i, text, newChar);
};
const incrementStr = (text)=>{
    let j = text.length;
    do {
        --j;
        text = increaseChar(j, text);
    }while (j > 0 && text[j] === 'a')
    return text;
};
let text = input;
while(!isValid(text))text = incrementStr(text);
console.log(text);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTEvYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9ICd2emJ4a2doYidcblxuZnVuY3Rpb24gaXNWYWxpZChwYXNzd29yZDogc3RyaW5nKSB7XG4gIC8vIENoYWNrIHRoYXQgaXQgZG9lc24ndCBoYXZlIGFuIGksIG8gb3IgbFxuICBpZiAocGFzc3dvcmQuc2VhcmNoKC8oaXxvfGwpLykgIT09IC0xKSByZXR1cm4gZmFsc2VcblxuICAvLyBDaGVjayBpZiBpdCBpbmNsdWRlcyBvbmUgaW5jcmVhc2luZyBzdHJhaWdodCBvZiBhdCBsZWFzdCB0aHJlZSBsZXR0ZXJzXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IHBhc3N3b3JkLmxlbmd0aCkge1xuICAgIGxldCBqID0gMFxuICAgIHdoaWxlIChcbiAgICAgIGkgKyBqIDwgcGFzc3dvcmQubGVuZ3RoIC0gMSAmJlxuICAgICAgcGFzc3dvcmQuY2hhckNvZGVBdChpICsgaikgPT09IHBhc3N3b3JkLmNoYXJDb2RlQXQoaSArIGogKyAxKSAtIDEgJiZcbiAgICAgIGogPCAyXG4gICAgKSB7XG4gICAgICArK2pcbiAgICB9XG4gICAgaWYgKGogPT09IDIpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgKytpXG4gIH1cblxuICBpZiAoaSA9PT0gcGFzc3dvcmQubGVuZ3RoKSByZXR1cm4gZmFsc2VcblxuICAvLyBDaGVjayB0aGF0IGl0IGhhcyBhdCBsZWFzdCB0d28gcGFpcnMgb2YgcmVwZWF0ZWQgY2hhcmFjdGVyc1xuICBjb25zdCByZXBlYXRlZCA9IChwYXNzd29yZC5tYXRjaChuZXcgUmVnRXhwKC8oW2Etel0pXFwxLywgJ2cnKSkgfHwgW10pLmxlbmd0aFxuICBpZiAocmVwZWF0ZWQgPCAyKSByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCByZXBsYWNlQXQgPSAoaTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIG5ld0NoYXI6IHN0cmluZyk6IHN0cmluZyA9PlxuICB0ZXh0LnNsaWNlKDAsIGkpICsgbmV3Q2hhciArIHRleHQuc2xpY2UoaSArIDEsIHRleHQubGVuZ3RoKVxuXG5jb25zdCBpbmNyZWFzZUNoYXIgPSAoaTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgZmlyc3RDb2RlID0gJ2EnLmNoYXJDb2RlQXQoMClcbiAgY29uc3QgbGFzdENvZGUgPSAneicuY2hhckNvZGVBdCgwKVxuXG4gIGxldCBuZXdDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGkpICsgMVxuICBpZiAobmV3Q29kZSA+IGxhc3RDb2RlKSBuZXdDb2RlID0gZmlyc3RDb2RlXG5cbiAgY29uc3QgbmV3Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUobmV3Q29kZSlcbiAgcmV0dXJuIHJlcGxhY2VBdChpLCB0ZXh0LCBuZXdDaGFyKVxufVxuXG5jb25zdCBpbmNyZW1lbnRTdHIgPSAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IGogPSB0ZXh0Lmxlbmd0aFxuICBkbyB7XG4gICAgLS1qXG4gICAgdGV4dCA9IGluY3JlYXNlQ2hhcihqLCB0ZXh0KVxuICB9IHdoaWxlIChqID4gMCAmJiB0ZXh0W2pdID09PSAnYScpXG4gIHJldHVybiB0ZXh0XG59XG5cbmxldCB0ZXh0ID0gaW5wdXRcbndoaWxlICghaXNWYWxpZCh0ZXh0KSlcbiAgdGV4dCA9IGluY3JlbWVudFN0cih0ZXh0KVxuXG5jb25zb2xlLmxvZyh0ZXh0KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sUUFBUTtBQUVkLFNBQVMsUUFBUSxRQUFnQixFQUFFO0lBQ2pDLDBDQUEwQztJQUMxQyxJQUFJLFNBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE9BQU8sS0FBSztJQUVuRCx5RUFBeUU7SUFDekUsSUFBSSxJQUFJO0lBQ1IsTUFBTyxJQUFJLFNBQVMsTUFBTSxDQUFFO1FBQzFCLElBQUksSUFBSTtRQUNSLE1BQ0UsSUFBSSxJQUFJLFNBQVMsTUFBTSxHQUFHLEtBQzFCLFNBQVMsVUFBVSxDQUFDLElBQUksT0FBTyxTQUFTLFVBQVUsQ0FBQyxJQUFJLElBQUksS0FBSyxLQUNoRSxJQUFJLEVBQ0o7WUFDQSxFQUFFO1FBQ0o7UUFDQSxJQUFJLE1BQU0sR0FBRztZQUNYLEtBQUs7UUFDUCxDQUFDO1FBRUQsRUFBRTtJQUNKO0lBRUEsSUFBSSxNQUFNLFNBQVMsTUFBTSxFQUFFLE9BQU8sS0FBSztJQUV2Qyw4REFBOEQ7SUFDOUQsTUFBTSxXQUFXLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxPQUFPLGFBQWEsU0FBUyxFQUFFLEVBQUUsTUFBTTtJQUM1RSxJQUFJLFdBQVcsR0FBRyxPQUFPLEtBQUs7SUFFOUIsT0FBTyxJQUFJO0FBQ2I7QUFFQSxNQUFNLFlBQVksQ0FBQyxHQUFXLE1BQWMsVUFDMUMsS0FBSyxLQUFLLENBQUMsR0FBRyxLQUFLLFVBQVUsS0FBSyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssTUFBTTtBQUU1RCxNQUFNLGVBQWUsQ0FBQyxHQUFXLE9BQWlCO0lBQ2hELE1BQU0sWUFBWSxJQUFJLFVBQVUsQ0FBQztJQUNqQyxNQUFNLFdBQVcsSUFBSSxVQUFVLENBQUM7SUFFaEMsSUFBSSxVQUFVLEtBQUssVUFBVSxDQUFDLEtBQUs7SUFDbkMsSUFBSSxVQUFVLFVBQVUsVUFBVTtJQUVsQyxNQUFNLFVBQVUsT0FBTyxZQUFZLENBQUM7SUFDcEMsT0FBTyxVQUFVLEdBQUcsTUFBTTtBQUM1QjtBQUVBLE1BQU0sZUFBZSxDQUFDLE9BQXlCO0lBQzdDLElBQUksSUFBSSxLQUFLLE1BQU07SUFDbkIsR0FBRztRQUNELEVBQUU7UUFDRixPQUFPLGFBQWEsR0FBRztJQUN6QixRQUFTLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUk7SUFDbEMsT0FBTztBQUNUO0FBRUEsSUFBSSxPQUFPO0FBQ1gsTUFBTyxDQUFDLFFBQVEsTUFDZCxPQUFPLGFBQWE7QUFFdEIsUUFBUSxHQUFHLENBQUMifQ==