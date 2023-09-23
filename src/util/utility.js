export const saveTaskToLocalStorage = (newList) => {
    localStorage.setItem('todo' ,JSON.stringify(newList));
  }