export const highlightHashTag = (text: string) => {
  return text.split(/(#\S+)/g).map((fragment, index) => {
    if (fragment.startsWith("#")) {
      return (
        <span key={index} className="highlight">
          {fragment}
        </span>
      );
    } else {
      return <span key={index}>{fragment}</span>;
    }
  });
};

export const findHashTag = (text: string) => {
  const matches = text.match(/#\S+/g);
  return matches ? matches.map((tag) => tag) : []; //проверка на null
};