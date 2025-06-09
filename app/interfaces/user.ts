export interface users {
  UserName:string,
  email:string,
  _id:string,
}


export interface post{
    PostName:string,
    Banner:string,
    writer:string,
    content:string,
    comments:string[],
    tags:string[],
    _id:string,
    view:number,
    loves:number | string[] | any,
    Date:Date | string,

}

export interface comment{
  commentName:string,
  commentDate:string,
  commentContent:string,
  PhotoUrl:string,
  idComment:number | string,
  idUser:string | any,
}