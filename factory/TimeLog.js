window.factories = window.factories || {};

(factories=>{
    
    function TimeLog(){
        let self = this;
        let today = new Date();
        self.Day =`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        self.comment = "This is a time log for a task";
        self.hoursWorked = 0.5;
        self.taskID = -1;
    }


    function TimeLogFactory()
    {
        let self = this;

        self.createNewFor =   (args)=>{
            let result = new TimeLog();
            result.taskID = args.task.id;
            if(args.timeWorked)
                result.hoursWorked = args.timeWorked;
            return result;
        };

    }

    factories.TimeLogs = new TimeLogFactory();


})(window.factories)