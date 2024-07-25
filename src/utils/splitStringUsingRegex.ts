export default function splitStringUsingRegex(inputSting: string): string[] {
  const characters: string[] = [];
  const regex = /[\s\S]/gu;

  let match;

  while ((match = regex.exec(inputSting)) !== null) {
    characters.push(match[0]);
  }
  return characters;
}
