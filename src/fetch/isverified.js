export const isverified = async (dataObj)=>{
    const res = await fetch("/api/isverified",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });
    const jsonRes = await res.json();
    return jsonRes;
}