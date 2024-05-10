
export function wordsort(paragraph,wordcount=3){
    const sorted = paragraph.split(" ").slice(0, wordcount).join(" ");
    return sorted
 }