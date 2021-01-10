
import AddIcon from '@material-ui/icons/Add';
import React, {Component} from "react";
import Modal from "../../Resources/Modal/Modal";
import Button from "../../Resources/Button/Button";
import Input from "../../Resources/Inputfield/Inputfield"
import Box from "../../Resources/Box/Box";
import "./Dashboard.css";
import Cookies from 'universal-cookie';


const cookies = new Cookies();
// const history=useHistory();

class Dashboarded extends Component{

   constructor(){
       super();
    this.state={
        sameTtitle:false,
        modelControle:false,
        playlistName:"",
        localStoreImageName:"",
        emptyText:false,
        imageUrl:{value:"",
                    bolean:false},
        boxArray:[]                                // boxArray property name, image, mover
    }
   }
//redirect to rootroute
routingFunction = (param) => {
    this.props.history.push({
        pathname: `/`,
        state: param
    });
}
//    refresh function
refresh = async (p)=>{
 
    await fetch("https://leacteer-api.herokuapp.com/refreshtoken",{
        method: "PATCH",
       
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({refershToken: cookies.get('SID')}) 
       }).then(response=>response.json())
       .then(data=>{
        console.log(data);

        if(data.error && data.error.status === 401){
            sessionStorage.clear()
            cookies.remove('SID')
            this.routingFunction()
           }
           if(data.token){
        cookies.set('SID', data.refresToken, {maxAge: 24 * 60 * 60})
        sessionStorage.setItem("NA_R", data.token)

        if(p===1){
            this.dashboard()
        }
        if(p===2){
            this.playlistCreate()
        }
    
           }
       
           
       })
       .catch(err=>console.log(err))
}

//create playlist
playlistCreate = async()=>{
    // const p={title:this.state.playlistName,
    //     thumbnail:this.state.imageUrl.value}
    //     console.log(this.state.playlistName+" "+this.state.imageUrl.value);

    await fetch("https://leacteer-api.herokuapp.com/createplaylist",{
        method: "POST",
       
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Barear ' + sessionStorage.getItem("NA_R")
          },
          body: JSON.stringify({
            title:this.state.playlistName,
            thumbnail:this.state.imageUrl.value
          })
       }).then(response=>response.json())
       .then(data=>{

        if(data.error && (data.error.status === 405 || data.error.status === 401) ){
            this.refresh(2);
            
           }
           if(data.error && data.error.status === 409){
               let temArra =this.state.boxArray 
               temArra.splice(0, 1)                          //loding box deleted in same title
                this.setState({boxArray:temArra})
               this.setState({sameTtitle:true})
                console.log(this.state.playlistName);
            return this.modelhandlerForSameTitleTrue()
           }

           if(data.savePlaylist){
            //    console.log(data.savePlaylist);
            let tempArray=this.state.boxArray 
            console.log(tempArray)
             tempArray.shift()  
                       
            tempArray=[data.savePlaylist,...tempArray];
            this.setState({boxArray:tempArray});
        this.setState({imageUrl:{value:"",
                            bolean:false}})
                            this.setState({playlistName:"",
                            localStoreImageName:""})
           }
       
           
       })
       .catch(err=>console.log(err))
} 

// dashboard function
dashboard = async ()=>{
    // console.log(sessionStorage.getItem("NA_R"));
    await fetch("http://localhost:9000/dashboard",{
        method: "POST",
       
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Barear ' + sessionStorage.getItem("NA_R")
          }
       }).then(response=>response.json())
       .then(data=>{
console.log(data);
//data.error.status === 401
        if(data.error && (data.error.status === 405 || data.error.status === 401) ){
            this.refresh(1);
            
           }
           if(data.dashboard){
           this.setState({boxArray:data.dashboard.reverse()})
           }
       
           
       })
       .catch(err=>console.log(err))
}


  componentDidMount(){
    this.dashboard()
    // this.refresh()
  }

                                                    //    name and image keys are added in submitResponse function
                                                    // mover is key is added in mouseOverHandler and mouseOutHandler function
    modelhandlerAsTrue=()=>{
        this.setState({emptyText:false});
        this.setState({modelControle:!this.state.modelControle})
    }
    modelhandlerForSameTitleTrue=()=>{
        
        this.setState({modelControle:!this.state.modelControle})
    }
    inputHandler=(e)=>{
        this.setState({emptyText:false});
        this.setState({playlistName:e.target.value})
    }
    imageUpload=async(e)=>{
        
        const files=e.target.files[0];
        this.setState({localStoreImageName:files.name})
        console.log(files.name);
        const data=new FormData()
        data.append("file",files)
        data.append('upload_preset','thomenail')
        data.append("cloude_name","dhlqc1hup")
        this.setState({imageUrl:{bolean:true}});
        await fetch("https://api.cloudinary.com/v1_1/dhlqc1hup/image/upload",
       { method:"POST",
     body:data
     }
        )
        .then(res=>res.json())
        .then(data=>{
            // this.setState({imageUrl:{bolean:false}});
         console.log(data.secure_url);  
         this.setState({imageUrl:{value:data.secure_url,
         bolean:false}})
     })
         .catch(err=>console.log(err))
    }


    submitResponse= async ()=>{
        console.log(this.state.playlistName+" "+this.state.imageUrl.value);
        // const p={title:this.state.playlistName,
        //     thumbnail:this.state.imageUrl.value}    
        if(this.state.playlistName ==="" || this.state.imageUrl.value===""){
           this.setState({emptyText:true});
        }else{
            this.modelhandlerAsTrue();
            let tempArray=this.state.boxArray;                   
            tempArray=["p",...tempArray];
            this.setState({boxArray:tempArray});
            
            this.playlistCreate()
           
            
            
        }
        
    }

    mouseOverHandler=(id)=>{
        let temp=this.state.boxArray;
        let clas=temp[id];
        clas={...clas,mover:"overCSS"}
        temp[id]=clas;
        this.setState({boxArray:temp})
      console.log("mouse over "+this.state.boxArray[id].clas);

    }

    mouseOutHandler=(id)=>{
        let temp=this.state.boxArray;
        let clas=temp[id];
        clas={...clas,mover:""}
        temp[id]=clas;
        this.setState({boxArray:temp})
        console.log("mouse out "+this.state.boxArray[id].clas);
    }
   
    render(){
        return(
            <div className="DashboardContent">
                {/* model work */}
                {this.state.modelControle ?
                <Modal
                click={this.modelhandlerAsTrue}
                clas="placeMode"
                clasMod="addPlaylistPapear"
                >  
                    {/* model items  */}
                    <div className="modelItem">
                        {this.state.emptyText && <h3 className="warnMassage">You have to fill all the field.</h3>}
                        {this.state.sameTtitle && <h3 className="warnMassage">This title is already exit.</h3>}
                        

                    <div className="playlistName"> 
                    <p>ENTER PLAYLIST NAME:</p>
                    <Input 
                    clas="playlistNameInput"
                    type="text"
                    val={this.state.playlistName}
                    change={this.inputHandler}
                    /></div>
                    
                    {this.state.sameTtitle ? null :
                    <div className="imageputer"> 
                    <p>THOMENAIL IMAGE:</p><input type="file" name="image" 
                    
                    onChange={this.imageUpload} /></div> }
                    {this.state.imageUrl.bolean && <div><h2>Loading....</h2>
                    <p className="warnUplodepicforButton">Keep wait stile upload the THOAMNAIL picture</p></div> }
                    <div className="buttonsCont">
                        <Button
                        clas="submitPlaylist"
                        click={this.submitResponse}
                        disab={this.state.imageUrl.bolean}
                        >SUBMIT</Button>

                        <Button
                        clas="cancelPlaylist"
                        click={this.modelhandlerAsTrue}
                        disab={this.state.imageUrl.bolean}
                        >CANCEL</Button>
                    </div>


            </div>
                </Modal> : null }


            <div className="Dashboard">

                
<div>
{/* this.state.boxArray */}
    {this.state.boxArray.map((e,index)=>{
        return(<Box im={e.thumbnail}
            key={index}
            over={this.mouseOverHandler}
            out={this.mouseOutHandler}
            id={index}
            moveClass={e.mover}
        >
            {e.title}
            </Box>)
    })}

             

           </div> 

            {/* add button */}
           <div className="Add" onClick={this.modelhandlerAsTrue}>
               <AddIcon style={{ fontSize: 50, color:"white" }}/>
               </div>  

               

                </div>


                </div>
        );
    }
}

export default Dashboarded;