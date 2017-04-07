import jwt from "../jwt-store";

const API_ORIGIN = process.env.REACT_APP_API_ORIGIN;

const url = (path) => `${API_ORIGIN}${path}`;

const request = (method, path, body) => fetch(
    url(path),
    {
        method,
        body: JSON.stringify(body),
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt.get()}`,
            "Content-Type": "application/json"
        },
        mode: "cors"
    }
).then(res => {
   if (res.ok) {
       return res.status === 204 ? null : res.json();
   } else {
       throw new Error(`Could not ${method} to ${path}: ${res.status} ${res.statusText}`);
   }
});

export const get = (path) => request("GET", path);
export const post = (path, body) => request("POST", path, body);
export const put = (path, body) => request("PUT", path, body);