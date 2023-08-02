import {store} from '../storage/persistStore.tsx'

//отфильтровываем все tags из store
export const findAllTagsInStore = () => {
  const obj = store.getState();
  const todoTags = obj.todo.tasks.map((task) => task.tag);
  const sheduleTags = obj.schedule.tasks.map((task) => task.tag);
  const deleteTags = obj.delete.tasks.map((task) => task.tag);
  const delegateTags = obj.delegate.tasks.map((task) => task.tag);
  const allTags = [
    ...new Set([todoTags, sheduleTags, deleteTags, delegateTags].flat(2)),
  ];
  return allTags;
};
