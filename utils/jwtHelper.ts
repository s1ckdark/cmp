import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req: any, res: any) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)
  res.end()
}

export const parseJwt = (token:string) => {        
    const decode = JSON.parse(atob(token.split('.')[1]));
    console.log(decode);
    if (decode.exp * 1000 < new Date().getTime()) {
      console.log('Time Expired');
      return false;
    }
};