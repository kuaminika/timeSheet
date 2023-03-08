
window.factories = window.factories || {};

(factories=>{
    
    function Task(){
        let self = this;
        self.code =`NEW0000${new Date().getTime()}`;
        self.description = "This is a new task ";
    }


    function TaskFactory()
    {
        let self = this;

        self.createNew =   ()=>{
            let result = new Task();
            return result;
        };

    }

    factories.Tasks = new TaskFactory();


})(window.factories)