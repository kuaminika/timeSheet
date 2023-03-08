window.dbGateWay = window.dbGateWay  ||{}; 


((dbGateWay)=>{

    function Tasks(){
     
        let store=this;
        store.name = "Tasks";
        let base = dbGateWay.createGatewayBase(store.name);
        store.setUp = upgradeDb=>{

            console.log("name:",store.name);
            if (upgradeDb.objectStoreNames.contains(store.name))return;    
            console.log("added:",store.name);
            const storeOS = upgradeDb.createObjectStore(store.name, { keyPath:'id',autoIncrement:true });
            storeOS.createIndex('code', 'code', { unique: true });
        }

        store.deleteAll= base.deleteAll.bind(base);
        store.add = base.add.bind(base);        
        store.findAll = base.findAll.bind(base);
        store.findById = id=>{return base.findById.bind(base,id)};
        store.findByCode  = code =>{ return base.findByIndex("code",code)}
        //NEW00001678244296911


    }
    dbGateWay.Tasks = new Tasks();
})(dbGateWay)