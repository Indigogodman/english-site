import axios from 'axios';

export default async (url: any, options = {}) =>{
    try{
        const response = await axios({...options, url});
        if(response.status!==200){
            throw new Error(response.statusText);
        }
        return await response;
    }catch(err){
        return err
    }
  };
