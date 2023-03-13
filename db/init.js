
function initDb({dbName,dbVersion}){
   let name = dbName;
   let version = dbVersion;
    if (!('indexedDB' in window)) {
        console.log("This browser doesn't support IndexedDB");
        return;
    }
    const dbPromise = indexedDB.open(name, version);
    
    dbPromise.onupgradeneeded  = ()=>{
                let upgradeDb = dbPromise.result;
                
                // you create object stores AKA tables here
                console.log('updating db:');
                console.log("updgradedDb",upgradeDb);
                
                dbGateWay.Tasks.setUp(upgradeDb);
                dbGateWay.TimeLogs.setUp(upgradeDb);
                console.log("updgradedDb",upgradeDb);
                console.log("dbGateWay",dbGateWay)
        
        };

        let configuration = {};

        configuration.db = dbPromise;

        let promiseResult = new Promise((acc,rej)=>{
            dbPromise.onsuccess = acc;
            dbPromise.onerror = rej;
        });
        return promiseResult;

       /* dbPromise.onsuccess =function (e) {
             console.log("Database opened successfully");
            db =  event.target.result;


            console.log(dbGateWay);
            let newTask = factories.Tasks.createNew();
            let addRequest =  dbGateWay.Tasks.add(newTask);
            addRequest.then(console.log);
            addRequest =  dbGateWay.Tasks.findAll();
            addRequest.then(console.log);
            
           let taskToLogTimeToQuery =   dbGateWay.Tasks.findByCode("NEW00001678249626445");
           taskToLogTimeToQuery.then(t=>{

                if(!t.length)
                {
                    console.log("nothing is found");
                    return;
                }
                let taskFound = t[0];
                let log = factories.TimeLogs.createNewFor({task:taskFound,timeWorked:5});
                console.log(log);

                dbGateWay.TimeLogs.add(log).then(msg=>{
                    console.log(msg);
                   dbGateWay.TimeLogs.findAll().then(console.log);
                });
                    
           });*/

           


        

  //  dbPromise.then(console.log) the then thing does not twork
}
dbGateWay.init =initDb;