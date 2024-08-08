import { isRejected } from "@reduxjs/toolkit"

export function createUser(userData: any) {
    return new Promise(async (resolve) => {
        const res = fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'content-type': 'application/json' },
        })
        const data = (await res).json()
        console.log(data)
        resolve({ data })
    })
}

export function checkUser(userInfo: any) {
    return new Promise(async (resolve, rejected) => {
        const email = userInfo.email
        const password = userInfo.password
        const response = await fetch('http://localhost:8080/users?email=' + email)
        const data = await response.json()
        if (data.length) {
            if (password === data[0].password) {
                console.log(data[0].password);
                console.log(password)
                resolve({ data: data[0] })
            } else {
                rejected({ message: "user not found(2)" })

            }
        } else {
            rejected({ message: "user not found" })
        }
    });
}

export function signOut(userId) {
    return new Promise(async (resolve, reject) => {
        // try {
        //     const response = await fetch('/auth/logout');
        //     if (response.ok) {
        //         resolve({ data: 'success' });
        //     } else {
        //         const error = await response.text();
        //         reject(error);
        //     }
        // } catch (error) {
        //     console.log(error)
        //     reject(error);
        // }
        resolve({data:"success"})
    });
}

export function resetPasswordRequest(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/auth/reset-password-request', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'content-type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }

    });
}

export function resetPassword(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.text();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }

    });
}