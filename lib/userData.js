import { getToken } from "./authenticate";

export async function addToFavourties(id){
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/favourites/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `JWT ${token}`
        },
    });
  
    if (res.status === 200) {
      return await res.json();
    } else {
      return []
    }
}

export async function removeFromFavourties(id){
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/favourites/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${token}`
        },
    });
  
    if (res.status === 200) {
      return await res.json();
    } else {
      return []
    }
}

export async function getFavourites(){
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/favourites/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`
        },
    });
  
    if (res.status === 200) {
      return await res.json();
    } else {
      return []
    }
}

export async function addToHistory(id){
  console.log("nice")
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/history/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `JWT ${token}`
        },
    });
  
    if (res.status === 200) {
      return await res.json();
    } else {
      return []
    }
}

export async function removeFromHistory(id){
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${token}`
        },
    });
  
    if (res.status === 200) {
      return await res.json();
    } else {
      return []
    }
}

export async function getHistory(){
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/history/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`
        },
    });
  
    if (res.status === 200) {
      return await res.json();
    } else {
      return []
    }
}