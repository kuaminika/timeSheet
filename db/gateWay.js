
(function(p){

        console.log("gateway")
    function DBGateWay(givenName)
    {
        let store=this;
        store.name = givenName;
    
        store.findAll = ()=>{
            let promiseResult = new Promise((acc,rej)=>{

                const transaction = db.transaction([store.name], "readwrite");
                // call an object store that's already been added to the database
                const objectStore = transaction.objectStore(store.name);

                let query =  objectStore.getAll()
                query.onsuccess = ()=>{
                    console.log(`search by id in store:${store.name}`,query.result)
                    acc(query.result)
                }

                query.onerror = ()=>{
                    
                    console.error("Error", query.error);
                    if(rej)
                      rej(query);

                }
            });
            return promiseResult;



        }

        store.findByIndex = (indexName,searchParameter)=>{

            
            let promiseResult = new Promise((acc,rej)=>{

                const transaction = db.transaction([store.name], "readwrite");
                // call an object store that's already been added to the database
                const objectStore = transaction.objectStore(store.name);
                const index = objectStore.index(indexName);

                console.log(`search by '${indexName}'in store:${store.name}`,`parameter ${searchParameter}`);
                let query =  index.getAll(searchParameter);
                query.onsuccess = ()=>{
                    console.log(`search by '${indexName}'in store:${store.name}`,`parameter ${searchParameter}`,query.result)
                    acc(query.result)
                }

                query.onerror = ()=>{
                    
                    console.error("Error", query.error);
                    if(rej)
                      rej(query);

                }
            });
            return promiseResult;



        }


        store.deleteAll = ()=>{
                    // open a read/write db transaction, ready for clearing the data
                    const transaction = db.transaction([store.name], "readwrite");

                    // report on the success of the transaction completing, when everything is done
                    transaction.oncomplete = (event) => {
                       console.log(" Transaction completed.");
                    };

                    transaction.onerror = (event) => { 
                         console.error(`Transaction not opened due to error: ${transaction.error}`);
                    };

                    // create an object store on the transaction
                    const objectStore = transaction.objectStore(store.name);
                    
                         
                    let promiseResult = new Promise((acc,rej)=>{
                        let query = objectStore.clear();
                        query.onsuccess = ()=>{
                            console.log(`clear:${store.name}`,query.result)
                            acc(query.result)
                        }

                        query.onerror = ()=>{
                            
                            console.error("Error", query.error);
                            if(rej)
                            rej(query);

                        }
                    });
                    return promiseResult;


        }
        
        store.findById = id=>{
             
            let promiseResult = new Promise((acc,rej)=>{
                let query =  store.get(id)
                query.onsuccess = ()=>{
                    console.log(`search by id in store:${store.name}`,query.result)
                    acc(query.result)
                }

                query.onerror = ()=>{
                    
                    console.error("Error", query.error);
                    if(rej)
                      rej(query);

                }
            });
            return promiseResult;
        }
        
        store.add = specimen =>{
            
                   // open a read/write db transaction, ready for adding the data
                   const transaction = db.transaction([store.name], "readwrite");
                   // call an object store that's already been added to the database
                   const objectStore = transaction.objectStore(store.name);
                   // Make a request to add our newItem object to the object store
                   const addRequest = objectStore.add(specimen);
   
                   transaction.onerror = (event) => { 
                            console.error(event)
                            console.error(`Transaction not opened due to error: ${event.target.error}`);
                    };
   
                   let promiseResult = new Promise((acc, rej)=>{                    
                       addRequest.onsuccess = acc;
                       addRequest.onerror = ()=>{                    
                           console.error("Error", event.target.error);
                           if(rej) rej( event.target.error);    
                       }
   
                   });
                 
                   return promiseResult;
           }
    }
     p.dbGateWay= {};
     p.dbGateWay.createGatewayBase =name=>{return new DBGateWay(name);}

})(window)