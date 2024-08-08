export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const res = await fetch('http://localhost:8080/products')
        const data = await res.json()
        console.log(data)
        resolve({ data })
    })
}

export function fetchProductById(id: number) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/products/' + id);
      const data = await response.json();
      resolve({ data });
    });
  }

export function fetchProductsByFilters(filter: any, sort: any, pagination: any) {
    let queryString = '';
    for (let key in filter) {
        const values = filter[key]
        if (values.length > 0) {
            const lastval = values[values.length - 1]
            queryString += `${key}=${lastval}&`;
            console.log(queryString)
        }
    }
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
    }
    console.log(pagination)
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
    }
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/products?' + queryString)
        const data = await response.json()
        // const totalItems:number =  await response.headers.get('X-Total-Count');
        const totalItems:number = 30
        console.log(totalItems+"done")
        resolve({ data:{ products: data, totalItems:+totalItems } });
        // resolve({data})
    })
}

