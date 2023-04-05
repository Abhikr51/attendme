


class Api{
    static defaults ={
        token : "",
        geo_lat : '',
        geo_long : ''
    }
    static get = async(url="",configs={
        headers: {}
    }) =>{
        let responseObject = {
            data : {}
        }
        await fetch(url,{
            method : 'get',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.defaults['token'],
                'geo-lat' : this.defaults.geo_lat,
                'geo-long' : this.defaults.geo_long,
                ...configs.headers
            }
        } )
        .then(response => response.json())
        .then(resData => {
            responseObject = {...responseObject ,data : resData}
        }).catch(err => {
            throw new Error(err);
        })
        return responseObject
    }
    static post = async(url="",data={},configs={
        headers: {}
    }) =>{
        let responseObject = {
            data : {}
        }
        await fetch(url,{
            method : 'post',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.defaults['token'],
                ...configs.headers
            },
            body : JSON.stringify(data)
        } )
        .then(response => response.json())
        .then(resData => {
            responseObject = {...responseObject ,data : resData}
        }).catch(err => {
            throw new Error(err);
        })
        return responseObject
    }
    // static post = async(url="",data,configs={}) =>{
    //     await fetch(url, {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': "Bearer " + token
    //         },
    //         body: FData
    //     })
    //     .then(response => response.json())
    //     .then(resData => {
    //         console.log("upload", resData.data);
    //         if(resData.status){
    //             dispatch({
    //                 type : 'CREATE_AUTH_'+ typeReturner(type),
    //                 payload : resData.data
    //             })
    //             console.log(resData.message)
    //             appToast.success({message : resData.message})
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //         throw new Error(err.message);
    //     })
    // }

}

export default Api;
