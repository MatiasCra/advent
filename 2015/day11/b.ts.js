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
const nextPassword = (previous)=>{
    let newPassword = previous;
    do {
        newPassword = incrementStr(newPassword);
    }while (!isValid(newPassword))
    return newPassword;
};
const first = nextPassword(input);
const second = nextPassword(first);
console.log(first);
console.log(second);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9tYXRpYXNjcmEvRG9jdW1lbnRzL0Rlc2Fycm9sbG8vYWR2ZW50LzIwMTUvZGF5MTEvYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9ICd2emJ4a2doYidcblxuZnVuY3Rpb24gaXNWYWxpZChwYXNzd29yZDogc3RyaW5nKSB7XG4gIC8vIENoYWNrIHRoYXQgaXQgZG9lc24ndCBoYXZlIGFuIGksIG8gb3IgbFxuICBpZiAocGFzc3dvcmQuc2VhcmNoKC8oaXxvfGwpLykgIT09IC0xKSByZXR1cm4gZmFsc2VcblxuICAvLyBDaGVjayBpZiBpdCBpbmNsdWRlcyBvbmUgaW5jcmVhc2luZyBzdHJhaWdodCBvZiBhdCBsZWFzdCB0aHJlZSBsZXR0ZXJzXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IHBhc3N3b3JkLmxlbmd0aCkge1xuICAgIGxldCBqID0gMFxuICAgIHdoaWxlIChcbiAgICAgIGkgKyBqIDwgcGFzc3dvcmQubGVuZ3RoIC0gMSAmJlxuICAgICAgcGFzc3dvcmQuY2hhckNvZGVBdChpICsgaikgPT09IHBhc3N3b3JkLmNoYXJDb2RlQXQoaSArIGogKyAxKSAtIDEgJiZcbiAgICAgIGogPCAyXG4gICAgKSB7XG4gICAgICArK2pcbiAgICB9XG4gICAgaWYgKGogPT09IDIpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgKytpXG4gIH1cblxuICBpZiAoaSA9PT0gcGFzc3dvcmQubGVuZ3RoKSByZXR1cm4gZmFsc2VcblxuICAvLyBDaGVjayB0aGF0IGl0IGhhcyBhdCBsZWFzdCB0d28gcGFpcnMgb2YgcmVwZWF0ZWQgY2hhcmFjdGVyc1xuICBjb25zdCByZXBlYXRlZCA9IChwYXNzd29yZC5tYXRjaChuZXcgUmVnRXhwKC8oW2Etel0pXFwxLywgJ2cnKSkgfHwgW10pLmxlbmd0aFxuICBpZiAocmVwZWF0ZWQgPCAyKSByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCByZXBsYWNlQXQgPSAoaTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIG5ld0NoYXI6IHN0cmluZyk6IHN0cmluZyA9PlxuICB0ZXh0LnNsaWNlKDAsIGkpICsgbmV3Q2hhciArIHRleHQuc2xpY2UoaSArIDEsIHRleHQubGVuZ3RoKVxuXG5jb25zdCBpbmNyZWFzZUNoYXIgPSAoaTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgZmlyc3RDb2RlID0gJ2EnLmNoYXJDb2RlQXQoMClcbiAgY29uc3QgbGFzdENvZGUgPSAneicuY2hhckNvZGVBdCgwKVxuXG4gIGxldCBuZXdDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGkpICsgMVxuICBpZiAobmV3Q29kZSA+IGxhc3RDb2RlKSBuZXdDb2RlID0gZmlyc3RDb2RlXG5cbiAgY29uc3QgbmV3Q2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUobmV3Q29kZSlcbiAgcmV0dXJuIHJlcGxhY2VBdChpLCB0ZXh0LCBuZXdDaGFyKVxufVxuXG5jb25zdCBpbmNyZW1lbnRTdHIgPSAodGV4dDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IGogPSB0ZXh0Lmxlbmd0aFxuICBkbyB7XG4gICAgLS1qXG4gICAgdGV4dCA9IGluY3JlYXNlQ2hhcihqLCB0ZXh0KVxuICB9IHdoaWxlIChqID4gMCAmJiB0ZXh0W2pdID09PSAnYScpXG4gIHJldHVybiB0ZXh0XG59XG5cbmNvbnN0IG5leHRQYXNzd29yZCA9IChwcmV2aW91czogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IG5ld1Bhc3N3b3JkID0gcHJldmlvdXNcbiAgZG8ge1xuICAgIG5ld1Bhc3N3b3JkID0gaW5jcmVtZW50U3RyKG5ld1Bhc3N3b3JkKVxuICB9IHdoaWxlICghaXNWYWxpZChuZXdQYXNzd29yZCkpXG4gIHJldHVybiBuZXdQYXNzd29yZFxufVxuXG5jb25zdCBmaXJzdCA9IG5leHRQYXNzd29yZChpbnB1dClcbmNvbnN0IHNlY29uZCA9IG5leHRQYXNzd29yZChmaXJzdClcbmNvbnNvbGUubG9nKGZpcnN0KVxuY29uc29sZS5sb2coc2Vjb25kKVxuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxRQUFRO0FBRWQsU0FBUyxRQUFRLFFBQWdCLEVBQUU7SUFDakMsMENBQTBDO0lBQzFDLElBQUksU0FBUyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxLQUFLO0lBRW5ELHlFQUF5RTtJQUN6RSxJQUFJLElBQUk7SUFDUixNQUFPLElBQUksU0FBUyxNQUFNLENBQUU7UUFDMUIsSUFBSSxJQUFJO1FBQ1IsTUFDRSxJQUFJLElBQUksU0FBUyxNQUFNLEdBQUcsS0FDMUIsU0FBUyxVQUFVLENBQUMsSUFBSSxPQUFPLFNBQVMsVUFBVSxDQUFDLElBQUksSUFBSSxLQUFLLEtBQ2hFLElBQUksRUFDSjtZQUNBLEVBQUU7UUFDSjtRQUNBLElBQUksTUFBTSxHQUFHO1lBQ1gsS0FBSztRQUNQLENBQUM7UUFFRCxFQUFFO0lBQ0o7SUFFQSxJQUFJLE1BQU0sU0FBUyxNQUFNLEVBQUUsT0FBTyxLQUFLO0lBRXZDLDhEQUE4RDtJQUM5RCxNQUFNLFdBQVcsQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLE9BQU8sYUFBYSxTQUFTLEVBQUUsRUFBRSxNQUFNO0lBQzVFLElBQUksV0FBVyxHQUFHLE9BQU8sS0FBSztJQUU5QixPQUFPLElBQUk7QUFDYjtBQUVBLE1BQU0sWUFBWSxDQUFDLEdBQVcsTUFBYyxVQUMxQyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssVUFBVSxLQUFLLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxNQUFNO0FBRTVELE1BQU0sZUFBZSxDQUFDLEdBQVcsT0FBaUI7SUFDaEQsTUFBTSxZQUFZLElBQUksVUFBVSxDQUFDO0lBQ2pDLE1BQU0sV0FBVyxJQUFJLFVBQVUsQ0FBQztJQUVoQyxJQUFJLFVBQVUsS0FBSyxVQUFVLENBQUMsS0FBSztJQUNuQyxJQUFJLFVBQVUsVUFBVSxVQUFVO0lBRWxDLE1BQU0sVUFBVSxPQUFPLFlBQVksQ0FBQztJQUNwQyxPQUFPLFVBQVUsR0FBRyxNQUFNO0FBQzVCO0FBRUEsTUFBTSxlQUFlLENBQUMsT0FBeUI7SUFDN0MsSUFBSSxJQUFJLEtBQUssTUFBTTtJQUNuQixHQUFHO1FBQ0QsRUFBRTtRQUNGLE9BQU8sYUFBYSxHQUFHO0lBQ3pCLFFBQVMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSTtJQUNsQyxPQUFPO0FBQ1Q7QUFFQSxNQUFNLGVBQWUsQ0FBQyxXQUE2QjtJQUNqRCxJQUFJLGNBQWM7SUFDbEIsR0FBRztRQUNELGNBQWMsYUFBYTtJQUM3QixRQUFTLENBQUMsUUFBUSxhQUFhO0lBQy9CLE9BQU87QUFDVDtBQUVBLE1BQU0sUUFBUSxhQUFhO0FBQzNCLE1BQU0sU0FBUyxhQUFhO0FBQzVCLFFBQVEsR0FBRyxDQUFDO0FBQ1osUUFBUSxHQUFHLENBQUMifQ==