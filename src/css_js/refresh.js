export function setObj (key,obj) {
  obj = JSON.stringify(obj);
  // localStorage.setItem(key,obj)
  sessionStorage.setItem(key,obj)
  return obj
}

export function getObj (key) {
  // var obj = JSON.parse(localStorage.getItem(key));
  var obj = JSON.parse(sessionStorage.getItem(key));
  return obj
}