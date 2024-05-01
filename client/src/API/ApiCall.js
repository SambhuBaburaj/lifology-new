import Instance from "./Axios";


export const RegisterDatacall=async (data)=>
{

  return await Instance.post('/userregister',data)
}
export const Validate=async (data)=>
{

  return await Instance.get(`/userregister?user=${data}`)
}
export const LoginUserdata=async (data)=>
{


  return await Instance.post('/loginuser',data)
}

export const OTPsend=async (data)=>
{


  return await Instance.post('/sendotp',data)
}

export const varifyOTP=async (data)=>
{


  return await Instance.post('/varifyotp',data)
}
export const googleAuthApi=async (data)=>
{


  return await Instance.post('/googleauth',data)
}
export const getweeklychallengeAPI=async ()=>
{


  return await Instance.get('/getweeklychallenge')
}
export const completedTaskAPI=async ()=>
{


  return await Instance.get('/completedchallenges')
}
export const finishedTask=async (data)=>
{


  return await Instance.post('/taskfinished',data)
}
export const userCompletedTask=async ()=>
{


  return await Instance.get('/userfinishedtasks')
}
export const GetuserData=async ()=>
{


  return await Instance.get('/getuser')
}
export const updateTimeApi=async ()=>
{
  return await Instance.get('/timeupdate')
}