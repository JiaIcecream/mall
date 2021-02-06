import {request} from './network'

//请求多类数据
export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}

//请求商品详细信息
export function getGoodsData(type,page){
  return request({
    url:'/home/data?',
    params:{
      type,
      page
    }
  })
}