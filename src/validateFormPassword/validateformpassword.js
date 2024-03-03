export const isPasswordValid= (password) => {
    // Minimum length
    if (password.length < 8) {
      return {status:false,message:"Password minimum length 8"};
    }
  
    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return {status:false,message:"Password at least one uppercase letter"};
    }
  
    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return {status:false,message:"Password at least one lowercase letter"};
    }
  
    // At least one digit
    if (!/\d/.test(password)) {
        return {status:false,message:"Password at least one digit number"};
    }
  
    // At least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {status:false,message:"Passord at least one special character"};
    }

   
    return {status:true,message:"Success"};
  };