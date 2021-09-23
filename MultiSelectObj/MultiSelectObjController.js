({
    getRelatedFields : function(component, event, helper) {

        const fields=[]
        const selectedSObejct=component.get("v.Sobject")
        console.log(selectedSObejct)

        
         //create apex method action
         const action=component.get("c.getRelatedFieldsfromObj");

         //set Params
         action.setParams({
            Obj:selectedSObejct
         })

         //define a callback
         action.setCallback(this,function(response){
             const state=response.getState();

             if (state === "SUCCESS") {        
                   

                 var allValues = response.getReturnValue();
                 allValues.forEach((val)=>{
                    var item = {
                        "label": val,
                        "value": val
                    };
                    fields.push(item)
                 })
                 console.log(fields)
            

                //Empty the Existing Fields
                component.set("v.Fields",[])

                //Setting the has ShowQuery value to false
             const q= component.get("v.showQuery")
             if(q){
                component.set("v.showQuery",false)
             }

             //setting the has query to false
             const qq=component.get("v.hasQuery")
             console.log(qq)
             if(qq){
                 component.set("v.hasQuery",false)
             }

               //Getting the query String and setting empty string
               const qs=component.get("v.QString")
               if(qs){
                   component.set("v.QString","")
               }

               const Table=component.get("v.showTable");
               if(Table){
                   component.set("v.showTable",false)
               }
               


                 //Setting The New Fields
                component.set("v.Fields",fields)

             }                    
             else if (state === "ERROR") {
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
         //call apex method
         $A.enqueueAction(action);

        
        

    },
    getQuery:function(component,event,helper){

       const returnedArr = helper.resetArray(event)
      

       //Getting the current Object Selected
       const selectedSObejct=component.get("v.Sobject")

       console.log(selectedSObejct)
       console.log('thi sis returned Query',returnedArr)
       component.set("v.OFields",returnedArr);

       if(returnedArr.length>=1){

        const mainQuery=`SELECT ${returnedArr} from ${selectedSObejct} `

        console.log(mainQuery)

        component.set("v.QString",mainQuery)
        console.log(returnedArr)
        component.set("v.hasQuery",true)


        if(returnedArr.includes("")){
            component.set("v.hasQuery",false)

        }

       }
       

    },
    // displayQuery:function(component,event, helper){
    //     const querytoDisplay = component.get("v.QString");
    //     if(querytoDisplay){
    //         component.set("v.showQuery",true)

    //     }
    //     component.set("v.hasQuery",false)

        
        
    // },
    getData:function(component,event,helper){
        const Fields=component.get("v.OFields").toString();
        const Query=component.get("v.QString").toString();
        console.log(Fields)
        console.log(Query)
        component.set("v.showTable",true)

        const compo=component.find("DTable")
        compo.ShowData()

        // helper.fireEvent(Query)
    }
})
