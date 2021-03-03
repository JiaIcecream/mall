import {request} from './network'


// 请求商品的详细信息
export function getGoodsDetail(iid){
  return request({
    url:'/detail?',
    params:{
      iid
    }
  })
}