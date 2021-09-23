({
    
    onShowData:function(component,event,helper){
        const arrToInsert=[]
        const columns=[]

        const columnToCreate=[...component.get("v.columns")][0].split(',')
        console.log(columnToCreate)

        const queryToRun=component.get("v.Query")

        const Object=component.get("v.objectType")

        console.log(queryToRun,Object)
        // console.log(columnToCreate)

        // columnToCreate.forEach((val)=>{
        //     var item={
        //         'label':val,
        //         'fieldName':val
        //     }
        //     arrToInsert.push(item)
        // })
        // console.log(arrToInsert)

        // static Recource for testing
        // component.set("v.FieldsName",arrToInsert)



        //create apex action
        const action=component.get("c.fetchQueryRecords");

        //set Params
        action.setParams({
            Query:queryToRun
        })

       

        //define a callback
        action.setCallback(this,function(response){
            const state=response.getState();
            if(state === 'SUCCESS'){
                let allValues=response.getReturnValue();

                //Setting the Result of Query
                component.set("v.data",allValues)

                
                //Query Result
                console.log(allValues)

                for(var key in columnToCreate){
                    columns.push({label:columnToCreate[key],fieldName:columnToCreate[key]});
                }

                // component.set("v.data",columns)

                // console.log(JSON.parse(component.get("v.data")))


                component.set("v.FieldsName",columns)

    

                // component.set("v.FieldsName",allValues)
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } 
                else {
                    console.log("Unknown Error");
                }
            }
        })

        //call apex Method
        $A.enqueueAction(action)
    }


})
