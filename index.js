console.log("hello lolo ")
const httpServer = require ('http');
/////////sever for user /////
httpServer.createServer( (req,res)=>{
    const {url,method }=req;
    let User=[
        {
            id:2020,
            name:"ahmed",
            email:"ahmed@gmail.com"
    },
    {
        id:2020,
        name:"lola",
        email:"lola@gmail.com"
}
]
    let data
    if (url=='/user'&&method=='POST'){
        req.on('data',(chunk)=>{
            console.log(chunk);
            data=chunk;
        })
        req.on('end' ,()=>{
          let parsedData=JSON.parse(data);

          console.log(parsedData);
          let check=User.find((ele)=>{
            return ele.email==parsedData.email
          })
          if (check){
res.write("user is already exis ")
res.end();
          }
          else{
          User.push(parsedData);
         console.log(JSON.stringify(User))
         res.write(JSON.stringify(User))
res.end(); 
          }    
   })
    }
    if (url =='/sorted'&&method =='GET')
    {
     let Sorted= User.sort((a,b)=>a.name.toLowerCase() > b.name.toLowerCase?1:-1 );
     res.write(JSON.stringify(Sorted));
     res.end();

    }
    if (url=='/delete'&&method=='DELETE'){
        req.on('data',(chunk)=>{
          //  console.log(chunk);
            data=chunk;
        })
        req.on('end' ,()=>{
          let parsedData=JSON.parse(data);
          let check=User.find((ele)=>{
            return ele.name==parsedData.name
          })
          if (check){
             let i =User.indexOf(check);
             User.splice(i,1);
       
             res.write("deleted successfully");
            console.log(User)
             res.end();
          }else{
            res.write("user isn,t exist");
            res.end();
          }
        // console.log(User);
        })  
    }
    if (url=='/update'&&method=='PUT'){
        req.on('data',(chunk)=>{
          //  console.log(chunk);
            data=chunk;
        })
        req.on('end' ,()=>{
          let parsedData=JSON.parse(data);
          let check=User.find((ele)=>{
            return ele.name==parsedData.name
          })
          if (check){
             let i =User.indexOf(check);
           User[i]=parsedData;
             res.write("updated successfully");
            console.log(User)
             res.end();
          }else{
           
            res.end();
          }
         
        })  
    }

    ///////////////////////////////////////
    if (url=='/search'&&method=='GET'){
        req.on('data',(chunk)=>{
          //  console.log(chunk);
            data=chunk;
        })
        req.on('end' ,()=>{
          let parsedData=JSON.parse(data);
          let check=User.find((ele)=>{
            return ele.id==parsedData.id
          })
          if (check){
           
           console.log(check)
             res.end();
          }else{
           res.write("error 404");
            res.end();
          }
         
        })  
    }
}).listen(3000,()=>{
    console.log("server is done")
})
/////////////////////////////////////////////// server for posts////////////////////////////
httpServer.createServer( (req,res)=>{
    const{url,method}=req;
    const post=
    [
        {
            id:82,
            points:885,
            postType:"photo"
        },
        {
            id:85,
            points:85,
            postType:"aext"
        },
        {
            id:82,
            points:5,
            postType:"video"
        }

    ]
    if (url=='/addpost'&&method=='POST'){
    let postData;
    req.on('data',(chunck)=>{
console.log(chunck);
postData=chunck;
    })
    req.on('end',()=>{
        let parsedData=JSON.parse(postData);
        let checked=post.find((ele)=>{
            return ele.id==parsedData.id
        })
        if (checked){
            res.write("post is already added");
            res.end();
        }
        else {
            post.push(parsedData);
            res.write(JSON.stringify(post));
            res.end()
        }
    })
}
else if (url=='/sorted'&&method=='GET'){
    let sorted=post.sort((a,b)=>a.postType.toLowerCase() > b.postType.toLowerCase?1:-1 );
    let rev_sort=[...sorted.reverse()]
    console.log(rev_sort)
}
////////////////////////////////////////
if (url=='/delete'&&method=='DELETE'){
    req.on('data',(chunk)=>{
      //  console.log(chunk);
        data=chunk;
    })
    req.on('end' ,()=>{
      let parsedData=JSON.parse(data);
      let check=post.find((ele)=>{
        return ele.id==parsedData.id
      })
      if (check){
         let i =post.indexOf(check);
         post.splice(i,1);
   
         res.write("deleted successfully");
        console.log(post)
         res.end();
      }else{
        res.write("user isn,t exist");
        res.end();
      }
     // console.log(User);
    })  
}
if (url=='/update'&&method=='PUT'){
    req.on('data',(chunk)=>{
      //  console.log(chunk);
        data=chunk;
    })
    req.on('end' ,()=>{
      let parsedData=JSON.parse(data);
      let check=post.find((ele)=>{
        return ele.id==parsedData.id
      })
      if (check){
         let i =post.indexOf(check);
       post[i]=parsedData;
         res.write("updated successfully");
           console.log(post)
           res.write(JSON.stringify(post))
             res.end();
      }else{
       
        res.end();
      }
     
    })  
}

//////////////////////////////////////////////////////////////////////////////////
if (url=='/search'&&method=='GET'){
    req.on('data',(chunk)=>{
      //  console.log(chunk);
        data=chunk;
    })
    req.on('end' ,()=>{
      let parsedData=JSON.parse(data);
      let check=post.find((ele)=>{
        return ele.id==parsedData.id
      })
      if (check){
       
       console.log(check)
         res.end();
      }else{
       res.write("error 404");
        res.end();
      }
     
    })  
}

}).listen(4000,()=>{
    console.log("post server is running")
})
