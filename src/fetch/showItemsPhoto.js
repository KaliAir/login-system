export const showItemsPhoto = async(id)=>{
    const res = await fetch(`/api/showitemsphoto?catId=${id}`,{cache:"no-store"})
    const jsonRes = res.json()
    return jsonRes
}