export const validateForgotToken = async (dataObj)=>{
    const res = await fetch("/api/validateforgottoken",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });
    const jsonRes = await res.json();
    return jsonRes;
}