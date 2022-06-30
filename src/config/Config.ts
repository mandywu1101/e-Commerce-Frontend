import DevConfig from "./DevConfig";
import ProdConfig from "./ProdConfig";

export default function getEnvConfig(){
    if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return DevConfig
    }else {
        return ProdConfig
    }
}