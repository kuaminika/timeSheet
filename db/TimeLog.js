
window.dbGateWay = window.dbGateWay || {};

(dbGateWay=>{
    
    function TimeLogs(){
     
        let store=this;
        store.name = "TimeLogs";
        let base = dbGateWay.createGatewayBase(store.name);
        store.setUp = upgradeDb=>{

            console.log("setting up name:",store.name);
            if (upgradeDb.objectStoreNames.contains(store.name))return;    
            console.log("added:",store.name);
            const storeOS = upgradeDb.createObjectStore(store.name, { keyPath:'id',autoIncrement:true });
            storeOS.createIndex('taskID', 'taskID', { unique: false });
        }

        store.deleteAll= base.deleteAll.bind(base);
        store.add = base.add.bind(base);        
        store.findAll = base.findAll.bind(base);
        store.findById = id=>{return base.findById.bind(base,id)};
        //NEW00001678244296911


    }

    dbGateWay.TimeLogs = new TimeLogs();


})(window.dbGateWay)