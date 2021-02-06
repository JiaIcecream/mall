import {request} from './network'

export function getMany(){
  return request({
    url:'/home/multidata'
  })
}