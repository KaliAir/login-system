export const getCategory = async(userId)=>{
    const res = await fetch(`/api/getcategory?userId=${userId}`,{cache:"no-store"});
    const jsonRes = await res.json();
    return jsonRes;
}