({
    doInit : function(component, event, helper) {
        const options=[]
    

         //create apex method action
         const action=component.get("c.getObjList");
         //set Params
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
                    options.push(item)
                 })
                component.set("v.orgObjects",options)
                console.log(options)

                 console.log('this is',allValues)
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
    getObjName:function(component,event,helper){
        var selectedOptionValue = event.getParam("value");
        console.log(selectedOptionValue)
        component.set("v.selectedSobject",selectedOptionValue)
        const comp=component.find("msComponent")
        comp.RenderObj();
      
        
    }
})
