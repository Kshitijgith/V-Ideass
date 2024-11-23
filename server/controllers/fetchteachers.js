const Teacher=require('../models/teacher');
const Project=require('../models/group')
const FindTeacher=async(req,res)=>{
   try{
const {dept}=req.body;
const Teachers=await Teacher.find({branch:dept})
res.json({success:true,data:Teachers})
   }
   catch(error){

res.status(500).json({success:false,message:'Internal Server Error'})
   }
};
const TeacherName=async(req,res)=>{
    try{
        const {teachername}=req.body;
        const teacher=await Teacher.findOne({name:teachername})
        if(teacher){
            res.json({success:true,data:teacher});
        }
        else{
            res.json('NO teacher Found')
        }
    }
    catch(error){
        
        res.status(500).json({success:false,message:'Internal Server Error'})

    }
}

const FindProjects=async(req,res)=>{
    try{
       const {teachername}=req.body
       const response=await Project.find({guideName:teachername,status:true})
       if(response){
        res.json({success:true,data:response})
       }
       else{
        res.json('Not Part of Any Group')
       }

    }
    catch(error){
       
        res.status(500).json({success:false,message:"Internal Server Error"})
    }

}
  
module.exports={FindTeacher,TeacherName,FindProjects}