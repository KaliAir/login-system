export const showItems = async(catId)=>{
    const res = await fetch(`/api/showitems?catId=${catId}`,{cache:"no-store"})
    const jsonRes = await res.json();
    return jsonRes;
}