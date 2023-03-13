
(function(app){

    function Facade(args)
    {
        if(!args) throw "FacadeService:args missing";
                
        if(!args.dbGateway)
            throw "FacadeService:dbGateway is missing";

        
        
        let modelFactory = args.modelFactory;
        let dbGateway = args.dbGateway;
        let self = this;

        self.getAllTasks = ()=>{
 
            let request =  dbGateWay.init(app).then((gg)=>{

                dbGateWay.Tasks.setDb(gg.target.result);
                return dbGateWay.Tasks.findAll();
            });
          return  request;

        }

        self.findTaskById = (id)=>{return {}}
        //logWithModel
        self.logTime = (timeLog)=>{
            let addTimeLogRequest = dbGateway.init(app).then(gg=>{
                dbGateWay.TimeLogs.setDb(gg.target.result);
                return dbGateway.TimeLogs.add(timeLog);
            })

            return addTimeLogRequest;
        }
        //log with details
        self.logTimeDetails = (taskId, day, timeSpan, comment)=>{
          let findTaskRequest =  dbGateWay.init(app).then((gg)=>{
              dbGateWay.Tasks.setDb(gg.target.result);
              return dbGateway.Tasks.findById(taskId);
            });
          findTaskRequest.then(task=>{
            let newTimeLog =  modelFactory.TimeLogs.createNewFor({task});
            newTimeLog.Day= day;
            newTimeLog.hoursWorked= timeSpan;
            newTimeLog.comment = comment;
            
            return newTimeLog;
          })
          .then(self.logTime);    
          
          return findTaskRequest;
          
        }

        self.getAllTimeLogs = ()=>{             
            let request = dbGateway.init(app).then(gg=>{
                dbGateWay.TimeLogs.setDb(gg.target.result);
                return dbGateway.TimeLogs.findAll();
            });
            return request;
        }

       

        self.addTask = newTask=>{
           
            let addRequest =  dbGateWay.init(app).then((gg)=>{

                dbGateWay.Tasks.setDb(gg.target.result);
                return dbGateWay.Tasks.add(newTask);
            });
          return  addRequest;

        }


        self.addTaskWithDetails = (taskCode,description)=>{
            console.log("args",args);
            console.log("modelFactory",modelFactory);
            let newTask =    modelFactory.Tasks.createNew();
               newTask.code = taskCode;
               newTask.description = description; 
               return self.addTask(newTask);
           }



    }
    app.initService = (args)=>{

        app.service = new Facade(args);

    }



})(app)

