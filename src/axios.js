import axios from "axios";
import Element from 'element-ui'
import router from "./router";
axios.defaults.baseURL = "http://127.0.0.1:8081"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

request.interceptors.request.use(config=>{
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

request.interceptors.response.use(response=>
    {
        console.log("response ->" + response)
        let res = response.data

        if(res.code === 200)//正常
        {
            return response
        }
        else//异常信息弹窗
        {
            Element.Message.error(res.msg?res.msg:'系统错误')//三元表达式，msg为空则弹窗error
            return Promise.reject(response.data.msg)
        }

    },error => {

        if(error.response.data){
            error.message = error.response.data.msg
        }

        if(error.response.status ===401)/*无权限*/
       {

            router.push("/UserLogin")
        }

        Element.Message.error(error.message,{duration:3000})

        return Promise.reject(error)
    }

)

export default request
