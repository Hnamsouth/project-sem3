import UserLayout from "../Conponents/User/UserLayout";
import RouteProtected from "../Pages/User/auth/Protected";
import { CheckToken } from "../Service/auth.service";


export const prepareRouter = (path,element,auth,child)=>{
    return {
      path:path,
      element:auth?<RouteProtected child={<UserLayout main={element}/>}/>:<UserLayout main={element}/>,
      loader:auth? async ({})=>{return await CheckToken();}:null,
    };
  }