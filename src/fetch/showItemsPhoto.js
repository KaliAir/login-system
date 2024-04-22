export const showItemsPhoto = async(id)=>{
    const res = await fetch(`/api/showitemsphoto?catId=${id}`)
    const jsonRes = res.json()
    return jsonRes
}