import React, {Component} from "react";
import {withRouter } from "react-router-dom";
import { Link} from "react-router-dom";
import Input from "../../Resources/Inputfield/Inputfield";
import Button from "../../Resources/Button/Button";
import "./Signup.css";
import Toast from "../../Resources/Toast/Toast";
import Avatar from "../../Resources/Avatar/Avatar";
// import Axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();




//   password variabul
  const lowercase = new RegExp("(?=.*[a-z])");
  const upercase=new RegExp("(?=.*[A-Z])");
  const numbaerCheak= new RegExp("(?=.*[0-9])");
  const specialChar= new RegExp("(?=.*[!@#\$%\^\&*\)\(+=._-])");
  const eightCharecter = new RegExp("(?=.{8,})");

let imageBol= true;

class Signup extends Component{
    state={
        loading:false,
        videoLoading:false,
        image:{data:"",
                 bolean:false},
        imageMessage:"",

        video:{data:"",
                     bolean:false
                 },
        videoMessage:"",
        
        name:{value:"",
                bolean:false},

        email:{value:"",
        bolean:false},

        github:{value:"",
        bolean:false},

        linkdin:{value:"",
        bolean:false},

        password:{value:""},

        rePassword:{value:"",
        bolean:false},

        button:false,
        toast:{
            massage:"",
            type:"",
            bolean:false
        },

    }
     emailArray=["emailSignup"];
     passWoulbe=["initial"];
     

      lower= ["needDefaultPassword"];
      upper = ["needDefaultPassword"];
     num = ["needDefaultPassword"];
      special = ["needDefaultPassword"];
      lenString= ["needDefaultPassword"];

      matchControler=["notVisibul"];

      routingFunction = (param) => {
        this.props.history.push({
            pathname: `/dashboard`,
            state: param
        });
    }

    mainRoute = (para)=>{
        this.props.history.push({
            pathname: `/signup`,
            state: para
        });
    }
// toast function
toastHandler(s,classer){
    this.setState({toast:{
        massage:s,
        type:classer,
        bolean:true
    }});
    setTimeout(()=>{
        this.setState({toast:{
            bolean:false
        }});
    },3000);
}



    clickHandler= async ()=>{
        const {name,email, github, linkdin, password, rePassword,image,video }= this.state;
        console.log(name.value+ " "+email.value+" "+github.value+" "+linkdin.value+" "+password.value+" "+image.data+" "+video.data);
    //  fetch
    let datas={
        name:name.value,
        email:email.value,
        profilePic:image.data,
        sampuleVideo:video.data,
        github:github.value,
        linkdin:linkdin.value,
        password:password.value
        }
        

       await fetch("https://leacteer-api.herokuapp.com/signup",{
        method: "POST",
       
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datas)
       })
       .then(response=>response.json())
       .then(data=>{
           if(data.error && data.error.status===409){
           
                this.toastHandler("This email id is allready registerd.","warning");
           
           }
          
       if(data.token){
        cookies.set('SID', data.refresToken, {maxAge: 90*24*60*60});
        sessionStorage.setItem("NA_R", data.token);
            
           //    return  this.props.history.push("/dashboard")
         this.toastHandler("Data save succesful.","success");
          this.routingFunction()
       }
              
        
                })
       
       .catch(err=>{console.log(err);
   console.log(err.status);
    })

            }

    uploade=async e=>{
       const files=e.target.files[0];
       imageBol = files.name.match(/.jpg|.jpeg|.png|.gif/gi)
       if(!imageBol) return this.setState({imageMessage:"You should to uplod image file."})
       this.setState({imageMessage:""})
       
    //    files.includes(".jpg") || files.includes(".jpeg") || files.includes(".JPG") || files.includes(".JPEG") || files.includes(".png") ||
    //    files.includes(".GIF")
       const data=new FormData()
       data.append("file",files)
       data.append('upload_preset','profileimages')
       data.append("cloude_name","dhlqc1hup")
       this.setState({loading:true});
       await fetch("https://api.cloudinary.com/v1_1/dhlqc1hup/image/upload",
      { method:"POST",
    body:data
    }
       )
       .then(res=>res.json())
       .then(data=>{
        this.setState({loading:false}); 
        console.log(data.secure_url);  
        this.setState({image:{data:data.secure_url,
        bolean:true}})
    })
        .catch(err=>console.log(err))
    }
    

    uploadeVideo= async(e)=>{
        const files=e.target.files[0];
        imageBol = files.name.match(/.mp4|.mov|.avchd|.mkv|.flv/gi)
        console.log(files.name);
       if(!imageBol) return this.setState({videoMessage:"You should to uplod video file."})
       this.setState({videoMessage:""})

        const data=new FormData()
        data.append("file",files)
        data.append('upload_preset','profileimages')
        data.append("cloude_name","dhlqc1hup")
        this.setState({videoLoading:true}); 
        await fetch("https://api.cloudinary.com/v1_1/dhlqc1hup/video/upload",
       { method:"POST",
     body:data
     }
        )
        .then(res=>res.json())
        .then(data=>{     
         this.setState({video:{data:data.secure_url,
                    bolean:true}});
                    this.setState({videoLoading:false}); 
         console.log(this.state.video.data);
     })
         .catch(err=>console.log(err))
    }
    
emailHandler=(e)=>{
    // console.log(cookies.get('myCat'));
   this.setState({email:{value: e.target.value,
   bolean: e.target.value.includes(".com") && e.target.value.includes("@")
   }});
//    console.log(this.state.email.bolean);
   if(!this.state.email.bolean){
    this.emailArray.splice(0,1);
    this.emailArray=[..."emailWrong"];
   }
  
}
passwordHandler=(e)=>{
    // cookies.remove("myCat")
    // console.log(cookies.get('myCat'));
    this.setState({password:{value:e.target.value}})
    this.passWoulbe.splice(0,1);
    this.passWoulbe=[..."changeCall"];
    // console.log(this.passWoulbe);
    if(this.state.password.value === this.state.rePassword.value ){
        this.setState({rePassword:{
            bolean:true
        }});
    } else{
        this.setState({rePassword:{
            bolean:false
        }});
    }
    // this.passwordMatch();
   
        this.setState({rePassword:{value:""}});
    

}
verifyPassword=(e)=>{
    // console.log(e.target.value);
    this.matchControler.splice(0,1);
    this.matchControler=[..."visibul"];

    
    // console.log(this.state.password.value);
    this.setState({rePassword:{
        value:e.target.value
    }});

}





nameHandler=(e)=>{
    this.setState({name:{value:e.target.value,
                    bolean:true}});
  
    console.log("name "+this.state.name.value);
}



    render(){
        
        // email correct tag
        if(this.state.email.bolean){
            this.emailArray.splice(0,1);
            this.emailArray=[..."emailCorrect"];
           }

        //    password change function
          

        if(upercase.test(this.state.password.value)){
            
            this.upper=this.upper.splice(0,1);
           this.upper=[..."active"];
        }else{this.upper=this.upper.splice(0,1);
            this.upper=[..."needDefaultPassword"];
        }


           if(lowercase.test(this.state.password.value)){
            this.lower=this.lower.splice(0,1);
            this.lower=[..."active"];
        }else{this.lower=this.lower.splice(0,1);
            this.lower=[..."needDefaultPassword"];
        }

        

        if(numbaerCheak.test(this.state.password.value)){ 
           this.num=this.num.splice(0,1);
           this.num=[..."active"];
        }else{this.num=this.num.splice(0,1);
            this.num=[..."needDefaultPassword"];
        }


        if(specialChar.test(this.state.password.value)){
            this.special=this.special.splice(0,1);
            this.special=[..."active"];
        }else{this.special=this.special.splice(0,1);
            this.special=[..."needDefaultPassword"];
        }


        if(eightCharecter.test(this.state.password.value)){
          
            this.lenString=this.lenString.splice(0,1);
            this.lenString=[..."active"];
        }else{this.lenString=this.lenString.splice(0,1);
            this.lenString=[..."needDefaultPassword"];
        }

        // password bolean set
        // let passwordBolean =

      
        

        // Re-enter password verify
        if(this.state.password.value === this.state.rePassword.value ){
            if(this.state.rePassword.value && this.state.password.value){
                 this.setState({rePassword:{
                bolean:true
            }});
           
           
            }
           
        }




        return(
<div className="Signup">


    <div className="alreadyAccount">
<h2>if you have already Acccount</h2>
<Link to="/"><Button
clas="alreadyASignin"
click={()=>0}
>
     SIGNIN</Button></Link>
        </div>

        <h2>SIGNUP</h2>

{/* <h1>Ranjit sahoo</h1> */}
<div>
   <div className="element"> <h3>ENTER NAME</h3><p>(required)</p></div>
<Input
clas="nameSignup"
type="text"
place="ENTER NAME"
change={this.nameHandler}
/></div>

<div>
    <div className="element">
<h3>ENTER E-MAIL</h3>  <p>(required)</p></div>
<Input
clas={this.emailArray.join("")}
type="text"
place="ENTER E-MAIL"
change={this.emailHandler}
/></div>

<div>
<h3>ENTER GITHUB</h3>
<Input
clas="githubSignup"
type="text"
place="ENTER Github link"
change={e=>this.setState({github:{value:e.target.value}})}
/></div>

<div>
<h3>ENTER LINKDIN ID</h3>
<Input
clas="linkdnSignup"
type="text"
place="ENTER Linkdin id"
change={e=>this.setState({linkdin:{value:e.target.value}})}
/></div>

<div>
    <div className="element">
<h3>ENTER PASSWORD</h3> <p>(required)</p></div>
<Input
clas="passSignup"
type="password"
place="ENTER PASSWORD"
val={this.state.password.value}
change={this.passwordHandler}
/></div>

<div className={this.passWoulbe.join("")}>
    
    <p className={this.lower.join("")}>Lower case charecter</p>
    <p className={this.upper.join("")}>Upper case charecter</p>
    <p className={this.num.join("")}>Number</p>
    <p className={this.special.join("")}>Special charecter</p>
    <p className={this.lenString.join("")}>String should be minimum 8 charecter</p>

    </div>

<div>
    <div className="element">
<h3>RE-ENTER PASSWORD</h3>
<p>(required)</p></div>
<Input
clas="rePassSignup"
type="password"
place="RE-ENTER PASSWORD"
val={this.state.rePassword.value}
change={this.verifyPassword}
/>
<div className={this.matchControler}>
{this.state.rePassword.bolean ? <p className="match">Match successful</p>:<p className="notMatch">Not match</p>}
</div>
</div>

<div className="profilePhotoU">
    <div className="element">
<h3>PROFILE PICTURE</h3>
<p>(required)</p></div>
<input type="file" name="file" placehoder="Uploade an image"
onChange={this.uploade}
/> </div>

<p className="pMessage">{this.state.imageMessage}</p>

{this.state.loading ? <h3>Loading....</h3>: 
    
   <Avatar ImageData={this.state.image.data} />
}

<div className="profilePhotoU">
    <div className="element">
<h3>SAMPUL VIDEO</h3><p>(required)</p></div>
<input type="file" name="file" placehoder="Uploade an image"
onChange={this.uploadeVideo}
/> </div>
<div>
{this.state.videoLoading ? <h3>Loading....</h3>: 
    
    (this.state.video.bolean) && <video style={{width:"300px",height:"240px"}} controls>
  <source src={this.state.video.data} type="video/mp4"/>
  <source src={this.state.video.data} type="video/ogg"/>
Your browser does not support the video tag.
</video>
}

</div>
<p className="vMessage">{this.state.videoMessage}</p>


<Button
clas="SignupSubmit"
click={this.clickHandler}
disab={!(upercase.test(this.state.password.value) && lowercase.test(this.state.password.value) &&  numbaerCheak.test(this.state.password.value) &&
    specialChar.test(this.state.password.value) && eightCharecter.test(this.state.password.value) && this.state.email.bolean && this.state.rePassword.bolean&&
    this.state.name.bolean && this.state.image.data && this.state.video.data )
  
    }
    >Signup</Button>

    {/* required field does not field massage  */}

{!(upercase.test(this.state.password.value) && lowercase.test(this.state.password.value) &&  numbaerCheak.test(this.state.password.value) &&
    specialChar.test(this.state.password.value) && eightCharecter.test(this.state.password.value) && this.state.email.bolean && this.state.rePassword.bolean&&
    this.state.name.bolean && this.state.image.data && this.state.video.data) &&<div className="bottom">
        <h3>You are missleading with the required field. Please check it out above.</h3>
        <h3>OR</h3>
        <h3>you are leave the empty in required field</h3>
    </div>
    
}

{/* toast */}
<Toast toastControle={this.state.toast}/>

    </div>
        );
    }
}
export default withRouter (Signup);

// export default withRouter(connect()(withStyles(styles)(FirstPage)))









// url=	https://api.cloudinary.com/v1_1/dhlqc1hup