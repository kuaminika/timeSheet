window.factories = window.factories || {};

(factories=>{
    
    function TimeLog(){
        let self = this;
        self.Day =`NEW0000${new Date().getTime()}`;
        self.comment = "This is a time log for a task";
        self.hoursWorked = 0.5;
        self.taskId = -1;
    }


    function TimeLogFactory()
    {
        let self = this;

        self.createNew =   (task)=>{
            let result = new TimeLog();
            result.taskId = task.id;
            return result;
        };

    }

    factories.TimeLogs = new TimeLogFactory();


})(window.factories)