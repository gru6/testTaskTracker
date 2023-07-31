export const highlightHashTag = (text: string) => {
  const words = text.split(/(\s+)/);
/*   console.log('words', words) */
  const highlightedText = words.map((word, index) => {
    if (word.startsWith("#")) {
      return (
        <span key={index} className="highlight">
          {word}
        </span>
      );
    } else {
      return word;
    }
  });
  return <>{highlightedText}</>;
};

export const findHashTag = (text: string) => {
  const matches = text.match(/#(\S+?(?=\s|$))/g);
  return matches ? matches.map((tag) => tag) : [];
};


export const delHashTagFromText = (text: string) => {
  return text.replace(/#/g, "");
}
