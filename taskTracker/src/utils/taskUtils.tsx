import { Dispatch } from "redux";

export const highlightHashTag = (text: string) => {
  const words = text.split(/(\s+)/);
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

//находим все tags в строке
export const findHashTag = (text: string) => {
  const matches = text.match(/#(\S+?(?=\s|$))/g);
  return matches ? matches.map((tag) => tag) : [];
};

//увдаляем tag для отображения названия таски без символа #
export const delHashTagSymbol = (text: string) => {
  return text.replace(/#/g, "");
}

export const handleDeleteTask = (dispatch: Dispatch, taskID: number, taskTag: string[], taskBox: string) => {
  const actionType = `${taskBox}/removeTask`;
  dispatch({ type: actionType, payload: taskID });
  dispatch({
    type: `filter/delFilterTag`,
    payload: { filter: taskTag }, //из отфильтрованных тегов удаляем те которе были у удаленного элемена
  });
};