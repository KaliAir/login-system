export const resetpassword = async (dataObj)=>{
    const res = await fetch("/api/resettotrue",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });
    const jsonRes = await res.json();
    return jsonRes;
}