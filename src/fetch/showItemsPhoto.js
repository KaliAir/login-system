export const showItemsPhoto = async(id)=>{
    const res = await fetch(`/api/showitemsphoto?catId=${id}`,{cache:"no-store"})
    const jsonRes = await res.json()
    return jsonRes
}