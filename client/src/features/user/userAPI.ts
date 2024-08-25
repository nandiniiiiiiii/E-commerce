export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own/");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId: any) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+userId);
    const data = await response.json();
    console.log(data,"hello2")
    resolve({ data });
  });
}
