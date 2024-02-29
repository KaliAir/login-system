export const verifyemail = async (data)=>{
    const res = await fetch('/api/verifyemail',{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const jsonRes = await res.json()
    return jsonRes;
}