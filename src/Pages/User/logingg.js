

import { GoogleOAuthProvider ,GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const ClientID= process.env.ClientID;
const LoginGG = ()=>{
    return(
        <GoogleOAuthProvider clientId={ClientID} >
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    var decoded= jwt_decode(credentialResponse.credential)
                    console.log(decoded);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                //useOneTap
            />
        </GoogleOAuthProvider>
    );
}
export default LoginGG;